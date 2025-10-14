import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '@/components/ui/sheet';
import {
  Bell,
  Menu,
  LogOut,
  User,
  Settings,
  HelpCircle,
  ChevronDown,
  Clock,
} from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import NotificationsDropdown from '@/components/notifications/NotificationsDropdown';

interface NavbarProps {
  toggleSidebar?: () => void;
  title?: string;
}

const Navbar = ({ toggleSidebar, title = 'Unified Interface Platform' }: NavbarProps) => {
  const { user, logout } = useAuth();
  const [showNotifications, setShowNotifications] = useState(false);
  const [currentTime, setCurrentTime] = useState(new Date().toLocaleTimeString());

  // Update the clock every second
  useState(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date().toLocaleTimeString());
    }, 1000);
    return () => clearInterval(interval);
  });

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur">
      <div className="container flex h-16 items-center justify-between">
        <div className="flex items-center gap-4">
          {toggleSidebar && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar} className="md:hidden">
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          )}
          
          <div className="flex items-center gap-2">
            <Link to="/" className="flex items-center gap-2">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-sm">UIP</span>
              </div>
              <span className="font-semibold text-lg hidden md:inline-block">{title}</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Clock */}
          <div className="hidden md:flex items-center gap-2 text-muted-foreground text-sm">
            <Clock className="h-4 w-4" />
            <span>{currentTime}</span>
          </div>

          {user ? (
            <>
              {/* Notifications */}
              <div className="relative">
                <Button 
                  variant="ghost" 
                  size="icon"
                  onClick={() => setShowNotifications(!showNotifications)}
                >
                  <Bell className="h-5 w-5" />
                  <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 flex items-center justify-center bg-secondary text-secondary-foreground">
                    3
                  </Badge>
                </Button>
                {showNotifications && (
                  <NotificationsDropdown onClose={() => setShowNotifications(false)} />
                )}
              </div>

              {/* User menu - desktop */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 flex items-center gap-2 pl-2 pr-1">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={user.avatar} alt={user.name} />
                      <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="hidden md:inline-block text-sm font-medium">{user.name}</span>
                    <ChevronDown className="h-4 w-4 opacity-50" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel>
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">
                        {user.role === 'student' && 'Student'}
                        {user.role === 'teacher' && 'Teacher'}
                        {user.role === 'institution' && 'Institution Admin'}
                      </p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to={`/${user.role}/profile`} className="cursor-pointer">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to={`/${user.role}/settings`} className="cursor-pointer">
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/help" className="cursor-pointer">
                      <HelpCircle className="mr-2 h-4 w-4" />
                      <span>Help</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onClick={logout} className="cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* Mobile menu */}
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon" className="md:hidden">
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">Toggle menu</span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="right">
                  <SheetHeader>
                    <SheetTitle>Menu</SheetTitle>
                  </SheetHeader>
                  <div className="py-4">
                    <div className="flex items-center gap-4 mb-6">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{user.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {user.role === 'student' && 'Student'}
                          {user.role === 'teacher' && 'Teacher'}
                          {user.role === 'institution' && 'Institution Admin'}
                        </div>
                      </div>
                    </div>

                    <nav className="space-y-2">
                      {user.role === 'student' && (
                        <>
                          <Link to="/student/dashboard" className="sidebar-nav-item">Dashboard</Link>
                          <Link to="/student/logbook" className="sidebar-nav-item">Logbook</Link>
                          <Link to="/student/internships" className="sidebar-nav-item">Internships</Link>
                        </>
                      )}
                      {user.role === 'teacher' && (
                        <>
                          <Link to="/teacher/dashboard" className="sidebar-nav-item">Dashboard</Link>
                          <Link to="/teacher/students" className="sidebar-nav-item">My Students</Link>
                          <Link to="/teacher/publications" className="sidebar-nav-item">Publications</Link>
                        </>
                      )}
                      {user.role === 'institution' && (
                        <>
                          <Link to="/institution/dashboard" className="sidebar-nav-item">Dashboard</Link>
                          <Link to="/institution/analytics" className="sidebar-nav-item">Analytics</Link>
                          <Link to="/institution/reports" className="sidebar-nav-item">Reports</Link>
                        </>
                      )}
                      <Link to={`/${user.role}/profile`} className="sidebar-nav-item">Profile</Link>
                      <Link to={`/${user.role}/settings`} className="sidebar-nav-item">Settings</Link>
                      <Link to="/help" className="sidebar-nav-item">Help</Link>
                      <button onClick={logout} className="sidebar-nav-item w-full text-left">Log out</button>
                    </nav>
                  </div>
                </SheetContent>
              </Sheet>
            </>
          ) : (
            <Button asChild>
              <Link to="/login">Login</Link>
            </Button>
          )}
        </div>
      </div>
    </header>
  );
};

export default Navbar;