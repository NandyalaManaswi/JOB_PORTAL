from django.db import models
from django.contrib.postgres.fields import ArrayField, JSONField
from django_elasticsearch_dsl import Document, fields
from django_elasticsearch_dsl.registries import registry
from django.contrib.auth.models import User





class Company(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=200)
    location = models.CharField(max_length=50)

class Job(models.Model):
    id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=200)
    salary_range = models.CharField(max_length=500)
    tags = ArrayField(models.CharField(max_length=50), blank=True, null=True)
    company=models.ForeignKey('Company',on_delete=models.CASCADE,related_name='jobs')



 
# class Item(models.Model):
#     job = models.ForeignKey(Job, on_delete=models.CASCADE, related_name='items')
#     company = models.ForeignKey(Company, on_delete=models.CASCADE, related_name='items')
#     job_title = models.CharField(max_length=200)
#     salary_range = models.CharField(max_length=50)
#     tags = ArrayField(models.CharField(max_length=50), blank=True, null=True)
#     date_posted = models.DateTimeField(auto_now=True)



# class Elastic(models.Model):
#     title=models.CharField(max_length=200)
#     content=models.TextField()
    

class image(models.Model):    
    images = models.ImageField(upload_to='images', blank =True)

class JobApplication(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    job = models.ForeignKey(Job, on_delete=models.CASCADE)
    # resume = models.FileField(upload_to='resumes/')
    resume = models.FileField(upload_to='resumes/', default='default_resume.pdf')
    applied_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user.username} - {self.job.title}"


class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE,default=None, null=True)
    email = models.EmailField()
    name = models.CharField(max_length=255, default='')
    location = models.CharField(max_length=255, default='')
    # profile_picture = models.ImageField(upload_to='profile_pictures')
    profile_picture = models.ImageField(upload_to='profile_pictures', default='default-profile.jpg')
    instagram_link = models.URLField(blank=True, null=True)
    facebook_link = models.URLField(blank=True, null=True)
    telegram_link = models.URLField(blank=True, null=True)
    github_link = models.URLField(blank=True, null=True)
    bio = models.TextField(blank=True)
    skills = models.TextField(blank=True)
    preferred_annual_pay = models.DecimalField(max_digits=10, decimal_places=2, blank=True, null=True)
    # resume = models.FileField(upload_to='resumes', null=True, blank=True)
    resume = models.FileField(upload_to='resumes/', default='default_resume.pdf')
    education = models.TextField(default='')
   


    REQUIRED_FIELDS = ['email', 'name', 'location']

    def __str__(self):
        return self.username




