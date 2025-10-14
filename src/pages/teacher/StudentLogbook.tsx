import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import {
  Calendar,
  ChevronRight,
  Clock,
  FileText,
  CheckCircle,
  XCircle,
  Filter,
  Search
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { toast } from 'sonner';
import studentsData from '@/data/students.json';
import logbookData from '@/data/logbook.json';

export default function StudentLogbook() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<any>(null);
  const [logbookEntries, setLogbookEntries] = useState<any[]>([]);
  const [filteredEntries, setFilteredEntries] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<any>(null);
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  const [verificationComment, setVerificationComment] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For the prototype, we'll use the mock data
    setIsLoading(true);
    const studentId = parseInt(id as string);
    const foundStudent = studentsData.find(s => s.id === studentId);
    
    if (foundStudent) {
      setStudent(foundStudent);
      
      // Get logbook entries for this student
      const entries = logbookData.filter(entry => entry.studentId === studentId);
      setLogbookEntries(entries);
      setFilteredEntries(entries);
    }
    
    setIsLoading(false);
  }, [id]);

  useEffect(() => {
    if (!logbookEntries.length) return;
    
    let filtered = [...logbookEntries];
    
    // Apply search filter
    if (searchQuery) {
      filtered = filtered.filter(entry => 
        entry.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        entry.date.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (statusFilter) {
      filtered = filtered.filter(entry => entry.status === statusFilter);
    }
    
    // Sort by date (most recent first)
    filtered = filtered.sort((a, b) => 
      new Date(b.date).getTime() - new Date(a.date).getTime()
    );
    
    setFilteredEntries(filtered);
  }, [searchQuery, statusFilter, logbookEntries]);

  const handleReview = (entry: any) => {
    setSelectedEntry(entry);
    setVerificationComment('');
    setShowVerificationModal(true);
  };

  const handleApprove = () => {
    // In a real app, we would update the status in the database
    const updatedEntries = logbookEntries.map(entry => {
      if (entry.id === selectedEntry.id) {
        return {
          ...entry,
          status: 'Verified',
          verifierComments: verificationComment,
          verificationDate: new Date().toISOString().split('T')[0]
        };
      }
      return entry;
    });
    
    setLogbookEntries(updatedEntries);
    toast.success('Logbook entry verified successfully!');
    setShowVerificationModal(false);
  };

  const handleReject = () => {
    // In a real app, we would update the status in the database
    const updatedEntries = logbookEntries.map(entry => {
      if (entry.id === selectedEntry.id) {
        return {
          ...entry,
          status: 'Rejected',
          verifierComments: verificationComment,
          verificationDate: new Date().toISOString().split('T')[0]
        };
      }
      return entry;
    });
    
    setLogbookEntries(updatedEntries);
    toast.info('Requested changes to logbook entry');
    setShowVerificationModal(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout requiredRole="teacher" title="Student Logbook">
        <div className="flex items-center justify-center h-64">
          <p>Loading logbook data...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout requiredRole="teacher" title="Student Logbook">
        <div className="flex flex-col items-center justify-center h-64">
          <p className="text-lg font-medium">Student not found</p>
          <p className="text-muted-foreground mb-4">The student you're looking for doesn't exist or you don't have access.</p>
          <Button asChild>
            <Link to="/teacher/students">Back to Students</Link>
          </Button>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredRole="teacher" title={`${student.name}'s Logbook`}>
      {/* Breadcrumb */}
      <div className="flex items-center gap-1 text-sm mb-6">
        <Link to="/teacher/dashboard" className="text-muted-foreground hover:text-primary">
          Dashboard
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <Link to="/teacher/students" className="text-muted-foreground hover:text-primary">
          Students
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <Link to={`/teacher/students/${student.id}`} className="text-muted-foreground hover:text-primary">
          {student.name}
        </Link>
        <ChevronRight className="h-4 w-4 text-muted-foreground" />
        <span className="font-medium">Logbook</span>
      </div>
      
      {/* Student header */}
      <div className="flex items-center gap-4 mb-8">
        <Avatar className="h-12 w-12 border border-border">
          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{student.name}'s Logbook</h1>
          <p className="text-muted-foreground">
            Review and verify student's internship and project activities
          </p>
        </div>
      </div>
      
      {/* Filters and search */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <div className="relative w-full md:w-1/3">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search entries..."
            className="pl-8"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={statusFilter === 'Submitted' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter(statusFilter === 'Submitted' ? null : 'Submitted')}
          >
            Pending
          </Button>
          <Button 
            variant={statusFilter === 'Verified' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter(statusFilter === 'Verified' ? null : 'Verified')}
          >
            Verified
          </Button>
          <Button 
            variant={statusFilter === 'Rejected' ? 'default' : 'outline'} 
            size="sm"
            onClick={() => setStatusFilter(statusFilter === 'Rejected' ? null : 'Rejected')}
          >
            Rejected
          </Button>
          <Button 
            variant="outline" 
            size="sm"
            onClick={() => setStatusFilter(null)}
          >
            All
          </Button>
        </div>
      </div>
      
      {/* Logbook entries */}
      <div className="space-y-4">
        {filteredEntries.length === 0 ? (
          <Card>
            <CardContent className="p-6 text-center">
              <p className="text-muted-foreground">No logbook entries found</p>
            </CardContent>
          </Card>
        ) : (
          filteredEntries.map((entry) => (
            <Card key={entry.id} className={
              entry.status === 'Verified' ? 'border-green-200 dark:border-green-900' : 
              entry.status === 'Rejected' ? 'border-red-200 dark:border-red-900' : 
              ''
            }>
              <CardContent className="p-4">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-2">
                      <Badge variant={
                        entry.status === 'Verified' ? 'secondary' : 
                        entry.status === 'Rejected' ? 'destructive' : 
                        'outline'
                      }>
                        {entry.status}
                      </Badge>
                      <span className="text-sm text-muted-foreground">
                        ID: {entry.id}
                      </span>
                    </div>
                    
                    <div className="flex items-center gap-3 mb-2">
                      <Calendar className="h-4 w-4 text-primary" />
                      <span className="font-medium">{entry.date}</span>
                      <span className="text-muted-foreground">•</span>
                      <Clock className="h-4 w-4 text-primary" />
                      <span>{entry.hours} hours</span>
                    </div>
                    
                    <p className="text-sm mb-3">{entry.description}</p>
                    
                    {entry.verifierComments && (
                      <div className="bg-muted p-2 rounded-md">
                        <p className="text-xs text-muted-foreground mb-1">Feedback:</p>
                        <p className="text-sm">{entry.verifierComments}</p>
                      </div>
                    )}
                  </div>
                  
                  <div className="flex justify-end gap-2">
                    {entry.status === 'Submitted' ? (
                      <>
                        <Button variant="outline" size="sm" onClick={() => handleReview(entry)}>
                          Review
                        </Button>
                      </>
                    ) : (
                      <div className="text-right text-sm">
                        <p className="text-muted-foreground">Verified on:</p>
                        <p>{entry.verificationDate || "N/A"}</p>
                      </div>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      
      {/* Logbook summary */}
      <Card className="mt-8">
        <CardHeader>
          <CardTitle>Logbook Summary</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {logbookEntries.length}
              </div>
              <p className="text-sm text-muted-foreground">Total Entries</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-primary mb-1">
                {logbookEntries.filter(e => e.status === 'Submitted').length}
              </div>
              <p className="text-sm text-muted-foreground">Pending Verification</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-green-500 mb-1">
                {logbookEntries.filter(e => e.status === 'Verified').length}
              </div>
              <p className="text-sm text-muted-foreground">Verified</p>
            </div>
            
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <div className="text-3xl font-bold text-red-500 mb-1">
                {logbookEntries.filter(e => e.status === 'Rejected').length}
              </div>
              <p className="text-sm text-muted-foreground">Rejected</p>
            </div>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-medium mb-3">Total Hours Logged</h3>
            <div className="h-8 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full flex items-center"
                style={{ 
                  width: `${Math.min(
                    logbookEntries.reduce((sum, entry) => sum + parseInt(entry.hours), 0) / 2, 
                    100
                  )}%` 
                }}
              >
                <span className="px-4 font-medium text-primary-foreground">
                  {logbookEntries.reduce((sum, entry) => sum + parseInt(entry.hours), 0)} hours
                </span>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mt-2">
              Target: 200 hours
            </p>
          </div>
        </CardContent>
      </Card>
      
      {/* Verification modal */}
      <Dialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Logbook Entry</DialogTitle>
            <DialogDescription>
              Review the student's submission and approve or request changes.
            </DialogDescription>
          </DialogHeader>
          
          {selectedEntry && (
            <div className="py-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                <p>{selectedEntry.date}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Hours Spent</h4>
                <p>{selectedEntry.hours}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                <p className="text-sm">{selectedEntry.description}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Feedback / Comments</h4>
                <Textarea 
                  placeholder="Add your comments or feedback here"
                  value={verificationComment}
                  onChange={(e) => setVerificationComment(e.target.value)}
                  className="mt-1"
                />
              </div>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={handleReject}
              className="gap-2"
            >
              <XCircle className="h-4 w-4" />
              Request Changes
            </Button>
            <Button 
              onClick={handleApprove}
              className="gap-2"
            >
              <CheckCircle className="h-4 w-4" />
              Approve
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}