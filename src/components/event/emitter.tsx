import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { invoke } from "@tauri-apps/api/core";
import { error, info } from "@tauri-apps/plugin-log";
import { useEffect, useState } from "react";
import { listen } from "@tauri-apps/api/event";

function Emitter() {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const [progress, setProgress] = useState<any>(0);
  const [status, setStatus] = useState("");
  useEffect(() => {
    // Đăng ký listener "download-started"
    const unlistenStarted = listen("download-started", (event) => {
      info("Download started");
      setStatus(`Download started for ${event.payload}`);
      setProgress(0);
    });

    // Đăng ký listener "download-progress"
    const unlistenProgress = listen("download-progress", (event) => {
      console.log("Check event listen progress: ", event);
      setTimeout(() => {
        setProgress(event.payload);
      }, 3000);
    });

    // Đăng ký listener "download-finished"
    const unlistenFinished = listen("download-finished", (event) => {
      setStatus(`Download finished for ${event.payload}`);
      // setProgress(100);
    });

    // Cleanup listeners khi component bị gỡ bỏ
    return () => {
      unlistenStarted.then((fn) => fn());
      unlistenProgress.then((fn) => fn());
      unlistenFinished.then((fn) => fn());
    };
  }, []);

  return (
    <div>
      <Button
        onClick={() => invoke("download", { url: "your-url" })}
        className="mt-10"
      >
        Start Download
      </Button>
      <p>Status: {status}</p>
      <p>Progress: {progress}%</p>
    </div>
  );
}

export default Emitter;
