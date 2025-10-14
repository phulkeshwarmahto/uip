import { useState } from 'react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { DataTable } from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  Dialog, 
  DialogContent, 
  DialogDescription, 
  DialogHeader, 
  DialogTitle 
} from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { 
  ArrowUpDown, 
  Download,
  FileDown,
  Eye,
  Mail,
  Phone,
  Award,
  BookOpen,
  FileText,
  Star,
  Search,
  Filter,
  Plus,
  UserPlus
} from 'lucide-react';
import studentsData from '@/data/students.json';
import teachersData from '@/data/teachers.json';
import { toast } from 'sonner';

// Define student table columns
type Student = {
  id: number;
  name: string;
  department: string;
  year: number;
  cgpa: number;
  attendance: number;
  aadharMasked: string;
  badgesEarned: Array<{id: number; name: string; description: string}>;
  performance?: {
    academic?: {
      overall: number;
      classRank: number;
      subjectWise: Array<{subject: string; grade: string}>;
    };
    sports?: {
      participation: Array<{event: string; position: string; year: number}>;
    };
  };
  lifecycleTracking?: {
    currentPhase: string;
    admissionDate: string;
    expectedGraduation: string;
    alumniStatus: string;
  };
  governmentSchemes?: Array<{
    name: string;
    amount: string;
    status: string;
    year: string;
  }>;
  mentorship?: {
    mentorId: number;
    mentorName: string;
    lastMeeting: string;
    nextMeeting: string;
    notes: string;
  };
  opportunities?: Array<{
    type: string;
    company?: string;
    role?: string;
    title?: string;
    status: string;
    duration?: string;
    startDate?: string;
  }>;
  certificates?: Array<{
    title: string;
    issuedBy: string;
    issuedDate: string;
    verificationId: string;
  }>;
  digitalCredentials?: {
    digilockerLinked: boolean;
    aadharLinked: boolean;
    abcId: string;
    apaarId: string;
  };
  analytics?: {
    performancePrediction: string;
    alertsGenerated: Array<{
      type: string;
      message: string;
      date: string;
    }>;
  };
  timeline?: Array<{
    id: number;
    title: string;
    date: string;
    status: string;
  }>;
  feedback?: Array<{
    subject: string;
    rating: number;
    comment: string;
    date: string;
  }>;
};

// Define teacher table columns
type Teacher = {
  id: number;
  name: string;
  department: string;
  position: string;
  email: string;
  phone: string;
  avgFeedback: number;
  studentsMentored: number;
  recentPublications: number;
  publications?: Array<{
    id: number;
    title: string;
    journal: string;
    year: number;
    citations: number;
  }>;
  evaluations?: {
    studentFeedback: Array<{year: string; score: number; comments: string}>;
    peerReview: Array<{year: string; score: number; reviewer: string; comments: string}>;
    departmentAssessment: {
      lastAssessment: string;
      score: number;
      strengths: string[];
      areasForImprovement: string[];
    };
  };
  governmentSchemes?: Array<{
    name: string;
    year: string;
    amount: string;
    status: string;
    outcome: string;
  }>;
  resume?: {
    education: Array<{degree: string; institution: string; year: number}>;
    experience: Array<{position: string; institution: string; duration: string}>;
    awards: Array<{name: string; year: number; organization: string}>;
  };
  teachingHistory?: Array<{
    course: string;
    semester: string;
    students: number;
    feedback: number;
  }>;
  mentorshipRecord?: Array<{
    studentId: number;
    studentName: string;
    project: string;
    status: string;
    outcome?: string;
  }>;
  training?: Array<{
    course: string;
    platform: string;
    completionDate: string;
    certificateId: string;
  }>;
  aiFeedback?: {
    summary: string;
    recommendations: string[];
  };
  performanceDashboard?: {
    institutionComparison: {
      researchOutput: {personal: number; departmentAvg: number; institutionAvg: number};
      teachingEffectiveness: {personal: number; departmentAvg: number; institutionAvg: number};
      studentMentoring: {personal: number; departmentAvg: number; institutionAvg: number};
    };
  };
};

