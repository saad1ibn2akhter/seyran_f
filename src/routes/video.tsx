// first try this in CL
// npm install @100mslive/react-sdk
// if it fails then do this 
// npm install @100mslive/react-sdk --legacy-peer-deps

// Ask AI to maybe convert direct npm commands into deno (cuz i've never used deno :( )

import {
  HMSRoomProvider,
  useHMSActions,
  useHMSStore,
  selectIsConnectedToRoom,
} from "@100mslive/react-sdk";

import { useState } from "react";

// you just need to get a token-endpoint from 100ms's dashboard 
// -> the tiny issue is it asks for card details (it's free , card = real user ,not spam)
// we can get 10000 mins /month with the free tier
// when everything is done just - add routing and try if it works

const TOKEN_ENDPOINT = "xxxxx"; // get it from dashboard
const ROOM_ID = "1001"; // anything 

function JoinScreen() {
  const hmsActions = useHMSActions();
  const [name, setName] = useState("");

  const joinRoom = async () => {
    try {
      const res = await fetch(TOKEN_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: name,
          room_id: ROOM_ID,
          role: "host",
        }),
      });
      const { token } = await res.json();
      await hmsActions.join({ userName: name, authToken: token });
    } catch (err) {
    // dont forget to check the inspect->console for potential issues 
      console.error("Join failed:", err);
      //this function doesn't work if the endpoint is invalid
    }
  };

  return (
    <div className="h-screen flex items-center justify-center bg-gray-950">
      <div className="bg-gray-900 p-8 rounded-2xl shadow-xl w-96 text-white">
        <h1 className="text-2xl font-bold mb-6 text-center">Join Meeting</h1>
        <input
          className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Enter your name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <button
          onClick={joinRoom}
          disabled={!name}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-700 transition p-3 rounded-lg font-semibold"
        >
          Join Room
        </button>
      </div>
    </div>
  );
}

function MeetingRoom() {
  const hmsActions = useHMSActions();
  return (
    <div className="h-screen bg-gray-950 text-white relative flex items-center justify-center">
      <p>You're in the room. Build your own video tiles here using useHMSStore + selectPeers.</p>
      <button
        onClick={() => hmsActions.leave()}
        className="absolute bottom-6 right-6 bg-red-600 hover:bg-red-700 px-5 py-3 rounded-full shadow-lg"
      >
        Leave
      </button>
    </div>
  );
}

function App() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  return isConnected ? <MeetingRoom /> : <JoinScreen />;
}

export default function AppWrapper() {
  return (
    <HMSRoomProvider>
      <App />
    </HMSRoomProvider>
  );
}