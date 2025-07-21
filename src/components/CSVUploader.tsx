import { useState, useCallback } from "react";
import { Upload, FileText, AlertCircle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Papa from "papaparse";

interface CSVData {
  eventName: string;
  adSpend: number;
  ticketsSold: number;
  linkClicks: number;
}

interface CSVUploaderProps {
  onDataParsed: (data: CSVData[]) => void;
}

export const CSVUploader = ({ onDataParsed }: CSVUploaderProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const processCSV = useCallback((file: File) => {
    setIsProcessing(true);
    
    Papa.parse(file, {
      header: true,
      skipEmptyLines: true,
      complete: (results) => {
        try {
          const parsedData: CSVData[] = results.data.map((row: any) => ({
            eventName: row["Event Name"] || row["eventName"] || "",
            adSpend: parseFloat(row["Amount Spent"] || row["adSpend"] || "0"),
            ticketsSold: parseInt(row["Tickets Sold"] || row["ticketsSold"] || "0"),
            linkClicks: parseInt(row["Link Clicks"] || row["linkClicks"] || "0")
          })).filter(item => item.eventName); // Filter out empty rows

          if (parsedData.length === 0) {
            throw new Error("No valid data found in CSV");
          }

          onDataParsed(parsedData);
          toast({
            title: "Success!",
            description: `Processed ${parsedData.length} events from CSV`,
          });
        } catch (error) {
          toast({
            title: "Error processing CSV",
            description: "Please check your CSV format and try again",
            variant: "destructive"
          });
        } finally {
          setIsProcessing(false);
        }
      },
      error: () => {
        toast({
          title: "Error reading file",
          description: "Please ensure you're uploading a valid CSV file",
          variant: "destructive"
        });
        setIsProcessing(false);
      }
    });
  }, [onDataParsed, toast]);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    const csvFile = files.find(file => file.type === "text/csv" || file.name.endsWith(".csv"));
    
    if (csvFile) {
      processCSV(csvFile);
    } else {
      toast({
        title: "Invalid file type",
        description: "Please upload a CSV file",
        variant: "destructive"
      });
    }
  }, [processCSV, toast]);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processCSV(file);
    }
  };

  return (
    <Card className="bg-gradient-card shadow-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Upload className="h-5 w-5 text-accent" />
          Upload Weekly Performance Data
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div
          className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 ${
            isDragging 
              ? "border-accent bg-accent/10 scale-105" 
              : "border-border hover:border-accent/50 hover:bg-accent/5"
          }`}
          onDrop={handleDrop}
          onDragOver={(e) => e.preventDefault()}
          onDragEnter={() => setIsDragging(true)}
          onDragLeave={() => setIsDragging(false)}
        >
          {isProcessing ? (
            <div className="flex flex-col items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
              <p className="text-muted-foreground">Processing CSV...</p>
            </div>
          ) : (
            <div className="flex flex-col items-center gap-4">
              <FileText className="h-12 w-12 text-muted-foreground" />
              <div>
                <p className="text-lg font-medium text-foreground mb-2">
                  Drop your CSV file here or click to browse
                </p>
                <p className="text-sm text-muted-foreground mb-4">
                  CSV should contain: Event Name, Amount Spent, Tickets Sold, Link Clicks
                </p>
              </div>
              <label>
                <Button variant="outline" className="cursor-pointer" asChild>
                  <span>
                    Choose File
                    <input
                      type="file"
                      accept=".csv"
                      onChange={handleFileSelect}
                      className="hidden"
                    />
                  </span>
                </Button>
              </label>
            </div>
          )}
        </div>
        
        <div className="mt-4 p-3 bg-muted/20 rounded-lg">
          <div className="flex items-start gap-2">
            <AlertCircle className="h-4 w-4 text-accent mt-0.5 flex-shrink-0" />
            <div className="text-xs text-muted-foreground">
              <strong>Expected CSV columns:</strong> Event Name, Amount Spent, Tickets Sold, Link Clicks
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};