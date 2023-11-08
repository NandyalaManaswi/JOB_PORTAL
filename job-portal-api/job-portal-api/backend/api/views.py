import os,re
from backend.settings import *
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
import django
django.setup()
from django.db.models import Count
from django.http import HttpResponse
from rest_framework.response import Response 
from rest_framework.renderers import JSONRenderer
from rest_framework.decorators import api_view
from base.models import *
from .serializers import *
from django.views.decorators.csrf import csrf_exempt
from rest_framework import viewsets
from rest_framework.renderers import JSONRenderer
from base.document import *
from elasticsearch_dsl.query import Q
from elasticsearch.exceptions import NotFoundError
import requests,json
from elasticsearch_dsl import Q,A
from django.http import JsonResponse
from django.shortcuts import get_object_or_404,render
from django_elasticsearch_dsl_drf.viewsets import DocumentViewSet
from django.shortcuts import render, redirect
from django_elasticsearch_dsl_drf.filter_backends import (
     FilteringFilterBackend,
     CompoundSearchFilterBackend,
)

from django_elasticsearch_dsl_drf.constants import (
    LOOKUP_FILTER_TERM,
    LOOKUP_FILTER_TERMS,
    LOOKUP_FILTER_RANGE,
)
from django_elasticsearch_dsl_drf.filter_backends import (
    FilteringFilterBackend,
    SearchFilterBackend,
)
from rest_framework.pagination import PageNumberPagination
from .serializers import UserProfileSerializer
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from api.serializers import JobApplicationSerializer



class CustomPagination(PageNumberPagination):
    page_size = 10  # Number of items to be displayed per page
    page_size_query_param = 'page_size'
    max_page_size = 100

class JobDocumentViewSet(DocumentViewSet):
    document = JobDocument
    serializer_class = JobDocumentSerializer
    lookup_field = 'id'
    filter_backends = [
        FilteringFilterBackend,
        SearchFilterBackend,
    ]
    search_fields = (
        'title',
        'company.name',
        'location',
        'salary_range',
        'tags',
    )
    filter_fields = {
        'salary_range': {
            'field': 'salary_range',
            'lookups': [
                LOOKUP_FILTER_RANGE,
            ],
        },
        # 'location': {
        #     'field': 'location',
        #     'lookups': [
        #         LOOKUP_FILTER_TERM,
        #     ],
        # },
    }

    def get_queryset(self):
        return JobDocument().search().index("job_posts")

def job_search(request):
    salary_gt = request.GET.get('salary_gt')
    salary_lt = request.GET.get('salary_lt')
    title = request.GET.get('title')
    location = request.GET.get('location')
    company = request.GET.get('company')
    tags = request.GET.get('tags')

    search_query = JobDocument.search()
    filters = []

    if salary_gt:
        salary_gt = salary_gt.replace(',', '')  # Remove comma from the value
        filters.append(Q('range', salary_range={'gte': int(salary_gt)})) 

    if salary_lt:
        salary_lt = salary_lt.replace(',', '')  # Remove comma from the value
        filters.append(Q('range', salary_range={'lte': int(salary_lt)}))

    if title:
        filters.append(Q('match', title=title))

    if location:
        filters.append(Q('match', company__location=location))

    if company:
        filters.append(Q('match', company__name=company))

    if tags:
        filters.append(Q('match', tags=tags))

    if filters:
        search_query = search_query.query('bool', filter=filters)

    if salary_gt:
        # Add an additional range filter to include jobs with salaries greater than the specified value
        search_query = search_query.filter(Q('range', salary_range={'gt': int(salary_gt)}))

    if salary_lt:
        # Add an additional range filter to exclude jobs with salaries greater than the specified value
        search_query = search_query.filter(~Q('range', salary_range={'gt': int(salary_lt)}))

    queryset = search_query.execute()
    jobs = []
    for hit in queryset:
        job = {
            'title': hit.title,
            'salary_range': hit.salary_range,
            'company': {
                'name': hit.company.name,
                'location': hit.company.location
            },
            'tags': list(hit.tags),
        }
        jobs.append(job)

    response_data = {
        'jobs': jobs,
    }

    json_data = json.dumps(response_data, indent=4, ensure_ascii=False).encode('utf8')
    return HttpResponse(json_data, content_type='application/json; charset=utf-8')

