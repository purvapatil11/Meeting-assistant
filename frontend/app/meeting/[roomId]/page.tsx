import MeetingHeader from "@/src/components/meeting/MeetingHeader";
import VideoGrid from "@/src/components/meeting/VideoGrid";
import ControlsBar from "@/src/components/meeting/ControlsBar";

export default function MeetingPage() {
    return (
        <div className="flex flex-col h-screen">
            <MeetingHeader />
            <VideoGrid />
            <ControlsBar />
        </div>
    )
}