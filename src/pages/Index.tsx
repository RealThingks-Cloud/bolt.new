import { useState, useEffect } from 'react';
import { DashboardLayout } from '@/components/layout/DashboardLayout';
import { StatsCards } from '@/components/dashboard/StatsCards';
import { RecentActivity } from '@/components/dashboard/RecentActivity';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { TrendingUp, Calendar as CalendarIcon } from 'lucide-react';

interface DashboardStats {
  totalStudents: number;
  totalTeachers: number;
  upcomingClasses: number;
  pendingFees: number;
}

const Index = () => {
  const [stats, setStats] = useState<DashboardStats>({
    totalStudents: 0,
    totalTeachers: 0,
    upcomingClasses: 0,
    pendingFees: 0,
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchDashboardData = async () => {
    try {
      setLoading(true);

      // Fetch total students
      const { count: studentsCount } = await supabase
        .from('students')
        .select('*', { count: 'exact', head: true });

      // Fetch total teachers
      const { count: teachersCount } = await supabase
        .from('teachers')
        .select('*', { count: 'exact', head: true });

      // Fetch upcoming classes (next 7 days)
      const today = new Date();
      const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
      
      const { count: classesCount } = await supabase
        .from('classes')
        .select('*', { count: 'exact', head: true })
        .gte('class_date', today.toISOString().split('T')[0])
        .lte('class_date', nextWeek.toISOString().split('T')[0]);

      // Calculate pending fees
      const { data: students } = await supabase
        .from('students')
        .select('pending_fees');

      const totalPendingFees = students?.reduce(
        (sum, student) => sum + (Number(student.pending_fees) || 0),
        0
      ) || 0;

      setStats({
        totalStudents: studentsCount || 0,
        totalTeachers: teachersCount || 0,
        upcomingClasses: classesCount || 0,
        pendingFees: totalPendingFees,
      });
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      toast({
        title: 'Error loading dashboard',
        description: 'Failed to load dashboard data. Please try again.',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  // Mock recent activities for demonstration
  const recentActivities = [
    {
      id: '1',
      type: 'student' as const,
      title: 'New Student Enrolled',
      description: 'Rahul Kumar joined 11th Science batch',
      timestamp: '2 hours ago',
      status: 'success' as const,
    },
    {
      id: '2',
      type: 'payment' as const,
      title: 'Fee Payment Received',
      description: 'Priya Sharma paid ₹5,000 for Q1',
      timestamp: '4 hours ago',
      status: 'success' as const,
    },
    {
      id: '3',
      type: 'class' as const,
      title: 'Class Scheduled',
      description: 'Physics class for 12th standard',
      timestamp: '1 day ago',
    },
    {
      id: '4',
      type: 'payment' as const,
      title: 'Payment Overdue',
      description: 'Arjun Singh has pending fees',
      timestamp: '2 days ago',
      status: 'warning' as const,
    },
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        {/* Welcome Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome to your tuition management system
            </p>
          </div>
          <div className="text-sm text-muted-foreground">
            Last updated: {new Date().toLocaleTimeString('en-GB')}
          </div>
        </div>

        {/* Stats Cards */}
        {loading ? (
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[...Array(4)].map((_, i) => (
              <Card key={i} className="h-32 animate-pulse bg-muted/20" />
            ))}
          </div>
        ) : (
          <StatsCards
            totalStudents={stats.totalStudents}
            totalTeachers={stats.totalTeachers}
            upcomingClasses={stats.upcomingClasses}
            pendingFees={stats.pendingFees}
          />
        )}

        {/* Charts and Activity Grid */}
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Quick Actions Card */}
          <Card className="lg:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-primary" />
                Quick Overview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <div className="p-4 rounded-lg bg-muted/30">
                  <h3 className="font-semibold text-foreground mb-2">This Week</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Classes:</span>
                      <span className="font-medium">{stats.upcomingClasses}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">New Students:</span>
                      <span className="font-medium">3</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Fee Collections:</span>
                      <span className="font-medium">₹45,000</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 rounded-lg bg-muted/30">
                  <h3 className="font-semibold text-foreground mb-2">Next Class</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <CalendarIcon className="h-4 w-4 text-primary" />
                      <span className="text-muted-foreground">Tomorrow, 10:00 AM</span>
                    </div>
                    <p className="font-medium">Physics - 12th Science</p>
                    <p className="text-muted-foreground">Teacher: Dr. Sharma</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <RecentActivity activities={recentActivities} />
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Index;
