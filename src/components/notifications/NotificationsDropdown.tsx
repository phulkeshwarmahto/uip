import { useState, useEffect } from 'react';
import { Card } from '@/components/ui/card';
import { Bell, X, CheckCheck, Clock } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { formatDistanceToNow } from 'date-fns';
import notificationsData from '@/data/notifications.json';

interface Notification {
  id: number;
  read: boolean;
  title: string;
  description: string;
  timestamp: string;
}

interface NotificationsDropdownProps {
  onClose: () => void;
}

const NotificationsDropdown = ({ onClose }: NotificationsDropdownProps) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const unreadCount = notifications.filter(n => !n.read).length;

  useEffect(() => {
    // In a real app, this would be an API call
    setNotifications(notificationsData);
  }, []);

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const markAsRead = (id: number) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: true } : n
    ));
  };

  return (
    <Card className="absolute top-12 right-0 w-80 md:w-96 shadow-lg z-50 p-0">
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Bell className="h-4 w-4" />
          <h3 className="font-medium text-sm">Notifications</h3>
          {unreadCount > 0 && (
            <Badge variant="secondary" className="text-xs">
              {unreadCount} new
            </Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button 
            variant="ghost" 
            size="sm" 
            className="text-xs h-8 px-2"
            onClick={markAllAsRead}
          >
            <CheckCheck className="h-3.5 w-3.5 mr-1" />
            Mark all read
          </Button>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8"
            onClick={onClose}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="max-h-[350px] overflow-y-auto">
        {notifications.length === 0 ? (
          <div className="py-8 text-center text-muted-foreground">
            <p>No notifications</p>
          </div>
        ) : (
          <div>
            {notifications.map((notification) => (
              <div 
                key={notification.id} 
                className={`px-4 py-3 hover:bg-muted/50 transition-colors cursor-pointer ${
                  !notification.read ? 'bg-primary/5 border-l-2 border-primary' : ''
                }`}
                onClick={() => markAsRead(notification.id)}
              >
                <div className="flex justify-between items-start mb-1">
                  <h4 className={`text-sm font-medium ${!notification.read ? 'text-primary' : ''}`}>
                    {notification.title}
                  </h4>
                  <div className="flex items-center text-xs text-muted-foreground">
                    <Clock className="h-3 w-3 mr-1" />
                    {formatDistanceToNow(new Date(notification.timestamp), { addSuffix: true })}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">{notification.description}</p>
                <Separator className="mt-3" />
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="border-t border-border p-3 text-center">
        <Button variant="link" className="text-xs h-auto p-0">View all notifications</Button>
      </div>
    </Card>
  );
};

export default NotificationsDropdown;