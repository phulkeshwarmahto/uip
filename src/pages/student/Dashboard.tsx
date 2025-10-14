import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import LineChart from '@/components/dashboard/LineChart';
import RadarChart from '@/components/dashboard/RadarChart';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import TimelineView from '@/components/dashboard/TimelineView';
import { Award, BookOpen, GraduationCap, UserCheck, Clock } from 'lucide-react';
import studentsData from '@/data/students.json';

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

export default function StudentDashboard() {
  const [studentData, setStudentData] = useState<any>(null);
  const [showTimelineModal, setShowTimelineModal] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For the prototype, we'll use the mock data
    const student = studentsData[0]; // Aditi Sharma
    setStudentData(student);
  }, []);

  if (!studentData) {
    return (
      <DashboardLayout requiredRole="student" title="Student Dashboard">
        <div className="flex items-center justify-center h-64">
          <p>Loading student data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredRole="student" title="Student Dashboard">
      {/* Welcome header */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Welcome back, {studentData.name.split(' ')[0]}!</h1>
        <div className="flex items-center gap-2 mt-2 text-muted-foreground">
          <p>UID: {studentData.aadharMasked}</p>
          <span>•</span>
          <p>{studentData.college}</p>
          <span>•</span>
          <p>{studentData.department}</p>
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
            title="CGPA"
            value={studentData.cgpa}
            icon={<GraduationCap className="h-5 w-5 text-primary" />}
            trend={{ value: 0.1, isPositive: true }}
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.1 }}>
          <StatCard
            title="Attendance"
            value={`${studentData.attendance}%`}
            icon={<UserCheck className="h-5 w-5 text-primary" />}
            colorVariant="success"
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.2 }}>
          <StatCard
            title="Active Internships"
            value={studentData.activeInternships}
            icon={<Clock className="h-5 w-5 text-primary" />}
            colorVariant="secondary"
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.3 }}>
          <StatCard
            title="Badges Earned"
            value={studentData.badgesEarned.length}
            icon={<Award className="h-5 w-5 text-primary" />}
            colorVariant="warning"
          />
        </motion.div>
      </motion.div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard title="Semester Progress" description="CGPA trend over semesters">
          <LineChart
            data={studentData.progress}
            lines={[
              { dataKey: 'cgpa', name: 'CGPA' }
            ]}
            xAxisDataKey="semester"
          />
        </ChartCard>

        <ChartCard title="Skills Distribution" description="Your proficiency levels">
          <RadarChart
            data={studentData.skills}
            nameKey="name"
            dataKey="level"
            radars={[
              { dataKey: 'level', name: 'Proficiency' }
            ]}
          />
        </ChartCard>
      </div>

      {/* Lifecycle analytics button */}
      <div className="mb-8">
        <div className="bg-card border border-border rounded-lg p-6 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="text-xl font-semibold mb-2">Academic Lifecycle Analytics</h3>
              <p className="text-muted-foreground">
                View a detailed timeline of your academic journey, from enrollment to graduation.
              </p>
            </div>
            <Button 
              className="bg-primary text-primary-foreground hover:bg-primary/90"
              onClick={() => setShowTimelineModal(true)}
            >
              <BookOpen className="mr-2 h-4 w-4" />
              View Lifecycle Analytics
            </Button>
          </div>
        </div>
      </div>

      {/* Recent badges */}
      <div>
        <h3 className="text-xl font-semibold mb-4">Recent Badges</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {studentData.badgesEarned.map((badge: any) => (
            <div 
              key={badge.id} 
              className="bg-card border border-border rounded-lg p-4 flex items-start gap-4"
            >
              <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                <Award className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h4 className="font-medium">{badge.name}</h4>
                <p className="text-sm text-muted-foreground">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline modal */}
      <Dialog open={showTimelineModal} onOpenChange={setShowTimelineModal}>
        <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Academic Lifecycle Timeline</DialogTitle>
            <DialogDescription>
              A complete view of your academic journey
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <TimelineView items={studentData.timeline} />
          </div>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}