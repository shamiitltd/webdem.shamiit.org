from django.shortcuts import render
import requests
from bs4 import BeautifulSoup

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
# hiii
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