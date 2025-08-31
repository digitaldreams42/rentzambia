"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Inquiry {
  id: number;
  propertyId: number;
  userId: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  message: string;
  date: string;
  status: "pending" | "responded" | "closed";
}

interface InquiriesManagerProps {
  inquiries: Inquiry[];
  onRespond: (inquiryId: number, response: string) => void;
  onStatusChange: (inquiryId: number, status: Inquiry["status"]) => void;
}

export function InquiriesManager({ inquiries, onRespond, onStatusChange }: InquiriesManagerProps) {
  const [selectedInquiry, setSelectedInquiry] = useState<Inquiry | null>(null);
  const [response, setResponse] = useState("");
  const [isResponding, setIsResponding] = useState(false);

  const handleSendResponse = async () => {
    if (!selectedInquiry || !response.trim()) return;
    
    setIsResponding(true);
    try {
      await onRespond(selectedInquiry.id, response);
      setResponse("");
      setSelectedInquiry(null);
    } catch (error) {
      console.error("Failed to send response:", error);
      alert("Failed to send response. Please try again.");
    } finally {
      setIsResponding(false);
    }
  };

  const getStatusBadge = (status: Inquiry["status"]) => {
    switch (status) {
      case "pending":
        return <span className="bg-warning/10 text-warning px-2 py-1 rounded-full text-xs">Pending</span>;
      case "responded":
        return <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs">Responded</span>;
      case "closed":
        return <span className="bg-muted/10 text-muted-foreground px-2 py-1 rounded-full text-xs">Closed</span>;
      default:
        return <span className="bg-muted/10 text-muted-foreground px-2 py-1 rounded-full text-xs">Unknown</span>;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">Property Inquiries</h2>
        <p className="text-muted-foreground">{inquiries.length} inquiries</p>
      </div>
      
      {inquiries.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>From</TableHead>
              <TableHead>Property</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inquiries.map((inquiry) => (
              <TableRow key={inquiry.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{inquiry.userName}</p>
                    <p className="text-sm text-muted-foreground">{inquiry.userEmail}</p>
                  </div>
                </TableCell>
                <TableCell>Property #{inquiry.propertyId}</TableCell>
                <TableCell>{new Date(inquiry.date).toLocaleDateString()}</TableCell>
                <TableCell>{getStatusBadge(inquiry.status)}</TableCell>
                <TableCell>
                  <div className="flex space-x-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button 
                          variant="outline" 
                          size="sm"
                          onClick={() => setSelectedInquiry(inquiry)}
                        >
                          View
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                          <DialogTitle>Inquiry Details</DialogTitle>
                        </DialogHeader>
                        <div className="space-y-4">
                          <div>
                            <p className="text-sm text-muted-foreground">From</p>
                            <p className="font-medium">{inquiry.userName}</p>
                            <p className="text-sm">{inquiry.userEmail}</p>
                            <p className="text-sm">{inquiry.userPhone}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">Date</p>
                            <p className="font-medium">{new Date(inquiry.date).toLocaleString()}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">Message</p>
                            <p className="mt-1">{inquiry.message}</p>
                          </div>
                          
                          <div>
                            <p className="text-sm text-muted-foreground">Status</p>
                            <div className="flex items-center space-x-2 mt-1">
                              {getStatusBadge(inquiry.status)}
                              <select 
                                value={inquiry.status}
                                onChange={(e) => onStatusChange(inquiry.id, e.target.value as Inquiry["status"])}
                                className="border rounded px-2 py-1 text-sm"
                              >
                                <option value="pending">Pending</option>
                                <option value="responded">Responded</option>
                                <option value="closed">Closed</option>
                              </select>
                            </div>
                          </div>
                          
                          <div className="space-y-2">
                            <Label htmlFor="response">Your Response</Label>
                            <Textarea
                              id="response"
                              value={response}
                              onChange={(e) => setResponse(e.target.value)}
                              placeholder="Type your response here..."
                              rows={4}
                            />
                            <Button 
                              onClick={handleSendResponse}
                              disabled={isResponding || !response.trim()}
                              className="w-full"
                            >
                              {isResponding ? "Sending..." : "Send Response"}
                            </Button>
                          </div>
                        </div>
                      </DialogContent>
                    </Dialog>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No inquiries yet</p>
        </div>
      )}
    </div>
  );
}