# @api_view(['GET'])
# def getData(request):
#     jobs = Job.objects.all()
#     serializer = JobSerializer(jobs, many=True)
#     return Response(serializer.data)
@api_view(['GET'])
def getData(request):
    paginator = CustomPagination()
    jobs = Job.objects.all()
    result_page = paginator.paginate_queryset(jobs, request)
    serializer = JobSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)


@api_view(['GET'])
def getDataDetail(request, pk):
    job = Job.objects.get(id=pk)
    serializer = JobSerializer(job)
    return Response(serializer.data)

# @api_view(['GET'])
# def get_all_locations(request):
#     locations = Company.objects.values('location').annotate(total_jobs=Count('jobs'))
#     return Response(locations)
@api_view(['GET'])
def get_all_locations(request):
    paginator = CustomPagination()
    locations = Company.objects.values('location').annotate(total_jobs=Count('jobs'))
    result_page = paginator.paginate_queryset(locations, request)
    return paginator.get_paginated_response(result_page)

# @api_view(['GET'])
# def get_jobs_for_location(request, location):
#     jobs = Job.objects.filter(company__location__iexact=location)
#     serializer = JobSerializer(jobs, many=True)
#     return Response(serializer.data)
@api_view(['GET'])
def get_jobs_for_location(request, location):
    paginator = CustomPagination()
    jobs = Job.objects.filter(company_location_iexact=location)
    result_page = paginator.paginate_queryset(jobs, request)
    serializer = JobSerializer(result_page, many=True)
    return paginator.get_paginated_response(serializer.data)



@api_view(['POST'])
def addItem(request):
    company_data = request.data.get('company')
    company_serializer = CompanySerializer(data=company_data)
    company_serializer.is_valid(raise_exception=True)
    company = company_serializer.save()

    job_data = request.data.get('job')
    job_data['company'] = company.id
    job_serializer = JobSerializer(data=job_data)
    job_serializer.is_valid(raise_exception=True)
    job = job_serializer.save()

    return Response({
        'company': company_serializer.data,
        'job': job_serializer.data
    }, status=201)

@api_view(['PUT'])
def updateItem(request, pk):
    job = Job.objects.get(id=pk)
    serializer = JobSerializer(instance=job, data=request.data)
    if serializer.is_valid():
        serializer.save()
    return Response(serializer.data)

@api_view(['DELETE'])
def deleteItem(request, id):
    try:
        job = get_object_or_404(Job, id=id)
        job.delete()
        return Response(status=204)
    except Job.DoesNotExist:
        return Response({"error": "Job does not exist"}, status=404)
    
@api_view(['POST'])
def apply_for_job(request):
    serializer = JobApplicationSerializer(data=request.data)
    if serializer.is_valid():
        serializer.save(user=request.user)  # Associate the current user with the application
        return Response(serializer.data, status=201)
    return Response(serializer.errors, status=400)



class imageView(viewsets.ModelViewSet):
    queryset = image.objects.all()
    serializer_class= imageSerializer



# class UseProfileViewSet(viewsets.ModelViewSet):
#     serializer_class = serializers.UserprofileSerializer
#     queryset = models.UserProfile.objects.all()

class UserProfileView(viewsets.ModelViewSet):
    # serializer_class=serializers.UserProfileSerializer
    serializer_class=UserProfileSerializer
    queryset=UserProfile.objects.all()
   
    @action(detail=False, methods=['POST'])
    def create_profile(self, request):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        return Response(serializer.data)

    @action(detail=True, methods=['GET'])
    def get_profile(self, request, pk=None):
        user_profile = self.get_object()
        serializer = self.get_serializer(user_profile)
        return Response(serializer.data)
    
    @action(detail=False, methods=['GET'])
    def get_all_profiles(self, request):
        profiles = self.queryset
        serializer = self.get_serializer(profiles, many=True)
        return Response(serializer.data)
    
    @action(detail=True, methods=['DELETE'])
    def delete_profile(self, request, pk=None):
        try:
            user_profile = self.get_object()
            user_profile.delete()
            return Response(status=status.HTTP_204_NO_CONTENT)
        except UserProfile.DoesNotExist:
            return Response(status=status.HTTP_404_NOT_FOUND)
    
    