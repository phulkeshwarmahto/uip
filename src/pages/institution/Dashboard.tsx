import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import { DataTable } from '@/components/dashboard/DataTable';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import { ColumnDef } from '@tanstack/react-table';
import { Link } from 'react-router-dom';
import { 
  Users, 
  GraduationCap, 
  Briefcase, 
  BarChart2,
  FileDown,
  ChevronDown,
  ArrowUpDown
} from 'lucide-react';
import institutionData from '@/data/institution.json';
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

// Define student table columns
type Student = {
  id: number;
  name: string;
  department: string;
  year: number;
  cgpa: number;
  attendance: number;
};

const columns: ColumnDef<Student>[] = [
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
      <Link to={`/institution/students/${row.original.id}`} className="font-medium hover:underline">
        {row.getValue('name')}
      </Link>
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
    cell: ({ row }) => (
      <div className="font-medium">{row.getValue('cgpa')}</div>
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
    cell: ({ row }) => (
      <div className="flex gap-2">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/institution/students/${row.original.id}`}>
            View
          </Link>
        </Button>
      </div>
    ),
  },
];

export default function InstitutionDashboard() {
  const [data, setData] = useState<any>(null);
  const [students, setStudents] = useState<Student[]>([]);
  const [selectedDepartment, setSelectedDepartment] = useState<string>('all');
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For the prototype, we'll use the mock data
    setData(institutionData);
    setStudents(studentsData);
  }, []);

  const filteredStudents = selectedDepartment === 'all' 
    ? students 
    : students.filter(student => student.department === selectedDepartment);

  const handleDepartmentChange = (value: string) => {
    setSelectedDepartment(value);
  };

  const handleGenerateReport = () => {
    toast.success('NIRF Report generated successfully! Downloading CSV...');
    
    // In a real app, this would trigger an actual download
    setTimeout(() => {
      toast.info('Download complete. File saved to your downloads folder.');
    }, 1500);
  };

  if (!data) {
    return (
      <DashboardLayout requiredRole="institution" title="Institution Dashboard">
        <div className="flex items-center justify-center h-64">
          <p>Loading institution data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredRole="institution" title="Institution Dashboard">
      {/* Welcome header */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{data.name} - Admin Dashboard</h1>
            <p className="text-muted-foreground mt-2">{data.fullName}, {data.location}</p>
          </div>
          
          <div className="flex items-center gap-2 px-4 py-2 bg-card border border-border rounded-lg">
            <div className="text-sm text-muted-foreground">NIRF Rank:</div>
            <div className="text-2xl font-bold text-primary">{data.nirfRank}</div>
          </div>
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
            title="Total Students"
            value={data.totalStudents}
            icon={<GraduationCap className="h-5 w-5 text-primary" />}
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.1 }}>
          <StatCard
            title="Total Teachers"
            value={data.totalTeachers}
            icon={<Users className="h-5 w-5 text-primary" />}
            colorVariant="success"
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.2 }}>
          <StatCard
            title="Active Govt. Schemes"
            value={data.activeGovtSchemes}
            icon={<Briefcase className="h-5 w-5 text-primary" />}
            colorVariant="secondary"
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.3 }}>
          <StatCard
            title="Placement Rate"
            value={`${data.placementRate}%`}
            icon={<BarChart2 className="h-5 w-5 text-primary" />}
            colorVariant="warning"
            trend={{ value: 2, isPositive: true }}
          />
        </motion.div>
      </motion.div>

      {/* Students data table */}
      <div className="mb-8">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-6">
          <h2 className="text-2xl font-semibold">Students</h2>
          
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <span className="text-sm text-muted-foreground">Department:</span>
              <Select value={selectedDepartment} onValueChange={handleDepartmentChange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="All Departments" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Departments</SelectItem>
                  {data.departments.map((dept: any) => (
                    <SelectItem key={dept.id} value={dept.name}>
                      {dept.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <Button 
              variant="default" 
              className="gap-2"
              onClick={handleGenerateReport}
            >
              <FileDown className="h-4 w-4" />
              Generate NIRF Report
            </Button>
          </div>
        </div>
        
        <DataTable 
          columns={columns} 
          data={filteredStudents} 
          searchPlaceholder="Search students..."
        />
      </div>
    </DashboardLayout>
  );
}