import { useState } from 'react';
import { motion } from 'framer-motion';
import MainLayout from '@/components/layout/MainLayout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from '@/components/ui/tabs';
import { toast } from 'sonner';
import {
  HelpCircle,
  MessageSquare,
  Phone,
  Mail,
  FileText,
  Book,
  Video,
  Search,
  CheckCircle,
} from 'lucide-react';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

export default function Help() {
  const [searchQuery, setSearchQuery] = useState('');
  const [contactFormData, setContactFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleContactFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setContactFormData({
      ...contactFormData,
      [name]: value,
    });
  };

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, we would submit the form data to an API
    toast.success('Your message has been sent! We will get back to you soon.');
    setContactFormData({
      name: '',
      email: '',
      subject: '',
      message: '',
    });
  };

  // FAQ data
  const faqs = [
    {
      question: 'What is the Unified Interface Platform?',
      answer: 'The Unified Interface Platform (UIP) is a comprehensive solution designed to integrate educational data from various sources like NIRF, AISHE, and APAR into a single, cohesive interface. It provides role-based dashboards for students, teachers, and institutions, enabling better data visualization, analysis, and reporting.'
    },
    {
      question: 'How do I get started with UIP?',
      answer: 'To get started, simply click on the "Login" button and select your role (Student, Teacher, or Institution Admin). This demo version allows you to explore the platform\'s features without requiring actual credentials. In a production environment, your institution would provide you with login details.'
    },
    {
      question: 'What can I do as a student on the platform?',
      answer: 'As a student, you can track your academic performance, maintain a verified logbook of your activities, explore internship opportunities, and generate comprehensive reports of your academic journey. The student dashboard provides visual analytics of your progress and achievements.'
    },
    {
      question: 'How do teachers use the platform?',
      answer: 'Teachers can monitor student performance, verify student logbook entries, track their teaching effectiveness through analytics, and manage their publications and research activities. The teacher dashboard provides tools for student mentorship and performance evaluation.'
    },
    {
      question: 'What benefits does UIP offer to institutions?',
      answer: 'Institutions can generate automated compliance reports (like NIRF, AISHE), analyze institutional performance across departments, track scheme utilization, and make data-driven decisions for improvement. The analytics dashboard provides comprehensive insights into various aspects of institutional performance.'
    },
    {
      question: 'Is my data secure on the platform?',
      answer: 'Yes, data security is our priority. The platform implements robust security measures including encryption, access controls, and regular security audits. All personal data is handled in compliance with relevant data protection regulations.'
    },
    {
      question: 'Can I export data from the platform?',
      answer: 'Yes, the platform allows you to export data in various formats including PDF reports and CSV files. This feature is particularly useful for institutions generating compliance reports or students creating portfolios.'
    },
    {
      question: 'How is the logbook verification process handled?',
      answer: 'Students can submit logbook entries documenting their academic activities. Teachers can then review these entries and either approve them or request changes. Once verified, these entries become part of the student\'s official academic record and can be included in reports.'
    }
  ];

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
              <div className="rounded-full bg-primary/10 p-4">
                <HelpCircle className="h-8 w-8 text-primary" />
              </div>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              How Can We Help You?
            </h1>
            
            <p className="text-lg text-muted-foreground mb-8">
              Find answers to common questions, browse our documentation, or get in touch with our support team.
            </p>
            
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input 
                placeholder="Search for help topics..." 
                className="pl-10 h-12"
                value={searchQuery}
                onChange={handleSearchChange}
              />
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Help Options */}
      <section className="py-16 bg-muted/30">
        <div className="container">
          <Tabs defaultValue="faq" className="max-w-4xl mx-auto">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="faq" className="flex items-center gap-2">
                <MessageSquare className="h-4 w-4" />
                <span>FAQs</span>
              </TabsTrigger>
              <TabsTrigger value="docs" className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <span>Documentation</span>
              </TabsTrigger>
              <TabsTrigger value="contact" className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <span>Contact Us</span>
              </TabsTrigger>
            </TabsList>
            
            {/* FAQs Tab */}
            <TabsContent value="faq" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                  <CardDescription>
                    Find answers to the most common questions about the Unified Interface Platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Accordion type="single" collapsible className="w-full">
                    {faqs.map((faq, index) => (
                      <AccordionItem key={index} value={`item-${index}`}>
                        <AccordionTrigger>{faq.question}</AccordionTrigger>
                        <AccordionContent>
                          <p className="text-muted-foreground">{faq.answer}</p>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </CardContent>
                <CardFooter className="flex justify-center border-t border-border pt-6">
                  <p className="text-sm text-muted-foreground">
                    Can't find what you're looking for? <a href="#contact" className="text-primary hover:underline">Contact our support team</a>.
                  </p>
                </CardFooter>
              </Card>
            </TabsContent>
            
            {/* Documentation Tab */}
            <TabsContent value="docs" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Documentation</CardTitle>
                  <CardDescription>
                    Browse our comprehensive guides and documentation to learn more about the platform.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Book className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">User Guides</h3>
                      </div>
                      <ul className="space-y-3">
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            Getting Started Guide
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            Student Dashboard Manual
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            Teacher's Guide to Logbook Verification
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            Institution Analytics Handbook
                          </a>
                        </li>
                      </ul>
                    </div>
                    
                    <div className="border border-border rounded-lg p-6 hover:shadow-md transition-all duration-300">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="rounded-full bg-primary/10 p-2">
                          <Video className="h-5 w-5 text-primary" />
                        </div>
                        <h3 className="font-medium">Video Tutorials</h3>
                      </div>
                      <ul className="space-y-3">
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            Platform Overview (5:23)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            Creating and Managing Logbook Entries (3:45)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            Generating NIRF Reports (4:12)
                          </a>
                        </li>
                        <li>
                          <a href="#" className="text-primary hover:underline flex items-center gap-2">
                            <span className="w-1 h-1 rounded-full bg-primary"></span>
                            Understanding Analytics Dashboard (6:38)
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
            
            {/* Contact Us Tab */}
            <TabsContent value="contact" className="mt-8">
              <Card>
                <CardHeader>
                  <CardTitle>Contact Us</CardTitle>
                  <CardDescription>
                    Get in touch with our support team for personalized assistance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div className="border border-border rounded-lg p-6 text-center hover:shadow-md transition-all duration-300">
                      <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Mail className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-medium mb-2">Email Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        For general inquiries and support requests
                      </p>
                      <a href="mailto:support@uip.edu" className="text-primary hover:underline">
                        support@uip.edu
                      </a>
                    </div>
                    
                    <div className="border border-border rounded-lg p-6 text-center hover:shadow-md transition-all duration-300">
                      <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <Phone className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-medium mb-2">Phone Support</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Available Monday-Friday, 9am-5pm IST
                      </p>
                      <a href="tel:+918005555555" className="text-primary hover:underline">
                        +91 800 555 5555
                      </a>
                    </div>
                    
                    <div className="border border-border rounded-lg p-6 text-center hover:shadow-md transition-all duration-300">
                      <div className="flex justify-center mb-4">
                        <div className="rounded-full bg-primary/10 p-3">
                          <MessageSquare className="h-6 w-6 text-primary" />
                        </div>
                      </div>
                      <h3 className="font-medium mb-2">Live Chat</h3>
                      <p className="text-sm text-muted-foreground mb-4">
                        Instant support from our technical team
                      </p>
                      <Button variant="outline" className="text-primary hover:bg-primary/10 hover:text-primary">
                        Start Chat
                      </Button>
                    </div>
                  </div>
                  
                  <div className="border-t border-border pt-8">
                    <h3 className="text-lg font-semibold mb-4">Send Us a Message</h3>
                    <form onSubmit={handleContactSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label htmlFor="name" className="text-sm font-medium block mb-1">
                            Name
                          </label>
                          <Input
                            id="name"
                            name="name"
                            value={contactFormData.name}
                            onChange={handleContactFormChange}
                            required
                          />
                        </div>
                        <div>
                          <label htmlFor="email" className="text-sm font-medium block mb-1">
                            Email
                          </label>
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            value={contactFormData.email}
                            onChange={handleContactFormChange}
                            required
                          />
                        </div>
                      </div>
                      
                      <div>
                        <label htmlFor="subject" className="text-sm font-medium block mb-1">
                          Subject
                        </label>
                        <Input
                          id="subject"
                          name="subject"
                          value={contactFormData.subject}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>
                      
                      <div>
                        <label htmlFor="message" className="text-sm font-medium block mb-1">
                          Message
                        </label>
                        <Textarea
                          id="message"
                          name="message"
                          rows={5}
                          value={contactFormData.message}
                          onChange={handleContactFormChange}
                          required
                        />
                      </div>
                      
                      <Button type="submit" className="gap-2">
                        <CheckCircle className="h-4 w-4" />
                        Send Message
                      </Button>
                    </form>
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