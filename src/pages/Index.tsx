import { useState } from "react";
import { TrendingUp, Users, MousePointer, DollarSign, Calendar, Zap } from "lucide-react";
import { MetricCard } from "@/components/MetricCard";
import { CSVUploader } from "@/components/CSVUploader";
import { PerformanceChart } from "@/components/PerformanceChart";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import psychicVisionLogo from "@/assets/psychic-vision-logo.png";

interface CSVData {
  eventName: string;
  adSpend: number;
  ticketsSold: number;
  linkClicks: number;
}

const Index = () => {
  const [data, setData] = useState<CSVData[]>([]);

  const handleDataParsed = (parsedData: CSVData[]) => {
    setData(parsedData);
  };

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
                  Meta Ads Weekly Performance Overview
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Calendar className="h-5 w-5 text-primary-foreground/80" />
              <span className="text-primary-foreground/80">
                Week of {new Date().toLocaleDateString()}
              </span>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Upload Section */}
        {data.length === 0 && (
          <CSVUploader onDataParsed={handleDataParsed} />
        )}

        {/* Dashboard Content */}
        {data.length > 0 && (
          <>
            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
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

            {/* Events Overview */}
            <Card className="bg-gradient-card shadow-card border-border">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5 text-accent" />
                  Event Performance Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {data.map((event, index) => (
                    <div key={index} className="p-4 rounded-lg bg-muted/10 border border-border/50">
                      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <Badge variant="outline" className="text-accent border-accent/50">
                              Event {index + 1}
                            </Badge>
                            <h3 className="font-semibold text-lg text-foreground">
                              {event.eventName}
                            </h3>
                          </div>
                        </div>
                        
                        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 text-sm">
                          <div className="text-center">
                            <p className="text-muted-foreground">Ad Spend</p>
                            <p className="font-semibold text-foreground">£{event.adSpend.toFixed(2)}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground">Tickets Sold</p>
                            <p className="font-semibold text-foreground">{event.ticketsSold}</p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground">Cost/Ticket</p>
                            <p className="font-semibold text-foreground">
                              £{event.ticketsSold > 0 ? (event.adSpend / event.ticketsSold).toFixed(2) : '0.00'}
                            </p>
                          </div>
                          <div className="text-center">
                            <p className="text-muted-foreground">Link Clicks</p>
                            <p className="font-semibold text-foreground">{event.linkClicks}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Charts */}
            <PerformanceChart data={chartData} />

            <Separator className="my-8" />

            {/* Upload New Data */}
            <div className="text-center">
              <h3 className="text-lg font-semibold text-foreground mb-4">
                Upload New Weekly Data
              </h3>
              <CSVUploader onDataParsed={handleDataParsed} />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Index;
