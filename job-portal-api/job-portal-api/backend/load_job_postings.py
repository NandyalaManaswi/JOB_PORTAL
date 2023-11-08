import os
import django
import csv
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')

# Configure Django
django.setup()

from base.models import Company, Job
import csv
from django.db import transaction

# Open the CSV file and read its data
with open('jobpostingdata.csv', 'r') as file:
    csv_reader = csv.DictReader(file)
    rows = list(csv_reader)  # Convert csv_reader to a list

    with transaction.atomic():
        company_instances = []

        # Iterate over each row in the CSV file
        for row in rows:
            # Extract the data from the row
            job_title = row['job_title']
            company_name = row['company']
            location = row['location']
            salary_range = row['salary_range']
            tags = row['tags'].split(', ')
            date_posted = row['date_posted']
            # Check if the Company with the same name already exists
            existing_company = Company.objects.filter(name=company_name).first()

            if existing_company:
                # Create a new Company instance with a new primary key
                company = Company(name=company_name, location=location)
            else:
                # Create a new Company instance
                company = Company(name=company_name, location=location)

            company_instances.append(company)

        # Bulk create the Company instances
        Company.objects.bulk_create(company_instances)

        job_instances = []

        # Iterate over each row again to create Job instances
        for row, company_instance in zip(rows, company_instances):
            job_title = row['job_title']
            salary_range = row['salary_range']
            tags = row['tags'].split(', ')

            # Create a new Job instance
            job = Job(title=job_title, company=company_instance, salary_range=salary_range, tags=tags)
            job_instances.append(job)

        # Bulk create the Job instances
        Job.objects.bulk_create(job_instances)

    print("Data import completed successfully.")

        # # Insert the data into the database using Django ORM
        #     Item.objects.create(
        #     job=job,
        #     company=company,
        #     job_title=job_title,
        #     salary_range=salary_range,
        #     tags=tags,
        #     date_posted=date_posted
        # )
          

# # Configure Django
# django.setup()

# from base.models import Item
# import csv

# # Open the CSV file and read its data
# with open('jobpostingdata.csv', 'r') as file:
#     csv_reader = csv.DictReader(file)

#     # Iterate over each row in the CSV file
#     for row in csv_reader:
#         # Extract the data from the row
#         job_title = row['job_title']
#         company = row['company']
#         location = row['location']
#         salary_range = row['salary_range']
#         tags = row['tags']
#         date_posted = row['date_posted']


#         # Insert the data into the database using Django ORM
#     Item.objects.create(
#             job_title=job_title,
#             company=company,
#             location=location,
#             salary_range=salary_range,
#             tags=tags,
#             date_posted=date_posted
#         )


# conn = sqlite3.connect('Sharathdatabase.db')
# cursor = conn.cursor()


# cursor.execute('''CREATE TABLE IF NOT EXISTS sharath table (
#                     id INTEGER PRIMARY KEY,
#                     job_title TEXT,
#                     company TEXT,
#                     location TEXT,
#                     salary_range TEXT,
#                     tags TEXT,
#                     date_posted TEXT
#                 )''')


# with open('jobpostingdata.csv', 'r') as file:
#     csv_reader = csv.DictReader(file)
    
    
#     for row in csv_reader:
#         job_title = row['job_title']
#         company = row['company']
#         location = row['location']
#         salary_range = row['salary_range']
#         tags = row['tags']
#         date_posted = row['date_posted']
        
#         cursor.execute('''INSERT INTO sharath table (
#                             job_title, company, location, salary_range, tags, date_posted
#                         )
#                         VALUES (?, ?, ?, ?, ?, ?)''',
#                        (job_title, company, location, salary_range, tags, date_posted))
    
    
#     conn.commit()


# conn.close()
