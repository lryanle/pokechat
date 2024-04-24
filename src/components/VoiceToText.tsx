"use client"

import React, { useEffect } from "react";
import { useVoiceToText } from "react-speakup";
import { Button } from "@/components/ui/button";
import { Sparkles } from "lucide-react";

export const VoiceToText = ({text, setText}: any) => {
  const { startListening, stopListening, transcript } = useVoiceToText({continuous: false});
  const [prevTranscript, setPrevTranscript] = React.useState("");

  useEffect(() => {
    // remove the difference difference between the previous and current transcript
    const newTranscript = transcript.replace(prevTranscript, "");
    console.log(newTranscript, "|", prevTranscript)
    setText(newTranscript);
    setPrevTranscript(transcript);
  }, [transcript]);

  return (
    <div className="border p-1 m-1">
      <Button onClick={startListening} className="flex justify-evenly items-center gap-2 text-lg w-32">
        <Sparkles/>
        <span>Chat</span>
      </Button>
      {/* <button onClick={stopListening}>Stop Listening</button> */}
    </div>
  );
};