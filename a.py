import requests

# URL to which the POST request will be sent
url = "https://retro-ciecie.pl/api/delete"

# Data you want to send in the POST request (as a dictionary)
data = {
    'id_product': '27'
}

# Send the POST request with JSON data
response = requests.post(url, json=data)

# Check the response
print("Status Code:", response.status_code)

# Convert the response to a dictionary, if the content is JSON
try:
    response_data = response.json()  # This returns a dictionary if JSON is returned
    print("Response JSON:", response_data)
except ValueError:
    # If the response isn't JSON, print the raw text
    print("Response Text:", response.text)
