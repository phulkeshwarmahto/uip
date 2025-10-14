import { useState } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { Progress } from '@/components/ui/progress';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { toast } from 'sonner';
import {
  FileText,
  Download,
  Calendar,
  CheckCircle,
  AlertCircle,
  Clock,
  FileCheck,
  BarChart4,
  Users,
  Building,
  FileSpreadsheet,
} from 'lucide-react';

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

export default function InstitutionReports() {
  const [selectedReport, setSelectedReport] = useState('nirf');
  const [selectedYear, setSelectedYear] = useState('2025');
  const [selectedFormat, setSelectedFormat] = useState('csv');
  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [reportType, setReportType] = useState('');
  
  // Report types and descriptions
  const reportTypes = [
    { 
      id: 'nirf', 
      name: 'NIRF Report', 
      description: 'National Institutional Ranking Framework report with key metrics for institutional ranking.',
      icon: <Building className="h-6 w-6" />,
      lastGenerated: '2024-09-15',
      status: 'Complete',
      sections: [
        'Institutional Information',
        'Student Strength',
        'Faculty Information',
        'Research Publications',
        'Sponsored Research',
        'Consultancy Projects',
        'Executive Development Programs',
        'Patents',
        'Financial Resources',
        'Facilities',
      ]
    },
    { 
      id: 'aishe', 
      name: 'AISHE Report', 
      description: 'All India Survey on Higher Education report for government statistics and policy planning.',
      icon: <BarChart4 className="h-6 w-6" />,
      lastGenerated: '2024-08-22',
      status: 'Complete',
      sections: [
        'Basic Institution Details',
        'Geographical Reference',
        'Staff Information',
        'Programme Information',
        'Student Enrollment',
        'Examination Results',
        'Financial Information',
        'Infrastructure',
        'Scholarship/Fellowship',
        'Availability of Hostels',
      ]
    },
    { 
      id: 'apar', 
      name: 'APAR Report', 
      description: 'Annual Performance Assessment Report for faculty and staff performance evaluation.',
      icon: <Users className="h-6 w-6" />,
      lastGenerated: '2024-10-01',
      status: 'In Progress',
      sections: [
        'Personal Information',
        'Academic Qualifications',
        'Teaching Activities',
        'Research Activities',
        'Administrative Responsibilities',
        'Extension Activities',
        'Professional Development',
        'Contributions to Corporate Life',
        'Assessment by Department Head',
        'Assessment by Institution Head',
      ]
    }
  ];

  const handleReportTypeChange = (value: string) => {
    setSelectedReport(value);
  };

  const handleYearChange = (value: string) => {
    setSelectedYear(value);
  };

  const handleFormatChange = (value: string) => {
    setSelectedFormat(value);
  };

  const handleGenerateReport = () => {
    setIsGenerating(true);
    setProgress(0);
    
    // Simulate report generation with progress updates
    const interval = setInterval(() => {
      setProgress(prev => {
        const newProgress = prev + Math.floor(Math.random() * 15);
        if (newProgress >= 100) {
          clearInterval(interval);
          setTimeout(() => {
            setIsGenerating(false);
            toast.success(`${getReportName(selectedReport)} generated successfully!`);
          }, 500);
          return 100;
        }
        return newProgress;
      });
    }, 300);
  };

  const handlePreviewReport = (type: string) => {
    setReportType(type);
    setShowPreviewModal(true);
  };

  const handleDownloadReport = () => {
    toast.success(`${getReportName(reportType)} downloaded successfully!`);
    setShowPreviewModal(false);
  };

  const getReportName = (type: string) => {
    const report = reportTypes.find(r => r.id === type);
    return report ? report.name : 'Report';
  };

  const getStatusBadge = (status: string) => {
    if (status === 'Complete') {
      return (
        <div className="flex items-center gap-1 text-green-600 dark:text-green-400">
          <CheckCircle className="h-4 w-4" />
          <span>Complete</span>
        </div>
      );
    } else if (status === 'In Progress') {
      return (
        <div className="flex items-center gap-1 text-amber-600 dark:text-amber-400">
          <Clock className="h-4 w-4" />
          <span>In Progress</span>
        </div>
      );
    } else {
      return (
        <div className="flex items-center gap-1 text-red-600 dark:text-red-400">
          <AlertCircle className="h-4 w-4" />
          <span>Not Started</span>
        </div>
      );
    }
  };

  return (
    <DashboardLayout requiredRole="institution" title="Reports">
      {/* Header */}
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">Compliance Reports</h1>
            <p className="text-muted-foreground mt-2">
              Generate and manage reports for NIRF, AISHE, and APAR submissions
            </p>
          </div>
        </div>
      </motion.div>

      {/* Report Types */}
      <div className="mb-8">
        <Tabs defaultValue="generate" className="w-full">
          <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
            <TabsTrigger value="generate">Generate</TabsTrigger>
            <TabsTrigger value="history">History</TabsTrigger>
            <TabsTrigger value="templates">Templates</TabsTrigger>
          </TabsList>
          
          {/* Generate Tab */}
          <TabsContent value="generate" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Generate New Report</CardTitle>
                <CardDescription>
                  Select report type, year, and format to generate a new compliance report.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Report Type
                    </label>
                    <Select value={selectedReport} onValueChange={handleReportTypeChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select report type" />
                      </SelectTrigger>
                      <SelectContent>
                        {reportTypes.map((report) => (
                          <SelectItem key={report.id} value={report.id}>
                            {report.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Academic Year
                    </label>
                    <Select value={selectedYear} onValueChange={handleYearChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select year" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="2025">2025-26</SelectItem>
                        <SelectItem value="2024">2024-25</SelectItem>
                        <SelectItem value="2023">2023-24</SelectItem>
                        <SelectItem value="2022">2022-23</SelectItem>
                        <SelectItem value="2021">2021-22</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium block mb-2">
                      Format
                    </label>
                    <Select value={selectedFormat} onValueChange={handleFormatChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select format" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="csv">CSV</SelectItem>
                        <SelectItem value="excel">Excel</SelectItem>
                        <SelectItem value="pdf">PDF</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
                
                {/* Selected report details */}
                <div className="mt-8">
                  {selectedReport && (
                    <div className="border border-border rounded-lg p-6">
                      <div className="flex flex-col md:flex-row gap-6">
                        <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 bg-primary/10 rounded-full">
                          {reportTypes.find(r => r.id === selectedReport)?.icon}
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold mb-2">
                            {reportTypes.find(r => r.id === selectedReport)?.name}
                          </h3>
                          <p className="text-muted-foreground mb-4">
                            {reportTypes.find(r => r.id === selectedReport)?.description}
                          </p>
                          
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                              <h4 className="text-sm font-medium mb-2">Included Sections</h4>
                              <ul className="space-y-1">
                                {reportTypes.find(r => r.id === selectedReport)?.sections.slice(0, 5).map((section, index) => (
                                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    {section}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <h4 className="text-sm font-medium mb-2">&nbsp;</h4>
                              <ul className="space-y-1">
                                {reportTypes.find(r => r.id === selectedReport)?.sections.slice(5).map((section, index) => (
                                  <li key={index} className="text-sm text-muted-foreground flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                                    {section}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
                
                {/* Generation progress */}
                {isGenerating && (
                  <div className="mt-6">
                    <div className="flex items-center justify-between mb-2">
                      <p className="text-sm font-medium">Generating report...</p>
                      <p className="text-sm text-muted-foreground">{progress}%</p>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                )}
              </CardContent>
              <CardFooter className="flex justify-end space-x-4">
                <Button 
                  variant="outline"
                  onClick={() => handlePreviewReport(selectedReport)}
                >
                  Preview
                </Button>
                <Button 
                  onClick={handleGenerateReport}
                  disabled={isGenerating}
                  className="gap-2"
                >
                  <FileText className="h-4 w-4" />
                  Generate Report
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>
          
          {/* History Tab */}
          <TabsContent value="history" className="mt-6">
            <motion.div
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="space-y-4"
            >
              {reportTypes.map((report, index) => (
                <motion.div
                  key={report.id}
                  variants={fadeIn}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <Card>
                    <CardContent className="p-6">
                      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="flex items-center gap-4">
                          <div className="flex-shrink-0 flex items-center justify-center w-12 h-12 bg-primary/10 rounded-full">
                            {report.icon}
                          </div>
                          <div>
                            <h3 className="text-lg font-semibold">{report.name}</h3>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                              <div className="flex items-center gap-1">
                                <Calendar className="h-3.5 w-3.5" />
                                <span>Last generated: {report.lastGenerated}</span>
                              </div>
                              {getStatusBadge(report.status)}
                            </div>
                          </div>
                        </div>
                        
                        <div className="flex flex-wrap gap-2">
                          <Button 
                            variant="outline" 
                            size="sm" 
                            className="gap-1"
                            onClick={() => handlePreviewReport(report.id)}
                          >
                            <FileCheck className="h-3.5 w-3.5" />
                            Preview
                          </Button>
                          <Button 
                            size="sm" 
                            className="gap-1"
                            onClick={() => {
                              toast.success(`${report.name} downloaded successfully!`);
                            }}
                          >
                            <Download className="h-3.5 w-3.5" />
                            Download
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
          
          {/* Templates Tab */}
          <TabsContent value="templates" className="mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Report Templates</CardTitle>
                <CardDescription>
                  Download templates for manual data entry or bulk uploads.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">NIRF Data Template</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Excel template for collecting and organizing NIRF submission data.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => {
                            toast.success('NIRF template downloaded successfully!');
                          }}
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download Template
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">AISHE Data Template</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Excel template for collecting and organizing AISHE submission data.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => {
                            toast.success('AISHE template downloaded successfully!');
                          }}
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download Template
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">APAR Faculty Template</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Excel template for faculty APAR data collection and evaluation.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => {
                            toast.success('APAR Faculty template downloaded successfully!');
                          }}
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download Template
                        </Button>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 flex items-center justify-center w-10 h-10 bg-primary/10 rounded-full">
                        <FileSpreadsheet className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium mb-2">Bulk Upload Format</h3>
                        <p className="text-sm text-muted-foreground mb-4">
                          Standard CSV format for bulk uploading institutional data.
                        </p>
                        <Button 
                          variant="outline" 
                          size="sm" 
                          className="gap-1"
                          onClick={() => {
                            toast.success('Bulk upload template downloaded successfully!');
                          }}
                        >
                          <Download className="h-3.5 w-3.5" />
                          Download Template
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Report Preview Modal */}
      <Dialog open={showPreviewModal} onOpenChange={setShowPreviewModal}>
        <DialogContent className="sm:max-w-[800px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {getReportName(reportType)} Preview
            </DialogTitle>
            <DialogDescription>
              Preview of the report data before generating the final version.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="border border-border rounded-lg overflow-hidden">
              <div className="bg-muted/50 p-4 border-b border-border">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                  <div>
                    <h3 className="font-semibold">{getReportName(reportType)}</h3>
                    <p className="text-sm text-muted-foreground">Academic Year: 2024-25</p>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Generated on: {new Date().toLocaleDateString()}
                  </div>
                </div>
              </div>
              
              <div className="p-4">
                <div className="space-y-6">
                  <div>
                    <h4 className="text-sm font-medium mb-2">Institution Details</h4>
                    <table className="w-full text-sm">
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-2 font-medium">Institution Name</td>
                          <td className="py-2">NIAMT Ranchi</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 font-medium">Institution Type</td>
                          <td className="py-2">Autonomous Institution</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 font-medium">Established Year</td>
                          <td className="py-2">1985</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 font-medium">Location</td>
                          <td className="py-2">Ranchi, Jharkhand</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  <div>
                    <h4 className="text-sm font-medium mb-2">Key Metrics</h4>
                    <table className="w-full text-sm">
                      <thead className="bg-muted/30">
                        <tr>
                          <th className="text-left py-2 px-2">Metric</th>
                          <th className="text-left py-2 px-2">Value</th>
                          <th className="text-left py-2 px-2">Change from Previous Year</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr className="border-b border-border">
                          <td className="py-2 px-2">Total Students</td>
                          <td className="py-2 px-2">1,200</td>
                          <td className="py-2 px-2 text-green-600 dark:text-green-400">+4.3%</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-2">Total Faculty</td>
                          <td className="py-2 px-2">65</td>
                          <td className="py-2 px-2 text-green-600 dark:text-green-400">+2.5%</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-2">Student-Faculty Ratio</td>
                          <td className="py-2 px-2">18.5:1</td>
                          <td className="py-2 px-2 text-amber-600 dark:text-amber-400">+0.5</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-2">Research Publications</td>
                          <td className="py-2 px-2">128</td>
                          <td className="py-2 px-2 text-green-600 dark:text-green-400">+12.3%</td>
                        </tr>
                        <tr className="border-b border-border">
                          <td className="py-2 px-2">Placement Rate</td>
                          <td className="py-2 px-2">88%</td>
                          <td className="py-2 px-2 text-green-600 dark:text-green-400">+2%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                  
                  {/* Preview note */}
                  <div className="bg-muted/20 p-4 rounded-md">
                    <p className="text-sm text-muted-foreground">
                      This is a preview of the report. The final report will contain complete data and formatting according to the selected output format.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowPreviewModal(false)}
            >
              Close
            </Button>
            <Button 
              onClick={handleDownloadReport}
              className="gap-2"
            >
              <Download className="h-4 w-4" />
              Download Report
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}