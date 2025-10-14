import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { 
  BookOpen, 
  BarChart2, 
  Users, 
  ChevronRight,
  CheckCircle2,
  Building,
  GraduationCap
} from 'lucide-react';
import MainLayout from '@/components/layout/MainLayout';

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

export default function Home() {
  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="relative py-20 md:py-32 overflow-hidden bg-background">
        {/* Background pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.03] z-0"></div>
        
        {/* Decorative elements */}
        <div className="absolute top-20 left-20 w-64 h-64 bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-secondary/5 rounded-full blur-3xl"></div>
        
        <div className="container relative z-10">
          <motion.div 
            className="max-w-3xl mx-auto text-center"
            initial="hidden"
            animate="visible"
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <div className="mb-6 inline-block">
              <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 rounded-full bg-primary/10">
                <div className="w-10 h-10 bg-primary rounded-md flex items-center justify-center">
                  <span className="text-primary-foreground font-semibold text-lg">UIP</span>
                </div>
              </div>
              <span className="inline-block px-4 py-1 rounded-full bg-secondary/10 text-secondary-foreground text-sm font-medium">
                Smart India Hackathon 2025
              </span>
            </div>
            
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
              <span className="text-gradient">Reunifying India's</span> <br />
              Educational Ecosystem
            </h1>
            
            <p className="text-lg md:text-xl text-muted-foreground mb-8 leading-relaxed">
              The Unified Interface Platform bridges disconnected performance data from students, teachers, and institutions into one cohesive, transparent, and powerful analytical dashboard.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button 
                size="lg" 
                className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border border-transparent hover:border-secondary text-primary-foreground"
                asChild
              >
                <Link to="/login">
                  Explore Platform
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              
              <Button 
                size="lg" 
                variant="outline" 
                className="gap-2 border-primary"
                asChild
              >
                <Link to="/about">
                  Learn More
                </Link>
              </Button>
            </div>
          </motion.div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              One Platform, Multiple Perspectives
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Tailored experiences for each stakeholder in the educational ecosystem
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-3 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            {/* For Students */}
            <motion.div 
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              variants={fadeIn}
              transition={{ duration: 0.3 }}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
                <GraduationCap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Students</h3>
              <p className="text-muted-foreground mb-6">
                Track your academic journey, maintain a verified logbook of activities, and discover internship opportunities aligned with your skills and interests.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                  <span>Comprehensive academic performance tracking</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                  <span>Verified activity logbook</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                  <span>Internship discovery and application</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                asChild
              >
                <Link to="/login">Try Student Dashboard</Link>
              </Button>
            </motion.div>
            
            {/* For Teachers */}
            <motion.div 
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              variants={fadeIn}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
                <BookOpen className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Teachers</h3>
              <p className="text-muted-foreground mb-6">
                Monitor student performance, verify student activities, and track your teaching effectiveness with insightful analytics and feedback.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                  <span>Student performance monitoring</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                  <span>Activity verification system</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                  <span>Teaching effectiveness analytics</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                asChild
              >
                <Link to="/login">Try Teacher Dashboard</Link>
              </Button>
            </motion.div>
            
            {/* For Institutions */}
            <motion.div 
              className="bg-card border border-border rounded-xl p-6 shadow-sm hover:shadow-md transition-all duration-300"
              variants={fadeIn}
              transition={{ duration: 0.3, delay: 0.2 }}
            >
              <div className="rounded-full bg-primary/10 w-12 h-12 flex items-center justify-center mb-6">
                <Building className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3">For Institutions</h3>
              <p className="text-muted-foreground mb-6">
                Generate compliance reports like NIRF automatically, analyze institutional performance, and make data-driven decisions for improvement.
              </p>
              <ul className="space-y-3 mb-6">
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                  <span>Automated NIRF, AISHE report generation</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                  <span>Institutional performance analytics</span>
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle2 className="h-5 w-5 text-primary/70" />
                  <span>Data-driven decision making tools</span>
                </li>
              </ul>
              <Button 
                variant="outline" 
                className="w-full"
                asChild
              >
                <Link to="/login">Try Institution Dashboard</Link>
              </Button>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Testimonials Section */}
      <section className="py-20">
        <div className="container">
          <motion.div
            className="text-center mb-16"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Our Users Say
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              The platform is making a difference across the educational ecosystem
            </p>
          </motion.div>
          
          <motion.div 
            className="grid md:grid-cols-2 gap-8"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={staggerContainer}
          >
            <motion.div 
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm"
              variants={fadeIn}
              transition={{ duration: 0.3 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-lg italic">
                    "This platform is a monumental step towards data transparency in our education system. It's exactly the kind of innovation India needs."
                  </p>
                </div>
                <div className="mt-auto flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="font-medium text-primary">AD</span>
                  </div>
                  <div>
                    <p className="font-medium">Dr. Aruna Desai</p>
                    <p className="text-sm text-muted-foreground">Education Ministry Official</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div 
              className="bg-card/50 backdrop-blur-sm border border-border rounded-xl p-6 shadow-sm"
              variants={fadeIn}
              transition={{ duration: 0.3, delay: 0.1 }}
            >
              <div className="flex flex-col h-full">
                <div className="mb-6">
                  <p className="text-lg italic">
                    "Managing institutional data for NIRF and AISHE has always been a challenge. The UIP simplifies this entire process, saving us hundreds of hours."
                  </p>
                </div>
                <div className="mt-auto flex items-center">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mr-4">
                    <span className="font-medium text-primary">AV</span>
                  </div>
                  <div>
                    <p className="font-medium">Prof. Alok Varma</p>
                    <p className="text-sm text-muted-foreground">Vice-Chancellor, NIAMT Ranchi</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-20 bg-primary/5">
        <div className="container">
          <motion.div
            className="max-w-4xl mx-auto text-center"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={fadeIn}
            transition={{ duration: 0.5 }}
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              Ready to See It in Action?
            </h2>
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
              Experience how the Unified Interface Platform can transform data management and insights in your educational institution.
            </p>
            <Button 
              size="lg" 
              className="gap-2 bg-gradient-to-r from-primary to-primary/80 hover:from-primary/90 hover:to-primary/70 border border-transparent hover:border-secondary text-primary-foreground"
              asChild
            >
              <Link to="/login">
                Try the Demo
                <ChevronRight className="h-4 w-4" />
              </Link>
            </Button>
          </motion.div>
        </div>
      </section>
    </MainLayout>
  );
}