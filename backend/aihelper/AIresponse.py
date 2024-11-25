from pymongo import MongoClient
from langchain.llms.base import LLM
from langchain import PromptTemplate, LLMChain
import google.generativeai as genai

# Configure the API key for Google Gemini
genai.configure(api_key="google_api_key")

# Define a Custom LangChain Wrapper for Gemini
class GoogleGeminiLLM(LLM):
    model_name: str = "gemini-1.5-flash"

    @property
    def _llm_type(self):
        return "google_gemini"

    def _call(self, prompt, stop=None):
        # Create a model instance and generate content
        model = genai.GenerativeModel(self.model_name)
        response = model.generate_content(prompt)
        return response.text  # Extract the generated text

# Fetch and Clean Data from MongoDB
def fetch_and_clean_data():
    """Fetch the most recent user document from MongoDB and clean it."""
    # MongoDB URI
    MONGO_URI = "mongo_url"

    # Connect to the MongoDB client
    client = MongoClient(MONGO_URI)

    # Access the 'test' database
    db = client['test']
    collection_name = 'users'  # Replace with the correct collection
    collection = db[collection_name]

    # Fetch the most recent document
    most_recent_document = collection.find_one(sort=[('_id', -1)])
    
    if not most_recent_document:
        return "No recent user data found."

    # Clean and format the document into a readable prompt
    name = most_recent_document.get("name", "Unknown")
    age = most_recent_document.get("age", "N/A")
    weight = most_recent_document.get("weight", "N/A")
    height = most_recent_document.get("height", "N/A")
    exercise_hours = most_recent_document.get("exercise_hours", "N/A")
    activity_level = most_recent_document.get("Activity_level", "N/A")
    restrictions = most_recent_document.get("restrictions", "None")
    conditions = most_recent_document.get("conditions", "None")
    health_goals = most_recent_document.get("healthGoals", "N/A")

    metrics = most_recent_document.get("metrics", [])
    latest_metric = metrics[-1] if metrics else {}

    sleep_hours = latest_metric.get("sleepHours", "N/A")
    calorie_intake = latest_metric.get("calorieIntake", "N/A")
    steps = latest_metric.get("steps", "N/A")
    water_intake = latest_metric.get("waterIntake", "N/A")

    # Format the cleaned data as a prompt
    user_prompt = f"""
    User Profile:
    - Name: {name}
    - Age: {age}
    - Weight: {weight} kg
    - Height: {height} cm
    - Exercise Hours/Week: {exercise_hours}
    - Activity Level: {activity_level}
    - Dietary Restrictions: {restrictions}
    - Health Conditions: {conditions}
    - Health Goals: {health_goals}

    Recent Metrics:
    - Sleep Hours: {sleep_hours}
    - Calorie Intake: {calorie_intake}
    - Steps: {steps}
    - Water Intake: {water_intake} liters
    """
    return user_prompt.strip()

# Generate a Response Using LangChain and Gemini
def generate_response_with_gemini():
    # MongoDB URI for storing AI output
    MONGO_URI = "mongodb+srv://andrewbchacon:5w3CHfAgaAAHN6FV@cluster0.ba6vo.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
    client = MongoClient(MONGO_URI)
    db = client['test']  # Access the database
    ai_output_collection = db['ai_outputs']  # Separate collection for AI responses

    # Initialize the custom LLM with Google Gemini
    gemini_llm = GoogleGeminiLLM()

    # Define the Prompt Template
    prompt = PromptTemplate(
        input_variables=["user_data"],
        template=""" 
        Based on the following user profile and metrics:
        {user_data}

        Provide a tailored weekly healthly meal plan recommendation. Then after doing so, create a completley separate and realistic 24 hour challenge. 
        output structure:
        -'Meal plan': ai meal plan all in one value to a key
        -'Challenge': ai given challenge all in one value to a key
        
        exclude:
            -any unnecessary information that does not provide specific information related to the output
            -do not include '''json or even ''' in beginning or end of response
        """
    )

    # Create the LLMChain
    chain = LLMChain(llm=gemini_llm, prompt=prompt)

    # Fetch user data from MongoDB
    user_data = fetch_and_clean_data()

    if "No recent user data found" in user_data:
        print(user_data)
        return

    # Generate a response using the user data
    response = chain.run({"user_data": user_data})

    # Store the AI response in a separate MongoDB collection
    try:
        result = ai_output_collection.insert_one({"ai_response": response})
        print(f"AI response stored in MongoDB with ID: {result.inserted_id}")
    except Exception as e:
        print(f"Error storing AI response: {e}")

# Execute the Code
generate_response_with_gemini()
