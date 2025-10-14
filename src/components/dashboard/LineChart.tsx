import {
  LineChart as RechartsLineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { useTheme } from '@/hooks/use-theme';

interface LineChartProps {
  data: any[];
  lines: {
    dataKey: string;
    name: string;
    color?: string;
  }[];
  xAxisDataKey: string;
  height?: number;
}

const LineChart = ({
  data,
  lines,
  xAxisDataKey,
  height = 300,
}: LineChartProps) => {
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
        <RechartsLineChart
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
          {lines.map((line, index) => (
            <Line
              key={line.dataKey}
              type="monotone"
              dataKey={line.dataKey}
              name={line.name}
              stroke={line.color || getChartColor(index)}
              activeDot={{ r: 6 }}
              strokeWidth={2}
            />
          ))}
        </RechartsLineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default LineChart;