import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { 
  Briefcase, 
  Building, 
  Calendar, 
  MapPin, 
  Search,
  CreditCard,
  Filter,
  Clock,
  ArrowUpRight
} from 'lucide-react';
import internshipsData from '@/data/internships.json';

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

export default function StudentInternships() {
  const [internships, setInternships] = useState<any[]>([]);
  const [filteredInternships, setFilteredInternships] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState('all');
  const [selectedInternship, setSelectedInternship] = useState<any>(null);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [showApplicationModal, setShowApplicationModal] = useState(false);
  const [activeTab, setActiveTab] = useState('available');
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    setInternships(internshipsData);
    setFilteredInternships(internshipsData);
  }, []);

  useEffect(() => {
    let filtered = internships;
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        internship => 
          internship.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          internship.company.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply location filter
    if (locationFilter !== 'all') {
      filtered = filtered.filter(
        internship => internship.location === locationFilter
      );
    }
    
    // Apply tab filter
    if (activeTab === 'applied') {
      filtered = filtered.filter(
        internship => internship.status === 'Applied' || internship.status === 'Interview Scheduled'
      );
    } else if (activeTab === 'available') {
      filtered = filtered.filter(
        internship => internship.status === 'Not Applied'
      );
    }
    
    setFilteredInternships(filtered);
  }, [internships, searchQuery, locationFilter, activeTab]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleLocationChange = (value: string) => {
    setLocationFilter(value);
  };

  const handleTabChange = (value: string) => {
    setActiveTab(value);
  };

  const handleViewDetails = (internship: any) => {
    setSelectedInternship(internship);
    setShowDetailsModal(true);
  };

  const handleApply = (internship: any) => {
    setSelectedInternship(internship);
    setShowApplicationModal(true);
  };

  const handleSubmitApplication = () => {
    // In a real app, we would submit the application to an API
    const updatedInternships = internships.map(internship => 
      internship.id === selectedInternship.id 
        ? { ...internship, status: 'Applied' } 
        : internship
    );
    
    setInternships(updatedInternships);
    setShowApplicationModal(false);
    toast.success('Application submitted successfully!');
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'Applied':
        return <Badge variant="outline" className="status-badge-pending">Applied</Badge>;
      case 'Interview Scheduled':
        return <Badge variant="secondary">Interview Scheduled</Badge>;
      case 'Not Applied':
        return <Badge variant="outline" className="status-badge-draft">Not Applied</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  // Get unique locations for filter
  const locations = ['all', ...new Set(internships.map(internship => internship.location))];

  return (
    <DashboardLayout requiredRole="student" title="Internships">
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
            <h1 className="text-3xl font-bold">Internship Opportunities</h1>
            <p className="text-muted-foreground mt-2">
              Discover and apply for internships that match your skills and interests
            </p>
          </div>
        </div>
      </motion.div>

      {/* Filters and search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search by title or company..." 
              className="pl-9"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={locationFilter} onValueChange={handleLocationChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="All Locations" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Locations</SelectItem>
                {locations.filter(loc => loc !== 'all').map((location) => (
                  <SelectItem key={location} value={location}>
                    {location}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="available" onValueChange={handleTabChange} className="mb-6">
        <TabsList className="grid grid-cols-2 w-[400px]">
          <TabsTrigger value="available">Available Internships</TabsTrigger>
          <TabsTrigger value="applied">Applied</TabsTrigger>
        </TabsList>
      </Tabs>

      {/* Internship listings */}
      {filteredInternships.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <div className="mb-4 flex justify-center">
            <Briefcase className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No internships found</h3>
          <p className="text-muted-foreground mb-4">
            Try adjusting your filters or search query to find more opportunities.
          </p>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          {filteredInternships.map((internship, index) => (
            <motion.div
              key={internship.id}
              variants={fadeIn}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="h-full flex flex-col">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div>
                      <CardTitle>{internship.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <Building className="h-3.5 w-3.5 mr-1" />
                        {internship.company}
                      </CardDescription>
                    </div>
                    {getStatusBadge(internship.status)}
                  </div>
                </CardHeader>
                <CardContent className="flex-grow">
                  <div className="space-y-4">
                    <div className="flex items-center gap-4 text-sm">
                      <div className="flex items-center text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-1" />
                        {internship.location}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        {internship.duration}
                      </div>
                      <div className="flex items-center text-muted-foreground">
                        <CreditCard className="h-4 w-4 mr-1" />
                        {internship.stipend}
                      </div>
                    </div>
                    
                    <p className="text-sm line-clamp-3">{internship.description}</p>
                    
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Clock className="h-4 w-4" />
                      <span>Apply by: {internship.deadline}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button 
                    variant="outline"
                    onClick={() => handleViewDetails(internship)}
                  >
                    View Details
                  </Button>
                  
                  {internship.status === 'Not Applied' ? (
                    <Button 
                      onClick={() => handleApply(internship)}
                    >
                      Apply Now
                    </Button>
                  ) : (
                    <Button 
                      variant="secondary"
                      disabled
                    >
                      {internship.status}
                    </Button>
                  )}
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Details Modal */}
      <Dialog open={showDetailsModal} onOpenChange={setShowDetailsModal}>
        <DialogContent className="sm:max-w-[600px]">
          {selectedInternship && (
            <>
              <DialogHeader>
                <DialogTitle>{selectedInternship.title}</DialogTitle>
                <DialogDescription>{selectedInternship.company}</DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <div className="flex flex-wrap gap-4 mb-4">
                  <div className="flex items-center text-sm bg-muted/50 px-3 py-1 rounded-md">
                    <MapPin className="h-4 w-4 mr-1 text-muted-foreground" />
                    {selectedInternship.location}
                  </div>
                  <div className="flex items-center text-sm bg-muted/50 px-3 py-1 rounded-md">
                    <Calendar className="h-4 w-4 mr-1 text-muted-foreground" />
                    {selectedInternship.duration}
                  </div>
                  <div className="flex items-center text-sm bg-muted/50 px-3 py-1 rounded-md">
                    <CreditCard className="h-4 w-4 mr-1 text-muted-foreground" />
                    {selectedInternship.stipend}
                  </div>
                  <div className="flex items-center text-sm bg-muted/50 px-3 py-1 rounded-md">
                    <Clock className="h-4 w-4 mr-1 text-muted-foreground" />
                    Deadline: {selectedInternship.deadline}
                  </div>
                </div>
                
                <h4 className="font-medium mb-2">Description</h4>
                <p className="text-sm mb-4">{selectedInternship.description}</p>
                
                <h4 className="font-medium mb-2">Required Skills</h4>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['Problem Solving', 'Communication', 'Programming', 'Teamwork'].map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
                
                <h4 className="font-medium mb-2">Application Process</h4>
                <ol className="list-decimal list-inside text-sm space-y-1 mb-4">
                  <li>Submit application through UIP platform</li>
                  <li>Complete online assessment (if required)</li>
                  <li>Interview with hiring team</li>
                  <li>Receive offer letter</li>
                </ol>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  className="gap-2"
                  onClick={() => window.open('#', '_blank')}
                >
                  Visit Company Website
                  <ArrowUpRight className="h-4 w-4" />
                </Button>
                
                {selectedInternship.status === 'Not Applied' ? (
                  <Button 
                    onClick={() => {
                      setShowDetailsModal(false);
                      handleApply(selectedInternship);
                    }}
                  >
                    Apply Now
                  </Button>
                ) : (
                  <Button variant="secondary" disabled>
                    {selectedInternship.status}
                  </Button>
                )}
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Application Modal */}
      <Dialog open={showApplicationModal} onOpenChange={setShowApplicationModal}>
        <DialogContent className="sm:max-w-[500px]">
          {selectedInternship && (
            <>
              <DialogHeader>
                <DialogTitle>Apply for Internship</DialogTitle>
                <DialogDescription>
                  {selectedInternship.title} at {selectedInternship.company}
                </DialogDescription>
              </DialogHeader>
              
              <div className="py-4">
                <p className="text-sm mb-4">
                  Your profile information will be shared with the company as part of your application.
                  You can review and update your details before submitting.
                </p>
                
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-medium">Full Name</label>
                    <Input defaultValue="Aditi Sharma" className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Email</label>
                    <Input defaultValue="aditi.sharma@niamt.ac.in" className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Phone Number</label>
                    <Input defaultValue="+91 9876543210" className="mt-1" />
                  </div>
                  
                  <div>
                    <label className="text-sm font-medium">Resume</label>
                    <div className="mt-1 flex items-center gap-2">
                      <Input type="file" />
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      PDF or DOCX format, max 2MB
                    </p>
                  </div>
                </div>
              </div>
              
              <DialogFooter>
                <Button 
                  variant="outline" 
                  onClick={() => setShowApplicationModal(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSubmitApplication}>
                  Submit Application
                </Button>
              </DialogFooter>
            </>
          )}
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}