import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, Flame, AlertTriangle, Users, Activity, CheckCircle, Clock, MapPin } from "lucide-react";

type IncidentType = 'missing' | 'fire' | 'fight' | 'overcrowd' | 'medical';

interface Incident {
  id: string;
  type: IncidentType;
  title: string;
  description: string;
  zone: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  resolved: boolean;
}

interface IncidentAlertProps {
  incident: Incident;
  onResolve: () => void;
}

const IncidentAlert = ({ incident, onResolve }: IncidentAlertProps) => {
  const getIncidentIcon = (type: IncidentType) => {
    switch (type) {
      case 'missing': return Search;
      case 'fire': return Flame;
      case 'fight': return AlertTriangle;
      case 'overcrowd': return Users;
      case 'medical': return Activity;
      default: return AlertTriangle;
    }
  };

  const getSeverityClass = (severity: string) => {
    switch (severity) {
      case 'high': return 'border-destructive/50 bg-destructive/10';
      case 'medium': return 'border-warning/50 bg-warning/10';
      case 'low': return 'border-success/50 bg-success/10';
      default: return 'border-muted bg-muted/10';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'text-destructive';
      case 'medium': return 'text-warning';
      case 'low': return 'text-success';
      default: return 'text-muted-foreground';
    }
  };

  const getTypeColor = (type: IncidentType) => {
    switch (type) {
      case 'missing': return 'text-warning';
      case 'fire': return 'text-destructive';
      case 'fight': return 'text-destructive';
      case 'overcrowd': return 'text-warning';
      case 'medical': return 'text-accent';
      default: return 'text-muted-foreground';
    }
  };

  const IncidentIcon = getIncidentIcon(incident.type);

  if (incident.resolved) {
    return (
      <div className="p-4 bg-success/10 border border-success/20 rounded-lg opacity-60">
        <div className="flex items-center gap-3">
          <CheckCircle className="h-5 w-5 text-success" />
          <div className="flex-1">
            <h4 className="font-semibold text-success line-through">{incident.title}</h4>
            <p className="text-sm text-success/80">Resolved</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 border rounded-lg transition-all duration-300 ${getSeverityClass(incident.severity)} ${
      incident.severity === 'high' ? 'animate-glow-pulse' : ''
    }`}>
      <div className="flex items-start gap-3 mb-3">
        <IncidentIcon className={`h-5 w-5 mt-0.5 ${getTypeColor(incident.type)} ${
          incident.severity === 'high' ? 'animate-status-pulse' : ''
        }`} />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h4 className="font-semibold text-foreground">{incident.title}</h4>
            <Badge 
              variant="outline" 
              className={`text-xs ${getSeverityColor(incident.severity)}`}
            >
              {incident.severity.toUpperCase()}
            </Badge>
          </div>
          <p className="text-sm text-muted-foreground mb-2">{incident.description}</p>
          
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {incident.zone}
            </div>
            <div className="flex items-center gap-1">
              <Clock className="h-3 w-3" />
              {incident.timestamp}
            </div>
          </div>
        </div>
      </div>

      <div className="flex gap-2">
        <Button 
          size="sm" 
          className="gradient-primary text-xs"
          onClick={() => {/* Handle specific action */}}
        >
          {incident.type === 'missing' && 'Locate Person'}
          {incident.type === 'fire' && 'Deploy Response'}
          {incident.type === 'fight' && 'Send Security'}
          {incident.type === 'overcrowd' && 'Redistribute'}
          {incident.type === 'medical' && 'Send Medics'}
        </Button>
        
        <Button 
          size="sm" 
          variant="outline"
          onClick={onResolve}
          className="text-xs border-success text-success hover:bg-success/10"
        >
          <CheckCircle className="h-3 w-3 mr-1" />
          Resolve
        </Button>
      </div>
    </div>
  );
};

export default IncidentAlert;