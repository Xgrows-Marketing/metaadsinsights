import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

const Home = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-main flex items-center justify-center">
      <div className="text-center space-y-8">
        <h1 className="text-6xl font-bold text-primary-foreground">
          Xgrows Marketing Reports Analyzer
        </h1>
        <Button 
          onClick={() => navigate('/upload')}
          size="lg"
          className="mt-8"
        >
          Get Started
        </Button>
      </div>
    </div>
  );
};

export default Home;