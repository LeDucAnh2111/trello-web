import { useEffect } from "react";
import socket from "@/Service/socket";

function Home() {
  useEffect(() => {
    socket.on("connect", () => {
      console.log("Connected to server");
    });

    socket.emit("test", { test: "test" });
  }, []);
  return <h1>Home</h1>;
}

export default Home;
