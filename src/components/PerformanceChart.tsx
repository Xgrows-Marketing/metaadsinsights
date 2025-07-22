import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface ChartData {
  eventName: string;
  adSpend: number;
  ticketsSold: number;
  linkClicks: number;
  costPerTicket: number;
}

interface PerformanceChartProps {
  data: ChartData[];
}

const COLORS = ['hsl(263 70% 50%)', 'hsl(280 70% 60%)', 'hsl(262 83% 70%)', 'hsl(250 83% 80%)', 'hsl(240 70% 60%)'];

export const PerformanceChart = ({ data }: PerformanceChartProps) => {
  if (!data || data.length === 0) return null;

  const pieData = data.map((item, index) => ({
    name: item.eventName,
    value: item.ticketsSold,
    color: COLORS[index % COLORS.length]
  }));

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Ad Spend by Event</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(240 3.7% 15.9%)" />
              <XAxis 
                dataKey="eventName" 
                stroke="hsl(240 5% 65%)"
                fontSize={12}
                tick={{ fill: 'hsl(240 5% 65%)' }}
              />
              <YAxis 
                stroke="hsl(240 5% 65%)"
                fontSize={12}
                tick={{ fill: 'hsl(240 5% 65%)' }}
              />
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(240 10% 7%)',
                  border: '1px solid hsl(240 3.7% 15.9%)',
                  borderRadius: '8px',
                  color: 'hsl(270 5% 95%)'
                }}
                formatter={(value: any) => [`£${value}`, 'Ad Spend']}
              />
              <Bar dataKey="adSpend" fill="hsl(263 70% 50%)" radius={4} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-card shadow-card border-border">
        <CardHeader>
          <CardTitle className="text-lg">Tickets Sold Distribution</CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ eventName, ticketsSold }) => `${eventName}: ${ticketsSold}`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="ticketsSold"
              >
                {data.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{
                  backgroundColor: 'hsl(240 10% 7%)',
                  border: '1px solid hsl(240 3.7% 15.9%)',
                  borderRadius: '8px',
                  color: 'hsl(270 5% 95%)'
                }}
                formatter={(value: any) => [`${value}`, 'Tickets Sold']}
              />
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};