'use client'

import { useToast } from "./ui/use-toast";
import { useEffect } from "react";

export function NotificationStreamer() {
  const {toast} = useToast();


  useEffect(() => {
    const eventSource = new EventSource(`http://localhost:9000/stream`, { withCredentials: true });
    
    eventSource.onmessage = function(event) {
      console.log({event})
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
