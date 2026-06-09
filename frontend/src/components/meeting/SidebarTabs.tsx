"use client";

import { useLayoutStore } from "./layoutStore";
import ParticipantSidebar from "./ParticipantSidebar";
import ChatPanel from "./ChatPanel";
import TranscriptPanel from "./TranscriptPanel";
import { Users, MessageSquare, ClipboardList } from "lucide-react";

export default function SidebarTabs() {
  const { activeTab, setActiveTab } = useLayoutStore();

  const tabs = [
    { id: "participants", name: "People", icon: Users },
    { id: "chat", name: "Chat", icon: MessageSquare },
    { id: "transcript", name: "Transcript", icon: ClipboardList },
  ];

  return (
    <div className="flex flex-col h-full overflow-hidden">
      {/* Sliding Pill Tab bar */}
      <div className="p-4 border-b border-white/[0.06] bg-black/10">
        <div className="flex p-1 bg-white/[0.03] border border-white/[0.08] rounded-xl">
          {tabs.map((tab) => {
            const Icon = tab.icon;
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex-1 py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-all cursor-pointer ${
                  isActive
                    ? "bg-white/[0.08] text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <Icon className="w-3.5 h-3.5" />
                <span>{tab.name}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Tab Panels */}
      <div className="flex-1 overflow-hidden relative flex flex-col bg-[#030303]/30">
        {activeTab === "participants" && <ParticipantSidebar />}
        {activeTab === "chat" && <ChatPanel />}
        {activeTab === "transcript" && <TranscriptPanel />}
      </div>
    </div>
  );
}