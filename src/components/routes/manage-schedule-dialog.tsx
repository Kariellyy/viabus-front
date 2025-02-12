import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar } from "lucide-react";
import { RouteScheduleManager } from "./route-schedule-manager";
import { Route } from "@/types/route";

interface ManageScheduleDialogProps {
  route: Route;
  onUpdate: (route: Route) => void;
}

export function ManageScheduleDialog({
  route,
  onUpdate,
}: ManageScheduleDialogProps) {
  const handleUpdateSchedules = (schedules: RouteSchedule[]) => {
    onUpdate({
      ...route,
      schedules,
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Calendar className="mr-2 h-4 w-4" />
          Gerenciar Horários
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Gerenciar Horários - {route.name}</DialogTitle>
        </DialogHeader>
        <RouteScheduleManager route={route} onUpdate={handleUpdateSchedules} />
      </DialogContent>
    </Dialog>
  );
}
