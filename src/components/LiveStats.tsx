import { Card } from "@/components/ui/card";
import { Users, AlertTriangle, Shield, TrendingUp } from "lucide-react";

interface LiveStatsProps {
  totalCapacity: number;
  totalCurrent: number;
  alertsCount: number;
  warningsCount: number;
}

const LiveStats = ({ totalCapacity, totalCurrent, alertsCount, warningsCount }: LiveStatsProps) => {
  const overallPercentage = Math.round((totalCurrent / totalCapacity) * 100);
  const safeZones = 6 - alertsCount - warningsCount;

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      <Card className="gradient-card p-6 border-border card-shadow">
        <div className="flex items-center gap-4">
          <div className="gradient-primary w-12 h-12 rounded-lg flex items-center justify-center">
            <Users className="h-6 w-6 text-primary-foreground" />
          </div>
          <div>
            <div className="text-2xl font-bold text-foreground">
              {totalCurrent.toLocaleString()}
            </div>
            <div className="text-sm text-muted-foreground">Total Attendance</div>
            <div className="text-xs text-accent">
              {overallPercentage}% of capacity
            </div>
          </div>
        </div>
      </Card>

      <Card className="gradient-card p-6 border-border card-shadow">
        <div className="flex items-center gap-4">
          <div className="bg-success/20 w-12 h-12 rounded-lg flex items-center justify-center">
            <Shield className="h-6 w-6 text-success" />
          </div>
          <div>
            <div className="text-2xl font-bold text-success">{safeZones}</div>
            <div className="text-sm text-muted-foreground">Safe Zones</div>
            <div className="text-xs text-success">
              Operating normally
            </div>
          </div>
        </div>
      </Card>

      <Card className="gradient-card p-6 border-border card-shadow">
        <div className="flex items-center gap-4">
          <div className="bg-warning/20 w-12 h-12 rounded-lg flex items-center justify-center">
            <TrendingUp className="h-6 w-6 text-warning" />
          </div>
          <div>
            <div className="text-2xl font-bold text-warning">{warningsCount}</div>
            <div className="text-sm text-muted-foreground">Warnings</div>
            <div className="text-xs text-warning">
              Monitoring required
            </div>
          </div>
        </div>
      </Card>

      <Card className="gradient-card p-6 border-border card-shadow">
        <div className="flex items-center gap-4">
          <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
            alertsCount > 0 ? 'bg-destructive/20 animate-pulse-glow' : 'bg-success/20'
          }`}>
            <AlertTriangle className={`h-6 w-6 ${
              alertsCount > 0 ? 'text-destructive animate-status-pulse' : 'text-success'
            }`} />
          </div>
          <div>
            <div className={`text-2xl font-bold ${
              alertsCount > 0 ? 'text-destructive' : 'text-success'
            }`}>
              {alertsCount}
            </div>
            <div className="text-sm text-muted-foreground">Critical Alerts</div>
            <div className={`text-xs ${
              alertsCount > 0 ? 'text-destructive' : 'text-success'
            }`}>
              {alertsCount > 0 ? 'Action required' : 'All clear'}
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default LiveStats;