"use client";

import { useEffect } from "react";
import { useToast } from "./ui/use-toast";

export function NotificationStreamer() {
  const { toast } = useToast();

  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const eventSource = new EventSource(`${baseUrl}/stream`, {
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
