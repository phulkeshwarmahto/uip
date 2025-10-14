import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Link } from 'react-router-dom';
import {
  Building,
  Layers,
  Lightbulb,
  Users,
  CheckCircle,
  Github,
  Linkedin,
  Twitter,
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

// Team members data
const teamMembers = [
  {
    name: 'Md Danish Ali ',
    role: 'Team Lead',
    avatar: 'AS',
    bio: 'Computer Science undergraduate with expertise in Full stack web developement and project management.'
  },
  {
    name: 'Phulkeshwar Mahto',
    role: 'Frontend Developer',
    avatar: 'PP',
    bio: 'Computer Science undergraduate with expertise in web design, App developement and project management.'
  },
  {
    name: 'Prince Kumar Singh',
    role: 'Backend Developer',
    avatar: 'VS',
    bio: 'Computer Science undergraduate, Full-stack developer with expertise in Node.js, Express, and database design.'
  },
  {
    name: 'Swati Kumari',
    role: 'UI/UX Designer',
    avatar: 'NG',
    bio: 'Designer with a passion for creating intuitive and engaging user experiences.'
  },
  {
    name: 'Md Masoom Imtiyaz',
    role: 'Data Collection & Analysis',
    avatar: 'RK',
    bio: 'Computer Science undergraduate, AI/ML learner with experience in educational data analysis and visualization.'
  },
  {
    name: 'Kavya Verma',
    role: 'UI/UX Designer',
    avatar: 'AD',
    bio: 'Designer with a passion for creating intuitive and engaging user experiences.'
  }
];

export default function About() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="py-16 md:py-24 bg-background">
        <div className="container">
          <motion.div
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-flex items-center justify-center">
              <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
                <span className="text-primary-foreground font-bold text-2xl">UIP</span>
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About CodeCrafters
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              We are a team of passionate developers, designers, and data scientists participating in the Smart India Hackathon 2025 with a mission to transform how educational data is managed and utilized across India.
            </p>
          </motion.div>
        </div>
      </section>
      
      {/* Tabs Section */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <Tabs defaultValue="mission" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="mission">Our Mission</TabsTrigger>
              <TabsTrigger value="team">The Team</TabsTrigger>
              <TabsTrigger value="project">The Project</TabsTrigger>
            </TabsList>
            
            <TabsContent value="mission" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                        <Lightbulb className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Our Vision</h3>
                        <p className="text-muted-foreground">
                          To create a unified, transparent, and accessible platform that bridges the gap between students, teachers, and institutions, empowering each stakeholder with meaningful insights and tools to enhance the educational journey.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                        <Layers className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Our Approach</h3>
                        <p className="text-muted-foreground">
                          We believe in the power of data integration and visualization to transform how educational institutions operate. By unifying siloed data sources like NIRF, AISHE, and APAR, we create a comprehensive view that enables better decision-making at all levels.
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                        <CheckCircle className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Our Values</h3>
                        <ul className="space-y-2 text-muted-foreground">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>User-Centered Design: Every feature is built with the end user in mind</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>Data Privacy: Protecting sensitive educational data is our priority</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>Accessibility: Building tools that work for everyone</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>Innovation: Constantly pushing the boundaries of what's possible</span>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            <TabsContent value="team" className="mt-8">
              <motion.div
                initial="hidden"
                whileInView="visible"
                variants={staggerContainer}
                viewport={{ once: true }}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {teamMembers.map((member, index) => (
                    <motion.div
                      key={member.name}
                      variants={fadeIn}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                    >
                      <Card className="h-full">
                        <CardContent className="p-6">
                          <div className="flex flex-col items-center text-center">
                            <Avatar className="w-20 h-20 mb-4">
                              <AvatarFallback className="text-lg">{member.avatar}</AvatarFallback>
                            </Avatar>
                            <h3 className="text-lg font-semibold mb-1">{member.name}</h3>
                            <p className="text-sm text-primary mb-3">{member.role}</p>
                            <p className="text-sm text-muted-foreground mb-4">{member.bio}</p>
                            
                            <div className="flex gap-3">
                              <a href="#" className="text-muted-foreground hover:text-foreground">
                                <Github className="h-4 w-4" />
                              </a>
                              <a href="#" className="text-muted-foreground hover:text-foreground">
                                <Linkedin className="h-4 w-4" />
                              </a>
                              <a href="#" className="text-muted-foreground hover:text-foreground">
                                <Twitter className="h-4 w-4" />
                              </a>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
            
            <TabsContent value="project" className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <div className="space-y-6">
                    <div className="flex items-start gap-4">
                      <div className="rounded-full bg-primary/10 p-3 flex-shrink-0">
                        <Building className="h-6 w-6 text-primary" />
                      </div>
                      <div>
                        <h3 className="text-xl font-semibold mb-2">Smart India Hackathon 2025</h3>
                        <p className="text-muted-foreground mb-4">
                          The Unified Interface Platform is our entry for the Smart India Hackathon 2025, addressing the challenge of disconnected educational data systems across India.
                        </p>
                        
                        <div className="bg-muted/50 rounded-lg p-4 mb-4">
                          <h4 className="font-medium mb-2">Problem Statement</h4>
                          <p className="text-sm text-muted-foreground">
                            Currently, educational data in India is fragmented across multiple systems like NIRF, AISHE, and APAR, making it difficult for stakeholders to get a comprehensive view of performance metrics and trends. This leads to inefficient reporting, limited insights, and missed opportunities for improvement.
                          </p>
                        </div>
                        
                        <h4 className="font-medium mb-2">Our Solution</h4>
                        <p className="text-muted-foreground mb-4">
                          The Unified Interface Platform integrates data from these disparate sources into a cohesive, role-based dashboard system that provides:
                        </p>
                        
                        <ul className="space-y-2 text-muted-foreground mb-6">
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>Personalized dashboards for students, teachers, and institutions</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>Automated report generation for compliance requirements</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>Verified activity tracking and documentation</span>
                          </li>
                          <li className="flex items-center gap-2">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary"></span>
                            <span>Data-driven insights for institutional improvement</span>
                          </li>
                        </ul>
                        
                        <div className="text-center">
                          <Link to="/login" className="text-primary hover:text-primary/90 font-medium">
                            Try the Platform Demo →
                          </Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </section>
    </MainLayout>
  );
}