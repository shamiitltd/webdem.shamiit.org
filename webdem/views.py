from django.shortcuts import render
import requests
from bs4 import BeautifulSoup
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import *
from .serializers import *

# Create your views here.
def index(request):
    return render(request, 'index.html')



############    Web_Scraping with Library By @cmohan312002    ##########
def extract_data_from_shami_innovation(url):
    try:
        # Set a user agent to mimic a web browser
        headers = {'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'}

        # Send a GET request to the specified URL with headers
        response = requests.get(url, headers=headers)

        # Check if the request was successful  (status code 200)
        if response.status_code == 200:
            # Parse the HTML content using BeautifulSoup
            soup = BeautifulSoup(response.text, 'html.parser')

            # Find all paragraphs (P tags) in the HTML content
            paragraphs = soup.find('h3',class_='heading')

            # Extract and print the text content of each paragraph
            for paragraph in paragraphs:
                print(paragraph.get_text())

        else:
            print(f"Error: Unable to fetch data. Status code: {response.status_code}")

    except Exception as e:
        print(f"An error occurred: {str(e)}")

# Example usage:
shami_innovation_url = "https://shamiit.com/"
extract_data_from_shami_innovation(shami_innovation_url)


# Post Api

class studentapi(APIView):
    serializer_class=studentSerializer
    def get(self,request):
        allstudent=student.objects.all().values()
        return Response({"Message":"List of student", "student List":allstudent})

    def post(self,request):
        print('Request data is : ',request.data)
        serializer_obj=studentSerializer(data=request.data)
        if(serializer_obj.is_valid()):

         student.objects.create(student_id=serializer_obj.data.get("student_id"),
                            student_name=serializer_obj.data.get("student_name"),
                            created_at=serializer_obj.data.get("created_at"),
                            # updated_at=serializer_obj.data.get("updated_at"),
                            # deleted_at=serializer_obj.data.get("deleted_at"),
                            )

        student1=student.objects.all().filter(student_id=request.data["student_id"]).values()
        return Response({"Message":"New student Added!", "student":student1})
    def delete(self,request):
        print('Request data is : ',request.data)
        serializer_obj=studentSerializer(data=request.data)
        if(serializer_obj.is_valid()):

         student.objects.delete(student_id=serializer_obj.data.get("student_id"),
                            student_name=serializer_obj.data.get("student_name"),
                            created_at=serializer_obj.data.get("created_at"),
                            # updated_at=serializer_obj.data.get("updated_at"),
                            # deleted_at=serializer_obj.data.get("deleted_at"),
                            )

        student1=student.objects.all().filter(student_id=request.data["student_id"]).values()
        return Response({"Message":"New student Added!", "student":student1})    



    

    # views.py
