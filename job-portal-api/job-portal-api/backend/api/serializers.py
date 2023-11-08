from rest_framework import serializers
from base.models import *
from django_elasticsearch_dsl_drf.serializers import DocumentSerializer
from base.document import *



class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Job
        fields = '__all__'

class CompanySerializer(serializers.ModelSerializer):
    class Meta:
        model = Company
        fields = '__all__'

class JobApplicationSerializer(serializers.ModelSerializer):
    class Meta:
        model = JobApplication
        fields = '__all__'


# class ItemSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = Item
#         fields = '__all__'
#     def get_tags(self, obj):
#         return ",".join(obj.tags) if obj.tags else ""
class JobSerializer(serializers.ModelSerializer):
    company_name = serializers.CharField(source='company.name', read_only=True)
    location = serializers.CharField(source='company.location', read_only=True)
    class Meta:
        model = Job
        fields = ['id', 'title', 'salary_range', 'tags', 'company_name', 'location', 'company_id']



class imageSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model= image
        fields = '__all__'

# class UserProfileSerializer(serializers.HyperlinkModelSerializer):
#     class Meta:
#         model = UserProfile
#         fields = ('id','email','name','password')
#         extra_kwargs = {'password': {'write_only': True}}
#     def create(self, validated_data):
#          user = models.UserProfile(
#              email=validated_data['email'],
#              name=validated_data['name']

#          )
#          user.set_password(validated_data['password'])
#          user.save()

#          return user
    
class JobDocumentSerializer(DocumentSerializer):
    class Meta:
        model= Job
        document = JobDocument
        fields = '__all__'

        def get_location(self, obj):
            try:
                return obj.location.to_dict()
            except:
                return {}
            
class UserProfileSerializer(serializers.ModelSerializer):
   
     preferred_annual_pay = serializers.DecimalField(
        max_digits=10,
        decimal_places=2,
        help_text='Preferred Annual Pay (in dollars/year)'
    )
    
    
     class Meta:
         model=UserProfile
         fields=['id','email','name','location','profile_picture','instagram_link','facebook_link','telegram_link', 'github_link','bio', 'skills','preferred_annual_pay','resume', 'education']
   

     def create(self, validated_data):
          user=UserProfile(
              email=validated_data['email'],
              name=validated_data['name'],
              location=validated_data['location'],
              profile_picture=validated_data['profile_picture'],
              instagram_link=validated_data.get('instagram_link'),
              facebook_link=validated_data.get('facebook_link'),
              telegram_link=validated_data.get('telegram_link'),
              github_link=validated_data.get('github_link'),
              bio=validated_data['bio'],
              skills=validated_data['skills'],
              preferred_annual_pay=validated_data['preferred_annual_pay'],
              resume=validated_data['resume'],
              education=validated_data['education']
          
              
        )
        

          
          user.save()

          return user