const studentColumns: ColumnDef<Student>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'year',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Year
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'cgpa',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        CGPA
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    accessorKey: 'attendance',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Attendance
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <div>{row.getValue('attendance')}%</div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const student = row.original;
      const [showDetails, setShowDetails] = useState(false);
      
      return (
        <>
          <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Student Details</DialogTitle>
                <DialogDescription>
                  Complete profile information for {student.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <Tabs defaultValue="basic">
                  <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="lifecycle">Lifecycle</TabsTrigger>
                    <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
                    <TabsTrigger value="certificates">Certificates</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">{student.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{student.name}</h3>
                        <div className="text-muted-foreground">
                          <p>UID: {student.aadharMasked} • {student.department}</p>
                          <p>Year: {student.year} • CGPA: {student.cgpa} • Attendance: {student.attendance}%</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Mentorship</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {student.mentorship ? (
                            <div>
                              <p><span className="font-medium">Mentor:</span> {student.mentorship.mentorName}</p>
                              <p><span className="font-medium">Last Meeting:</span> {student.mentorship.lastMeeting}</p>
                              <p><span className="font-medium">Next Meeting:</span> {student.mentorship.nextMeeting}</p>
                              <p className="mt-2"><span className="font-medium">Notes:</span> {student.mentorship.notes}</p>
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No mentorship data available</p>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Government Schemes & Scholarships</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {student.governmentSchemes && student.governmentSchemes.length > 0 ? (
                            <div className="space-y-3">
                              {student.governmentSchemes.map((scheme, index) => (
                                <div key={index} className="border-b border-border pb-2 last:border-0 last:pb-0">
                                  <div className="flex justify-between">
                                    <span className="font-medium">{scheme.name}</span>
                                    <Badge variant={scheme.status === "Approved" ? "default" : "outline"}>{scheme.status}</Badge>
                                  </div>
                                  <p className="text-sm text-muted-foreground">{scheme.amount} • {scheme.year}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No scholarship data available</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Digital Credentials</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.digitalCredentials ? (
                          <div className="grid grid-cols-2 gap-4">
                            <div>
                              <p><span className="font-medium">DigiLocker:</span> {student.digitalCredentials.digilockerLinked ? "Linked" : "Not Linked"}</p>
                              <p><span className="font-medium">Aadhar:</span> {student.digitalCredentials.aadharLinked ? "Linked" : "Not Linked"}</p>
                            </div>
                            <div>
                              <p><span className="font-medium">ABC ID:</span> {student.digitalCredentials.abcId}</p>
                              <p><span className="font-medium">APAAR ID:</span> {student.digitalCredentials.apaarId}</p>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No digital credential data available</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Academic Performance</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.performance?.academic ? (
                          <div className="space-y-4">
                            <div>
                              <p><span className="font-medium">Overall CGPA:</span> {student.performance.academic.overall}</p>
                              <p><span className="font-medium">Class Rank:</span> {student.performance.academic.classRank}</p>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Subject-wise Performance</h4>
                              <div className="grid grid-cols-2 gap-2">
                                {student.performance.academic.subjectWise.map((subject, index) => (
                                  <div key={index} className="flex justify-between border-b border-border pb-1">
                                    <span>{subject.subject}</span>
                                    <span className="font-medium">{subject.grade}</span>
                                  </div>
                                ))}
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No academic performance data available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Sports & Extracurricular</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.performance?.sports && student.performance.sports.participation.length > 0 ? (
                          <div>
                            <h4 className="font-medium mb-2">Participation</h4>
                            <div className="space-y-2">
                              {student.performance.sports.participation.map((event, index) => (
                                <div key={index} className="flex justify-between border-b border-border pb-1 last:border-0">
                                  <span>{event.event}</span>
                                  <div className="text-right">
                                    <span className="font-medium">{event.position}</span>
                                    <span className="text-muted-foreground text-sm ml-2">({event.year})</span>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No sports participation data available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">AI Analytics</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.analytics ? (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-1">Performance Prediction</h4>
                              <p>{student.analytics.performancePrediction}</p>
                            </div>
                            
                            {student.analytics.alertsGenerated.length > 0 && (
                              <div>
                                <h4 className="font-medium mb-1">Generated Alerts</h4>
                                <div className="space-y-2">
                                  {student.analytics.alertsGenerated.map((alert, index) => (
                                    <div key={index} className="border-b border-border pb-2 last:border-0">
                                      <div className="flex items-center gap-2">
                                        <Badge variant={alert.type === "Opportunity" ? "outline" : "secondary"}>
                                          {alert.type}
                                        </Badge>
                                        <span className="text-sm text-muted-foreground">{alert.date}</span>
                                      </div>
                                      <p className="mt-1">{alert.message}</p>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No analytics data available</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="lifecycle" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Lifecycle Tracking</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.lifecycleTracking ? (
                          <div className="space-y-2">
                            <p><span className="font-medium">Current Phase:</span> {student.lifecycleTracking.currentPhase}</p>
                            <p><span className="font-medium">Admission Date:</span> {student.lifecycleTracking.admissionDate}</p>
                            <p><span className="font-medium">Expected Graduation:</span> {student.lifecycleTracking.expectedGraduation}</p>
                            <p><span className="font-medium">Alumni Status:</span> {student.lifecycleTracking.alumniStatus}</p>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No lifecycle data available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    {student.timeline && (
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Timeline</CardTitle>
                        </CardHeader>
                        <CardContent>
                          <div className="relative border-l border-border pl-6 py-2 space-y-6">
                            {student.timeline.map((item, index) => (
                              <div key={index} className="relative">
                                <div className={`absolute -left-[27px] h-4 w-4 rounded-full border ${
                                  item.status === 'completed' ? 'bg-primary border-primary' : 
                                  item.status === 'current' ? 'bg-background border-primary' : 
                                  'bg-background border-muted-foreground'
                                }`} />
                                <div className="mb-1 text-sm text-muted-foreground">{item.date}</div>
                                <div className="font-medium">{item.title}</div>
                              </div>
                            ))}
                          </div>
                        </CardContent>
                      </Card>
                    )}
                  </TabsContent>
                  
                  <TabsContent value="opportunities" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Opportunities</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.opportunities && student.opportunities.length > 0 ? (
                          <div className="space-y-4">
                            {student.opportunities.map((opportunity, index) => (
                              <div key={index} className="border-b border-border pb-3 last:border-0">
                                <div className="flex justify-between">
                                  <div>
                                    <Badge variant="outline">{opportunity.type}</Badge>
                                    <h4 className="font-medium mt-1">
                                      {opportunity.company ? `${opportunity.company} - ${opportunity.role}` : opportunity.title}
                                    </h4>
                                  </div>
                                  <Badge 
                                    variant={
                                      opportunity.status === "Active" ? "default" : 
                                      opportunity.status === "Upcoming" ? "secondary" : 
                                      opportunity.status === "Selected" ? "default" : 
                                      "outline"
                                    }
                                  >
                                    {opportunity.status}
                                  </Badge>
                                </div>
                                <div className="mt-1 text-sm text-muted-foreground">
                                  {opportunity.duration ? `Duration: ${opportunity.duration}` : `Start Date: ${opportunity.startDate}`}
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No opportunities data available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Feedback Provided</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.feedback && student.feedback.length > 0 ? (
                          <div className="space-y-4">
                            {student.feedback.map((feedback, index) => (
                              <div key={index} className="border-b border-border pb-3 last:border-0">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{feedback.subject}</h4>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-amber-500 mr-1" />
                                    <span>{feedback.rating}/5</span>
                                  </div>
                                </div>
                                <p className="mt-1">{feedback.comment}</p>
                                <p className="text-xs text-muted-foreground mt-1">{feedback.date}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No feedback data available</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="certificates" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Certificates & Achievements</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.certificates && student.certificates.length > 0 ? (
                          <div className="space-y-3">
                            {student.certificates.map((certificate, index) => (
                              <div key={index} className="border-b border-border pb-3 last:border-0">
                                <h4 className="font-medium">{certificate.title}</h4>
                                <p className="text-sm">Issued by: {certificate.issuedBy}</p>
                                <div className="flex justify-between mt-1">
                                  <p className="text-sm text-muted-foreground">Issued: {certificate.issuedDate}</p>
                                  <p className="text-sm text-muted-foreground">ID: {certificate.verificationId}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No certificates data available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Badges Earned</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {student.badgesEarned && student.badgesEarned.length > 0 ? (
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            {student.badgesEarned.map((badge, index) => (
                              <div key={index} className="flex items-start gap-3">
                                <div className="rounded-full bg-primary/10 p-2 flex-shrink-0">
                                  <Award className="h-5 w-5 text-primary" />
                                </div>
                                <div>
                                  <h4 className="font-medium">{badge.name}</h4>
                                  <p className="text-sm text-muted-foreground">{badge.description}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No badges data available</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];

const teacherColumns: ColumnDef<Teacher>[] = [
  {
    accessorKey: 'name',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Name
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('name')}</div>
    ),
  },
  {
    accessorKey: 'department',
    header: 'Department',
  },
  {
    accessorKey: 'position',
    header: 'Position',
  },
  {
    accessorKey: 'avgFeedback',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Feedback
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
    cell: ({ row }) => (
      <div className="flex items-center">
        <Star className="h-4 w-4 text-amber-500 mr-1" />
        <span>{row.getValue('avgFeedback')}</span>
      </div>
    ),
  },
  {
    accessorKey: 'studentsMentored',
    header: ({ column }) => (
      <div
        className="flex items-center cursor-pointer"
        onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
      >
        Students
        <ArrowUpDown className="ml-2 h-4 w-4" />
      </div>
    ),
  },
  {
    id: 'actions',
    cell: ({ row }) => {
      const teacher = row.original;
      const [showDetails, setShowDetails] = useState(false);
      
      return (
        <>
          <Button variant="outline" size="sm" onClick={() => setShowDetails(true)}>
            <Eye className="mr-2 h-4 w-4" />
            View
          </Button>
          
          <Dialog open={showDetails} onOpenChange={setShowDetails}>
            <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto">
              <DialogHeader>
                <DialogTitle>Staff Details</DialogTitle>
                <DialogDescription>
                  Complete profile information for {teacher.name}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <Tabs defaultValue="basic">
                  <TabsList className="grid grid-cols-2 md:grid-cols-5 mb-4">
                    <TabsTrigger value="basic">Basic Info</TabsTrigger>
                    <TabsTrigger value="performance">Performance</TabsTrigger>
                    <TabsTrigger value="research">Research</TabsTrigger>
                    <TabsTrigger value="teaching">Teaching</TabsTrigger>
                    <TabsTrigger value="training">Training</TabsTrigger>
                  </TabsList>
                  
                  <TabsContent value="basic" className="space-y-4">
                    <div className="flex items-center gap-4 mb-4">
                      <Avatar className="h-16 w-16">
                        <AvatarFallback className="text-xl">{teacher.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 className="text-xl font-semibold">{teacher.name}</h3>
                        <div className="text-muted-foreground">
                          <p>{teacher.position} • {teacher.department}</p>
                          <div className="flex items-center gap-4 mt-1">
                            <div className="flex items-center gap-1">
                              <Mail className="h-4 w-4" />
                              <span>{teacher.email}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Phone className="h-4 w-4" />
                              <span>{teacher.phone}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Education</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {teacher.resume?.education ? (
                            <div className="space-y-3">
                              {teacher.resume.education.map((edu, index) => (
                                <div key={index} className="border-b border-border pb-2 last:border-0">
                                  <p className="font-medium">{edu.degree}</p>
                                  <p className="text-sm">{edu.institution}, {edu.year}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No education data available</p>
                          )}
                        </CardContent>
                      </Card>
                      
                      <Card>
                        <CardHeader>
                          <CardTitle className="text-base">Experience</CardTitle>
                        </CardHeader>
                        <CardContent>
                          {teacher.resume?.experience ? (
                            <div className="space-y-3">
                              {teacher.resume.experience.map((exp, index) => (
                                <div key={index} className="border-b border-border pb-2 last:border-0">
                                  <p className="font-medium">{exp.position}</p>
                                  <p className="text-sm">{exp.institution}, {exp.duration}</p>
                                </div>
                              ))}
                            </div>
                          ) : (
                            <p className="text-muted-foreground">No experience data available</p>
                          )}
                        </CardContent>
                      </Card>
                    </div>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Awards & Recognition</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacher.resume?.awards ? (
                          <div className="space-y-3">
                            {teacher.resume.awards.map((award, index) => (
                              <div key={index} className="border-b border-border pb-2 last:border-0">
                                <p className="font-medium">{award.name}</p>
                                <p className="text-sm">{award.organization}, {award.year}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No awards data available</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="performance" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Performance Evaluation</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacher.evaluations ? (
                          <div className="space-y-4">
                            <div>
                              <h4 className="font-medium mb-2">Student Feedback</h4>
                              <div className="space-y-2">
                                {teacher.evaluations.studentFeedback.map((feedback, index) => (
                                  <div key={index} className="border-b border-border pb-2 last:border-0">
                                    <div className="flex justify-between">
                                      <span>{feedback.year}</span>
                                      <div className="flex items-center">
                                        <Star className="h-4 w-4 text-amber-500 mr-1" />
                                        <span>{feedback.score}/5</span>
                                      </div>
                                    </div>
                                    <p className="text-sm mt-1">{feedback.comments}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Peer Review</h4>
                              <div className="space-y-2">
                                {teacher.evaluations.peerReview.map((review, index) => (
                                  <div key={index} className="border-b border-border pb-2 last:border-0">
                                    <div className="flex justify-between">
                                      <span>{review.year}</span>
                                      <div className="flex items-center">
                                        <Star className="h-4 w-4 text-amber-500 mr-1" />
                                        <span>{review.score}/5</span>
                                      </div>
                                    </div>
                                    <p className="text-sm mt-1">Reviewer: {review.reviewer}</p>
                                    <p className="text-sm">{review.comments}</p>
                                  </div>
                                ))}
                              </div>
                            </div>
                            
                            <div>
                              <h4 className="font-medium mb-2">Department Assessment</h4>
                              <div className="space-y-2">
                                <p><span className="font-medium">Last Assessment:</span> {teacher.evaluations.departmentAssessment.lastAssessment}</p>
                                <p><span className="font-medium">Score:</span> {teacher.evaluations.departmentAssessment.score}/5</p>
                                
                                <div>
                                  <p className="font-medium">Strengths:</p>
                                  <ul className="list-disc list-inside">
                                    {teacher.evaluations.departmentAssessment.strengths.map((strength, index) => (
                                      <li key={index} className="text-sm">{strength}</li>
                                    ))}
                                  </ul>
                                </div>
                                
                                <div>
                                  <p className="font-medium">Areas for Improvement:</p>
                                  <ul className="list-disc list-inside">
                                    {teacher.evaluations.departmentAssessment.areasForImprovement.map((area, index) => (
                                      <li key={index} className="text-sm">{area}</li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No performance evaluation data available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">AI Feedback Summary</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacher.aiFeedback ? (
                          <div className="space-y-4">
                            <p>{teacher.aiFeedback.summary}</p>
                            
                            <div>
                              <h4 className="font-medium mb-2">Recommendations</h4>
                              <ul className="list-disc list-inside">
                                {teacher.aiFeedback.recommendations.map((rec, index) => (
                                  <li key={index}>{rec}</li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No AI feedback data available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Performance Dashboard</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacher.performanceDashboard ? (
                          <div className="space-y-3">
                            <div>
                              <h4 className="font-medium mb-2">Institution Comparison</h4>
                              <div className="space-y-2">
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span>Research Output</span>
                                    <div className="text-right">
                                      <span className="font-medium">{teacher.performanceDashboard.institutionComparison.researchOutput.personal}</span>
                                      <span className="text-muted-foreground text-sm"> / 5.0</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-muted rounded-full h-2">
                                    <div 
                                      className="bg-primary rounded-full h-2" 
                                      style={{ width: `${(teacher.performanceDashboard.institutionComparison.researchOutput.personal / 5) * 100}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>Dept Avg: {teacher.performanceDashboard.institutionComparison.researchOutput.departmentAvg}</span>
                                    <span>Inst Avg: {teacher.performanceDashboard.institutionComparison.researchOutput.institutionAvg}</span>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span>Teaching Effectiveness</span>
                                    <div className="text-right">
                                      <span className="font-medium">{teacher.performanceDashboard.institutionComparison.teachingEffectiveness.personal}</span>
                                      <span className="text-muted-foreground text-sm"> / 5.0</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-muted rounded-full h-2">
                                    <div 
                                      className="bg-primary rounded-full h-2" 
                                      style={{ width: `${(teacher.performanceDashboard.institutionComparison.teachingEffectiveness.personal / 5) * 100}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>Dept Avg: {teacher.performanceDashboard.institutionComparison.teachingEffectiveness.departmentAvg}</span>
                                    <span>Inst Avg: {teacher.performanceDashboard.institutionComparison.teachingEffectiveness.institutionAvg}</span>
                                  </div>
                                </div>
                                
                                <div>
                                  <div className="flex justify-between mb-1">
                                    <span>Student Mentoring</span>
                                    <div className="text-right">
                                      <span className="font-medium">{teacher.performanceDashboard.institutionComparison.studentMentoring.personal}</span>
                                      <span className="text-muted-foreground text-sm"> / 5.0</span>
                                    </div>
                                  </div>
                                  <div className="w-full bg-muted rounded-full h-2">
                                    <div 
                                      className="bg-primary rounded-full h-2" 
                                      style={{ width: `${(teacher.performanceDashboard.institutionComparison.studentMentoring.personal / 5) * 100}%` }}
                                    />
                                  </div>
                                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                                    <span>Dept Avg: {teacher.performanceDashboard.institutionComparison.studentMentoring.departmentAvg}</span>
                                    <span>Inst Avg: {teacher.performanceDashboard.institutionComparison.studentMentoring.institutionAvg}</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No performance dashboard data available</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="research" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Publications</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacher.publications && teacher.publications.length > 0 ? (
                          <div className="space-y-4">
                            {teacher.publications.map((pub, index) => (
                              <div key={index} className="border-b border-border pb-3 last:border-0">
                                <h4 className="font-medium">{pub.title}</h4>
                                <p className="text-sm">{pub.journal}, {pub.year}</p>
                                <div className="flex items-center gap-1 mt-1">
                                  <FileText className="h-4 w-4 text-muted-foreground" />
                                  <span className="text-sm text-muted-foreground">Citations: {pub.citations}</span>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No publications data available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Government Schemes & Grants</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacher.governmentSchemes && teacher.governmentSchemes.length > 0 ? (
                          <div className="space-y-3">
                            {teacher.governmentSchemes.map((scheme, index) => (
                              <div key={index} className="border-b border-border pb-3 last:border-0">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{scheme.name}</h4>
                                  <Badge variant={scheme.status === "Completed" ? "outline" : "default"}>
                                    {scheme.status}
                                  </Badge>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <p className="text-sm">{scheme.year}</p>
                                  <p className="text-sm font-medium">{scheme.amount}</p>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">Outcome: {scheme.outcome}</p>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No government schemes data available</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="teaching" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Teaching History</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacher.teachingHistory && teacher.teachingHistory.length > 0 ? (
                          <div className="space-y-3">
                            {teacher.teachingHistory.map((course, index) => (
                              <div key={index} className="border-b border-border pb-3 last:border-0">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{course.course}</h4>
                                  <div className="flex items-center">
                                    <Star className="h-4 w-4 text-amber-500 mr-1" />
                                    <span>{course.feedback}</span>
                                  </div>
                                </div>
                                <div className="flex justify-between mt-1">
                                  <p className="text-sm">{course.semester}</p>
                                  <p className="text-sm">Students: {course.students}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No teaching history data available</p>
                        )}
                      </CardContent>
                    </Card>
                    
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Mentorship Record</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacher.mentorshipRecord && teacher.mentorshipRecord.length > 0 ? (
                          <div className="space-y-3">
                            {teacher.mentorshipRecord.map((mentorship, index) => (
                              <div key={index} className="border-b border-border pb-3 last:border-0">
                                <div className="flex justify-between">
                                  <h4 className="font-medium">{mentorship.studentName}</h4>
                                  <Badge variant={mentorship.status === "Completed" ? "outline" : "default"}>
                                    {mentorship.status}
                                  </Badge>
                                </div>
                                <p className="text-sm">Project: {mentorship.project}</p>
                                {mentorship.outcome && (
                                  <p className="text-sm text-muted-foreground mt-1">Outcome: {mentorship.outcome}</p>
                                )}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No mentorship record data available</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                  
                  <TabsContent value="training" className="space-y-4">
                    <Card>
                      <CardHeader>
                        <CardTitle className="text-base">Training & Upskilling</CardTitle>
                      </CardHeader>
                      <CardContent>
                        {teacher.training && teacher.training.length > 0 ? (
                          <div className="space-y-3">
                            {teacher.training.map((training, index) => (
                              <div key={index} className="border-b border-border pb-3 last:border-0">
                                <h4 className="font-medium">{training.course}</h4>
                                <p className="text-sm">Platform: {training.platform}</p>
                                <div className="flex justify-between mt-1">
                                  <p className="text-sm text-muted-foreground">Completed: {training.completionDate}</p>
                                  <p className="text-sm text-muted-foreground">Certificate ID: {training.certificateId}</p>
                                </div>
                              </div>
                            ))}
                          </div>
                        ) : (
                          <p className="text-muted-foreground">No training data available</p>
                        )}
                      </CardContent>
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>
            </DialogContent>
          </Dialog>
        </>
      );
    },
  },
];

export default function StaffPage() {
  const [activeTab, setActiveTab] = useState<string>("students");
  const [departmentFilter, setDepartmentFilter] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState<string>("");
  
  // Filter data based on department and search query
  const filteredStudents = studentsData.filter(student => {
    const matchesDepartment = departmentFilter === "all" || student.department === departmentFilter;
    const matchesSearch = student.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         student.department.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });
  
  const filteredTeachers = teachersData.filter(teacher => {
    const matchesDepartment = departmentFilter === "all" || teacher.department === departmentFilter;
    const matchesSearch = teacher.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         teacher.department.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         teacher.position.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesDepartment && matchesSearch;
  });
  
  // Get unique departments for filter
  const departments = Array.from(
    new Set([...studentsData, ...teachersData].map(item => item.department))
  );

  const handleExportData = () => {
    toast.success(`${activeTab === "students" ? "Student" : "Staff"} data exported successfully!`);
    toast.info("File downloaded to your downloads folder");
  };

  const handleAddNew = () => {
    toast.info(`Add new ${activeTab === "students" ? "student" : "staff member"} functionality coming soon!`);
  };

  return (
    <DashboardLayout requiredRole="institution" title="Staff & Students">
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Staff & Students</h1>
        <p className="text-muted-foreground mt-2">
          Manage all staff and student data in one place
        </p>
      </div>

      <div className="mb-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <div className="flex items-center justify-between mb-4">
            <TabsList>
              <TabsTrigger value="students">Students</TabsTrigger>
              <TabsTrigger value="staff">Staff</TabsTrigger>
            </TabsList>
            
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm" onClick={handleExportData}>
                <FileDown className="mr-2 h-4 w-4" />
                Export Data
              </Button>
              <Button size="sm" onClick={handleAddNew}>
                <Plus className="mr-2 h-4 w-4" />
                Add New {activeTab === "students" ? "Student" : "Staff"}
              </Button>
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row items-start md:items-center gap-4 mb-6">
            <div className="flex-1 w-full">
              <div className="relative">
                <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input 
                  placeholder={`Search ${activeTab}...`}
                  className="pl-8"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Department:</span>
              <Select value={departmentFilter} onValueChange={setDepartmentFilter}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {departments.map((dept, index) => (
                    <SelectItem key={index} value={dept}>{dept}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <TabsContent value="students">
            <Card>
              <CardContent className="p-0">
                <DataTable 
                  columns={studentColumns} 
                  data={filteredStudents} 
                />
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border p-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredStudents.length} of {studentsData.length} students
                </div>
                <Button variant="outline" size="sm" className="gap-1" onClick={handleExportData}>
                  <Download className="h-4 w-4" />
                  Download CSV
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          <TabsContent value="staff">
            <Card>
              <CardContent className="p-0">
                <DataTable 
                  columns={teacherColumns} 
                  data={filteredTeachers} 
                />
              </CardContent>
              <CardFooter className="flex items-center justify-between border-t border-border p-4">
                <div className="text-sm text-muted-foreground">
                  Showing {filteredTeachers.length} of {teachersData.length} staff members
                </div>
                <Button variant="outline" size="sm" className="gap-1" onClick={handleExportData}>
                  <Download className="h-4 w-4" />
                  Download CSV
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </DashboardLayout>
  );
}