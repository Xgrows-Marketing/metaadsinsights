import { Calendar } from "lucide-react";
import { CSVUploader } from "@/components/CSVUploader";
import psychicVisionLogo from "@/assets/psychic-vision-logo.png";

interface CSVData {
  eventName: string;
  adSpend: number;
  ticketsSold: number;
  linkClicks: number;
}

interface UploadPageProps {
  onDataParsed: (data: CSVData[]) => void;
}

const Upload = ({ onDataParsed }: UploadPageProps) => {
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
                  Meta Ads Performance Analytics
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

      {/* Upload Section */}
      <div className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <h2 className="text-3xl font-bold text-foreground">
              Upload Your Meta Ads Data
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Upload your Meta Ads export CSV file to generate comprehensive performance analytics and insights.
            </p>
          </div>

          <div className="animate-fade-in">
            <CSVUploader onDataParsed={onDataParsed} />
          </div>

          {/* Instructions */}
          <div className="bg-gradient-card p-6 rounded-lg border border-border shadow-card max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-4">
              How to Export Data from Meta Ads Manager
            </h3>
            <div className="space-y-2 text-sm text-muted-foreground text-left">
              <p>• Go to Meta Ads Manager</p>
              <p>• Select your campaigns/ad sets</p>
              <p>• Click "Export" and choose "Export to CSV"</p>
              <p>• Include columns: Ad Set Name, Amount spent (GBP), Tickets Sold, Link clicks</p>
              <p>• Upload the downloaded CSV file here</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Upload;