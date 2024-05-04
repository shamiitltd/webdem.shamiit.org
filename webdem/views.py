from django.shortcuts import render
import requests
from bs4 import BeautifulSoup
from .forms import UploadFileForm
from .models import ImportedData
import pandas as pd
from django.http import HttpResponseBadRequest , HttpResponse
import os
import requests
from openpyxl import Workbook
# Create your views here.


def uploadfile(request):
    if request.method == 'POST':
        form = UploadFileForm(request.POST, request.FILES)
        if form.is_valid():
            file = request.FILES['file']
            
            # File Size Validation
            if file.size == 10 * 1024 or file.size > 15 * 1024 * 1024:
                return HttpResponseBadRequest('File size must be between 10KB and 15MB')

            # File Type Validation
            file_name, file_extension = os.path.splitext(file.name)
            if file_extension.lower() != '.xlsx':
                if file_extension.lower() == '.pdf':
                    return HttpResponseBadRequest('Invalid file type. PDF files are not allowed.')
                else:
                    return HttpResponseBadRequest('Invalid file type. Only Excel files (.xlsx) are allowed.')

            # Virus/Malware Scan (Optional)
            api_key = 'f535ac6ad3b81a18336e016f8aa836c9e5799ec5a2979a1b6983c5793af6350c'
            url = 'https://www.virustotal.com/vtapi/v2/file/scan'
            params = {'apikey': api_key}
            files = {'file': (file.name, file.read())}
            try:
                response = requests.post(url, files=files, params=params)
                result = response.json()
                response_code = result.get('response_code')
                if response_code == 1:
                    positives = result.get('positives', 0)
                    if positives > 0:
                        return HttpResponseBadRequest('The file may contain malware. Proceed with caution.')
                elif response_code == -2:
                    return HttpResponseBadRequest('The file has not been scanned by VirusTotal yet. Try again later.')
                else:
                    return HttpResponseBadRequest('An error occurred while scanning the file.')

            except requests.exceptions.RequestException as e:
                return HttpResponseBadRequest(f'VirusTotal API error: {e}')
            
            # Read Excel file and process data
            try:
                df = pd.read_excel(file)
                headers = df.columns.tolist()
                data = df.values.tolist()

                # Save data to database
                ImportedData.objects.all().delete()  # Clear existing data
                for row in data:
                    ImportedData.objects.create(
                        name=row[0],
                        email=row[1],
                        position=row[2],
                        mobile=row[3]
                    )

                # Retrieve data from the database
                imported_data = ImportedData.objects.all()

                return render(request, 'imported_table.html', {'headers': headers, 'data': imported_data})

            except Exception as e:
                return HttpResponseBadRequest(f'Error processing file: {e}')

    else:
        form = UploadFileForm()
    return render(request, 'upload.html', {'form': form})


# Export data in excel sheet
def showhtmltable(request):
    pass
    return render(request, 'layer3_UI.html')

def exportdatatoexcel(request):
    # Get the HTML content from your template file
    with open('templates/layer3_UI.html', 'r') as file:
        html_content = file.read()

    # Parse the HTML content using BeautifulSoup
    soup = BeautifulSoup(html_content, 'html.parser')

    # Find the table element
    table = soup.find('table')

    # Extract data from the table
    data = []
    for row in table.find_all('tr'):
        row_data = []
        for cell in row.find_all(['th', 'td']):
            row_data.append(cell.get_text().strip())
        data.append(row_data)

    # Create a new workbook
    wb = Workbook()
    ws = wb.active

    # Populate the Excel sheet with the extracted data
    for row in data:
        ws.append(row)

    # Prepare the response
    response = HttpResponse(content_type='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet')
    response['Content-Disposition'] = 'attachment; filename=my_data.xlsx'

    # Save the workbook to the response
    wb.save(response)

    return response


# def index(request):
#     return render(request, 'index.html')



############    Web_Scraping with Library By @cmohan312002    ##########
def extractdatafromshamiinnovation(url):
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
extractdatafromshamiinnovation(shami_innovation_url)