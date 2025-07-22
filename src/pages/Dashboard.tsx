import { TrendingUp, Users, MousePointer, DollarSign, Calendar, Zap, Upload as UploadIcon } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import psychicVisionLogo from "@/assets/psychic-vision-logo.png";

interface CSVData {
  eventName: string;
  adSpend: number;
  ticketsSold: number;
  linkClicks: number;
}

interface DashboardProps {
  data: CSVData[];
  onUploadNew: () => void;
}

const Dashboard = ({ data, onUploadNew }: DashboardProps) => {
  // Calculate totals and averages
  const totalAdSpend = data.reduce((sum, item) => sum + item.adSpend, 0);
  const totalTicketsSold = data.reduce((sum, item) => sum + item.ticketsSold, 0);
  const totalLinkClicks = data.reduce((sum, item) => sum + item.linkClicks, 0);
  const averageCostPerTicket = totalTicketsSold > 0 ? totalAdSpend / totalTicketsSold : 0;

  // Prepare chart data
  const chartData = data.map(item => ({
    ...item,
    costPerTicket: item.ticketsSold > 0 ? item.adSpend / item.ticketsSold : 0
  }));

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-main shadow-elevated border-b">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img 
                src={psychicVisionLogo} 
                alt="Xgrows Marketing" 
                className="w-16 h-16 rounded-full shadow-elevated bg-white p-2"
              />
              <div>
                <h1 className="text-4xl font-bold text-primary-foreground">
                  Xgrows Marketing
                </h1>
                <p className="text-primary-foreground/90 text-lg font-medium">
                  Performance Analytics Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-2 bg-white/10 px-4 py-2 rounded-lg backdrop-blur-sm">
                <Calendar className="h-5 w-5 text-primary-foreground" />
                <span className="text-primary-foreground font-medium">
                  {new Date().toLocaleDateString('en-GB', { 
                    day: '2-digit', 
                    month: 'short', 
                    year: 'numeric' 
                  })}
                </span>
              </div>
              <Button 
                onClick={onUploadNew} 
                variant="secondary"
                size="lg"
                className="bg-white text-primary hover:bg-white/90 font-semibold shadow-card"
              >
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload New Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-12 space-y-12">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 animate-fade-in">
          <MetricCard
            title="Total Ad Spend"
            value={`£${totalAdSpend.toFixed(2)}`}
            description="Across all campaigns"
            icon={<DollarSign className="h-5 w-5" />}
            variant="primary"
          />
          <MetricCard
            title="Tickets Sold"
            value={totalTicketsSold.toLocaleString()}
            description="Total conversions"
            icon={<Users className="h-5 w-5" />}
            variant="accent"
          />
          <MetricCard
            title="Cost Per Ticket"
            value={`£${averageCostPerTicket.toFixed(2)}`}
            description="Average efficiency"
            icon={<TrendingUp className="h-5 w-5" />}
          />
          <MetricCard
            title="Total Clicks"
            value={totalLinkClicks.toLocaleString()}
            description="Traffic generated"
            icon={<MousePointer className="h-5 w-5" />}
          />
        </div>

        {/* Charts */}
        <div className="animate-fade-in">
          <PerformanceChart data={chartData} />
        </div>

        {/* Events Overview */}
        <Card className="bg-card shadow-elevated border animate-fade-in">
          <CardHeader className="border-b bg-muted/30">
            <CardTitle className="flex items-center gap-3 text-2xl">
              <Zap className="h-6 w-6 text-accent" />
              Campaign Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent className="p-8">
            <div className="space-y-6">
              {data.map((event, index) => (
                <div key={index} className="p-6 rounded-xl bg-muted/30 border-2 border-muted hover:bg-muted/50 transition-all duration-300 hover:shadow-card">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-6">
                    <div className="flex-1">
                      <div className="flex items-center gap-4 mb-4">
                        <Badge variant="secondary" className="text-primary bg-primary/10 border-primary/20 font-semibold px-3 py-1">
                          Campaign {index + 1}
                        </Badge>
                        <h3 className="font-bold text-xl text-foreground">
                          {event.eventName}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                      <div className="text-center p-4 bg-white rounded-lg shadow-card border">
                        <p className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">Ad Spend</p>
                        <p className="font-bold text-2xl text-foreground mt-1">£{event.adSpend.toFixed(2)}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-card border">
                        <p className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">Tickets Sold</p>
                        <p className="font-bold text-2xl text-accent mt-1">{event.ticketsSold}</p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-card border">
                        <p className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">Cost/Ticket</p>
                        <p className="font-bold text-2xl text-foreground mt-1">
                          £{event.ticketsSold > 0 ? (event.adSpend / event.ticketsSold).toFixed(2) : '0.00'}
                        </p>
                      </div>
                      <div className="text-center p-4 bg-white rounded-lg shadow-card border">
                        <p className="text-muted-foreground font-semibold text-xs uppercase tracking-wide">Link Clicks</p>
                        <p className="font-bold text-2xl text-primary mt-1">{event.linkClicks}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;