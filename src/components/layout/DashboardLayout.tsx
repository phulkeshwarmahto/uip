import { useState, ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface DashboardLayoutProps {
  children: ReactNode;
  requiredRole?: 'student' | 'teacher' | 'institution';
  title?: string;
}

const DashboardLayout = ({
  children,
  requiredRole,
  title = 'Dashboard',
}: DashboardLayoutProps) => {
  const { user, isAuthenticated } = useAuth();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  // Redirect if not authenticated or wrong role
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={`/${user?.role}/dashboard`} />;
  }

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar toggleSidebar={toggleSidebar} title={title} />
      
      <div className="flex">
        <Sidebar isOpen={sidebarOpen} toggleSidebar={toggleSidebar} />
        
        <main 
          className={cn(
            "flex-1 transition-all duration-300 ease-in-out",
            sidebarOpen ? "md:pl-64" : "pl-0"
          )}
        >
          {/* Collapse button for desktop - visible when sidebar is closed */}
          {!sidebarOpen && (
            <Button
              variant="outline"
              size="icon"
              className="fixed left-4 top-20 z-30 hidden md:flex"
              onClick={toggleSidebar}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
          
          <div className="container py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;