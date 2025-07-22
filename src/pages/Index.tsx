import { useState } from "react";
import Upload from "./Upload";
import Dashboard from "./Dashboard";

interface CSVData {
  eventName: string;
  adSpend: number;
  ticketsSold: number;
  linkClicks: number;
}

const Index = () => {
  const [data, setData] = useState<CSVData[]>([]);
  const [showDashboard, setShowDashboard] = useState(false);

  const handleDataParsed = (parsedData: CSVData[]) => {
    setData(parsedData);
    setShowDashboard(true);
  };

  const handleUploadNew = () => {
    setShowDashboard(false);
    setData([]);
  };

  if (showDashboard && data.length > 0) {
    return <Dashboard data={data} onUploadNew={handleUploadNew} />;
  }

  return <Upload onDataParsed={handleDataParsed} />;
};

export default Index;
