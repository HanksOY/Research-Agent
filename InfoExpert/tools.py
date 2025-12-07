import logging
from livekit.agents import function_tool, RunContext
from tavily import TavilyClient
import os

from dotenv import load_dotenv

load_dotenv()

tavily_client = TavilyClient(api_key=os.getenv("TAVILY_API_KEY"))

@function_tool()
async def get_analysis(paper_name: str) -> str:
    """Get analysis from latest research papers for agent for medicine and healthcare."""

    response = tavily_client.search(
        query=f"{paper_name} the latest research papers in the field of AI agents for medicine, biology and healthcare",
        search_depth="advanced",
        topic="general",
        max_results=2,
        include_answer=True,
        time_range="day",
        include_domains=["arxiv.org", "pubmed.ncbi.nlm.nih.gov", "medrxiv.org", "biorxiv.org"],
    )

    papers_info = []
    for r in response.get("results", []):
        title = r.get("title", "Unknown title")
        date = r.get("published_date", "Unknown date")
        papers_info.append(f"Title: {title}\nPublication date: {date}")

    if not papers_info:
        return response.get("answer", "I couldn't find recent papers for that topic today.")

    return (
        response.get("answer", "")
        + "\n\nHere are the papers I found today:\n\n"
        + "\n\n---\n\n".join(papers_info)
    )