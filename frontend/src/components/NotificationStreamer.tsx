"use client";

import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

export function NotificationStreamer() {
  const { toast } = useToast();


  useEffect(() => {
    const eventSource = new EventSource("http://localhost:9000/stream", {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      toast({ description: event.data });
    };

    eventSource.onerror = () => {
      console.error("EventSource failed.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, [toast]);

  return <></>;
}
