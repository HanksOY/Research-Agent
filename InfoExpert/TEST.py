from tavily import TavilyClient
import os
from dotenv import load_dotenv

load_dotenv()

# Step 1. Instantiating your TavilyClient
tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

# Step 2. Defining the list of URLs to extract content from
urls = [
    "https://en.wikipedia.org/wiki/Artificial_intelligence",
    "https://en.wikipedia.org/wiki/Machine_learning",
    "https://en.wikipedia.org/wiki/Data_science",
]

# Step 3. Executing the extract request
response = tavily_client.extract(urls=urls, include_images=True)

# Step 4. Printing the extracted raw content
print(response["answer"]["content"])