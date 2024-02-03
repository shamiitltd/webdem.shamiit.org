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


############# Webscrapping Without library By @talib ##################
import requests

def fetchdata(path,url):
    # Get request of Url
    r=requests.get(url)
    with open(path,"w")as f:
        f.write(r.text)
        
def fetchtag(path):
    #  Open the HTML file
    with open(path, 'r') as file:
        html_content = file.read()
    #  Find the starting and ending positions of each <p> tag
    start_tag ='<p>'
    end_tag ='</p>'
    start_positions = [pos + len(start_tag) for pos in range(len(html_content)) if html_content.startswith(start_tag, pos)]
    end_positions = [pos for pos in range(len(html_content)) if html_content.startswith(end_tag, pos)]
    # Step 3: Extract text content between <p> tags
    paragraphs = []
    for start_pos, end_pos in zip(start_positions, end_positions):
        paragraph_text = html_content[start_pos:end_pos].strip()
        paragraphs.append(paragraph_text)
    # Step 4: Print the scraped text
    for i, paragraph in enumerate(paragraphs):
        print(f"Paragraph {i + 1}: {paragraph}")
        print("Starting positions:", start_positions)
        print("Ending positions:", end_positions)

# sample usage
file ="sample.html"
url="https://shamiit.com/"
fetchdata(file,url)  
fetchtag(file)