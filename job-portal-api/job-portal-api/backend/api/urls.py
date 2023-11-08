from django.urls import path, include
from . import views
from rest_framework import routers
from django.conf.urls.static import static
from django.conf import settings
from api.views import job_search
from api.views import UserProfileView


router =routers.DefaultRouter()
router.register('image', views.imageView)
router.register('profile', views.UserProfileView,  basename='profile')


urlpatterns = [
path('', include(router.urls)),
path('get/',views.getData),
path('post/',views.addItem),
path('put/<str:pk>/', views.updateItem),
path('delete/<int:id>/', views.deleteItem),
path('profile/<int:pk>/delete_profile/', UserProfileView.as_view({'delete': 'delete_profile'}), name='delete_profile'),
path('job_search/', views.job_search, name='job_search'),
path('locations/', views.get_all_locations, name='get_all_locations'),
path('apply/', views.apply_for_job, name='apply_for_job'),
path('locations/<str:location>/', views.get_jobs_for_location, name='get_jobs_for_location'),
]+ static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)


