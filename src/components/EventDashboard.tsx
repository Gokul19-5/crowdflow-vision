import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { ArrowLeft, AlertTriangle, Users, MapPin, Activity, Search, Flame, UserX, Zap } from "lucide-react";
import WristbandTracker from "./WristbandTracker";
import IncidentAlert from "./IncidentAlert";
import HeatMap from "./HeatMap";
import EvacuationOverlay from "./EvacuationOverlay";

interface Event {
  id: string;
  name: string;
  artist: string;
  date: string;
  venue: string;
  capacity: number;
  current: number;
  status: string;
  color: string;
}

interface EventDashboardProps {
  event: Event;
  onBack: () => void;
}

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

const EventDashboard = ({ event, onBack }: EventDashboardProps) => {
  const [activeIncidents, setActiveIncidents] = useState<Incident[]>([
    {
      id: '1',
      type: 'missing',
      title: 'Missing Person Alert',
      description: 'Attendee Sarah M. (Wristband #A1234) last seen near VIP section',
      zone: 'VIP Section',
      severity: 'medium',
      timestamp: '2 minutes ago',
      resolved: false
    },
    {
      id: '2',
      type: 'fire',
      title: 'Fire Hazard Detected',
      description: 'Thermal sensors detected elevated temperature near concessions',
      zone: 'Food Court',
      severity: 'high',
      timestamp: '5 minutes ago',
      resolved: false
    }
  ]);

  const [showEvacuation, setShowEvacuation] = useState(false);
  const [attendeeCount, setAttendeeCount] = useState(event.current);

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAttendeeCount(prev => {
        const change = Math.floor(Math.random() * 200) - 100;
        return Math.max(0, Math.min(event.capacity, prev + change));
      });
    }, 5000);

    return () => clearInterval(interval);
  }, [event.capacity]);

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

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return 'gradient-danger';
      case 'medium': return 'gradient-warning';
      case 'low': return 'gradient-success';
      default: return 'gradient-success';
    }
  };

  const resolveIncident = (id: string) => {
    setActiveIncidents(prev => 
      prev.map(incident => 
        incident.id === id ? { ...incident, resolved: true } : incident
      )
    );
  };

  return (
    <div className="min-h-screen bg-background p-6 relative">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-4">
          <Button 
            variant="outline" 
            onClick={onBack}
            className="border-border hover:bg-card/50"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Events
          </Button>
          <div>
            <h1 className="text-3xl font-bold text-foreground">{event.name}</h1>
            <p className="text-muted-foreground">
              {event.artist} • {event.venue} • {event.date}
            </p>
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-2xl font-bold text-accent">{attendeeCount.toLocaleString()}</div>
            <div className="text-sm text-muted-foreground">Live Attendees</div>
          </div>
          <div className="status-safe px-3 py-1 rounded-full text-xs font-semibold animate-glow-pulse">
            LIVE
          </div>
        </div>
      </div>

      {/* Critical Alerts Banner */}
      {activeIncidents.filter(i => !i.resolved && i.severity === 'high').length > 0 && (
        <Card className="gradient-danger border-destructive/50 p-4 mb-8 animate-glow-pulse">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Flame className="h-5 w-5 text-destructive-foreground animate-status-pulse" />
              <div>
                <h3 className="font-semibold text-destructive-foreground">CRITICAL EMERGENCY</h3>
                <p className="text-sm text-destructive-foreground/80">
                  High-priority incidents require immediate attention
                </p>
              </div>
            </div>
            <Button 
              onClick={() => setShowEvacuation(true)}
              className="bg-destructive-foreground text-destructive hover:bg-destructive-foreground/90"
            >
              <Zap className="mr-2 h-4 w-4" />
              Initiate Emergency Protocol
            </Button>
          </div>
        </Card>
      )}

      <div className="grid lg:grid-cols-3 gap-6 mb-8">
        {/* Main Dashboard */}
        <div className="lg:col-span-2 space-y-6">
          {/* Heat Map */}
          <HeatMap />
          
          {/* Wristband Tracker */}
          <WristbandTracker />
        </div>

        {/* Incidents Panel */}
        <div className="space-y-6">
          <Card className="gradient-card border-border card-shadow">
            <div className="p-6">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="h-6 w-6 text-warning animate-glow-pulse" />
                <h2 className="text-xl font-semibold">Active Incidents</h2>
                <div className="bg-warning text-warning-foreground px-2 py-1 rounded-full text-xs font-semibold">
                  {activeIncidents.filter(i => !i.resolved).length}
                </div>
              </div>
              
              <div className="space-y-4">
                {activeIncidents.map((incident) => (
                  <IncidentAlert 
                    key={incident.id} 
                    incident={incident} 
                    onResolve={() => resolveIncident(incident.id)}
                  />
                ))}
              </div>
            </div>
          </Card>

          {/* Quick Actions */}
          <Card className="gradient-card border-border card-shadow">
            <div className="p-6">
              <h3 className="text-lg font-semibold mb-4">Emergency Controls</h3>
              <div className="space-y-3">
                <Button className="w-full gradient-warning">
                  <Search className="mr-2 h-4 w-4" />
                  Locate Missing Person
                </Button>
                <Button className="w-full gradient-primary">
                  <Users className="mr-2 h-4 w-4" />
                  Crowd Redistribution
                </Button>
                <Button 
                  className="w-full gradient-danger"
                  onClick={() => setShowEvacuation(true)}
                >
                  <MapPin className="mr-2 h-4 w-4" />
                  Emergency Evacuation
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>

      {/* Evacuation Overlay */}
      {showEvacuation && (
        <EvacuationOverlay onClose={() => setShowEvacuation(false)} />
      )}
    </div>
  );
};

export default EventDashboard;