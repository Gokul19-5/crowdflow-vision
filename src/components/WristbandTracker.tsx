import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Users, MapPin, Clock, Signal, Crown, Briefcase } from "lucide-react";

interface Attendee {
  id: string;
  name: string;
  wristbandId: string;
  type: 'vip' | 'general' | 'staff';
  zone: string;
  lastSeen: string;
  signalStrength: number;
  status: 'active' | 'missing' | 'emergency';
}

const WristbandTracker = () => {
  const [attendees, setAttendees] = useState<Attendee[]>([
    {
      id: '1',
      name: 'Sarah M.',
      wristbandId: 'A1234',
      type: 'vip',
      zone: 'VIP Lounge',
      lastSeen: '2 min ago',
      signalStrength: 85,
      status: 'missing'
    },
    {
      id: '2', 
      name: 'Mike R.',
      wristbandId: 'B5678',
      type: 'general',
      zone: 'Main Floor',
      lastSeen: 'now',
      signalStrength: 92,
      status: 'active'
    },
    {
      id: '3',
      name: 'Security Team Alpha',
      wristbandId: 'S001',
      type: 'staff',
      zone: 'Stage Security',
      lastSeen: 'now',
      signalStrength: 98,
      status: 'active'
    },
    {
      id: '4',
      name: 'Alex T.',
      wristbandId: 'A9876',
      type: 'vip',
      zone: 'Backstage',
      lastSeen: 'now',
      signalStrength: 76,
      status: 'active'
    }
  ]);

  const [selectedType, setSelectedType] = useState<'all' | 'vip' | 'general' | 'staff'>('all');

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setAttendees(prev => 
        prev.map(attendee => ({
          ...attendee,
          signalStrength: Math.max(20, Math.min(100, 
            attendee.signalStrength + (Math.random() * 20 - 10)
          )),
          lastSeen: attendee.status === 'active' ? 
            (Math.random() > 0.7 ? 'now' : `${Math.floor(Math.random() * 5) + 1} min ago`) :
            attendee.lastSeen
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const getWristbandIcon = (type: string) => {
    switch (type) {
      case 'vip': return Crown;
      case 'staff': return Briefcase;
      default: return Users;
    }
  };

  const getWristbandClass = (type: string) => {
    switch (type) {
      case 'vip': return 'wristband-vip';
      case 'staff': return 'wristband-staff';
      default: return 'wristband-general';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-safe';
      case 'missing': return 'status-warning';
      case 'emergency': return 'status-danger';
      default: return 'status-safe';
    }
  };

  const filteredAttendees = selectedType === 'all' 
    ? attendees 
    : attendees.filter(a => a.type === selectedType);

  return (
    <Card className="gradient-card border-border card-shadow">
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Signal className="h-6 w-6 text-accent animate-glow-pulse" />
            <h2 className="text-xl font-semibold">Wristband Tracking</h2>
          </div>
          
          <div className="flex gap-2">
            {['all', 'vip', 'general', 'staff'].map((type) => (
              <Button
                key={type}
                variant={selectedType === type ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedType(type as any)}
                className={selectedType === type ? "gradient-primary" : ""}
              >
                {type.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>

        <div className="space-y-4 max-h-96 overflow-y-auto">
          {filteredAttendees.map((attendee) => {
            const WristbandIcon = getWristbandIcon(attendee.type);
            
            return (
              <div 
                key={attendee.id}
                className="flex items-center gap-4 p-4 bg-muted/20 rounded-lg border border-border hover:bg-muted/30 transition-all duration-200"
              >
                <div className={`w-3 h-3 rounded-full ${getWristbandClass(attendee.type)} animate-glow-pulse`} />
                
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="font-semibold text-foreground">{attendee.name}</h4>
                    <Badge variant="outline" className="text-xs">
                      {attendee.wristbandId}
                    </Badge>
                    <WristbandIcon className="h-3 w-3 text-muted-foreground" />
                  </div>
                  
                  <div className="flex items-center gap-4 text-sm text-muted-foreground">
                    <div className="flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {attendee.zone}
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {attendee.lastSeen}
                    </div>
                  </div>
                </div>

                <div className="text-right">
                  <div className={`px-2 py-1 rounded-full text-xs font-semibold mb-2 ${getStatusColor(attendee.status)}`}>
                    {attendee.status.toUpperCase()}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    Signal: {Math.round(attendee.signalStrength)}%
                  </div>
                  <div className="w-16 h-1 bg-muted rounded-full mt-1">
                    <div 
                      className={`h-full rounded-full transition-all duration-300 ${
                        attendee.signalStrength > 70 ? 'bg-success' :
                        attendee.signalStrength > 40 ? 'bg-warning' : 'bg-destructive'
                      }`}
                      style={{ width: `${attendee.signalStrength}%` }}
                    />
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-6 pt-4 border-t border-border">
          <div className="grid grid-cols-3 gap-4 text-center">
            <div>
              <div className="text-2xl font-bold text-accent">
                {attendees.filter(a => a.status === 'active').length}
              </div>
              <div className="text-xs text-muted-foreground">Active Signals</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-warning">
                {attendees.filter(a => a.status === 'missing').length}
              </div>
              <div className="text-xs text-muted-foreground">Missing Persons</div>
            </div>
            <div>
              <div className="text-2xl font-bold text-success">
                {Math.round(attendees.reduce((sum, a) => sum + a.signalStrength, 0) / attendees.length)}%
              </div>
              <div className="text-xs text-muted-foreground">Avg Signal</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WristbandTracker;