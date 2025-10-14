import { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '@/contexts/AuthContext';
import MainLayout from '@/components/layout/MainLayout';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import {
  GraduationCap,
  BookOpen,
  Building,
  Key,
  User,
  ShieldCheck,
  CircleHelp,
  Fingerprint,
  QrCode,
  School,
  UserPlus,
  LogIn
} from 'lucide-react';
import { toast } from 'sonner';

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

export default function Login() {
  const { login } = useAuth();
  const [activeTab, setActiveTab] = useState('select-role');
  const [loginRole, setLoginRole] = useState<'student' | 'teacher' | 'institution' | null>(null);
  const [idType, setIdType] = useState<'aadhar' | 'apar' | 'aishe' | 'digilocker'>('aadhar');
  const [showQrScanner, setShowQrScanner] = useState(false);

  const handleRoleSelect = (role: 'student' | 'teacher' | 'institution') => {
    setLoginRole(role);
    setActiveTab('login');
    
    // Set default ID type based on role
    if (role === 'student') {
      setIdType('aadhar');
    } else if (role === 'teacher') {
      setIdType('apar');
    } else if (role === 'institution') {
      setIdType('aishe');
    }
  };

  const handleLogin = () => {
    if (!loginRole) return;
    
    // In a real app, this would validate credentials and make an API call
    // For our prototype, we'll simulate success
    toast.success('Login successful!');
    login(loginRole);
  };

  const handleSkipLogin = () => {
    if (!loginRole) return;
    login(loginRole);
  };

  const handleRegister = () => {
    toast.success('Registration successful! Please check your email to verify your account.');
    setActiveTab('login');
  };

  const handleQrScan = () => {
    // In a real app, this would open the camera for QR scanning
    // For our prototype, we'll simulate success after a delay
    setShowQrScanner(true);
    setTimeout(() => {
      setShowQrScanner(false);
      toast.success('Identity verified successfully!');
      handleLogin();
    }, 2000);
  };

  return (
    <MainLayout>
      <div className="min-h-[calc(100vh-16rem)] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <div className="w-full max-w-md">
          <motion.div
            className="text-center mb-8"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <Link to="/" className="inline-flex items-center justify-center mb-6">
              <div className="w-12 h-12 bg-primary rounded-md flex items-center justify-center">
                <span className="text-primary-foreground font-semibold text-lg">UIP</span>
              </div>
            </Link>
            <h1 className="text-3xl font-bold">Welcome to the Unified Interface Platform</h1>
            <p className="mt-3 text-muted-foreground">
              Select your role to access the platform
            </p>
          </motion.div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
          >
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid grid-cols-3 mb-8">
                <TabsTrigger value="select-role">Select Role</TabsTrigger>
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="register">Register</TabsTrigger>
              </TabsList>
              
              <TabsContent value="select-role">
                <div className="grid gap-6">
                  <motion.div variants={fadeIn} transition={{ duration: 0.3 }}>
                    <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleRoleSelect('student')}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-3">
                            <GraduationCap className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">Student</h3>
                            <p className="text-sm text-muted-foreground">
                              Track your academic journey and achievements
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.1 }}>
                    <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleRoleSelect('teacher')}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-3">
                            <BookOpen className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">Teacher</h3>
                            <p className="text-sm text-muted-foreground">
                              Monitor student progress and manage your classes
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                  
                  <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.2 }}>
                    <Card className="cursor-pointer hover:shadow-md transition-all" onClick={() => handleRoleSelect('institution')}>
                      <CardContent className="p-6">
                        <div className="flex items-center gap-4">
                          <div className="rounded-full bg-primary/10 p-3">
                            <Building className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <h3 className="font-medium text-lg">Institution Admin</h3>
                            <p className="text-sm text-muted-foreground">
                              Manage your institution's data and analytics
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>

                  <div className="text-center text-sm text-muted-foreground mt-4">
                    <p>
                      This is a demo for the Smart India Hackathon 2025. <br />
                      No real authentication is implemented.
                    </p>
                  </div>
                </div>
              </TabsContent>
              
              <TabsContent value="login">
                <Card>
                  <CardHeader>
                    <CardTitle>Login to your account</CardTitle>
                    <CardDescription>
                      {loginRole === 'student' && "Enter your Aadhar ID and password to access your student portal"}
                      {loginRole === 'teacher' && "Enter your APAR ID and password to access your teacher portal"}
                      {loginRole === 'institution' && "Enter your AISHE Code and password to access your institution portal"}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid gap-2">
                        <div className="flex flex-col gap-1">
                          <Label htmlFor="id-type">ID Type</Label>
                          <div className="flex gap-4 mt-1">
                            {loginRole === 'student' && (
                              <div className="flex items-center gap-2">
                                <input 
                                  type="radio" 
                                  id="aadhar-id" 
                                  name="id-type" 
                                  checked={idType === 'aadhar'}
                                  onChange={() => setIdType('aadhar')}
                                  className="rounded text-primary focus:ring-primary"
                                />
                                <Label htmlFor="aadhar-id" className="text-sm cursor-pointer">Aadhar ID</Label>
                              </div>
                            )}
                            {loginRole === 'teacher' && (
                              <div className="flex items-center gap-2">
                                <input 
                                  type="radio" 
                                  id="apar-id" 
                                  name="id-type" 
                                  checked={idType === 'apar'}
                                  onChange={() => setIdType('apar')}
                                  className="rounded text-primary focus:ring-primary"
                                />
                                <Label htmlFor="apar-id" className="text-sm cursor-pointer">APAR ID</Label>
                              </div>
                            )}
                            {loginRole === 'institution' && (
                              <div className="flex items-center gap-2">
                                <input 
                                  type="radio" 
                                  id="aishe-code" 
                                  name="id-type" 
                                  checked={idType === 'aishe'}
                                  onChange={() => setIdType('aishe')}
                                  className="rounded text-primary focus:ring-primary"
                                />
                                <Label htmlFor="aishe-code" className="text-sm cursor-pointer">AISHE Code</Label>
                              </div>
                            )}
                            {(loginRole === 'student' || loginRole === 'teacher') && (
                              <div className="flex items-center gap-2">
                                <input 
                                  type="radio" 
                                  id="digilocker" 
                                  name="id-type" 
                                  checked={idType === 'digilocker'}
                                  onChange={() => setIdType('digilocker')}
                                  className="rounded text-primary focus:ring-primary"
                                />
                                <Label htmlFor="digilocker" className="text-sm cursor-pointer">DigiLocker</Label>
                              </div>
                            )}
                          </div>
                        </div>
                        
                        <div className="grid gap-2">
                          <Label htmlFor="identifier">
                            {idType === 'aadhar' && 'Aadhar ID'}
                            {idType === 'apar' && 'APAR ID'}
                            {idType === 'aishe' && 'AISHE Code'}
                            {idType === 'digilocker' && 'DigiLocker ID'}
                          </Label>
                          <div className="relative">
                            <Input 
                              id="identifier" 
                              placeholder={
                                idType === 'aadhar' ? 'Enter 12-digit Aadhar ID' : 
                                idType === 'apar' ? 'Enter APAR ID' : 
                                idType === 'aishe' ? 'Enter AISHE Code' :
                                'Enter DigiLocker ID'
                              } 
                              className="pl-9"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                              {idType === 'aadhar' && <Fingerprint className="h-4 w-4 text-muted-foreground" />}
                              {idType === 'apar' && <User className="h-4 w-4 text-muted-foreground" />}
                              {idType === 'aishe' && <School className="h-4 w-4 text-muted-foreground" />}
                              {idType === 'digilocker' && <Key className="h-4 w-4 text-muted-foreground" />}
                            </div>
                          </div>
                        </div>
                        
                        {idType !== 'digilocker' && (
                          <div className="grid gap-2">
                            <div className="flex items-center justify-between">
                              <Label htmlFor="password">Password</Label>
                              <Link to="#" className="text-sm text-primary hover:underline">
                                Forgot password?
                              </Link>
                            </div>
                            <div className="relative">
                              <Input 
                                id="password" 
                                type="password" 
                                placeholder="Enter your password" 
                                className="pl-9"
                              />
                              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                                <Key className="h-4 w-4 text-muted-foreground" />
                              </div>
                            </div>
                          </div>
                        )}
                        
                        {idType === 'digilocker' && (
                          <div className="p-4 border border-border rounded-lg mt-2">
                            {!showQrScanner ? (
                              <div className="flex flex-col items-center justify-center gap-4">
                                <QrCode className="h-24 w-24 text-muted-foreground" />
                                <p className="text-sm text-center text-muted-foreground">
                                  Scan QR code with DigiLocker app to securely login
                                </p>
                                <Button onClick={handleQrScan}>
                                  Scan QR Code
                                </Button>
                              </div>
                            ) : (
                              <div className="flex flex-col items-center justify-center gap-4">
                                <div className="h-24 w-24 bg-primary/10 rounded-lg animate-pulse flex items-center justify-center">
                                  <QrCode className="h-12 w-12 text-primary animate-bounce" />
                                </div>
                                <p className="text-sm text-center">
                                  Scanning... Please approve on your DigiLocker app
                                </p>
                              </div>
                            )}
                          </div>
                        )}
                        
                        <div className="flex items-center space-x-2 mt-2">
                          <Checkbox id="remember" />
                          <Label htmlFor="remember" className="text-sm">Remember me for 30 days</Label>
                        </div>
                        
                        <div className="flex flex-col gap-2 mt-2">
                          <Button className="w-full" onClick={handleLogin}>
                            <LogIn className="h-4 w-4 mr-2" />
                            Login
                          </Button>
                          <Button variant="outline" className="w-full" onClick={handleSkipLogin}>
                            Skip for Demo
                          </Button>
                        </div>
                      </div>
                      
                      <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                          <span className="w-full border-t border-border" />
                        </div>
                        <div className="relative flex justify-center text-xs uppercase">
                          <span className="bg-background px-2 text-muted-foreground">
                            Or continue with
                          </span>
                        </div>
                      </div>
                      
                      <div className="grid grid-cols-2 gap-4">
                        <Button variant="outline" className="w-full">
                          <QrCode className="h-4 w-4 mr-2" />
                          DigiLocker
                        </Button>
                        <Button variant="outline" className="w-full">
                          <ShieldCheck className="h-4 w-4 mr-2" />
                          ABC / APAAR
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <div className="text-center text-sm text-muted-foreground">
                      <p>Don't have an account?{' '}
                        <button onClick={() => setActiveTab('register')} className="text-primary hover:underline">
                          Register here
                        </button>
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveTab('select-role')}
                    >
                      Back to Role Selection
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              
              <TabsContent value="register">
                <Card>
                  <CardHeader>
                    <CardTitle>Create an account</CardTitle>
                    <CardDescription>
                      Register to access the Unified Interface Platform
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="grid gap-2">
                          <Label htmlFor="first-name">First name</Label>
                          <Input id="first-name" placeholder="Enter your first name" />
                        </div>
                        <div className="grid gap-2">
                          <Label htmlFor="last-name">Last name</Label>
                          <Input id="last-name" placeholder="Enter your last name" />
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input id="email" type="email" placeholder="Enter your email address" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="register-role">Role</Label>
                        <select 
                          id="register-role" 
                          className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          defaultValue={loginRole || ''}
                        >
                          <option value="" disabled>Select your role</option>
                          <option value="student">Student</option>
                          <option value="teacher">Teacher</option>
                          <option value="institution">Institution</option>
                        </select>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="identifier-type">Identity Verification</Label>
                        <div className="p-4 border border-border rounded-lg bg-muted/50">
                          <div className="flex items-center gap-3 mb-4">
                            <Fingerprint className="h-5 w-5 text-primary" />
                            <div>
                              <p className="font-medium">Identity Verification Required</p>
                              <p className="text-sm text-muted-foreground">
                                Link your official ID to verify your identity
                              </p>
                            </div>
                          </div>
                          
                          <div className="grid gap-4">
                            <div className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                id="reg-aadhar" 
                                name="reg-id-type" 
                                className="rounded text-primary focus:ring-primary"
                              />
                              <Label htmlFor="reg-aadhar" className="text-sm cursor-pointer">Aadhar ID (for Students and Teachers)</Label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                id="reg-apar" 
                                name="reg-id-type"
                                className="rounded text-primary focus:ring-primary" 
                              />
                              <Label htmlFor="reg-apar" className="text-sm cursor-pointer">APAR ID (for Teachers)</Label>
                            </div>
                            
                            <div className="flex items-center gap-2">
                              <input 
                                type="radio" 
                                id="reg-aishe" 
                                name="reg-id-type" 
                                className="rounded text-primary focus:ring-primary"
                              />
                              <Label htmlFor="reg-aishe" className="text-sm cursor-pointer">AISHE Code (for Institutions)</Label>
                            </div>
                            
                            <div className="grid gap-2 mt-2">
                              <Label htmlFor="id-number">ID Number</Label>
                              <Input id="id-number" placeholder="Enter your ID number" />
                            </div>
                          </div>
                        </div>
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="new-password">Password</Label>
                        <Input id="new-password" type="password" placeholder="Create a password" />
                      </div>
                      
                      <div className="grid gap-2">
                        <Label htmlFor="confirm-password">Confirm Password</Label>
                        <Input id="confirm-password" type="password" placeholder="Confirm your password" />
                      </div>
                      
                      <div className="flex items-center space-x-2">
                        <Checkbox id="terms" />
                        <Label htmlFor="terms" className="text-sm">
                          I agree to the{" "}
                          <Link to="/terms" className="text-primary hover:underline">
                            Terms of Service
                          </Link>{" "}
                          and{" "}
                          <Link to="/privacy" className="text-primary hover:underline">
                            Privacy Policy
                          </Link>
                        </Label>
                      </div>
                      
                      <div className="flex flex-col gap-2">
                        <Button className="w-full" onClick={handleRegister}>
                          <UserPlus className="h-4 w-4 mr-2" />
                          Create Account
                        </Button>
                      </div>
                      
                      <div className="text-center text-sm">
                        <div className="flex items-center justify-center gap-1">
                          <CircleHelp className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Need help with registration?</span>
                        </div>
                        <Link to="/help" className="text-primary hover:underline">
                          Visit our Help Center
                        </Link>
                      </div>
                    </div>
                  </CardContent>
                  <CardFooter className="flex flex-col gap-2">
                    <div className="text-center text-sm text-muted-foreground">
                      <p>Already have an account?{' '}
                        <button onClick={() => setActiveTab('login')} className="text-primary hover:underline">
                          Login here
                        </button>
                      </p>
                    </div>
                    <Button 
                      variant="ghost" 
                      size="sm"
                      onClick={() => setActiveTab('select-role')}
                    >
                      Back to Role Selection
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
            </Tabs>
          </motion.div>
        </div>
      </div>
    </MainLayout>
  );
}