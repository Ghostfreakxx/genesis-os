"use client";

const messages = [
  "Busy during daylight. Operational at night.",
  "System stability questionable.",
  "NPCs welcome too.",
  "Mentally exhausted but operational.",
  "Current objective: survive modern life.",
  "Low activity detected during daylight hours.",
];

export default function GenesisStatus() {

  const onlineUsers =
    Math.floor(Math.random() * 9000) + 1000;

  const randomMessage =
    messages[Math.floor(Math.random() * messages.length)];

  return (
    <div className="mt-5 border border-cyan-500 rounded-2xl p-5 bg-black">

      <h2 className="text-2xl font-bold text-cyan-300">
        GENESIS STATUS
      </h2>

      <p className="text-zinc-400 mt-3 leading-7">
        {randomMessage}
      </p>

      <div className="mt-5 border border-green-500 rounded-xl p-4 bg-[#050505]">

        <p className="text-green-400 font-mono animate-pulse">
          EXHAUSTED USERS CONNECTED: {onlineUsers}
        </p>

      </div>

    </div>
  );
}