import { cn } from "@/lib/utils";

interface StatusIndicatorProps {
  status: 'online' | 'offline' | 'warning' | 'error';
  label: string;
  className?: string;
}

const StatusIndicator = ({ status, label, className }: StatusIndicatorProps) => {
  const getStatusConfig = (status: string) => {
    switch (status) {
      case 'online':
        return {
          color: 'bg-success',
          text: 'Online',
          textColor: 'text-success'
        };
      case 'warning':
        return {
          color: 'bg-warning',
          text: 'Warning',
          textColor: 'text-warning'
        };
      case 'error':
        return {
          color: 'bg-destructive',
          text: 'Error',
          textColor: 'text-destructive'
        };
      case 'offline':
      default:
        return {
          color: 'bg-muted-foreground',
          text: 'Offline',
          textColor: 'text-muted-foreground'
        };
    }
  };

  const config = getStatusConfig(status);

  return (
    <div className={cn("flex items-center gap-2", className)}>
      <div className="relative">
        <div className={cn("w-3 h-3 rounded-full", config.color)} />
        <div className={cn("absolute inset-0 w-3 h-3 rounded-full animate-ping", config.color, "opacity-75")} />
      </div>
      <div className="text-sm">
        <div className="text-muted-foreground">{label}</div>
        <div className={cn("font-medium", config.textColor)}>{config.text}</div>
      </div>
    </div>
  );
};

export default StatusIndicator;