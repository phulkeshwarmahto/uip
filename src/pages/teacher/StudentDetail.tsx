import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
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
  Edit,
  FileText,
  GraduationCap,
  LineChart as LineChartIcon,
  Mail,
  Phone,
  Save,
  User,
  UserCheck,
  Award,
  BookOpen,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Plus,
  Download
} from 'lucide-react';
import { toast } from 'sonner';
import ChartCard from '@/components/dashboard/ChartCard';
import LineChart from '@/components/dashboard/LineChart';
import studentsData from '@/data/students.json';

export default function StudentDetail() {
  const { id } = useParams<{ id: string }>();
  const [student, setStudent] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [notes, setNotes] = useState('');
  const [nextMeeting, setNextMeeting] = useState('');
  const [showMeetingDialog, setShowMeetingDialog] = useState(false);

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For the prototype, we'll use the mock data
    setIsLoading(true);
    const studentId = parseInt(id as string);
    const foundStudent = studentsData.find(s => s.id === studentId);
    
    if (foundStudent) {
      setStudent(foundStudent);
      if (foundStudent.mentorship) {
        setNotes(foundStudent.mentorship.notes || '');
        setNextMeeting(new Date(foundStudent.mentorship.nextMeeting).toISOString().split('T')[0]);
      }
    }
    
    setIsLoading(false);
  }, [id]);

  const handleSaveNotes = () => {
    // In a real app, we would save this to the API
    toast.success('Mentorship notes updated successfully');
    
    // Update local state
    setStudent((prev: any) => ({
      ...prev,
      mentorship: {
        ...prev.mentorship,
        notes
      }
    }));
  };

  const handleScheduleMeeting = () => {
    // In a real app, we would save this to the API
    toast.success('Mentorship meeting scheduled successfully');
    
    // Update local state
    setStudent((prev: any) => ({
      ...prev,
      mentorship: {
        ...prev.mentorship,
        nextMeeting
      }
    }));
    
    setShowMeetingDialog(false);
  };

  if (isLoading) {
    return (
      <DashboardLayout requiredRole="teacher" title="Student Profile">
        <div className="flex items-center justify-center h-64">
          <p>Loading student data...</p>
        </div>
      </DashboardLayout>
    );
  }

  if (!student) {
    return (
      <DashboardLayout requiredRole="teacher" title="Student Profile">
        <div className="flex flex-col items-center justify-center h-64">
          <AlertTriangle className="h-10 w-10 text-muted-foreground mb-4" />
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
    <DashboardLayout requiredRole="teacher" title={`Student: ${student.name}`}>
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
        <span className="font-medium">{student.name}</span>
      </div>
      
      {/* Student header */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <Avatar className="h-16 w-16 border border-border">
            <AvatarFallback className="text-xl">{student.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">{student.name}</h1>
            <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-muted-foreground">
              <span className="flex items-center gap-1">
                <GraduationCap className="h-4 w-4" />
                {student.department}
              </span>
              <span>•</span>
              <span className="flex items-center gap-1">
                <User className="h-4 w-4" />
                Year {student.year}
              </span>
              <span>•</span>
              <span>ID: {student.aadharMasked}</span>
            </div>
          </div>
        </div>
        
        <div className="flex flex-wrap gap-2">
          <Button variant="outline" size="sm" asChild>
            <Link to={`/teacher/students/${student.id}/logbook`}>
              <FileText className="h-4 w-4 mr-1" />
              View Logbook
            </Link>
          </Button>
          <Button size="sm" onClick={() => setShowMeetingDialog(true)}>
            <Calendar className="h-4 w-4 mr-1" />
            Schedule Meeting
          </Button>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="col-span-full md:col-span-1">
          <CardHeader>
            <CardTitle>Student Information</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">College</p>
                  <p className="font-medium">{student.college}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">CGPA</p>
                  <Badge variant={student.cgpa >= 8.5 ? "secondary" : student.cgpa >= 7.5 ? "default" : "outline"} className="px-2 py-0.5">
                    {student.cgpa}
                  </Badge>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Class Rank</p>
                  <p className="font-medium">{student.performance?.academic?.classRank || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Attendance</p>
                  <p className="font-medium">{student.attendance}%</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Expected Graduation</p>
                  <p className="font-medium">{student.lifecycleTracking?.expectedGraduation || "N/A"}</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Current Phase</p>
                  <p className="font-medium">{student.lifecycleTracking?.currentPhase || "N/A"}</p>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-3">Digital Credentials</p>
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <span className="text-sm">Aadhar Linked</span>
                    {student.digitalCredentials?.aadharLinked ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">DigiLocker Linked</span>
                    {student.digitalCredentials?.digilockerLinked ? (
                      <CheckCircle className="h-4 w-4 text-green-500" />
                    ) : (
                      <XCircle className="h-4 w-4 text-red-500" />
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">ABC ID</span>
                    <span className="text-sm font-medium">{student.digitalCredentials?.abcId || "N/A"}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm">APAAR ID</span>
                    <span className="text-sm font-medium">{student.digitalCredentials?.apaarId || "N/A"}</span>
                  </div>
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <p className="text-sm text-muted-foreground mb-3">Badges & Achievements</p>
                <div className="flex flex-wrap gap-2">
                  {student.badgesEarned?.map((badge: any) => (
                    <Badge key={badge.id} variant="secondary" className="px-2 py-1">
                      <Award className="h-3 w-3 mr-1" />
                      {badge.name}
                    </Badge>
                  ))}
                  {!student.badgesEarned?.length && (
                    <p className="text-sm text-muted-foreground">No badges earned yet</p>
                  )}
                </div>
              </div>
              
              <div className="border-t border-border pt-4">
                <div className="flex items-center justify-between mb-3">
                  <p className="text-sm text-muted-foreground">Documents & Certificates</p>
                  <Button variant="ghost" size="sm" className="h-7 px-2">
                    <Download className="h-3.5 w-3.5" />
                  </Button>
                </div>
                <div className="space-y-2">
                  {student.certificates?.map((cert: any, idx: number) => (
                    <div key={idx} className="flex items-center justify-between border-b border-border pb-2">
                      <div>
                        <p className="text-sm font-medium">{cert.title}</p>
                        <p className="text-xs text-muted-foreground">{cert.issuedBy} • {cert.issuedDate}</p>
                      </div>
                      <Button variant="ghost" size="sm" className="h-7 px-2">
                        <FileText className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  ))}
                  {!student.certificates?.length && (
                    <p className="text-sm text-muted-foreground">No certificates uploaded</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-full md:col-span-2">
          <Tabs defaultValue="academic" className="w-full">
            <CardHeader className="pb-0">
              <div className="flex items-center justify-between">
                <CardTitle>Student Profile</CardTitle>
                <TabsList>
                  <TabsTrigger value="academic">Academic</TabsTrigger>
                  <TabsTrigger value="skills">Skills</TabsTrigger>
                  <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                  <TabsTrigger value="mentorship">Mentorship</TabsTrigger>
                </TabsList>
              </div>
            </CardHeader>
            
            <CardContent className="pt-6">
              <TabsContent value="academic" className="mt-0">
                <div className="space-y-6">
                  <ChartCard 
                    title="Academic Progress" 
                    description="CGPA progression across semesters"
                  >
                    <LineChart
                      data={student.progress || []}
                      lines={[
                        { dataKey: 'cgpa', name: 'CGPA' }
                      ]}
                      xAxisDataKey="semester"
                    />
                  </ChartCard>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Subject Performance</h3>
                      <div className="space-y-3">
                        {student.performance?.academic?.subjectWise?.map((subject: any, idx: number) => (
                          <div key={idx} className="flex items-center justify-between">
                            <span className="text-sm">{subject.subject}</span>
                            <Badge variant={
                              subject.grade === 'A+' ? "secondary" : 
                              subject.grade === 'A' ? "default" : 
                              "outline"
                            }>
                              {subject.grade}
                            </Badge>
                          </div>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Academic Timeline</h3>
                      <div className="space-y-3">
                        {student.timeline?.filter((item: any) => 
                          ['completed', 'current', 'future'].includes(item.status)
                        )
                        .slice(0, 5)
                        .map((item: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className={`mt-1 h-2 w-2 rounded-full ${
                              item.status === 'completed' ? 'bg-green-500' : 
                              item.status === 'current' ? 'bg-blue-500' : 
                              'bg-muted'
                            }`}></div>
                            <div>
                              <p className="text-sm font-medium">{item.title}</p>
                              <p className="text-xs text-muted-foreground">{item.date}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-3">Government Schemes & Scholarships</h3>
                    <div className="space-y-3">
                      {student.governmentSchemes?.map((scheme: any, idx: number) => (
                        <div key={idx} className="border border-border rounded-lg p-3">
                          <div className="flex items-start justify-between">
                            <div>
                              <p className="font-medium">{scheme.name}</p>
                              <p className="text-sm text-muted-foreground">{scheme.year}</p>
                            </div>
                            <Badge variant={
                              scheme.status === 'Approved' ? "secondary" : 
                              scheme.status === 'Applied' ? "outline" : 
                              "default"
                            }>
                              {scheme.status}
                            </Badge>
                          </div>
                          <p className="text-sm mt-1">{scheme.amount}</p>
                        </div>
                      ))}
                      {!student.governmentSchemes?.length && (
                        <p className="text-muted-foreground">No government schemes or scholarships found</p>
                      )}
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="skills" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium mb-4">Skill Proficiency</h3>
                    <div className="space-y-4">
                      {student.skills?.map((skill: any, idx: number) => (
                        <div key={idx}>
                          <div className="flex items-center justify-between mb-1">
                            <span className="text-sm">{skill.name}</span>
                            <span className="text-sm text-muted-foreground">{skill.level}%</span>
                          </div>
                          <div className="h-2 bg-muted rounded-full overflow-hidden">
                            <div 
                              className="h-full bg-primary rounded-full" 
                              style={{ width: `${skill.level}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                      {!student.skills?.length && (
                        <p className="text-muted-foreground">No skills data available</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="text-lg font-medium mb-3">Sports & Extracurricular</h3>
                      <div className="space-y-3">
                        {student.performance?.sports?.participation?.map((sport: any, idx: number) => (
                          <div key={idx} className="flex items-start gap-2">
                            <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                            <div>
                              <p className="text-sm font-medium">{sport.event}</p>
                              <p className="text-xs text-muted-foreground">
                                {sport.position} • {sport.year}
                              </p>
                            </div>
                          </div>
                        ))}
                        {!student.performance?.sports?.participation?.length && (
                          <p className="text-muted-foreground">No sports participation data available</p>
                        )}
                      </div>
                    </div>
                    
                    <div>
                      <h3 className="text-lg font-medium mb-3">Feedback Provided</h3>
                      <div className="space-y-3">
                        {student.feedback?.map((item: any, idx: number) => (
                          <div key={idx} className="border border-border rounded-lg p-3">
                            <div className="flex items-center justify-between mb-1">
                              <p className="font-medium">{item.subject}</p>
                              <Badge variant="outline">{item.rating}/5</Badge>
                            </div>
                            <p className="text-sm text-muted-foreground">{item.comment}</p>
                          </div>
                        ))}
                        {!student.feedback?.length && (
                          <p className="text-muted-foreground">No feedback data available</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="opportunities" className="mt-0">
                <div className="space-y-6">
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-lg font-medium">Current Opportunities</h3>
                      <Button variant="outline" size="sm">
                        <Plus className="h-4 w-4 mr-1" />
                        Recommend
                      </Button>
                    </div>
                    
                    <div className="space-y-4">
                      {student.opportunities?.map((opportunity: any, idx: number) => (
                        <Card key={idx}>
                          <CardContent className="p-4">
                            <div className="flex items-start justify-between">
                              <div>
                                <Badge variant="outline" className="mb-2">{opportunity.type}</Badge>
                                <h4 className="font-medium">
                                  {opportunity.company ? `${opportunity.role} at ${opportunity.company}` : opportunity.title}
                                </h4>
                                <div className="flex items-center gap-3 mt-1 text-sm text-muted-foreground">
                                  <span>Status: {opportunity.status}</span>
                                  {opportunity.duration && <span>Duration: {opportunity.duration}</span>}
                                  {opportunity.startDate && <span>Starts: {opportunity.startDate}</span>}
                                </div>
                              </div>
                              <Button variant="ghost" size="sm">View</Button>
                            </div>
                          </CardContent>
                        </Card>
                      ))}
                      {!student.opportunities?.length && (
                        <Card>
                          <CardContent className="p-6 text-center">
                            <p className="text-muted-foreground">No active opportunities</p>
                          </CardContent>
                        </Card>
                      )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">AI-Generated Recommendations</h3>
                    <Card>
                      <CardContent className="p-4">
                        <div className="space-y-3">
                          {student.analytics?.alertsGenerated?.map((alert: any, idx: number) => (
                            <div key={idx} className="flex items-start gap-2">
                              <div className="mt-1 h-2 w-2 rounded-full bg-primary"></div>
                              <div>
                                <p className="text-sm font-medium">{alert.message}</p>
                                <p className="text-xs text-muted-foreground">
                                  {alert.type} • {alert.date}
                                </p>
                              </div>
                            </div>
                          ))}
                          {!student.analytics?.alertsGenerated?.length && (
                            <p className="text-muted-foreground">No recommendations available</p>
                          )}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="mentorship" className="mt-0">
                <div className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <Calendar className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium">Next Meeting</p>
                        <p className="text-lg font-bold">
                          {student.mentorship?.nextMeeting ? 
                            new Date(student.mentorship.nextMeeting).toLocaleDateString() : 
                            "Not Scheduled"}
                        </p>
                        <Button variant="link" size="sm" onClick={() => setShowMeetingDialog(true)}>
                          Reschedule
                        </Button>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <Clock className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium">Last Meeting</p>
                        <p className="text-lg font-bold">
                          {student.mentorship?.lastMeeting ? 
                            new Date(student.mentorship.lastMeeting).toLocaleDateString() : 
                            "N/A"}
                        </p>
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardContent className="p-4 flex flex-col items-center justify-center text-center">
                        <BookOpen className="h-8 w-8 text-primary mb-2" />
                        <p className="text-sm font-medium">Mentorship Duration</p>
                        <p className="text-lg font-bold">
                          {student.mentorship?.lastMeeting ? 
                            `${Math.floor((new Date().getTime() - new Date(student.mentorship.lastMeeting).getTime()) / (1000 * 60 * 60 * 24 * 30))} months` : 
                            "N/A"}
                        </p>
                      </CardContent>
                    </Card>
                  </div>
                  
                  <Card>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">Mentorship Notes</CardTitle>
                        <Button variant="ghost" size="sm" className="h-8 w-8 p-0" onClick={handleSaveNotes}>
                          <Save className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <Textarea
                        placeholder="Add your mentorship notes here..."
                        className="min-h-[150px]"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </CardContent>
                  </Card>
                  
                  <div>
                    <h3 className="text-lg font-medium mb-4">Mentorship History</h3>
                    <div className="space-y-4">
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Initial Assessment</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(student.lifecycleTracking?.admissionDate || "2022-08-01").toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <p className="text-sm mt-2">
                          Initial assessment completed. Student shows strong aptitude in {student.skills?.[0]?.name || "core subjects"}.
                        </p>
                      </div>
                      
                      <div className="border border-border rounded-lg p-4">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Academic Progress Review</p>
                            <p className="text-sm text-muted-foreground">
                              {new Date(student.mentorship?.lastMeeting || "2024-09-15").toLocaleDateString()}
                            </p>
                          </div>
                          <Badge variant="outline">Completed</Badge>
                        </div>
                        <p className="text-sm mt-2">
                          {student.mentorship?.notes || "Discussed academic progress and career goals. Student is performing well."}
                        </p>
                      </div>
                      
                      <div className="border border-border rounded-lg p-4 border-dashed">
                        <div className="flex items-start justify-between">
                          <div>
                            <p className="font-medium">Next Mentorship Meeting</p>
                            <p className="text-sm text-muted-foreground">
                              {student.mentorship?.nextMeeting ? 
                                new Date(student.mentorship.nextMeeting).toLocaleDateString() : 
                                "Not Scheduled"}
                            </p>
                          </div>
                          <Badge variant="outline">Upcoming</Badge>
                        </div>
                        <p className="text-sm mt-2">
                          Topics to discuss: academic progress, internship opportunities, and research interests.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </CardContent>
          </Tabs>
        </Card>
      </div>
      
      {/* Schedule Meeting Dialog */}
      <Dialog open={showMeetingDialog} onOpenChange={setShowMeetingDialog}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Schedule Mentorship Meeting</DialogTitle>
            <DialogDescription>
              Set a date for your next mentorship meeting with {student.name}.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="meeting-date" className="text-sm font-medium">
                  Meeting Date
                </label>
                <Input
                  id="meeting-date"
                  type="date"
                  value={nextMeeting}
                  onChange={(e) => setNextMeeting(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="meeting-notes" className="text-sm font-medium">
                  Meeting Agenda
                </label>
                <Textarea
                  id="meeting-notes"
                  placeholder="Enter meeting agenda..."
                  className="min-h-[100px]"
                />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowMeetingDialog(false)}>
              Cancel
            </Button>
            <Button onClick={handleScheduleMeeting}>
              Schedule Meeting
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}