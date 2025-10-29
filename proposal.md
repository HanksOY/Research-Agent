# Project Proposal: Multidomain information search Agent with Voice + Avatar

## Team

Han Ouyang

## Project Goal

Build a full-stack application that automates end-to-end information search, then explains findings through an interactive web experience with speech input, natural-voice output, and a real-time virtual avatar. it is an agentic research and explanation tool with an analyst dashboard.

## User Stories
A student speaks a topic into the mic, the agent plans a research strategy, searches trusted sources, extracts facts, compares viewpoints, and returns a concise brief with citations the avatar can read aloud. A product manager asks for a competitive scan; the agent triangulates pricing, differentiators, and risks, flags low-confidence claims, and proposes follow-ups. A clinician asks for guideline changes; the agent summarizes updates, calls out evidence strength, and offers caveats. An admin reviews logs, adjusts source whitelists, and tunes risk thresholds. A researcher requests open calls for NGO or industry funding; the agent profiles eligibility, deadlines, budgets, and fit rationales, drafts a checklist, and surfaces exemplar proposals. A student provides a professor’s paper; the agent analyzes methods and contributions, produces a brief, verifies claims against cited sources, and highlights open questions for seminar discussion.

## UI Design

The home view centers a chat pane with microphone control, streaming transcripts, and a talking avatar that lip-syncs synthesized speech. A right panel shows live “Research Trace” steps, sources, anextracted snippets and timestamps. A results view compiles the final brief with inline citations, quick “why this claim?” tooltips, and one-click export. An admin console exposes data lineage, rate-limit status, API keys, role permissions, and source curation. Wireframes will be produced in Figma; the avatar runs in a canvas element with WebRTC for low-latency audio.

## Project Requirements

The app is full-stack.inate agent loops, call LLMs, run retrieval over a vector index, and schedule tool use for web search, PDF parsing, and tabular extraction. A REST API exposes session creation, task submission, trace retrieval, and export; a WebSocket channel streams tokens, intermediate tool results, and TTS audio chunks for low latency. STT provides streaming recognition for real-time transcripts; TTS streams synthesized speech aligned to visemes for the avatar; the avatar renders in WebGL and syncs via WebRTC. The front end is a React app with a lightweight state store, streaming UX, and accessibility features including keyboard control, captions, and transcript download. User views include chat, results, and history; admin views include source curation, model and tool configuration, usage metrics, and moderation queues. Technologies are selected for reliability and learning value: React on the client, FastAPI on the server, PostgreSQL plus a vector DB for retrieval, a modern LLM for planning and analysis, a smaller model for critique and safety, and standard speech and avatar SDKs for voice and presence.

Optional capabilities: data such as user profiles, interaction logs, research artifacts, citation graphs, and embeddings can be stored in PostgreSQL and a vector store, with documents and snapshots persisted in object storage for reproducibility. Authentication can use OAuth with role-based access for users and admins, with security features such as rate limiting, audit logs, signed webhooks, and content-source whitelists. The agent can expose a JSON REST interface and, if partner needs arise, a minimal GraphQL read layer for querying traces and citations.# Implementation Plan: RealPage Natural Language Interface


