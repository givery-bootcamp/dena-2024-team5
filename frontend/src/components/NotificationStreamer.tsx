"use client";

import { useEffect } from "react";
import { toast } from "sonner";

export function NotificationStreamer() {
  useEffect(() => {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
    const eventSource = new EventSource(`${baseUrl}/stream`, {
      withCredentials: true,
    });

    eventSource.onmessage = (event) => {
      setTimeout(() => {
        toast.info(event.data);
      }, 1000);
    };

    eventSource.onerror = () => {
      console.error("EventSource failed.");
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  return <></>;
}
