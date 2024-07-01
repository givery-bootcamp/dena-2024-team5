import { NotificationStreamer } from "@/components/NotificationStreamer";
import { ClientAudio } from "@/components/clientAudio";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <NotificationStreamer />
      <div className="w-full">
        <main className="flex min-h-screen map-tile">
          <div className="flex-1 relative">{children}</div>
        </main>
      </div>
      <ClientAudio src="/audio/maou_bgm_orchestra20.mp3" />
    </>
  );
}
