"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Icons } from "@/components/ui/icons";

interface KYCDocument {
  id: number;
  userId: number;
  userName: string;
  documentType: string;
  documentUrl: string;
  status: "pending" | "verified" | "rejected";
  submittedAt: string;
}

interface KYCVerifierProps {
  documents: KYCDocument[];
  onVerify: (documentId: number) => void;
  onReject: (documentId: number) => void;
}

export function KYCVerifier({ documents, onVerify, onReject }: KYCVerifierProps) {
  const [selectedDocument, setSelectedDocument] = useState<KYCDocument | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleVerify = async (documentId: number) => {
    setIsVerifying(true);
    try {
      await onVerify(documentId);
      setSelectedDocument(null);
    } catch (error) {
      console.error("Failed to verify document:", error);
      alert("Failed to verify document. Please try again.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleReject = async (documentId: number) => {
    setIsRejecting(true);
    try {
      await onReject(documentId);
      setSelectedDocument(null);
    } catch (error) {
      console.error("Failed to reject document:", error);
      alert("Failed to reject document. Please try again.");
    } finally {
      setIsRejecting(false);
    }
  };

  const getStatusBadge = (status: KYCDocument["status"]) => {
    switch (status) {
      case "pending":
        return <span className="bg-warning/10 text-warning px-2 py-1 rounded-full text-xs">Pending</span>;
      case "verified":
        return <span className="bg-success/10 text-success px-2 py-1 rounded-full text-xs">Verified</span>;
      case "rejected":
        return <span className="bg-destructive/10 text-destructive px-2 py-1 rounded-full text-xs">Rejected</span>;
      default:
        return <span className="bg-muted/10 text-muted-foreground px-2 py-1 rounded-full text-xs">Unknown</span>;
    }
  };

  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-foreground">KYC Document Verification</h2>
        <p className="text-muted-foreground">{documents.length} documents pending verification</p>
      </div>
      
      {documents.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {documents.map((document) => (
            <div key={document.id} className="border rounded-lg p-4">
              <div className="flex justify-between items-start mb-3">
                <div>
                  <h3 className="font-medium">{document.userName}</h3>
                  <p className="text-sm text-muted-foreground">{document.documentType}</p>
                </div>
                {getStatusBadge(document.status)}
              </div>
              
              <div className="bg-muted rounded-md h-32 flex items-center justify-center mb-3">
                <Icons.file className="w-8 h-8 text-muted-foreground" />
              </div>
              
              <p className="text-sm text-muted-foreground mb-3">
                Submitted: {new Date(document.submittedAt).toLocaleDateString()}
              </p>
              
              <Dialog>
                <DialogTrigger asChild>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    className="w-full"
                    onClick={() => setSelectedDocument(document)}
                  >
                    Review Document
                  </Button>
                </DialogTrigger>
                <DialogContent className="sm:max-w-2xl">
                  <DialogHeader>
                    <DialogTitle>KYC Document Review</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-muted-foreground">User</p>
                        <p className="font-medium">{document.userName}</p>
                      </div>
                      <div>
                        <p className="text-sm text-muted-foreground">Document Type</p>
                        <p className="font-medium">{document.documentType}</p>
                      </div>
                    </div>
                    
                    <div>
                      <p className="text-sm text-muted-foreground">Submitted</p>
                      <p className="font-medium">{new Date(document.submittedAt).toLocaleString()}</p>
                    </div>
                    
                    <div className="bg-muted rounded-md h-64 flex items-center justify-center">
                      <Icons.file className="w-16 h-16 text-muted-foreground" />
                      <p className="text-muted-foreground ml-2">Document preview would appear here</p>
                    </div>
                    
                    {document.status === "pending" && (
                      <div className="flex space-x-2 pt-4">
                        <Button 
                          variant="destructive" 
                          onClick={() => handleReject(document.id)}
                          disabled={isRejecting}
                          className="flex-1"
                        >
                          {isRejecting ? "Rejecting..." : "Reject"}
                        </Button>
                        <Button 
                          onClick={() => handleVerify(document.id)}
                          disabled={isVerifying}
                          className="flex-1"
                        >
                          {isVerifying ? "Verifying..." : "Verify"}
                        </Button>
                      </div>
                    )}
                  </div>
                </DialogContent>
              </Dialog>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8">
          <p className="text-muted-foreground">No documents pending verification</p>
        </div>
      )}
    </div>
  );
}