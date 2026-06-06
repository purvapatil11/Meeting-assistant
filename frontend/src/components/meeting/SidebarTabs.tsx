// Participants | chat |  transcript

import { useState } from "react";
import ParticipantSidebar from "./ParticipantSidebar";
import ChatPanel from "./ChatPanel";
import TranscriptPanel from "./TranscriptPanel";

export default function SidebarTabs() {
    const [ activeTab, setActiveTab ] = useState("participants");

    return(
        <div className="w-80 border-1 felx felx-col h-full">

            {/* Tab options */}
            <div className="flex border-b">
                <button 
                className="flex-1 p-2"
                onClick={() => setActiveTab("participants")}
                >Participants</button>
            </div>
            <div className="flex border-b">
                <button 
                className="flex-1 p-2"
                onClick={() => setActiveTab("chat")}
                >Chat</button>
            </div>
            <div className="flex border-b">
                <button 
                className="flex-1 p-2"
                onClick={() => setActiveTab("transcript")}
                >Transcript</button>
            </div>

            <div className="flex-1 overflow-hidden">
                {activeTab === "participants" && (
                    <ParticipantSidebar />
                )}
                {activeTab === "chat" && (
                    <ChatPanel/>
                )}
                {activeTab === "transcript" && (
                    <TranscriptPanel />
                )}
            </div>
        </div>
    )
}