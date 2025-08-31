"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/ui/icons";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Notification {
  id: number;
  title: string;
  message: string;
  date: string;
  read: boolean;
  type: "info" | "success" | "warning" | "error";
}

interface InAppNotifierProps {
  notifications: Notification[];
  onMarkAsRead: (id: number) => void;
  onMarkAllAsRead: () => void;
}

export function InAppNotifier({ notifications, onMarkAsRead, onMarkAllAsRead }: InAppNotifierProps) {
  const [isOpen, setIsOpen] = useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  const getIcon = (type: Notification["type"]) => {
    switch (type) {
      case "success":
        return <Icons.checkCircle className="w-4 h-4 text-success" />;
      case "warning":
        return <Icons.alertTriangle className="w-4 h-4 text-warning" />;
      case "error":
        return <Icons.alertCircle className="w-4 h-4 text-destructive" />;
      default:
        return <Icons.info className="w-4 h-4 text-info" />;
    }
  };

  return (
    <DropdownMenu open={isOpen} onOpenChange={setIsOpen}>
      <DropdownMenuTrigger>
        <Button variant="ghost" size="icon" className="relative">
          <Icons.bell className="w-5 h-5" />
          {unreadCount > 0 && (
            <span className="absolute top-0 right-0 w-2 h-2 bg-destructive rounded-full"></span>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="p-2 border-b">
          <div className="flex justify-between items-center">
            <h3 className="font-medium">Notifications</h3>
            {unreadCount > 0 && (
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={onMarkAllAsRead}
                className="text-xs"
              >
                Mark all as read
              </Button>
            )}
          </div>
        </div>
        
        <div className="max-h-96 overflow-y-auto">
          {notifications.length > 0 ? (
            notifications.map((notification) => (
              <DropdownMenuItem 
                key={notification.id}
                className="flex items-start p-3 cursor-pointer"
                onClick={() => onMarkAsRead(notification.id)}
              >
                <div className={`mr-3 mt-1 ${!notification.read ? "bg-primary/10 p-2 rounded-full" : ""}`}>
                  {getIcon(notification.type)}
                </div>
                <div className="flex-1">
                  <p className={`font-medium text-sm ${!notification.read ? "text-foreground" : "text-muted-foreground"}`}>
                    {notification.title}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-muted-foreground mt-1">
                    {new Date(notification.date).toLocaleString()}
                  </p>
                </div>
              </DropdownMenuItem>
            ))
          ) : (
            <div className="p-4 text-center text-muted-foreground">
              No notifications
            </div>
          )}
        </div>
        
        <div className="p-2 border-t text-center">
          <Button variant="ghost" size="sm">
            View all notifications
          </Button>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}