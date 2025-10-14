import {
  RadarChart as RechartsRadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from 'recharts';
import { useTheme } from '@/hooks/use-theme';

interface RadarChartProps {
  data: any[];
  dataKey: string;
  nameKey: string;
  radars: {
    dataKey: string;
    name: string;
    color?: string;
  }[];
  height?: number;
}

const RadarChart = ({
  data,
  dataKey,
  nameKey,
  radars,
  height = 300,
}: RadarChartProps) => {
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
        <RechartsRadarChart 
          cx="50%" 
          cy="50%" 
          outerRadius="80%" 
          data={data}
        >
          <PolarGrid stroke="var(--border)" />
          <PolarAngleAxis 
            dataKey={nameKey} 
            tick={{ fill: 'var(--muted-foreground)' }}
          />
          <PolarRadiusAxis 
            angle={30} 
            domain={[0, 100]} 
            tick={{ fill: 'var(--muted-foreground)' }}
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
          {radars.map((radar, index) => (
            <Radar
              key={radar.dataKey}
              name={radar.name}
              dataKey={radar.dataKey}
              stroke={radar.color || getChartColor(index)}
              fill={radar.color || getChartColor(index)}
              fillOpacity={0.3}
            />
          ))}
        </RechartsRadarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default RadarChart;