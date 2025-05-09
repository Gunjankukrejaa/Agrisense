import requests

city = "Pune"
api_key = "1d28a84f6820dceb689afbca522a42b0"  # Demo key
url = f"https://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}"

response = requests.get(url)
print(response.status_code)
print(response.json())
