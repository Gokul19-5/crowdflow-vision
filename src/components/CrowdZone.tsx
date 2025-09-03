import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Users, Clock, TrendingUp, TrendingDown } from "lucide-react";

interface ZoneData {
  id: string;
  name: string;
  capacity: number;
  current: number;
  status: 'safe' | 'warning' | 'danger';
  lastUpdate: string;
}

interface CrowdZoneProps {
  zone: ZoneData;
}

const CrowdZone = ({ zone }: CrowdZoneProps) => {
  const percentage = Math.round((zone.current / zone.capacity) * 100);
  const isIncreasing = Math.random() > 0.5; // Simulate trend

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'safe': return 'status-safe';
      case 'warning': return 'status-warning';
      case 'danger': return 'status-danger';
      default: return 'status-safe';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'safe': return 'SAFE';
      case 'warning': return 'CAUTION';
      case 'danger': return 'CRITICAL';
      default: return 'SAFE';
    }
  };

  return (
    <Card className="gradient-card p-6 border-border card-shadow hover:scale-105 transition-all duration-300">
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-foreground">{zone.name}</h3>
          <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
            <Clock className="h-3 w-3" />
            {zone.lastUpdate}
          </div>
        </div>
        <Badge className={`animate-status-pulse ${getStatusColor(zone.status)}`}>
          {getStatusText(zone.status)}
        </Badge>
      </div>

      {/* Video Feed Simulation */}
      <div className="bg-muted/20 rounded-lg h-32 mb-4 flex items-center justify-center border border-border overflow-hidden relative">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
        <div className="text-center relative z-10">
          <Users className="h-8 w-8 text-accent mx-auto mb-2" />
          <div className="text-sm text-muted-foreground">Live Feed Active</div>
        </div>
        {/* Animated dots to simulate activity */}
        <div className="absolute top-2 right-2 w-2 h-2 bg-success rounded-full animate-pulse"></div>
      </div>

      {/* Crowd Stats */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Users className="h-4 w-4 text-accent" />
            <span className="text-sm font-medium">Occupancy</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-foreground">
              {zone.current.toLocaleString()}
            </span>
            <span className="text-sm text-muted-foreground">
              / {zone.capacity.toLocaleString()}
            </span>
          </div>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm text-muted-foreground">Capacity</span>
            <div className="flex items-center gap-1">
              {isIncreasing ? (
                <TrendingUp className="h-3 w-3 text-destructive" />
              ) : (
                <TrendingDown className="h-3 w-3 text-success" />
              )}
              <span className="text-sm font-medium">{percentage}%</span>
            </div>
          </div>
          <Progress 
            value={percentage} 
            className={`h-2 ${
              zone.status === 'danger' ? 'progress-danger' : 
              zone.status === 'warning' ? 'progress-warning' : 
              'progress-safe'
            }`}
          />
        </div>

        <div className="pt-2 border-t border-border">
          <div className="text-xs text-muted-foreground">
            {zone.status === 'danger' && '⚠️ Immediate attention required'}
            {zone.status === 'warning' && '⚡ Monitoring closely'}
            {zone.status === 'safe' && '✅ Operating normally'}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CrowdZone;