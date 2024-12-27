"use client";

import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import InstructionsForm from "./instructions-form";

export default function InstructionsGenerator() {
  const [instructions, setInstructions] = useState("");

  const handleChange = (newInstructions: string) => {
    setInstructions(newInstructions);
  };

  const handleDownload = () => {
    const element = document.createElement("a");
    const file = new Blob([instructions], { type: "text/plain" });
    element.href = URL.createObjectURL(file);
    element.download = "instructions.txt";
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
  };

  return (
    <div className="flex-1 flex gap-4 flex-col md:flex-row">
      <div className="pane-left md:w-1/2">
        <Card className="p-4">
          <h2 className="text-xl font-semibold mb-4">Project Information</h2>
          <InstructionsForm onChange={handleChange} />
        </Card>
      </div>
      <div className="pane-right md:w-1/2">
        <Card className="p-4 flex flex-col h-full">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold">Final Instructions/Rules</h2>
            <Button onClick={handleDownload}>Download</Button>
          </div>
          <Textarea
            value={instructions}
            readOnly
            className="w-full h-full font-mono resize-none"
            placeholder="AI Instructions/Rules will appear here..."
          />
        </Card>
      </div>
    </div>
  );
}
