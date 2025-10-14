import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { Button } from '@/components/ui/button';
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
  DialogTrigger,
} from '@/components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Badge } from '@/components/ui/badge';
import { toast } from 'sonner';
import {
  FileText,
  Plus,
  ExternalLink,
  Search,
  BookOpen,
  Users,
  Calendar,
  Link as LinkIcon,
  Edit,
  Trash2,
} from 'lucide-react';
import teachersData from '@/data/teachers.json';

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

export default function TeacherPublications() {
  const [teacherData, setTeacherData] = useState<any>(null);
  const [publications, setPublications] = useState<any[]>([]);
  const [filteredPublications, setFilteredPublications] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('year');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [selectedPublication, setSelectedPublication] = useState<any>(null);
  const [newPublication, setNewPublication] = useState({
    title: '',
    journal: '',
    year: new Date().getFullYear().toString(),
    link: '',
    coAuthors: '',
  });
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For the prototype, we'll use the mock data
    const teacher = teachersData[0]; // Dr. Ravi Kumar
    setTeacherData(teacher);
    setPublications(teacher.publications);
    setFilteredPublications(teacher.publications);
  }, []);

  useEffect(() => {
    let filtered = publications;
    
    // Apply search query
    if (searchQuery) {
      filtered = filtered.filter(
        publication => 
          publication.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          publication.journal.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply sorting
    filtered = [...filtered].sort((a, b) => {
      if (sortBy === 'year') {
        return b.year - a.year;
      } else if (sortBy === 'citations') {
        return b.citations - a.citations;
      } else if (sortBy === 'title') {
        return a.title.localeCompare(b.title);
      } else {
        return 0;
      }
    });
    
    setFilteredPublications(filtered);
  }, [publications, searchQuery, sortBy]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setNewPublication({
      ...newPublication,
      [name]: value,
    });
  };

  const handleYearChange = (value: string) => {
    setNewPublication({
      ...newPublication,
      year: value,
    });
  };

  const handleAddPublication = () => {
    // In a real app, we would send this data to an API
    const newPub = {
      id: publications.length + 1,
      title: newPublication.title,
      journal: newPublication.journal,
      year: parseInt(newPublication.year),
      citations: 0,
      link: newPublication.link,
      coAuthors: newPublication.coAuthors.split(',').map(author => author.trim()),
    };
    
    setPublications([...publications, newPub]);
    setShowAddModal(false);
    toast.success('Publication added successfully!');
    
    // Reset form
    setNewPublication({
      title: '',
      journal: '',
      year: new Date().getFullYear().toString(),
      link: '',
      coAuthors: '',
    });
  };

  const handleDeleteClick = (publication: any) => {
    setSelectedPublication(publication);
    setShowDeleteModal(true);
  };

  const handleDeletePublication = () => {
    // In a real app, we would send this data to an API
    const updatedPublications = publications.filter(pub => pub.id !== selectedPublication.id);
    setPublications(updatedPublications);
    setShowDeleteModal(false);
    toast.success('Publication deleted successfully!');
  };

  if (!teacherData) {
    return (
      <DashboardLayout requiredRole="teacher" title="Publications">
        <div className="flex items-center justify-center h-64">
          <p>Loading teacher data...</p>
        </div>
      </DashboardLayout>
    );
  }

  // Generate years for the dropdown (last 10 years)
  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 10 }, (_, i) => (currentYear - i).toString());

  return (
    <DashboardLayout requiredRole="teacher" title="Publications">
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
            <h1 className="text-3xl font-bold">Your Publications</h1>
            <p className="text-muted-foreground mt-2">
              Manage your research papers, articles, and citations
            </p>
          </div>
          
          <Button 
            className="gap-2"
            onClick={() => setShowAddModal(true)}
          >
            <Plus className="h-4 w-4" />
            Add Publication
          </Button>
        </div>
      </motion.div>

      {/* Filters and search */}
      <div className="mb-6">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search publications..." 
              className="pl-9"
              value={searchQuery}
              onChange={handleSearchChange}
            />
          </div>
          
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">Sort by:</span>
            <Select value={sortBy} onValueChange={handleSortChange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="year">Year (Newest first)</SelectItem>
                <SelectItem value="citations">Citations (Highest first)</SelectItem>
                <SelectItem value="title">Title (A-Z)</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* Publications list */}
      {filteredPublications.length === 0 ? (
        <div className="bg-card border border-border rounded-lg p-8 text-center">
          <div className="mb-4 flex justify-center">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium mb-2">No publications found</h3>
          <p className="text-muted-foreground mb-4">
            Add your research papers, articles, and other publications to showcase your work.
          </p>
          <Button onClick={() => setShowAddModal(true)}>
            Add Your First Publication
          </Button>
        </div>
      ) : (
        <motion.div
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="space-y-6"
        >
          {filteredPublications.map((publication, index) => (
            <motion.div
              key={publication.id}
              variants={fadeIn}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            >
              <Card className="hover:shadow-md transition-all duration-300">
                <CardHeader className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
                    <div>
                      <CardTitle className="text-lg">{publication.title}</CardTitle>
                      <CardDescription className="flex items-center mt-1">
                        <BookOpen className="h-3.5 w-3.5 mr-1" />
                        {publication.journal}
                      </CardDescription>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline" className="text-xs">
                        {publication.year}
                      </Badge>
                      <Badge variant="secondary" className="text-xs">
                        {publication.citations} citations
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pb-2">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 text-sm">
                    {publication.coAuthors && (
                      <div className="flex items-center text-muted-foreground">
                        <Users className="h-4 w-4 mr-1" />
                        <span>Co-authors: {publication.coAuthors.join(', ')}</span>
                      </div>
                    )}
                    <div className="flex items-center text-muted-foreground">
                      <Calendar className="h-4 w-4 mr-1" />
                      <span>Published: {publication.year}</span>
                    </div>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex flex-wrap gap-2">
                    {publication.link && (
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="gap-1"
                        onClick={() => window.open(publication.link, '_blank')}
                      >
                        <ExternalLink className="h-3.5 w-3.5" />
                        View Paper
                      </Button>
                    )}
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1"
                      onClick={() => {
                        // In a real app, this would navigate to an edit page
                        toast.info('Edit functionality would be implemented in a production version');
                      }}
                    >
                      <Edit className="h-3.5 w-3.5" />
                      Edit
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="gap-1 text-destructive hover:text-destructive"
                      onClick={() => handleDeleteClick(publication)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Add Publication Modal */}
      <Dialog open={showAddModal} onOpenChange={setShowAddModal}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Add New Publication</DialogTitle>
            <DialogDescription>
              Add details about your research paper or article.
            </DialogDescription>
          </DialogHeader>
          
          <div className="py-4 space-y-4">
            <div>
              <label htmlFor="title" className="text-sm font-medium block mb-1">
                Title
              </label>
              <Input
                id="title"
                name="title"
                value={newPublication.title}
                onChange={handleInputChange}
                placeholder="Enter publication title"
              />
            </div>
            
            <div>
              <label htmlFor="journal" className="text-sm font-medium block mb-1">
                Journal / Conference
              </label>
              <Input
                id="journal"
                name="journal"
                value={newPublication.journal}
                onChange={handleInputChange}
                placeholder="Enter journal or conference name"
              />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="year" className="text-sm font-medium block mb-1">
                  Publication Year
                </label>
                <Select value={newPublication.year} onValueChange={handleYearChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select year" />
                  </SelectTrigger>
                  <SelectContent>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>
                        {year}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <label htmlFor="link" className="text-sm font-medium block mb-1">
                  Publication Link (Optional)
                </label>
                <Input
                  id="link"
                  name="link"
                  value={newPublication.link}
                  onChange={handleInputChange}
                  placeholder="https://doi.org/..."
                />
              </div>
            </div>
            
            <div>
              <label htmlFor="coAuthors" className="text-sm font-medium block mb-1">
                Co-Authors (Optional, comma-separated)
              </label>
              <Textarea
                id="coAuthors"
                name="coAuthors"
                value={newPublication.coAuthors}
                onChange={handleInputChange}
                placeholder="Dr. Jane Smith, Prof. John Doe"
              />
            </div>
          </div>
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowAddModal(false)}
            >
              Cancel
            </Button>
            <Button onClick={handleAddPublication}>
              Add Publication
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Modal */}
      <Dialog open={showDeleteModal} onOpenChange={setShowDeleteModal}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this publication? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          
          {selectedPublication && (
            <div className="py-4">
              <p className="font-medium">{selectedPublication.title}</p>
              <p className="text-sm text-muted-foreground">{selectedPublication.journal}, {selectedPublication.year}</p>
            </div>
          )}
          
          <DialogFooter>
            <Button 
              variant="outline" 
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button 
              variant="destructive"
              onClick={handleDeletePublication}
            >
              Delete Publication
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}