import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Search,
  Filter,
  ChevronDown,
  ChevronUp,
  FileText,
  UserCheck,
  ClipboardList,
  Clock,
  Calendar,
  BookOpen
} from 'lucide-react';
import teachersData from '@/data/teachers.json';
import studentsData from '@/data/students.json';

export default function TeacherStudents() {
  const [teacherData, setTeacherData] = useState<any>(null);
  const [myStudents, setMyStudents] = useState<any[]>([]);
  const [filteredStudents, setFilteredStudents] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{
    key: string;
    direction: 'ascending' | 'descending';
  } | null>(null);

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
    setFilteredStudents(students);
  }, []);

  useEffect(() => {
    if (!myStudents.length) return;
    
    const filtered = myStudents.filter(student => 
      student.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      student.department.toLowerCase().includes(searchQuery.toLowerCase())
    );
    
    setFilteredStudents(filtered);
  }, [searchQuery, myStudents]);

  const handleSort = (key: string) => {
    let direction: 'ascending' | 'descending' = 'ascending';
    
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'ascending') {
      direction = 'descending';
    }
    
    setSortConfig({ key, direction });
    
    const sortedData = [...filteredStudents].sort((a, b) => {
      if (key === 'name' || key === 'department') {
        return direction === 'ascending'
          ? a[key].localeCompare(b[key])
          : b[key].localeCompare(a[key]);
      } else if (key === 'cgpa' || key === 'year') {
        return direction === 'ascending'
          ? a[key] - b[key]
          : b[key] - a[key];
      } else if (key === 'performance.academic.classRank') {
        const aRank = a.performance?.academic?.classRank || 999;
        const bRank = b.performance?.academic?.classRank || 999;
        return direction === 'ascending'
          ? aRank - bRank
          : bRank - aRank;
      }
      return 0;
    });
    
    setFilteredStudents(sortedData);
  };

  const getSortIcon = (key: string) => {
    if (!sortConfig || sortConfig.key !== key) {
      return <ChevronDown className="h-4 w-4 opacity-50" />;
    }
    return sortConfig.direction === 'ascending' 
      ? <ChevronUp className="h-4 w-4" /> 
      : <ChevronDown className="h-4 w-4" />;
  };

  if (!teacherData) {
    return (
      <DashboardLayout requiredRole="teacher" title="My Students">
        <div className="flex items-center justify-center h-64">
          <p>Loading teacher data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredRole="teacher" title="My Students">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">My Students</h1>
        <p className="text-muted-foreground">
          View, manage, and track the progress of students under your mentorship
        </p>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="list">List View</TabsTrigger>
          <TabsTrigger value="card">Card View</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>
        
        <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
          <div className="relative w-full md:w-1/3">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search students..."
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex gap-2">
            <Button variant="outline" size="sm" className="gap-1">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
            <Button variant="outline" size="sm">Export</Button>
          </div>
        </div>

        <TabsContent value="list" className="mt-0">
          <Card>
            <CardContent className="p-0">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[250px] cursor-pointer" onClick={() => handleSort('name')}>
                      <div className="flex items-center gap-1">
                        Student {getSortIcon('name')}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('department')}>
                      <div className="flex items-center gap-1">
                        Department {getSortIcon('department')}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('year')}>
                      <div className="flex items-center gap-1">
                        Year {getSortIcon('year')}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('cgpa')}>
                      <div className="flex items-center gap-1">
                        CGPA {getSortIcon('cgpa')}
                      </div>
                    </TableHead>
                    <TableHead className="cursor-pointer" onClick={() => handleSort('performance.academic.classRank')}>
                      <div className="flex items-center gap-1">
                        Rank {getSortIcon('performance.academic.classRank')}
                      </div>
                    </TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {filteredStudents.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        No students found
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredStudents.map((student) => (
                      <TableRow key={student.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <Avatar className="h-8 w-8">
                              <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div>
                              <div className="font-medium">{student.name}</div>
                              <div className="text-sm text-muted-foreground">
                                ID: {student.aadharMasked}
                              </div>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{student.department}</TableCell>
                        <TableCell>{student.year}</TableCell>
                        <TableCell>
                          <Badge variant={student.cgpa >= 8.5 ? "secondary" : student.cgpa >= 7.5 ? "default" : "outline"}>
                            {student.cgpa}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          {student.performance?.academic?.classRank || "N/A"}
                        </TableCell>
                        <TableCell className="text-right">
                          <div className="flex justify-end gap-2">
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/teacher/students/${student.id}`}>
                                <UserCheck className="h-4 w-4 mr-1" />
                                Profile
                              </Link>
                            </Button>
                            <Button variant="outline" size="sm" asChild>
                              <Link to={`/teacher/students/${student.id}/logbook`}>
                                <FileText className="h-4 w-4 mr-1" />
                                Logbook
                              </Link>
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>
        
        <TabsContent value="card" className="mt-0">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredStudents.length === 0 ? (
              <div className="col-span-full text-center py-12">
                <p className="text-muted-foreground">No students found</p>
              </div>
            ) : (
              filteredStudents.map((student) => (
                <Card key={student.id} className="overflow-hidden">
                  <CardHeader className="pb-2">
                    <div className="flex items-start justify-between">
                      <div className="flex items-center gap-3">
                        <Avatar className="h-10 w-10 border border-border">
                          <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <CardTitle className="text-lg">{student.name}</CardTitle>
                          <p className="text-sm text-muted-foreground">{student.department}</p>
                        </div>
                      </div>
                      <Badge variant="outline">Year {student.year}</Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-2 mb-4">
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">CGPA</p>
                        <p className="text-sm font-medium">{student.cgpa}</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Class Rank</p>
                        <p className="text-sm font-medium">
                          {student.performance?.academic?.classRank || "N/A"}
                        </p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Attendance</p>
                        <p className="text-sm font-medium">{student.attendance}%</p>
                      </div>
                      <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Aadhar ID</p>
                        <p className="text-sm font-medium">{student.aadharMasked}</p>
                      </div>
                    </div>

                    {student.mentorship && (
                      <div className="border-t pt-3 mb-3">
                        <div className="flex items-center gap-2 text-sm mb-2">
                          <Calendar className="h-4 w-4 text-primary" />
                          <span className="text-muted-foreground">Next Meeting:</span>
                          <span className="font-medium">
                            {new Date(student.mentorship.nextMeeting).toLocaleDateString()}
                          </span>
                        </div>
                        <div className="flex items-start gap-2 text-sm">
                          <Clock className="h-4 w-4 text-primary mt-0.5" />
                          <div>
                            <span className="text-muted-foreground">Notes:</span>
                            <p className="font-medium">{student.mentorship.notes}</p>
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="flex gap-2 pt-2">
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/teacher/students/${student.id}`}>
                          <UserCheck className="h-4 w-4 mr-1" />
                          Profile
                        </Link>
                      </Button>
                      <Button variant="outline" size="sm" className="flex-1" asChild>
                        <Link to={`/teacher/students/${student.id}/logbook`}>
                          <FileText className="h-4 w-4 mr-1" />
                          Logbook
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </TabsContent>
        
        <TabsContent value="analytics" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Performance Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-8">
                  <div>
                    <h3 className="text-sm font-medium mb-2">CGPA Distribution</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <span className="text-xs w-16">9.0 - 10.0</span>
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${filteredStudents.filter(s => s.cgpa >= 9.0).length / filteredStudents.length * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs w-8 text-right">
                          {filteredStudents.filter(s => s.cgpa >= 9.0).length}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs w-16">8.0 - 8.9</span>
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${filteredStudents.filter(s => s.cgpa >= 8.0 && s.cgpa < 9.0).length / filteredStudents.length * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs w-8 text-right">
                          {filteredStudents.filter(s => s.cgpa >= 8.0 && s.cgpa < 9.0).length}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs w-16">7.0 - 7.9</span>
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${filteredStudents.filter(s => s.cgpa >= 7.0 && s.cgpa < 8.0).length / filteredStudents.length * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs w-8 text-right">
                          {filteredStudents.filter(s => s.cgpa >= 7.0 && s.cgpa < 8.0).length}
                        </span>
                      </div>
                      <div className="flex items-center">
                        <span className="text-xs w-16">Below 7.0</span>
                        <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                          <div 
                            className="bg-primary h-full rounded-full" 
                            style={{ width: `${filteredStudents.filter(s => s.cgpa < 7.0).length / filteredStudents.length * 100}%` }}
                          ></div>
                        </div>
                        <span className="text-xs w-8 text-right">
                          {filteredStudents.filter(s => s.cgpa < 7.0).length}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Year-wise Distribution</h3>
                    <div className="space-y-2">
                      {[1, 2, 3, 4].map(year => (
                        <div className="flex items-center" key={year}>
                          <span className="text-xs w-16">Year {year}</span>
                          <div className="flex-1 bg-muted rounded-full h-2 overflow-hidden">
                            <div 
                              className="bg-primary h-full rounded-full" 
                              style={{ width: `${filteredStudents.filter(s => s.year === year).length / filteredStudents.length * 100}%` }}
                            ></div>
                          </div>
                          <span className="text-xs w-8 text-right">
                            {filteredStudents.filter(s => s.year === year).length}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Mentorship Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {filteredStudents.length}
                      </div>
                      <p className="text-sm text-muted-foreground">Total Students</p>
                    </div>
                    <div className="bg-card border border-border rounded-lg p-4 text-center">
                      <div className="text-3xl font-bold text-primary mb-1">
                        {filteredStudents.filter(s => s.mentorship && new Date(s.mentorship.nextMeeting) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)).length}
                      </div>
                      <p className="text-sm text-muted-foreground">Upcoming Meetings</p>
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-3">Upcoming Mentorship Meetings</h3>
                    <div className="space-y-3">
                      {filteredStudents
                        .filter(s => s.mentorship && new Date(s.mentorship.nextMeeting) > new Date())
                        .sort((a, b) => new Date(a.mentorship.nextMeeting).getTime() - new Date(b.mentorship.nextMeeting).getTime())
                        .slice(0, 3)
                        .map(student => (
                          <div key={student.id} className="flex items-center justify-between border-b border-border pb-2">
                            <div className="flex items-center gap-2">
                              <Avatar className="h-8 w-8">
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                              </Avatar>
                              <div>
                                <p className="text-sm font-medium">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.department}</p>
                              </div>
                            </div>
                            <Badge variant="outline" className="ml-auto">
                              {new Date(student.mentorship.nextMeeting).toLocaleDateString()}
                            </Badge>
                          </div>
                        ))}
                        
                        {filteredStudents.filter(s => s.mentorship && new Date(s.mentorship.nextMeeting) > new Date()).length === 0 && (
                          <p className="text-sm text-muted-foreground text-center py-4">
                            No upcoming meetings scheduled
                          </p>
                        )}
                    </div>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium mb-2">Focus Areas</h3>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <BookOpen className="h-4 w-4 text-primary mr-2" />
                        <span className="text-xs flex-1">Academic Performance</span>
                        <Badge variant="secondary">
                          {filteredStudents.filter(s => s.cgpa < 7.5).length} students
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <ClipboardList className="h-4 w-4 text-primary mr-2" />
                        <span className="text-xs flex-1">Logbook Completion</span>
                        <Badge variant="secondary">
                          {Math.floor(filteredStudents.length * 0.3)} students
                        </Badge>
                      </div>
                      <div className="flex items-center">
                        <Calendar className="h-4 w-4 text-primary mr-2" />
                        <span className="text-xs flex-1">Mentorship Meeting Due</span>
                        <Badge variant="secondary">
                          {filteredStudents.filter(s => s.mentorship && new Date(s.mentorship.nextMeeting) <= new Date()).length} students
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}