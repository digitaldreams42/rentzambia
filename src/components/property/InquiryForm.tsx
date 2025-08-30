"use client";

import * as React from "react";
import { Form, FormField, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Modal } from "@/components/ui/modal";
import { cn } from "@/lib/utils";

export interface InquiryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: any) => void;
  isLoading?: boolean;
  className?: string;
}

const InquiryForm = React.forwardRef<HTMLDivElement, InquiryFormProps>(
  ({ isOpen, onClose, onSubmit, isLoading, className }, ref) => {
    const [formData, setFormData] = React.useState({
      name: "",
      email: "",
      phone: "",
      message: ""
    });

    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
      onSubmit(formData);
    };

    const handleChange = (field: string, value: string) => {
      setFormData(prev => ({ ...prev, [field]: value }));
    };

    React.useEffect(() => {
      if (!isOpen) {
        // Reset form when modal is closed
        setFormData({
          name: "",
          email: "",
          phone: "",
          message: ""
        });
      }
    }, [isOpen]);

    return (
      <Modal 
        ref={ref}
        isOpen={isOpen} 
        onClose={onClose}
        className={cn("max-w-md", className)}
      >
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold text-foreground">Send Inquiry</h3>
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                <path fillRule="evenodd" d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z" clipRule="evenodd" />
              </svg>
            </button>
          </div>
          
          <Form onSubmit={handleSubmit}>
            <div className="space-y-4">
              <FormField>
                <FormLabel htmlFor="name">
                  Full Name
                </FormLabel>
                <Input
                  id="name"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange("name", e.target.value)}
                  placeholder="Your full name"
                  required
                />
              </FormField>
              
              <FormField>
                <FormLabel htmlFor="email">
                  Email
                </FormLabel>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange("email", e.target.value)}
                  placeholder="your@email.com"
                  required
                />
              </FormField>
              
              <FormField>
                <FormLabel htmlFor="phone">
                  Phone Number
                </FormLabel>
                <Input
                  id="phone"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleChange("phone", e.target.value)}
                  placeholder="+260 XXX XXX XXX"
                  required
                />
              </FormField>
              
              <FormField>
                <FormLabel htmlFor="message">
                  Message
                </FormLabel>
                <Textarea
                  id="message"
                  value={formData.message}
                  onChange={(e) => handleChange("message", e.target.value)}
                  placeholder="I'm interested in this property..."
                  rows={4}
                  required
                />
              </FormField>
              
              <div className="flex justify-end space-x-3 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={onClose}
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isLoading}
                >
                  {isLoading ? "Sending..." : "Send Inquiry"}
                </Button>
              </div>
            </div>
          </Form>
        </div>
      </Modal>
    );
  }
);
InquiryForm.displayName = "InquiryForm";

export { InquiryForm };