import { Badge } from '@/components/ui/badge';
import { format } from 'date-fns';

interface TimelineItem {
  id: number;
  title: string;
  date: string;
  status: 'completed' | 'current' | 'future';
  description?: string;
}

interface TimelineViewProps {
  items: TimelineItem[];
}

const TimelineView = ({ items }: TimelineViewProps) => {
  return (
    <div className="space-y-1">
      {items.map((item) => (
        <div 
          key={item.id} 
          className={`timeline-item ${item.status}`}
        >
          <div className="mb-1">
            <h3 className="text-base font-medium">{item.title}</h3>
            <div className="flex items-center gap-2">
              <time className="text-sm text-muted-foreground">
                {format(new Date(item.date), 'dd MMM yyyy')}
              </time>
              <Badge 
                variant={
                  item.status === 'completed' ? 'default' : 
                  item.status === 'current' ? 'secondary' : 'outline'
                }
                className="text-xs"
              >
                {item.status === 'completed' ? 'Completed' : 
                 item.status === 'current' ? 'In Progress' : 'Upcoming'}
              </Badge>
            </div>
          </div>
          {item.description && (
            <p className="text-sm text-muted-foreground mt-1">{item.description}</p>
          )}
        </div>
      ))}
    </div>
  );
};

export default TimelineView;