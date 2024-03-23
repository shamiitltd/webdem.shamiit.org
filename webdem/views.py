from django.shortcuts import render
import requests
from bs4 import BeautifulSoup

## ------------------- maintain the login session by Shashikant202401558@ --------------------- ##

from django.shortcuts import render, redirect
from django.contrib import messages
import requests
import json
from bs4 import BeautifulSoup
from . import credentials

# Reuse the same session throughout the login process
session = requests.Session()

def login(request):
    if request.method == 'POST':
        # Get the form data
        username = request.POST.get('username')
        password = request.POST.get('password')

        # Perform login
        login_success = perform_login(username, password)

        if login_success:
            messages.success(request, 'Login successful!')

            # Fetch user data after successful login
            user_data = fetch_user_data()

            if user_data:
                # Set session variable to indicate user is logged in
                request.session['isLoggedIn'] = True
                request.session['user_data'] = user_data
                
                # Render dashboard with fetched data
                return render(request, 'login_session.html', user_data)
            else:
                messages.error(request, 'Failed to fetch user data.')
    
        else:
            messages.error(request, 'Login failed. Please try again.')

    elif request.session.get('isLoggedIn'):
        # If user is already logged in and session is active
        user_data = request.session.get('user_data')
        return render(request, 'login_session.html', user_data)

    return render(request, 'login_session.html')
    
def perform_login(username, password):
    # Update the login payload with the form data
    credentials.login_payload['user'] = username
    credentials.login_payload['password'] = password

    # Perform the login request
    login_url = 'https://interns.shamiit.org/login'
    response = session.get(login_url)

    # Check if the GET request was successful (status code 200)
    if response.status_code == 200:
        # Parse the HTML content of the page using BeautifulSoup
        soup = BeautifulSoup(response.text, 'html.parser')
        
        # Find the 'head' tag
        head_tag = soup.find('head')

        # Check if the 'data-requesttoken' attribute is present in the 'head' tag
        if head_tag and 'data-requesttoken' in head_tag.attrs:
            # Extract the request token
            requesttoken = head_tag['data-requesttoken']

            # Update the request token in the login payload
            credentials.login_payload['requesttoken'] = requesttoken
            credentials.headers['Cookie'] = '; '.join([f'{name}={value}' for name, value in session.cookies.items()])

            # Perform the login request
            login_response = session.post(login_url, data=credentials.login_payload, headers=credentials.headers)

            # Return True if login was successful (status code 200), otherwise False
            return login_response.status_code == 200

    return False

def fetch_user_data():
    """
    Fetch user data after successful login.
    """
    dashboard_url = "https://interns.shamiit.org/apps/dashboard/"
    dashboard_response = session.get(dashboard_url, headers=credentials.dashboard_headers)

    if dashboard_response.status_code == 200:
        soup = BeautifulSoup(dashboard_response.text, 'html.parser')
        head_tag = soup.find('head')

        if head_tag and 'data-requesttoken' in head_tag.attrs:
            requesttoken = head_tag['data-requesttoken']
            credentials.contacts_headers['Requesttoken'] = requesttoken
            credentials.user_headers['Requesttoken'] = requesttoken
            credentials.contacts_headers['Cookie'] = '; '.join([f'{name}={value}' for name, value in session.cookies.items()])
            credentials.user_headers['Cookie'] = '; '.join([f'{name}={value}' for name, value in session.cookies.items()])

            user_url = "https://interns.shamiit.org/ocs/v2.php/apps/user_status/api/v1/user_status"
            user_response = session.get(user_url, headers=credentials.user_headers)

            if user_response.status_code == 200:
                user_jsondata = user_response.text
                user_data = json.loads(user_jsondata)
                user_id = user_data["ocs"]["data"]["userId"]

                # Fetching Contacts
                contacts_url = "https://interns.shamiit.org/contactsmenu/contacts"     
                contacts_response = session.post(contacts_url, data=credentials.contacts_payload, headers=credentials.contacts_headers)

                if contacts_response.status_code == 200:
                    json_data = contacts_response.text
                    data = json.loads(json_data)
                    contacts_info = []
                    for contact in data["contacts"]:
                        contact_id = contact["id"]
                        full_name = contact["fullName"]
                        avatar = contact["avatar"]
                        email_addresses = contact["emailAddresses"][0]
                        profile_url = contact["profileUrl"]
                        status = contact.get("status", "offline")
                        status_message = contact.get("statusMessage", "")

                        contacts_info.append({
                            "id": contact_id,
                            "full_name": full_name,
                            "avatar": avatar,
                            "email_addresses": email_addresses,
                            "profile_url": profile_url,
                            "status": status,
                            "status_message": status_message
                        })
                    portaltitle = "Welcome to Shami Innovation and Technologies Interns Portal"
                    return {'user_id': user_id, 'contacts_info': contacts_info, 'portaltitle': portaltitle}
    return None

def logout(request):
    # Clear session data related to the user upon logout
    request.session.flush()
    # Redirect to login page after logout
    messages.success(request, 'Logout successful!')
    return redirect('login_session')

def login_page(request):
    pass
    return render(request, 'login_session.html')


## ------------------- maintain the login session code end --------------------- ##


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