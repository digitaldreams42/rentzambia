"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";

interface WhatsAppNotifierProps {
  recipient: string;
  message: string;
  onSend: (data: any) => void;
  loading?: boolean;
}

export function WhatsAppNotifier({ recipient, message, onSend, loading }: WhatsAppNotifierProps) {
  const [isSent, setIsSent] = useState(false);

  const handleSend = () => {
    onSend({ recipient, message });
    setIsSent(true);
    
    // Reset sent status after 3 seconds
    setTimeout(() => setIsSent(false), 3000);
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <Icons.messageCircle className="w-5 h-5 text-primary mr-2" />
          <span>WhatsApp Notification</span>
        </div>
        
        <Button 
          variant="outline" 
          size="sm"
          onClick={handleSend}
          disabled={loading || isSent}
        >
          {isSent ? (
            <span className="flex items-center text-success">
              <Icons.check className="w-4 h-4 mr-1" />
              Sent
            </span>
          ) : loading ? (
            <span className="flex items-center">
              <Icons.spinner className="w-4 h-4 mr-1 animate-spin" />
              Sending
            </span>
          ) : (
            "Send WhatsApp"
          )}
        </Button>
      </div>
      
      <div className="mt-2 text-sm text-muted-foreground">
        <p>To: {recipient}</p>
        <p className="truncate">Message: {message}</p>
      </div>
    </div>
  );
}