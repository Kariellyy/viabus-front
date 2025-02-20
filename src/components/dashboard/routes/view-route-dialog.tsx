"use client";

import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Save, X } from "lucide-react";
import { Route, RouteStop, RouteSchedule } from "@/types/route";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { mockStops } from "@/mocks/stops";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { GripVertical } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RouteScheduleManager } from "./route-schedule-manager";
import { RouteMap } from "./route-map";

interface ViewRouteDialogProps {
  route: Route;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  defaultEditing?: boolean;
  onUpdate?: (route: Route) => void;
}

export function ViewRouteDialog({
  route,
  open,
  onOpenChange,
  defaultEditing = false,
  onUpdate,
}: ViewRouteDialogProps) {
  const [isEditing, setIsEditing] = useState(defaultEditing);
  const [editedRoute, setEditedRoute] = useState<Route>(route);

  useEffect(() => {
    setEditedRoute(route);
    setIsEditing(defaultEditing);
  }, [route, defaultEditing]);

  const availableStops = mockStops.filter(
    (stop) => !editedRoute.stops.find((s) => s.id === stop.id)
  );

  const handleAddStop = () => {
    const newStop: RouteStop = {
      id: crypto.randomUUID(),
      name: "",
      order: editedRoute.stops.length + 1,
      estimatedTime: "",
      coordinates: {
        lat: -5.08921,
        lng: -42.8016,
      },
    };

    setEditedRoute({
      ...editedRoute,
      stops: [...editedRoute.stops, newStop],
    });
  };

  const handleRemoveStop = (stopId: string) => {
    setEditedRoute({
      ...editedRoute,
      stops: editedRoute.stops.filter((s) => s.id !== stopId),
    });
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(editedRoute.stops);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setEditedRoute({
      ...editedRoute,
      stops: items.map((item, index) => ({ ...item, order: index })),
    });
  };

  const handleSave = () => {
    onUpdate?.(editedRoute);
    setIsEditing(false);
    onOpenChange?.(false);
  };

  const handleScheduleChange = (schedules: RouteSchedule[]) => {
    setEditedRoute({
      ...editedRoute,
      schedules,
    });
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent
        className="max-w-4xl max-h-[90vh] overflow-y-auto"
        hideClose
      >
        <DialogHeader className="border-b pb-4">
          <div className="flex items-center justify-between">
            <DialogTitle>
              {isEditing ? "Editar Rota" : "Visualizar Rota"}
            </DialogTitle>
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Switch
                  id="active"
                  checked={editedRoute.isActive}
                  onCheckedChange={(checked) =>
                    setEditedRoute({ ...editedRoute, isActive: checked })
                  }
                  disabled={!isEditing}
                />
                <Label htmlFor="active">Rota Ativa</Label>
              </div>
              {!isEditing && !defaultEditing && (
                <Button variant="outline" onClick={() => setIsEditing(true)}>
                  Editar
                </Button>
              )}
              {isEditing && (
                <Button onClick={handleSave}>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar
                </Button>
              )}
              <DialogClose asChild>
                <Button variant="ghost" size="icon">
                  <X className="h-4 w-4" />
                </Button>
              </DialogClose>
            </div>
          </div>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Detalhes da Rota</TabsTrigger>
            <TabsTrigger value="map">Mapa</TabsTrigger>
            <TabsTrigger value="schedules">Horários</TabsTrigger>
          </TabsList>

          <TabsContent value="details" className="space-y-6">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Rota</Label>
                <Input
                  id="name"
                  value={editedRoute.name}
                  onChange={(e) =>
                    setEditedRoute({ ...editedRoute, name: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="duration">Duração Estimada</Label>
                <Input
                  id="duration"
                  value={editedRoute.estimatedDuration}
                  onChange={(e) =>
                    setEditedRoute({
                      ...editedRoute,
                      estimatedDuration: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="distance">Distância</Label>
                <Input
                  id="distance"
                  value={editedRoute.distance}
                  onChange={(e) =>
                    setEditedRoute({ ...editedRoute, distance: e.target.value })
                  }
                  disabled={!isEditing}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label htmlFor="description">Descrição</Label>
                <Textarea
                  id="description"
                  value={editedRoute.description}
                  onChange={(e) =>
                    setEditedRoute({
                      ...editedRoute,
                      description: e.target.value,
                    })
                  }
                  disabled={!isEditing}
                />
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Paradas da Rota</Label>
                {isEditing && (
                  <Select onValueChange={handleAddStop}>
                    <SelectTrigger className="w-[200px]">
                      <SelectValue placeholder="Adicionar parada" />
                    </SelectTrigger>
                    <SelectContent>
                      {availableStops.map((stop) => (
                        <SelectItem key={stop.id} value={stop.id}>
                          {stop.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                )}
              </div>

              <DragDropContext onDragEnd={handleDragEnd}>
                <Droppable droppableId="stops" isDropDisabled={!isEditing}>
                  {(provided) => (
                    <div
                      {...provided.droppableProps}
                      ref={provided.innerRef}
                      className="space-y-2"
                    >
                      {editedRoute.stops.map((stop, index) => (
                        <Draggable
                          key={stop.id}
                          draggableId={stop.id}
                          index={index}
                          isDragDisabled={!isEditing}
                        >
                          {(provided) => (
                            <Card
                              ref={provided.innerRef}
                              {...provided.draggableProps}
                              className="p-4"
                            >
                              <div className="flex items-center gap-4">
                                {isEditing && (
                                  <div
                                    {...provided.dragHandleProps}
                                    className="cursor-move"
                                  >
                                    <GripVertical className="h-5 w-5 text-gray-500" />
                                  </div>
                                )}
                                <div className="flex-1">
                                  <p className="font-medium">{stop.name}</p>
                                  <div className="mt-2 flex gap-2">
                                    <div className="flex-1">
                                      <Select
                                        value={
                                          stop.estimatedTime.split(":")[0] || ""
                                        }
                                        onValueChange={(value) => {
                                          const newStops = [
                                            ...editedRoute.stops,
                                          ];
                                          const minutes =
                                            newStops[index].estimatedTime.split(
                                              ":"
                                            )[1] || "00";
                                          newStops[
                                            index
                                          ].estimatedTime = `${value}:${minutes}`;
                                          setEditedRoute({
                                            ...editedRoute,
                                            stops: newStops,
                                          });
                                        }}
                                        disabled={!isEditing}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Hora" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {Array.from(
                                            { length: 24 },
                                            (_, i) => i
                                          ).map((hour) => (
                                            <SelectItem
                                              key={hour}
                                              value={hour
                                                .toString()
                                                .padStart(2, "0")}
                                            >
                                              {hour.toString().padStart(2, "0")}
                                              h
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                    <div className="flex-1">
                                      <Select
                                        value={
                                          stop.estimatedTime.split(":")[1] || ""
                                        }
                                        onValueChange={(value) => {
                                          const newStops = [
                                            ...editedRoute.stops,
                                          ];
                                          const hours =
                                            newStops[index].estimatedTime.split(
                                              ":"
                                            )[0] || "00";
                                          newStops[
                                            index
                                          ].estimatedTime = `${hours}:${value}`;
                                          setEditedRoute({
                                            ...editedRoute,
                                            stops: newStops,
                                          });
                                        }}
                                        disabled={!isEditing}
                                      >
                                        <SelectTrigger>
                                          <SelectValue placeholder="Min" />
                                        </SelectTrigger>
                                        <SelectContent>
                                          {Array.from(
                                            { length: 60 },
                                            (_, i) => i
                                          ).map((minute) => (
                                            <SelectItem
                                              key={minute}
                                              value={minute
                                                .toString()
                                                .padStart(2, "0")}
                                            >
                                              {minute
                                                .toString()
                                                .padStart(2, "0")}
                                              min
                                            </SelectItem>
                                          ))}
                                        </SelectContent>
                                      </Select>
                                    </div>
                                  </div>
                                </div>
                                {isEditing && (
                                  <Button
                                    type="button"
                                    variant="ghost"
                                    size="icon"
                                    onClick={() => handleRemoveStop(stop.id)}
                                  >
                                    <X className="h-4 w-4" />
                                  </Button>
                                )}
                              </div>
                            </Card>
                          )}
                        </Draggable>
                      ))}
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </div>
          </TabsContent>

          <TabsContent value="map" className="mt-4">
            <RouteMap route={editedRoute} />
          </TabsContent>

          <TabsContent value="schedules">
            <RouteScheduleManager
              route={editedRoute}
              onUpdate={(schedules) =>
                setEditedRoute({ ...editedRoute, schedules })
              }
            />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}
