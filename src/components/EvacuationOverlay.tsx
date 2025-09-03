import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { X, MapPin, Users, Clock, CheckCircle, AlertTriangle, ArrowRight } from "lucide-react";

interface EvacuationOverlayProps {
  onClose: () => void;
}

interface EvacuationRoute {
  id: string;
  name: string;
  capacity: number;
  currentFlow: number;
  estimatedTime: string;
  status: 'clear' | 'congested' | 'blocked';
  zones: string[];
}

const EvacuationOverlay = ({ onClose }: EvacuationOverlayProps) => {
  const [phase, setPhase] = useState<'planning' | 'active' | 'completed'>('planning');
  const [routes, setRoutes] = useState<EvacuationRoute[]>([
    {
      id: '1',
      name: 'Main Exit A',
      capacity: 2000,
      currentFlow: 0,
      estimatedTime: '8 min',
      status: 'clear',
      zones: ['Main Stage', 'VIP Section', 'Bar Area']
    },
    {
      id: '2',
      name: 'Emergency Exit B',
      capacity: 1500,
      currentFlow: 0,
      estimatedTime: '6 min',
      status: 'clear',
      zones: ['Food Court', 'Merchandise']
    },
    {
      id: '3',
      name: 'Side Exit C',
      capacity: 1000,
      currentFlow: 0,
      estimatedTime: '10 min',
      status: 'clear',
      zones: ['Entry Plaza', 'Restrooms']
    }
  ]);

  const [evacuationProgress, setEvacuationProgress] = useState(0);

  useEffect(() => {
    if (phase === 'active') {
      const interval = setInterval(() => {
        setEvacuationProgress(prev => {
          if (prev >= 100) {
            setPhase('completed');
            return 100;
          }
          return prev + Math.random() * 5;
        });

        setRoutes(prev => 
          prev.map(route => ({
            ...route,
            currentFlow: Math.min(route.capacity, 
              Math.max(0, route.currentFlow + Math.random() * 200 - 100)
            ),
            status: Math.random() > 0.8 ? 'congested' : 'clear'
          }))
        );
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [phase]);

  const getRouteStatusColor = (status: string) => {
    switch (status) {
      case 'clear': return 'status-safe';
      case 'congested': return 'status-warning';
      case 'blocked': return 'status-danger';
      default: return 'status-safe';
    }
  };

  const totalCapacity = routes.reduce((sum, route) => sum + route.capacity, 0);
  const totalCurrentFlow = routes.reduce((sum, route) => sum + route.currentFlow, 0);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6">
      <Card className="gradient-card border-destructive/50 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-6 w-6 text-destructive animate-status-pulse" />
              <h2 className="text-2xl font-bold text-destructive">Emergency Evacuation Protocol</h2>
            </div>
            <Button variant="outline" size="sm" onClick={onClose}>
              <X className="h-4 w-4" />
            </Button>
          </div>

          {phase === 'planning' && (
            <div className="space-y-6">
              <div className="bg-destructive/10 border border-destructive/20 rounded-lg p-4">
                <h3 className="font-semibold text-destructive mb-2">Critical Emergency Detected</h3>
                <p className="text-sm text-muted-foreground">
                  Fire hazard in Food Court requires immediate evacuation. AI is calculating optimal evacuation routes 
                  and will coordinate with wristband technology to guide attendees safely.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {routes.map((route) => (
                  <Card key={route.id} className="gradient-card border-border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{route.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getRouteStatusColor(route.status)}`}>
                        {route.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-muted-foreground">
                      <div className="flex items-center gap-2">
                        <Users className="h-3 w-3" />
                        Capacity: {route.capacity.toLocaleString()}
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="h-3 w-3" />
                        Est. Time: {route.estimatedTime}  
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="h-3 w-3" />
                        Zones: {route.zones.join(', ')}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <Button 
                  className="gradient-danger text-lg px-8 py-4"
                  onClick={() => setPhase('active')}
                >
                  <AlertTriangle className="mr-2 h-5 w-5" />
                  Initiate Emergency Evacuation
                </Button>
                <Button variant="outline" onClick={onClose}>
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {phase === 'active' && (
            <div className="space-y-6">
              <div className="bg-warning/10 border border-warning/20 rounded-lg p-4 animate-glow-pulse">
                <div className="flex items-center gap-3 mb-3">
                  <AlertTriangle className="h-5 w-5 text-warning animate-status-pulse" />
                  <h3 className="font-semibold text-warning">EVACUATION IN PROGRESS</h3>
                </div>
                <div className="mb-3">
                  <div className="flex justify-between text-sm mb-1">
                    <span>Overall Progress</span>
                    <span>{Math.round(evacuationProgress)}%</span>
                  </div>
                  <div className="w-full bg-muted rounded-full h-2">
                    <div 
                      className="bg-warning h-2 rounded-full transition-all duration-1000"
                      style={{ width: `${evacuationProgress}%` }}
                    />
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  Wristband guidance active • Emergency broadcast sent • Security teams deployed
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4">
                {routes.map((route) => (
                  <Card key={route.id} className="gradient-card border-border p-4">
                    <div className="flex items-center justify-between mb-3">
                      <h4 className="font-semibold">{route.name}</h4>
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getRouteStatusColor(route.status)}`}>
                        {route.status.toUpperCase()}
                      </div>
                    </div>
                    
                    <div className="space-y-3">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-accent">
                          {Math.round(route.currentFlow)}
                        </div>
                        <div className="text-xs text-muted-foreground">Current Flow/min</div>
                      </div>
                      
                      <div className="w-full bg-muted rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full transition-all duration-1000 ${
                            route.currentFlow / route.capacity > 0.8 ? 'bg-destructive' :
                            route.currentFlow / route.capacity > 0.5 ? 'bg-warning' : 'bg-success'
                          }`}
                          style={{ width: `${Math.min(100, (route.currentFlow / route.capacity) * 100)}%` }}
                        />
                      </div>
                      
                      <div className="text-xs text-muted-foreground text-center">
                        {Math.round((route.currentFlow / route.capacity) * 100)}% utilized
                      </div>
                    </div>
                  </Card>
                ))}
              </div>

              <div className="text-center">
                <div className="text-sm text-muted-foreground mb-2">
                  Total evacuation rate: {Math.round(totalCurrentFlow)} people/min
                </div>
                <Button variant="outline" onClick={onClose}>
                  Close Monitor
                </Button>
              </div>
            </div>
          )}

          {phase === 'completed' && (
            <div className="space-y-6 text-center">
              <div className="bg-success/10 border border-success/20 rounded-lg p-6">
                <CheckCircle className="h-12 w-12 text-success mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-success mb-2">Evacuation Completed Successfully</h3>
                <p className="text-muted-foreground">
                  All attendees have been safely evacuated. Wristband tracking confirmed 100% evacuation completion.
                  Emergency response teams are conducting final safety checks.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-4 text-sm">
                <div>
                  <div className="text-2xl font-bold text-success">8:42</div>
                  <div className="text-muted-foreground">Total Time</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-accent">{totalCapacity.toLocaleString()}</div>
                  <div className="text-muted-foreground">People Evacuated</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">100%</div>
                  <div className="text-muted-foreground">Success Rate</div>
                </div>
              </div>

              <Button className="gradient-success" onClick={onClose}>
                <CheckCircle className="mr-2 h-4 w-4" />
                Return to Dashboard
              </Button>
            </div>
          )}
        </div>
      </Card>
    </div>
  );
};

export default EvacuationOverlay;