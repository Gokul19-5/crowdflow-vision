import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, Users, MapPin, Activity } from "lucide-react";
import CrowdZone from "./CrowdZone";
import StatusIndicator from "./StatusIndicator";
import LiveStats from "./LiveStats";

interface DashboardProps {
  onBack: () => void;
}

type ZoneStatus = 'safe' | 'warning' | 'danger';

interface ZoneData {
  id: string;
  name: string;
  capacity: number;
  current: number;
  status: ZoneStatus;
  lastUpdate: string;
}

const Dashboard = ({ onBack }: DashboardProps) => {
  const [zones, setZones] = useState<ZoneData[]>([
    { id: '1', name: 'Main Stage', capacity: 5000, current: 3200, status: 'warning', lastUpdate: '30s ago' },
    { id: '2', name: 'VIP Section', capacity: 500, current: 250, status: 'safe', lastUpdate: '15s ago' },
    { id: '3', name: 'Food Court', capacity: 1200, current: 1180, status: 'danger', lastUpdate: '5s ago' },
    { id: '4', name: 'Entry Plaza', capacity: 2000, current: 800, status: 'safe', lastUpdate: '20s ago' },
    { id: '5', name: 'Exit Zone A', capacity: 1500, current: 1400, status: 'warning', lastUpdate: '10s ago' },
    { id: '6', name: 'Merchandise', capacity: 800, current: 450, status: 'safe', lastUpdate: '25s ago' },
  ]);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setZones(prevZones => 
        prevZones.map(zone => {
          const variation = Math.floor(Math.random() * 100) - 50;
          const newCurrent = Math.max(0, Math.min(zone.capacity, zone.current + variation));
          const percentage = (newCurrent / zone.capacity) * 100;
          
          let newStatus: ZoneStatus = 'safe';
          if (percentage >= 90) newStatus = 'danger';
          else if (percentage >= 70) newStatus = 'warning';
          
          return {
            ...zone,
            current: newCurrent,
            status: newStatus,
            lastUpdate: 'now'
          };
        })
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const totalCapacity = zones.reduce((sum, zone) => sum + zone.capacity, 0);
  const totalCurrent = zones.reduce((sum, zone) => sum + zone.current, 0);
  const alertsCount = zones.filter(zone => zone.status === 'danger').length;
  const warningsCount = zones.filter(zone => zone.status === 'warning').length;

  return (
    <div className="min-h-screen bg-background p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-border hover:bg-card/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">CrowdSense Dashboard</h1>
            <p className="text-muted-foreground">Live crowd monitoring and safety management</p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <StatusIndicator status="online" label="System Status" />
          <div className="text-right">
            <div className="text-sm text-muted-foreground">Last Updated</div>
            <div className="text-sm font-medium">Real-time</div>
          </div>
        </div>
      </div>

      {/* Live Stats */}
      <LiveStats 
        totalCapacity={totalCapacity}
        totalCurrent={totalCurrent}
        alertsCount={alertsCount}
        warningsCount={warningsCount}
      />

      {/* Alert Banner */}
      {alertsCount > 0 && (
        <Card className="gradient-card border-destructive/50 p-4 mb-8 animate-pulse-glow">
          <div className="flex items-center gap-3">
            <AlertTriangle className="h-5 w-5 text-destructive animate-status-pulse" />
            <div>
              <h3 className="font-semibold text-destructive">Critical Alert</h3>
              <p className="text-sm text-muted-foreground">
                {alertsCount} zone{alertsCount > 1 ? 's' : ''} at critical capacity. Immediate action required.
              </p>
            </div>
          </div>
        </Card>
      )}

      {/* Zone Grid */}
      <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6 mb-8">
        {zones.map((zone) => (
          <CrowdZone key={zone.id} zone={zone} />
        ))}
      </div>

      {/* Control Center */}
      <Card className="gradient-card p-6 border-border card-shadow">
        <div className="flex items-center gap-3 mb-6">
          <Activity className="h-6 w-6 text-accent" />
          <h2 className="text-xl font-semibold">Emergency Controls</h2>
        </div>
        
        <div className="grid md:grid-cols-3 gap-4">
          <Button className="gradient-primary glow-effect">
            <Users className="mr-2 h-4 w-4" />
            Initiate Crowd Redistribution
          </Button>
          <Button variant="outline" className="border-warning text-warning hover:bg-warning/10">
            <AlertTriangle className="mr-2 h-4 w-4" />
            Send Zone Warnings
          </Button>
          <Button variant="outline" className="border-destructive text-destructive hover:bg-destructive/10">
            <MapPin className="mr-2 h-4 w-4" />
            Emergency Evacuation
          </Button>
        </div>
      </Card>
    </div>
  );
};

export default Dashboard;