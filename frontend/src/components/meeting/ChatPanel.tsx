"use client"
import { useState } from "react"

export default function ChatPanel(){
    const [message, setMessage] = useState("")

    return (
        <div>
            <h3>Chat</h3>
            <div>
                Messages will appear here
            </div>
            <input 
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder="Type a message......"/>

            <button>Send</button>
        </div>
    )
}