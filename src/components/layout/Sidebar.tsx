import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useAuth } from '@/contexts/AuthContext';
import {
  LayoutDashboard,
  BookOpen,
  Briefcase,
  User,
  Users,
  FileText,
  BarChart3,
  FileBarChart,
  Settings,
  HelpCircle,
  Building,
  ChevronLeft,
  ChevronRight
} from 'lucide-react';

interface SidebarProps {
  className?: string;
  isOpen: boolean;
  toggleSidebar: () => void;
}

const Sidebar = ({ className, isOpen, toggleSidebar }: SidebarProps) => {
  const { user } = useAuth();
  const location = useLocation();
  
  // Define navigation items based on user role
  const navigationItems = user?.role === 'student'
    ? [
        { href: '/student/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
        { href: '/student/logbook', label: 'Logbook', icon: <BookOpen className="h-5 w-5" /> },
        { href: '/student/internships', label: 'Internships', icon: <Briefcase className="h-5 w-5" /> },
        { href: '/student/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
      ]
    : user?.role === 'teacher'
    ? [
        { href: '/teacher/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
        { href: '/teacher/students', label: 'My Students', icon: <Users className="h-5 w-5" /> },
        { href: '/teacher/publications', label: 'Publications', icon: <FileText className="h-5 w-5" /> },
        { href: '/teacher/profile', label: 'Profile', icon: <User className="h-5 w-5" /> },
      ]
    : [
        { href: '/institution/dashboard', label: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" /> },
        { href: '/institution/analytics', label: 'Analytics', icon: <BarChart3 className="h-5 w-5" /> },
        { href: '/institution/reports', label: 'Reports', icon: <FileBarChart className="h-5 w-5" /> },
        { href: '/institution/staff', label: 'Staff & Students', icon: <Users className="h-5 w-5" /> },
      ];

  // Common navigation items
  const commonItems = [
    { href: '/settings', label: 'Settings', icon: <Settings className="h-5 w-5" /> },
    { href: '/help', label: 'Help', icon: <HelpCircle className="h-5 w-5" /> },
  ];

  return (
    <aside
      className={cn(
        "fixed top-16 left-0 z-30 h-[calc(100vh-4rem)] w-64 border-r border-border bg-background transition-all duration-300 ease-in-out",
        isOpen ? "translate-x-0" : "-translate-x-full",
        className
      )}
    >
      <div className="flex h-full flex-col">
        <div className="flex items-center justify-between px-4 py-2">
          <div className="flex items-center gap-2">
            <div className="rounded-md bg-primary/10 p-1">
              <Building className="h-5 w-5 text-primary" />
            </div>
            <span className="font-medium text-sm">
              {user?.role === 'student' && 'Student Portal'}
              {user?.role === 'teacher' && 'Teacher Portal'}
              {user?.role === 'institution' && 'Admin Portal'}
            </span>
          </div>
          <Button 
            variant="ghost" 
            size="icon" 
            className="h-8 w-8 md:hidden"
            onClick={toggleSidebar}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="grid gap-1 px-2">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "sidebar-nav-item",
                  location.pathname === item.href && "active"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}

            <div className="mt-6 mb-2 px-2">
              <div className="text-xs font-medium text-muted-foreground">General</div>
            </div>

            {commonItems.map((item) => (
              <Link
                key={item.href}
                to={item.href}
                className={cn(
                  "sidebar-nav-item",
                  location.pathname === item.href && "active"
                )}
              >
                {item.icon}
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="border-t border-border p-4 hidden md:block">
          <Button 
            variant="outline" 
            size="sm" 
            className="w-full justify-between"
            onClick={toggleSidebar}
          >
            <span>Collapse</span>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;