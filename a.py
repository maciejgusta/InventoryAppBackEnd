import requests

# URL to which the POST request will be sent
url = "http://retro-ciecie.pl:3000/api/getbybarcode"

# Data you want to send in the POST request (as a dictionary)
data = {
    "barcode": "123456789",
}

# Send the POST request
response = requests.post(url, data=data)

# Check the response
print("Status Code:", response.status_code)
print("Response Text:", response.text)
