'use client'

import { useToast } from "./ui/use-toast";
import { useEffect, useState } from "react";

export function NotificationStreamer() {
  const {toast} = useToast();
  const [message, setMessage] = useState<string[]>([]);
  console.log({message})


  useEffect(() => {
    const eventSource = new EventSource('http://localhost:9000/stream');
    
    eventSource.onmessage = function(event) {
      setMessage((prev) => [...prev, event.data])
      toast({description: event.data})
    };

    eventSource.onerror = function() {
      console.error('EventSource failed.');
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <></>
}
