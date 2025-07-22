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
      <div className="bg-gradient-primary shadow-glow">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <img 
                src={psychicVisionLogo} 
                alt="Psychic Vision UK" 
                className="w-16 h-16 rounded-full shadow-glow"
              />
              <div>
                <h1 className="text-3xl font-bold text-primary-foreground">
                  Psychic Vision UK
                </h1>
                <p className="text-primary-foreground/80 text-lg">
                  Meta Ads Performance Dashboard
                </p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-primary-foreground/80" />
                <span className="text-primary-foreground/80">
                  Week of {new Date().toLocaleDateString()}
                </span>
              </div>
              <Button 
                onClick={onUploadNew} 
                variant="secondary"
                className="bg-white/10 hover:bg-white/20 text-primary-foreground border-white/20"
              >
                <UploadIcon className="h-4 w-4 mr-2" />
                Upload New Data
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 animate-fade-in">
          <MetricCard
            title="Total Ad Spend"
            value={`£${totalAdSpend.toFixed(2)}`}
            description="Across all events"
            icon={<DollarSign className="h-4 w-4" />}
            variant="primary"
          />
          <MetricCard
            title="Tickets Sold"
            value={totalTicketsSold}
            description="Total conversions"
            icon={<Users className="h-4 w-4" />}
            variant="accent"
          />
          <MetricCard
            title="Average Cost Per Ticket"
            value={`£${averageCostPerTicket.toFixed(2)}`}
            description="Efficiency metric"
            icon={<TrendingUp className="h-4 w-4" />}
          />
          <MetricCard
            title="Total Link Clicks"
            value={totalLinkClicks.toLocaleString()}
            description="Traffic generated"
            icon={<MousePointer className="h-4 w-4" />}
          />
        </div>

        {/* Charts */}
        <div className="animate-fade-in">
          <PerformanceChart data={chartData} />
        </div>

        {/* Events Overview */}
        <Card className="bg-gradient-card shadow-card border-border animate-fade-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap className="h-5 w-5 text-accent" />
              Event Performance Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {data.map((event, index) => (
                <div key={index} className="p-6 rounded-lg bg-muted/10 border border-border/50 hover:bg-muted/20 transition-all duration-300">
                  <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <Badge variant="outline" className="text-accent border-accent/50 bg-accent/10">
                          Event {index + 1}
                        </Badge>
                        <h3 className="font-semibold text-lg text-foreground">
                          {event.eventName}
                        </h3>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-sm">
                      <div className="text-center p-3 bg-card/50 rounded-lg">
                        <p className="text-muted-foreground font-medium">Ad Spend</p>
                        <p className="font-bold text-lg text-foreground">£{event.adSpend.toFixed(2)}</p>
                      </div>
                      <div className="text-center p-3 bg-card/50 rounded-lg">
                        <p className="text-muted-foreground font-medium">Tickets Sold</p>
                        <p className="font-bold text-lg text-accent">{event.ticketsSold}</p>
                      </div>
                      <div className="text-center p-3 bg-card/50 rounded-lg">
                        <p className="text-muted-foreground font-medium">Cost/Ticket</p>
                        <p className="font-bold text-lg text-foreground">
                          £{event.ticketsSold > 0 ? (event.adSpend / event.ticketsSold).toFixed(2) : '0.00'}
                        </p>
                      </div>
                      <div className="text-center p-3 bg-card/50 rounded-lg">
                        <p className="text-muted-foreground font-medium">Link Clicks</p>
                        <p className="font-bold text-lg text-foreground">{event.linkClicks}</p>
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