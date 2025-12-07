from dotenv import load_dotenv
import os

from livekit import agents, rtc
from livekit.agents import AgentServer, AgentSession, Agent, room_io, RoomInputOptions, RoomOutputOptions
from livekit.plugins import (
    google,
    noise_cancellation,
    silero,
)
from livekit.plugins.turn_detector.multilingual import MultilingualModel
from tools import get_analysis
from livekit.plugins import tavus


load_dotenv()


class Assistant(Agent):
    def __init__(self) -> None:
        super().__init__(
            instructions="""
            You are Olivia,a helpful voice AI research paper expert who speaks english. Make a tool call when asked about latest research papers, but answer in a human-like, casual response, 
            as the tool call may generate robotic numbers. You can help users research by searching for the latest papers, analysis, data, and news using Tavily's search API. 
            When you make a tool call to get paper data, say 'Ok, let me check the latest research papers for today' before calling the tool. Always speak conversationally and naturally, 
            avoiding robotic or formal language. The answer should include the title of the paper, the publication date, the abstract, and the link to the paper.
            Your responses are concise, to the point, and without any complex formatting or punctuation including emojis, asterisks, or other symbols.""",
            tools=[get_analysis],
        )

server = AgentServer()

@server.rtc_session()
async def my_agent(ctx: agents.JobContext):
    session = AgentSession(
        stt="assemblyai/universal-streaming:en",
        llm="google/gemini-2.5-flash-lite",
        tts="cartesia/sonic-3:9626c31c-bec5-4cca-baa8-f8ba9e84c8bc",
        vad=silero.VAD.load(),
        turn_detection=MultilingualModel(),
    )

    # Optional Tavus avatar: only start if valid IDs are configured
    replica_id = os.getenv("REPLICA_ID")
    persona_id = os.getenv("PERSONA_ID")

    if replica_id and persona_id:
        try:
            avatar = tavus.AvatarSession(
                replica_id=replica_id,
                persona_id=persona_id,
            )
            await avatar.start(session, room=ctx.room)
        except Exception as e:
            ctx.logger.error(f"Failed to start Tavus avatar: {e}")

    await session.start(
        room=ctx.room,
        agent=Assistant(),
        room_options=room_io.RoomOptions(
            audio_input=room_io.AudioInputOptions(
                noise_cancellation=lambda params: noise_cancellation.BVCTelephony() if params.participant.kind == rtc.ParticipantKind.PARTICIPANT_KIND_SIP else noise_cancellation.BVC(),
            ),
        ),
    )

    await session.generate_reply(
        instructions="Greet the user and offer your assistance with research. Ask them what field they want to research (medicine, healthcare, biology, etc.)"
    )


if __name__ == "__main__":
    agents.cli.run_app(server)