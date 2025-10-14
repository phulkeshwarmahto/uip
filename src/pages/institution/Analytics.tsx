import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import DashboardLayout from '@/components/layout/DashboardLayout';
import StatCard from '@/components/dashboard/StatCard';
import ChartCard from '@/components/dashboard/ChartCard';
import LineChart from '@/components/dashboard/LineChart';
import BarChart from '@/components/dashboard/BarChart';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { RefreshCcw, BarChart2, Users, Percent, Award } from 'lucide-react';
import institutionData from '@/data/institution.json';

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

export default function InstitutionAnalytics() {
  const [data, setData] = useState<any>(null);
  const [isRefreshing, setIsRefreshing] = useState(false);
  
  useEffect(() => {
    // In a real app, we would fetch this data from an API
    // For the prototype, we'll use the mock data
    setData(institutionData);
  }, []);

  const handleRefreshData = () => {
    setIsRefreshing(true);
    toast.info('Refreshing data...');
    
    // Simulate data refresh with a delay
    setTimeout(() => {
      // In a real app, we would fetch fresh data from the API
      // For the prototype, let's just add some random variations to the existing data
      const newData = {
        ...data,
        enrollmentTrend: data.enrollmentTrend.map((item: any) => ({
          ...item,
          students: item.students + Math.floor(Math.random() * 20) - 10
        })),
        completionRateByDept: data.completionRateByDept.map((item: any) => ({
          ...item,
          rate: Math.min(100, Math.max(80, item.rate + Math.floor(Math.random() * 6) - 3))
        }))
      };
      
      setData(newData);
      setIsRefreshing(false);
      toast.success('Data refreshed successfully!');
    }, 1000);
  };

  if (!data) {
    return (
      <DashboardLayout requiredRole="institution" title="Unified Analytics">
        <div className="flex items-center justify-center h-64">
          <p>Loading analytics data...</p>
        </div>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout requiredRole="institution" title="Unified Analytics">
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
            <h1 className="text-3xl font-bold">Unified Platform Analytics</h1>
            <p className="text-muted-foreground mt-2">
              Comprehensive analytics across all data sources
            </p>
          </div>
          
          <Button 
            onClick={handleRefreshData} 
            disabled={isRefreshing} 
            className="gap-2"
          >
            <RefreshCcw className={`h-4 w-4 ${isRefreshing ? 'animate-spin' : ''}`} />
            {isRefreshing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
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
            title="Total Enrollment"
            value={data.totalStudents}
            icon={<Users className="h-5 w-5 text-primary" />}
            trend={{ value: 4.3, isPositive: true }}
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.1 }}>
          <StatCard
            title="Avg. Completion Rate"
            value={`${Math.round(data.completionRateByDept.reduce((acc: number, curr: any) => acc + curr.rate, 0) / data.completionRateByDept.length)}%`}
            icon={<Percent className="h-5 w-5 text-primary" />}
            colorVariant="success"
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.2 }}>
          <StatCard
            title="Platform-wide Avg. CGPA"
            value="8.6"
            icon={<Award className="h-5 w-5 text-primary" />}
            colorVariant="secondary"
          />
        </motion.div>

        <motion.div variants={fadeIn} transition={{ duration: 0.3, delay: 0.3 }}>
          <StatCard
            title="Most Used Scheme"
            value="PMRF"
            icon={<BarChart2 className="h-5 w-5 text-primary" />}
            colorVariant="warning"
          />
        </motion.div>
      </motion.div>

      {/* Charts section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <ChartCard 
          title="Enrollment Trend" 
          description="Student enrollment over the last 5 years"
          onRefresh={handleRefreshData}
        >
          <LineChart
            data={data.enrollmentTrend}
            lines={[
              { dataKey: 'students', name: 'Students' }
            ]}
            xAxisDataKey="year"
          />
        </ChartCard>

        <ChartCard 
          title="Completion Rate by Department" 
          description="Comparison of completion rates across departments"
          onRefresh={handleRefreshData}
        >
          <BarChart
            data={data.completionRateByDept}
            bars={[
              { dataKey: 'rate', name: 'Completion Rate (%)' }
            ]}
            xAxisDataKey="department"
          />
        </ChartCard>
      </div>

      {/* Scheme Usage Heatmap */}
      <div className="mb-8">
        <ChartCard 
          title="Scheme Usage Heatmap" 
          description="Distribution of government scheme usage across departments"
        >
          <div className="h-80 flex items-center justify-center">
            {/* In a real app, this would be an interactive heatmap */}
            <div className="w-full max-w-3xl">
              <div className="mb-4 flex justify-between items-center">
                <p className="text-sm font-medium">Scheme Usage Intensity</p>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 bg-blue-100 dark:bg-blue-900"></div>
                  <span className="text-xs text-muted-foreground">Low</span>
                  <div className="h-3 w-3 bg-blue-300 dark:bg-blue-700"></div>
                  <span className="text-xs text-muted-foreground">Medium</span>
                  <div className="h-3 w-3 bg-blue-500 dark:bg-blue-500"></div>
                  <span className="text-xs text-muted-foreground">High</span>
                </div>
              </div>
              
              <div className="w-full border border-border rounded-lg overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="bg-muted/50">
                      <th className="p-2 border-r border-border">Schemes</th>
                      {data.departments.map((dept: any) => (
                        <th key={dept.id} className="p-2 text-center">
                          {dept.name.split(' ')[0]}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {data.schemes.map((scheme: any, index: number) => (
                      <tr key={scheme.id} className={index % 2 === 0 ? 'bg-card' : 'bg-muted/20'}>
                        <td className="p-2 border-r border-border font-medium">
                          {scheme.name}
                        </td>
                        {data.departments.map((dept: any) => {
                          // Get the intensity for this scheme and department
                          const schemeUsage = data.schemeUsageHeatmap.find((s: any) => s.scheme === scheme.name);
                          const intensity = schemeUsage?.usage.find((u: any) => u.department === dept.name)?.intensity || 0;
                          
                          // Determine color based on intensity
                          let bgColor = '';
                          if (intensity < 0.3) bgColor = 'bg-blue-100 dark:bg-blue-900/30';
                          else if (intensity < 0.6) bgColor = 'bg-blue-300 dark:bg-blue-700/50';
                          else bgColor = 'bg-blue-500 dark:bg-blue-500/70';
                          
                          return (
                            <td key={dept.id} className="p-2 text-center">
                              <div className="mx-auto w-6 h-6 rounded-sm opacity-80" style={{ backgroundColor: `var(--chart-${(index % 5) + 1})`, opacity: intensity }}></div>
                            </td>
                          );
                        })}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </ChartCard>
      </div>

      {/* Department Performance */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {data.departments.map((dept: any, index: number) => (
          <Card key={dept.id} className="dashboard-card">
            <CardContent className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{dept.name}</h3>
                <span className="text-xs text-muted-foreground">
                  {dept.students} Students • {dept.faculty} Faculty
                </span>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Placement Rate</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-medium">{dept.placementRate}%</span>
                    {dept.placementRate > data.placementRate ? (
                      <span className="text-xs text-green-600 dark:text-green-400 mb-1">
                        ↑ {(dept.placementRate - data.placementRate).toFixed(1)}%
                      </span>
                    ) : dept.placementRate < data.placementRate ? (
                      <span className="text-xs text-red-600 dark:text-red-400 mb-1">
                        ↓ {(data.placementRate - dept.placementRate).toFixed(1)}%
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground mb-1">
                        = Avg
                      </span>
                    )}
                  </div>
                </div>
                
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Avg. CGPA</p>
                  <div className="flex items-end gap-2">
                    <span className="text-2xl font-medium">{dept.avgCGPA}</span>
                    {dept.avgCGPA > 8.5 ? (
                      <span className="text-xs text-green-600 dark:text-green-400 mb-1">
                        Above Avg
                      </span>
                    ) : dept.avgCGPA < 8.5 ? (
                      <span className="text-xs text-amber-600 dark:text-amber-400 mb-1">
                        Below Avg
                      </span>
                    ) : (
                      <span className="text-xs text-muted-foreground mb-1">
                        = Avg
                      </span>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="mt-4">
                <div className="w-full bg-muted/50 h-2 rounded-full overflow-hidden">
                  <div 
                    className="h-full rounded-full" 
                    style={{ 
                      width: `${dept.placementRate}%`,
                      backgroundColor: `hsl(var(--chart-${(index % 5) + 1}))` 
                    }}
                  ></div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </DashboardLayout>
  );
}