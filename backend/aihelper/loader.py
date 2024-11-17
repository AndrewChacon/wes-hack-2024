import requests

# Replace with the actual Gemini API key and endpoint
API_KEY = "AIzaSyBJGsfUX7v354Qmh78zzerYFxM13gaaRIQ"
ENDPOINT_URL = "https://geminiapi.example.com/v1/completions"

# Define the prompt
prompt = "What is the capital of France?"

# Set up the API request payload
payload = {
    "prompt": prompt,
    "temperature": 0.7,
    "max_tokens": 1000,
}

# Set up the headers for authentication
headers = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

# Make the API request and print the response
try:
    print(f"Sending prompt: {prompt}")
    response = requests.post(ENDPOINT_URL, json=payload, headers=headers)
    response.raise_for_status()
    # Parse and print the response
    result = response.json().get("output", "No output received from API.")
    print(f"Gemini API Response: {result}")
except requests.exceptions.RequestException as e:
    print(f"Error connecting to Gemini API: {e}")
