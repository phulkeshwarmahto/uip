import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import LineChart from '@/components/dashboard/LineChart';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '@/components/ui/dialog';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import { 
  Users, 
  Star, 
  FileText, 
  Briefcase,
  CheckCircle,
  XCircle
} from 'lucide-react';
import teachersData from '@/data/teachers.json';
import studentsData from '@/data/students.json';
import logbookData from '@/data/logbook.json';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function TeacherDashboard() {
  const [teacherData, setTeacherData] = useState<any>(null);
  const [myStudents, setMyStudents] = useState<any[]>([]);
  const [pendingLogbookEntries, setPendingLogbookEntries] = useState<any[]>([]);
  const [selectedLogEntry, setSelectedLogEntry] = useState<any>(null);
  const [verificationComment, setVerificationComment] = useState('');
  const [showVerificationModal, setShowVerificationModal] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For the prototype, we'll use the mock data
    const teacher = teachersData[0]; // Dr. Ravi Kumar
    setTeacherData(teacher);
    
    // Get students mentored by this teacher
    const students = studentsData.filter(student => 
      teacher.students.includes(student.id)
    );
    setMyStudents(students);
    
    // Get pending logbook entries
    const pendingEntries = logbookData.filter(entry => 
      entry.status === 'Submitted' && 
      teacher.students.includes(entry.studentId)
    );
    setPendingLogbookEntries(pendingEntries);
  }, []);

  const handleReview = (entry: any) => {
    setSelectedLogEntry(entry);
    setVerificationComment('');
    setShowVerificationModal(true);
  };

  const handleApprove = () => {
    toast.success('Logbook entry verified successfully!');
    setShowVerificationModal(false);
    // In a real app, we would update the status in the database
  };

  const handleReject = () => {
    toast.info('Requested changes to logbook entry');
    setShowVerificationModal(false);
    // In a real app, we would update the status in the database
  };

  if (!teacherData) {
    return (
      <DashboardLayout requiredRole="teacher" title="Teacher Dashboard">
        <div className="flex items-center justify-center h-64">
          <p>Loading teacher data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredRole="teacher" title="Teacher Dashboard">
      {/* Welcome header */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Welcome, {teacherData.name}!</h1>
        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <p>APAR ID: {teacherData.aparId}</p>
          <span>•</span>
          <p>{teacherData.department}</p>
          <span>•</span>
          <p>{teacherData.position}</p>
        </div>
      </motion.div>

      {/* Stats overview */}
      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <motion.div variants={fadeIn} transition={{ duration: 0.3 }}>
          <StatCard
            title="Students Mentored"
            value={teacherData.studentsMentored}
            icon={<Users className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.1 }}>
          <StatCard
            title="Average Feedback"
            value={`${teacherData.avgFeedback} / 5`}
            icon={<Star className="h-5 w-5 text-primary" />}
            colorVariant="success"
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.2 }}>
          <StatCard
            title="Recent Publications"
            value={teacherData.recentPublications}
            icon={<FileText className="h-5 w-5 text-primary" />}
            colorVariant="secondary"
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.3 }}>
          <StatCard
            title="Schemes Utilized"
            value={teacherData.schemesUtilized}
            icon={<Briefcase className="h-5 w-5 text-primary" />}
            colorVariant="warning"
          />
        </motion.div>
      </motion.div>

      {/* Performance chart */}
      <div className="mb-8">
        <ChartCard 
          title="Performance & Feedback Trend" 
          description="Your performance rating and student feedback over the years"
        >
          <LineChart
            data={teacherData.performance}
            lines={[
              { dataKey: 'rating', name: 'Performance Rating' },
              { dataKey: 'feedback', name: 'Student Feedback' }
            ]}
            xAxisDataKey="year"
          />
        </ChartCard>
      </div>

      {/* Pending verifications */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">Pending Logbook Verifications</h2>
          <Badge variant="outline" className="text-sm">
            {pendingLogbookEntries.length} Pending
          </Badge>
        </div>

        {pendingLogbookEntries.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-6 text-center">
            <p className="text-muted-foreground">No pending verifications at this time.</p>
          </div>
        ) : (
          <div className="space-y-4">
            {pendingLogbookEntries.map((entry) => {
              const student = studentsData.find(s => s.id === entry.studentId);
              return (
                <div 
                  key={entry.id} 
                  className="bg-card border border-border rounded-lg p-4 flex flex-col md:flex-row md:items-center justify-between gap-4"
                >
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 border border-border">
                      <AvatarFallback>{student?.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h4 className="font-medium">{student?.name}</h4>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <span>Date: {entry.date}</span>
                        <span>•</span>
                        <span>Hours: {entry.hours}</span>
                      </div>
                    </div>
                  </div>
                  <div className="flex-1 md:mx-4">
                    <p className="text-sm line-clamp-2">{entry.description}</p>
                  </div>
                  <Button 
                    variant="outline" 
                    className="w-full md:w-auto"
                    onClick={() => handleReview(entry)}
                  >
                    Review
                  </Button>
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* My students */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">My Students</h2>
          <Button variant="outline" size="sm" asChild>
            <Link to="/teacher/students">View All</Link>
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {myStudents.map((student) => (
            <div 
              key={student.id} 
              className="bg-card border border-border rounded-lg p-4 hover:shadow-md transition-all"
            >
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10 border border-border">
                  <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div>
                  <h4 className="font-medium">{student.name}</h4>
                  <div className="text-sm text-muted-foreground">
                    <p>{student.department}</p>
                    <p>CGPA: {student.cgpa}</p>
                  </div>
                  
                  {student.performance?.academic && (
                    <div className="mt-2">
                      <div className="flex items-center gap-2">
                        <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">Rank: {student.performance.academic.classRank}</span>
                        {student.mentorship && (
                          <span className="text-xs px-2 py-0.5 bg-primary/10 text-primary rounded-full">
                            Next Meeting: {new Date(student.mentorship.nextMeeting).toLocaleDateString()}
                          </span>
                        )}
                      </div>
                    </div>
                  )}
                  
                  <div className="mt-3 flex gap-2">
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/teacher/students/${student.id}`}>Profile</Link>
                    </Button>
                    <Button variant="outline" size="sm" asChild>
                      <Link to={`/teacher/students/${student.id}/logbook`}>View Logbook</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Verification modal */}
      <Dialog open={showVerificationModal} onOpenChange={setShowVerificationModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Verify Logbook Entry</DialogTitle>
            <DialogDescription>
              Review the student's submission and approve or request changes.
            </DialogDescription>
          </DialogHeader>
          
          {selectedLogEntry && (
            <div className="py-4">
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Date</h4>
                <p>{selectedLogEntry.date}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Hours Spent</h4>
                <p>{selectedLogEntry.hours}</p>
              </div>
              
              <div className="mb-4">
                <h4 className="text-sm font-medium text-muted-foreground mb-1">Description</h4>
                <p className="text-sm">{selectedLogEntry.description}</p>
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