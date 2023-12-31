# Generated by Django 4.2.2 on 2023-07-05 03:00

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0007_userprofile_profile_picture'),
    ]

    operations = [
        migrations.AddField(
            model_name='userprofile',
            name='facebook_link',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='github_link',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='instagram_link',
            field=models.URLField(blank=True, null=True),
        ),
        migrations.AddField(
            model_name='userprofile',
            name='telegram_link',
            field=models.URLField(blank=True, null=True),
        ),
    ]
