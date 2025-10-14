import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Calendar as CalendarIcon, Clock, Download, FileText, Plus, Save } from 'lucide-react';
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

// Form schema
const formSchema = z.object({
  date: z.string().min(1, "Date is required"),
  hours: z.string().min(1, "Hours spent is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  artifacts: z.string().optional(),
});

export default function StudentLogbook() {
  const [logEntries, setLogEntries] = useState<any[]>([]);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showReportModal, setShowReportModal] = useState(false);
  
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      date: format(new Date(), 'yyyy-MM-dd'),
      hours: '',
      description: '',
      artifacts: '',
    },
  });

  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For the prototype, we'll use the mock data filtered for student ID 1
    const entries = logbookData.filter(entry => entry.studentId === 1);
    setLogEntries(entries);
  }, []);

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // In a real app, we would send this data to an API
    const newEntry = {
      id: logEntries.length + 1,
      studentId: 1,
      date: values.date,
      hours: parseInt(values.hours),
      description: values.description,
      artifacts: values.artifacts || null,
      status: 'Submitted',
      supervisorComments: null,
    };

    setLogEntries([...logEntries, newEntry]);
    setShowAddModal(false);
    toast.success('Logbook entry submitted successfully!');
    form.reset();
  };

  const handleSaveAsDraft = () => {
    const values = form.getValues();
    
    // Validate minimum required fields for draft
    if (!values.date || !values.description) {
      toast.error('Date and description are required for drafts');
      return;
    }
    
    const newEntry = {
      id: logEntries.length + 1,
      studentId: 1,
      date: values.date,
      hours: parseInt(values.hours || '0'),
      description: values.description,
      artifacts: values.artifacts || null,
      status: 'Draft',
      supervisorComments: null,
    };

    setLogEntries([...logEntries, newEntry]);
    setShowAddModal(false);
    toast.info('Logbook entry saved as draft');
    form.reset();
  };

  const handleGenerateReport = () => {
    setShowReportModal(true);
  };

  const handleDownloadReport = () => {
    toast.success('Report downloaded successfully!');
    setShowReportModal(false);
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Verified':
        return <Badge variant="default" className="status-badge-verified">Verified</Badge>;
      case 'Submitted':
        return <Badge variant="outline" className="status-badge-pending">Pending</Badge>;
      case 'Draft':
        return <Badge variant="outline" className="status-badge-draft">Draft</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <DashboardLayout requiredRole="student" title="Student Logbook">
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
            <h1 className="text-3xl font-bold">My Academic Logbook</h1>
            <p className="text-muted-foreground mt-2">
              Track and manage your academic activities and accomplishments
            </p>
          </div>
          
          <div className="flex flex-wrap gap-3">
            <Button 
              variant="outline" 
              className="gap-2"
              onClick={handleGenerateReport}
            >
              <FileText className="h-4 w-4" />
              Generate Report
            </Button>
            
            <Button 
              className="gap-2"
              onClick={() => setShowAddModal(true)}
            >
              <Plus className="h-4 w-4" />
              Add New Entry
            </Button>
          </div>
        </div>
      </motion.div>

      {/* Logbook entries */}
      <div className="space-y-1">
        {logEntries.length === 0 ? (
          <div className="bg-card border border-border rounded-lg p-8 text-center">
            <div className="mb-4 flex justify-center">
              <FileText className="h-12 w-12 text-muted-foreground" />
            </div>
            <h3 className="text-lg font-medium mb-2">No logbook entries yet</h3>
            <p className="text-muted-foreground mb-4">
              Start tracking your academic activities by adding your first entry.
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              Add Your First Entry
            </Button>
          </div>
        ) : (
          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="space-y-4"
          >
            {logEntries
              .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
              .map((entry) => (
                <motion.div
                  key={entry.id}
                  variants={fadeIn}
                  transition={{ duration: 0.3 }}
                  className={`bg-card border border-border rounded-lg p-6 ${
                    entry.status === 'Submitted' ? 'border-l-4 border-l-secondary' : 
                    entry.status === 'Verified' ? 'border-l-4 border-l-primary' : ''
                  }`}
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-primary/10 p-2">
                        <Clock className="h-4 w-4 text-primary" />
                      </div>
                      <div>
                        <h3 className="font-medium">{format(new Date(entry.date), 'dd MMMM yyyy')}</h3>
                        <p className="text-sm text-muted-foreground">Hours: {entry.hours}</p>
                      </div>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      {getStatusBadge(entry.status)}
                      
                      {entry.status === 'Draft' && (
                        <Button variant="outline" size="sm">
                          Submit
                        </Button>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-sm mb-4">{entry.description}</p>
                  
                  {entry.supervisorComments && (
                    <div className="bg-muted/30 rounded-md p-3">
                      <p className="text-xs font-medium mb-1">Supervisor Comments:</p>
                      <p className="text-sm text-muted-foreground">{entry.supervisorComments}</p>
                    </div>
                  )}
                </motion.div>
              ))}
          </motion.div>
        )}
      </div>

      {/* Add Entry Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Add New Logbook Entry</DialogTitle>
            <DialogDescription>
              Record your academic activities, research, or project work.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Date</FormLabel>
                    <FormControl>
                      <div className="flex items-center">
                        <CalendarIcon className="mr-2 h-4 w-4 text-muted-foreground" />
                        <Input type="date" {...field} />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="hours"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Hours Spent</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="2" {...field} />
                    </FormControl>
                    <FormDescription>
                      Number of hours spent on this activity
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Describe your activity in detail..." 
                        className="min-h-[100px]"
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="artifacts"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Artifacts / Links</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="GitHub link, document URL, etc." 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Optional: Add links to your work
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <DialogFooter className="gap-2">
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={handleSaveAsDraft}
                >
                  Save as Draft
                </Button>
                <Button type="submit">Submit for Verification</Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Report Preview Modal */}
      <Dialog open={showReportModal} onOpenChange={setShowReportModal}>
        <DialogContent className="sm:max-w-[700px] max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Academic Logbook Report</DialogTitle>
            <DialogDescription>
              A compiled report of all your verified activities
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4">
            <div className="border border-border rounded-lg p-6 bg-card">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-bold">Academic Activity Report</h2>
                <p className="text-muted-foreground">Aditi Sharma</p>
                <p className="text-muted-foreground">Computer Science Department</p>
                <p className="text-muted-foreground">NIAMT Ranchi</p>
              </div>
              
              <Separator className="my-6" />
              
              <div className="space-y-6">
                {logEntries
                  .filter(entry => entry.status === 'Verified')
                  .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                  .map((entry) => (
                    <div key={entry.id} className="space-y-2">
                      <div className="flex justify-between">
                        <h3 className="font-medium">{format(new Date(entry.date), 'dd MMMM yyyy')}</h3>
                        <p className="text-sm text-muted-foreground">Hours: {entry.hours}</p>
                      </div>
                      <p className="text-sm">{entry.description}</p>
                      <Separator className="my-2" />
                    </div>
                  ))}
              </div>
              
              <div className="mt-8 flex justify-between">
                <div>
                  <p className="text-sm font-medium">Student Signature</p>
                  <p className="text-muted-foreground text-xs">Electronically verified</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">Supervisor Signature</p>
                  <p className="text-muted-foreground text-xs">Dr. Ravi Kumar</p>
                </div>
              </div>
              
              <div className="mt-8 text-center text-sm text-muted-foreground">
                <p>Generated on {format(new Date(), 'dd MMMM yyyy')}</p>
                <p>Unified Interface Platform • Smart India Hackathon 2025</p>
              </div>
            </div>
          </div>
          
          <DialogFooter>
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