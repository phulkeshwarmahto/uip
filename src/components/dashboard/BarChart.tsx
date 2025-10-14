import {
  BarChart as RechartsBarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTheme } from '@/hooks/use-theme';

interface BarChartProps {
  data: any[];
  bars: {
    dataKey: string;
    name: string;
    color?: string;
  }[];
  xAxisDataKey: string;
  height?: number;
  stacked?: boolean;
}

const BarChart = ({
  data,
  bars,
  xAxisDataKey,
  height = 300,
  stacked = false,
}: BarChartProps) => {
  const { theme } = useTheme();
  
  // Get chart colors from CSS variables
  const getChartColor = (index: number) => {
    const cssVar = `--chart-${index + 1}`;
    const color = getComputedStyle(document.documentElement)
      .getPropertyValue(cssVar)
      .trim();
    return `hsl(${color})`;
  };

  return (
    <div style={{ width: '100%', height }}>
      <ResponsiveContainer width="100%" height="100%">
        <RechartsBarChart
          data={data}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
        >
          <CartesianGrid 
            strokeDasharray="3 3" 
            stroke="var(--border)"
            vertical={false}
          />
          <XAxis 
            dataKey={xAxisDataKey} 
            stroke="var(--muted-foreground)"
            tick={{ fill: 'var(--muted-foreground)' }}
            tickLine={{ stroke: 'var(--border)' }}
            axisLine={{ stroke: 'var(--border)' }}
          />
          <YAxis 
            stroke="var(--muted-foreground)"
            tick={{ fill: 'var(--muted-foreground)' }}
            tickLine={{ stroke: 'var(--border)' }}
            axisLine={{ stroke: 'var(--border)' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: 'var(--card)', 
              border: '1px solid var(--border)',
              color: 'var(--card-foreground)',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)'
            }}
          />
          <Legend 
            wrapperStyle={{ 
              paddingTop: '10px',
              color: 'var(--foreground)'
            }}
          />
          {bars.map((bar, index) => (
            <Bar
              key={bar.dataKey}
              dataKey={bar.dataKey}
              name={bar.name}
              fill={bar.color || getChartColor(index)}
              radius={[4, 4, 0, 0]}
              stackId={stacked ? 'stack' : undefined}
            />
          ))}
        </RechartsBarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChart;