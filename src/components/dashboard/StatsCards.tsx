import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, GraduationCap, Calendar, DollarSign } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

function StatCard({ title, value, icon, description, trend }: StatCardProps) {
  return (
    <Card className="stat-card">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground">
          {title}
        </CardTitle>
        <div className="text-primary">
          {icon}
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold text-foreground">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
        )}
        {trend && (
          <div className="flex items-center mt-2 text-xs">
            <span
              className={`font-medium ${
                trend.isPositive ? 'text-success' : 'text-destructive'
              }`}
            >
              {trend.isPositive ? '+' : ''}{trend.value}%
            </span>
            <span className="text-muted-foreground ml-1">from last month</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}

interface StatsCardsProps {
  totalStudents: number;
  totalTeachers: number;
  upcomingClasses: number;
  pendingFees: number;
}

export function StatsCards({
  totalStudents,
  totalTeachers,
  upcomingClasses,
  pendingFees
}: StatsCardsProps) {
  return (
    <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
        title="Total Students"
        value={totalStudents}
        icon={<Users className="h-5 w-5" />}
        description="Active enrollments"
        trend={{ value: 12, isPositive: true }}
      />
      
      <StatCard
        title="Total Teachers"
        value={totalTeachers}
        icon={<GraduationCap className="h-5 w-5" />}
        description="Faculty members"
        trend={{ value: 5, isPositive: true }}
      />
      
      <StatCard
        title="Upcoming Classes"
        value={upcomingClasses}
        icon={<Calendar className="h-5 w-5" />}
        description="Next 7 days"
      />
      
      <StatCard
        title="Pending Fees"
        value={`₹${pendingFees.toLocaleString()}`}
        icon={<DollarSign className="h-5 w-5" />}
        description="Outstanding amount"
        trend={{ value: -8, isPositive: false }}
      />
    </div>
  );
}