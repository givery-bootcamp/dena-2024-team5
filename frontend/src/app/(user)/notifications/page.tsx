"use client"
import { useEffect, useState } from "react";

export default function Home(){
    const [messages, setMessages] = useState<string[]>([]);
    console.log({messages})
    
    useEffect(() => {
      const eventSource = new EventSource('http://localhost:9000/stream');
      
      eventSource.onmessage = function(event) {
        setMessages(prevMessages => [...prevMessages, event.data]);
      };
  
      eventSource.onerror = function() {
        console.error('EventSource failed.');
        eventSource.close();
      };
  
      return () => {
        eventSource.close();
      };
    }, []);
    return <div>
        <h3>通知取得ページ</h3>
        <p>{
        messages.map((m,i) => {
            return <span key={i}>{m}<br /></span>
        })}
        </p>
    </div>
}