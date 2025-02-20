"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CalendarDays, Plus, X } from "lucide-react";
import { Route, RouteSchedule } from "@/types/route";

const DAYS_OF_WEEK = [
  "Domingo",
  "Segunda",
  "Terça",
  "Quarta",
  "Quinta",
  "Sexta",
  "Sábado",
];

interface RouteScheduleManagerProps {
  route: Route;
  onUpdate: (schedules: RouteSchedule[]) => void;
}

export function RouteScheduleManager({
  route,
  onUpdate,
}: RouteScheduleManagerProps) {
  const [schedules, setSchedules] = useState<RouteSchedule[]>(
    route.schedules || []
  );

  const handleAddSchedule = () => {
    const newSchedule: RouteSchedule = {
      id: crypto.randomUUID(),
      dayOfWeek: 1, // Segunda por padrão
      departureTime: "08:00",
      isActive: true,
    };
    setSchedules([...schedules, newSchedule]);
    onUpdate([...schedules, newSchedule]);
  };

  const handleRemoveSchedule = (id: string) => {
    const newSchedules = schedules.filter((s) => s.id !== id);
    setSchedules(newSchedules);
    onUpdate(newSchedules);
  };

  const handleUpdateSchedule = (
    id: string,
    updates: Partial<RouteSchedule>
  ) => {
    const newSchedules = schedules.map((schedule) =>
      schedule.id === id ? { ...schedule, ...updates } : schedule
    );
    setSchedules(newSchedules);
    onUpdate(newSchedules);
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Programação Semanal</CardTitle>
            <CardDescription>
              Gerencie os horários regulares desta rota
            </CardDescription>
          </div>
          <Button onClick={handleAddSchedule} variant="outline">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Horário
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {schedules.map((schedule) => (
            <Card key={schedule.id}>
              <CardContent className="pt-6">
                <div className="flex items-center gap-4">
                  <CalendarDays className="h-5 w-5 text-muted-foreground" />
                  <div className="flex-1 grid grid-cols-3 gap-4">
                    <div>
                      <Label>Dia da Semana</Label>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
                        value={schedule.dayOfWeek}
                        onChange={(e) =>
                          handleUpdateSchedule(schedule.id, {
                            dayOfWeek: Number(e.target.value),
                          })
                        }
                      >
                        {DAYS_OF_WEEK.map((day, index) => (
                          <option key={index} value={index}>
                            {day}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <Label>Horário de Saída</Label>
                      <Input
                        type="time"
                        value={schedule.departureTime}
                        onChange={(e) =>
                          handleUpdateSchedule(schedule.id, {
                            departureTime: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between pt-6">
                      <div className="flex items-center space-x-2">
                        <Switch
                          checked={schedule.isActive}
                          onCheckedChange={(checked) =>
                            handleUpdateSchedule(schedule.id, {
                              isActive: checked,
                            })
                          }
                        />
                        <Label>Ativo</Label>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleRemoveSchedule(schedule.id)}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}

          {schedules.length === 0 && (
            <div className="text-center py-6 text-muted-foreground">
              Nenhum horário programado para esta rota.
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
