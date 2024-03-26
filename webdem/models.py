from django.db import models

# Create your models here.
# from django.db import models

class ImportedData(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField()
    position = models.CharField(max_length=100)
    mobile = models.CharField(max_length=100)
    action = models.CharField(max_length=100)

    def __str__(self):
        return self.name
