import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Separator } from '@/components/ui/separator';
import { Switch } from '@/components/ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { toast } from 'sonner';
import {
  User,
  Mail,
  Phone,
  School,
  MapPin,
  Calendar,
  Building,
  Save,
  Bell,
  Lock,
  Shield,
  FileText,
  BookOpen,
} from 'lucide-react';
import studentsData from '@/data/students.json';
import teachersData from '@/data/teachers.json';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Profile() {
  const { user } = useAuth();
  const [profileData, setProfileData] = useState<any>(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    address: '',
    bio: '',
  });
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For the prototype, we'll use the mock data
    let data = null;
    
    if (user?.role === 'student') {
      data = studentsData[0]; // Aditi Sharma
      setFormData({
        name: data.name,
        email: 'aditi.sharma@niamt.ac.in',
        phone: '+91 9876543210',
        address: 'Hostel C, Room 304, NIAMT Campus, Ranchi',
        bio: 'Computer Science student with interests in machine learning, web development, and data visualization. Active member of the coding club and participant in several hackathons.',
      });
    } else if (user?.role === 'teacher') {
      data = teachersData[0]; // Dr. Ravi Kumar
      setFormData({
        name: data.name,
        email: data.email,
        phone: data.phone,
        address: 'Faculty Quarters, Block B, NIAMT Campus, Ranchi',
        bio: 'Associate Professor with 10+ years of experience in computer science education and research. Specializing in machine learning, educational data mining, and privacy-preserving analytics.',
      });
    } else if (user?.role === 'institution') {
      setFormData({
        name: 'Admin User',
        email: 'admin@niamt.ac.in',
        phone: '+91 9876543200',
        address: 'Administrative Block, NIAMT Ranchi',
        bio: 'Institution administrator responsible for data management, compliance reporting, and system administration.',
      });
    }
    
    setProfileData(data);
  }, [user]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSaveProfile = () => {
    // In a real app, we would send this data to an API
    toast.success('Profile updated successfully!');
  };

  return (
    <DashboardLayout title="Profile">
      <motion.div
        className="mb-8"
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        transition={{ duration: 0.5 }}
      >
        <h1 className="text-3xl font-bold">Your Profile</h1>
        <p className="text-muted-foreground mt-2">
          Manage your personal information and account settings
        </p>
      </motion.div>

      <Tabs defaultValue="personal" className="w-full">
        <TabsList className="grid w-full grid-cols-1 md:grid-cols-4 lg:w-[600px]">
          <TabsTrigger value="personal">Personal Info</TabsTrigger>
          <TabsTrigger value="account">Account</TabsTrigger>
          <TabsTrigger value="notifications">Notifications</TabsTrigger>
          <TabsTrigger value="privacy">Privacy</TabsTrigger>
        </TabsList>
        
        {/* Personal Info Tab */}
        <TabsContent value="personal" className="mt-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Profile Photo */}
            <div className="col-span-1">
              <div className="flex flex-col items-center">
                <Avatar className="w-32 h-32 mb-4">
                  <AvatarFallback className="text-4xl">{formData.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="mb-6">Change Photo</Button>
                
                <div className="w-full space-y-4">
                  <div className="flex items-center gap-2 text-sm">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <span className="text-muted-foreground">Role:</span>
                    <span className="font-medium">
                      {user?.role === 'student' ? 'Student' : 
                       user?.role === 'teacher' ? 'Teacher' : 'Institution Admin'}
                    </span>
                  </div>
                  
                  {user?.role === 'student' && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <School className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Department:</span>
                        <span className="font-medium">Computer Science</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <Calendar className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Year:</span>
                        <span className="font-medium">3rd Year</span>
                      </div>
                    </>
                  )}
                  
                  {user?.role === 'teacher' && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Department:</span>
                        <span className="font-medium">Computer Science</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <BookOpen className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Position:</span>
                        <span className="font-medium">Associate Professor</span>
                      </div>
                    </>
                  )}
                  
                  {user?.role === 'institution' && (
                    <>
                      <div className="flex items-center gap-2 text-sm">
                        <Shield className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Access Level:</span>
                        <span className="font-medium">Administrator</span>
                      </div>
                      <div className="flex items-center gap-2 text-sm">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                        <span className="text-muted-foreground">Reports Access:</span>
                        <span className="font-medium">Full Access</span>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            
            {/* Profile Form */}
            <div className="col-span-2 space-y-6">
              <div>
                <label htmlFor="name" className="text-sm font-medium block mb-1">
                  Full Name
                </label>
                <div className="flex items-center">
                  <User className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="text-sm font-medium block mb-1">
                  Email
                </label>
                <div className="flex items-center">
                  <Mail className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="phone" className="text-sm font-medium block mb-1">
                  Phone
                </label>
                <div className="flex items-center">
                  <Phone className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="address" className="text-sm font-medium block mb-1">
                  Address
                </label>
                <div className="flex items-center">
                  <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                  <Input
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="bio" className="text-sm font-medium block mb-1">
                  Bio
                </label>
                <Textarea
                  id="bio"
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={4}
                />
              </div>
              
              <div className="flex justify-end">
                <Button 
                  onClick={handleSaveProfile}
                  className="gap-2"
                >
                  <Save className="h-4 w-4" />
                  Save Changes
                </Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Account Tab */}
        <TabsContent value="account" className="mt-6">
          <div className="max-w-3xl space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Account Security</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Lock className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Password</h4>
                      <p className="text-sm text-muted-foreground">
                        Last changed 30 days ago
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Change Password</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-start gap-3">
                    <Shield className="h-5 w-5 text-muted-foreground mt-0.5" />
                    <div>
                      <h4 className="font-medium">Two-Factor Authentication</h4>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Enable</Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Connected Accounts</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#4285F4] rounded flex items-center justify-center text-white font-bold">G</div>
                    <div>
                      <h4 className="font-medium">Google</h4>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-[#0A66C2] rounded flex items-center justify-center text-white font-bold">in</div>
                    <div>
                      <h4 className="font-medium">LinkedIn</h4>
                      <p className="text-sm text-muted-foreground">
                        Not connected
                      </p>
                    </div>
                  </div>
                  <Button variant="outline">Connect</Button>
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4 text-destructive">Danger Zone</h3>
              <div className="p-4 border border-destructive/30 rounded-lg bg-destructive/5">
                <h4 className="font-medium mb-2">Delete Account</h4>
                <p className="text-sm text-muted-foreground mb-4">
                  Once you delete your account, there is no going back. All of your data will be permanently removed.
                </p>
                <Button variant="destructive">Delete Account</Button>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Notifications Tab */}
        <TabsContent value="notifications" className="mt-6">
          <div className="max-w-3xl space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Preferences</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Email Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive notifications via email
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Platform Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive in-app notifications
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">SMS Notifications</h4>
                    <p className="text-sm text-muted-foreground">
                      Receive important alerts via SMS
                    </p>
                  </div>
                  <Switch />
                </div>
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Notification Categories</h3>
              <div className="space-y-4">
                {user?.role === 'student' && (
                  <>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Logbook Verifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications when your logbook entries are verified or need changes
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Internship Opportunities</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications about new internship postings matching your profile
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </>
                )}
                
                {user?.role === 'teacher' && (
                  <>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Pending Verifications</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications when students submit logbook entries for verification
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Publication Citations</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications when your publications receive new citations
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </>
                )}
                
                {user?.role === 'institution' && (
                  <>
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">Report Deadlines</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications about upcoming NIRF, AISHE, and APAR submission deadlines
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    
                    <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div>
                        <h4 className="font-medium">System Updates</h4>
                        <p className="text-sm text-muted-foreground">
                          Notifications about platform updates and maintenance
                        </p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </>
                )}
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Announcements</h4>
                    <p className="text-sm text-muted-foreground">
                      General platform announcements and news
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
        
        {/* Privacy Tab */}
        <TabsContent value="privacy" className="mt-6">
          <div className="max-w-3xl space-y-8">
            <div>
              <h3 className="text-lg font-medium mb-4">Privacy Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Profile Visibility</h4>
                    <p className="text-sm text-muted-foreground">
                      Control who can view your profile information
                    </p>
                  </div>
                  <Select
                    value="institution"
                    onValueChange={() => {}}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select visibility" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="institution">Institution Only</SelectItem>
                      <SelectItem value="private">Private</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                
                <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                  <div>
                    <h4 className="font-medium">Data Usage</h4>
                    <p className="text-sm text-muted-foreground">
                      Allow your data to be used for platform improvements
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                
                {user?.role === 'student' && (
                  <div className="flex items-center justify-between p-4 border border-border rounded-lg">
                    <div>
                      <h4 className="font-medium">Share Academic Progress</h4>
                      <p className="text-sm text-muted-foreground">
                        Allow teachers to view your academic progress and achievements
                      </p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                )}
              </div>
            </div>
            
            <Separator />
            
            <div>
              <h3 className="text-lg font-medium mb-4">Data Management</h3>
              <div className="space-y-4">
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Download Your Data</h4>
                  <p className="text-sm text-muted-foreground mb-4">
                    Download a copy of your personal data in a machine-readable format.
                  </p>
                  <Button variant="outline">Request Data Export</Button>
                </div>
                
                <div className="p-4 border border-border rounded-lg">
                  <h4 className="font-medium mb-2">Data Retention</h4>
                  <p className="text-sm text-muted-foreground">
                    Your data is retained according to our data retention policy and applicable regulations. Academic records are maintained for a minimum of 5 years after graduation or leaving the institution.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </TabsContent>
      </Tabs>
    </DashboardLayout>
  );
}