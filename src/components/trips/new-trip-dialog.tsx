import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { TripForm } from "./trip-form";

export function NewTripDialog() {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          Agendar Viagem
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl">
        <DialogHeader>
          <DialogTitle>Agendar Nova Viagem</DialogTitle>
        </DialogHeader>
        <TripForm />
      </DialogContent>
    </Dialog>
  );
}
