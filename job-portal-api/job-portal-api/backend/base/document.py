from django_elasticsearch_dsl import Document, fields, Index,Integer
from django_elasticsearch_dsl.registries import registry
from .models import Job, Company


        
@registry.register_document
class JobDocument(Document):
    
    company = fields.ObjectField(properties={
        'name': fields.TextField(),
        'location': fields.TextField(),
    })
    tags = fields.TextField(multi=True)
   

    class Index:
        name = 'job_posts'
        settings = {
            'number_of_shards': 1,
            'number_of_replicas': 1
        }
    mappings = {
    'properties': {
        'title': fields.TextField(),
        'salary_range': fields.IntegerField(),
        'location': fields.TextField(),
        'company': fields.ObjectField(properties={
            'name': fields.TextField(),
            'location': fields.TextField(),
        }),
        'tags': fields.TextField(multi=True),
        # Add more fields as needed
    }
}









    class Django:
        model = Job
        fields = [
            'title',
            'salary_range',
        ]

        related_models = [Company]

    def get_instances_from_related(self, related_instance):
        if isinstance(related_instance, Company):
            return related_instance.jobs.all()
        return []

    def prepare_company(self, instance):
        return {
            'name': instance.company.name,
            'location': instance.company.location,
        }
