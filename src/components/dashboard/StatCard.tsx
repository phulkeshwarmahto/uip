import { ReactNode } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface StatCardProps {
  title: string;
  value: string | number;
  icon?: ReactNode;
  trend?: {
    value: number;
    isPositive: boolean;
  };
  className?: string;
  colorVariant?: 'primary' | 'secondary' | 'default' | 'success' | 'warning' | 'danger';
}

const StatCard = ({
  title,
  value,
  icon,
  trend,
  className,
  colorVariant = 'primary',
}: StatCardProps) => {
  const colorClasses = {
    primary: 'border-l-primary',
    secondary: 'border-l-secondary',
    default: 'border-l-border',
    success: 'border-l-green-500',
    warning: 'border-l-yellow-500',
    danger: 'border-l-red-500',
  };

  return (
    <Card className={cn(
      'dashboard-stat border-l-4 hover:shadow-md transition-all duration-300',
      colorClasses[colorVariant],
      className
    )}>
      <CardContent className="p-6">
        <div className="flex justify-between items-start">
          <div>
            <p className="text-sm font-medium text-muted-foreground mb-1">{title}</p>
            <h3 className="text-2xl font-semibold">{value}</h3>
            
            {trend && (
              <div className="flex items-center mt-2">
                <span className={cn(
                  'text-xs font-medium',
                  trend.isPositive ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                )}>
                  {trend.isPositive ? '↑' : '↓'} {Math.abs(trend.value)}%
                </span>
              </div>
            )}
          </div>
          
          {icon && (
            <div className="rounded-full p-2 bg-primary/10">
              {icon}
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default StatCard;