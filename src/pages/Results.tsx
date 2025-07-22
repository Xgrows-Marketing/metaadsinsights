import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import Dashboard from "./Dashboard";

interface CSVData {
  eventName: string;
  adSpend: number;
  ticketsSold: number;
  linkClicks: number;
}

const Results = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [data, setData] = useState<CSVData[]>([]);

  useEffect(() => {
    // Get data from navigation state
    if (location.state?.data) {
      setData(location.state.data);
    } else {
      // If no data, redirect to upload page
      navigate('/upload');
    }
  }, [location.state, navigate]);

  const handleUploadNew = () => {
    navigate('/upload');
  };

  if (data.length === 0) {
    return null; // Will redirect in useEffect
  }

  return <Dashboard data={data} onUploadNew={handleUploadNew} />;
};

export default Results;