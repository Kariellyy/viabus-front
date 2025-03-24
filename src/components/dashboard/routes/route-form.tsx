"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
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
import { Card } from "@/components/ui/card";
import { X, GripVertical } from "lucide-react";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import { mockStops } from "@/mocks/stops";
import { RouteStop } from "@/types/route";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RouteMap } from "./route-map";

const diasDaSemana = [
  { value: "0", label: "Domingo" },
  { value: "1", label: "Segunda" },
  { value: "2", label: "Terça" },
  { value: "3", label: "Quarta" },
  { value: "4", label: "Quinta" },
  { value: "5", label: "Sexta" },
  { value: "6", label: "Sábado" },
];

export function RouteForm() {
  const [selectedStops, setSelectedStops] = useState<RouteStop[]>([]);
  const [isActive, setIsActive] = useState(true);
  const [routeInfo, setRouteInfo] = useState<{
    distance: string;
    duration: string;
  } | null>({ distance: "", duration: "00:00" });

  const availableStops = mockStops.filter(
    (stop) => !selectedStops.find((s) => s.id === stop.id)
  );

  // useEffect(() => {
  //   async function fetchRouteInfo() {
  //     if (selectedStops.length < 2) {
  //       setRouteInfo((prev) => ({ ...prev!, distance: "" }));
  //       return;
  //     }

  //     const coordinates = selectedStops
  //       .map((stop) => {
  //         const mockStop = mockStops.find((s) => s.id === stop.id);
  //         return mockStop
  //           ? `${mockStop.coordinates.lng},${mockStop.coordinates.lat}`
  //           : null;
  //       })
  //       .filter(Boolean)
  //       .join(";");

  //     const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full`;

  //     try {
  //       const response = await fetch(url);
  //       const data = await response.json();

  //       if (data.routes && data.routes[0]) {
  //         const route = data.routes[0];
  //         setRouteInfo((prev) => ({
  //           ...prev!,
  //           distance: `${(route.distance / 1000).toFixed(1)}km`,
  //         }));
  //       }
  //     } catch (error) {
  //       console.error("Erro ao buscar informações da rota:", error);
  //     }
  //   }

  //   fetchRouteInfo();
  // }, [selectedStops]);

  // const handleAddStop = (stopId: string) => {
  //   const stop = mockStops.find((s) => s.id === stopId);
  //   if (stop) {
  //     const newStop: RouteStop = {
  //       id: stop.id,
  //       name: stop.name,
  //       estimatedTime: "0:00:00",
  //       order: selectedStops.length,
  //       coordinates: {
  //         lat: stop.coordinates.lat,
  //         lng: stop.coordinates.lng,
  //       },
  //     };
  //     setSelectedStops([...selectedStops, newStop]);
  //   }
  // };

  const handleRemoveStop = (index: number) => {
    setSelectedStops(selectedStops.filter((_, i) => i !== index));
  };

  const handleDragEnd = (result: any) => {
    if (!result.destination) return;

    const items = Array.from(selectedStops);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);

    setSelectedStops(items.map((item, index) => ({ ...item, order: index })));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    console.log({
      name: (form.elements.namedItem("name") as HTMLInputElement).value,
      description: (form.elements.namedItem("description") as HTMLInputElement)
        .value,
      isActive,
      stops: selectedStops,
      estimatedDuration:
        routeInfo?.duration ||
        (form.elements.namedItem("duration") as HTMLInputElement).value,
      distance:
        routeInfo?.distance ||
        (form.elements.namedItem("distance") as HTMLInputElement).value,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <div className="grid gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Nome da Rota</Label>
          <Input id="name" name="name" required />
        </div>

        <div className="space-y-2">
          <Label>Duração Estimada</Label>
          <div className="flex gap-2">
            <div className="flex-1">
              <Select
                value={routeInfo?.duration.split(":")[0] || "00"}
                onValueChange={(value) => {
                  const minutes = routeInfo?.duration.split(":")[1] || "00";
                  setRouteInfo((prev) => ({
                    ...prev!,
                    duration: `${value}:${minutes}`,
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Hora" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 24 }, (_, i) => i).map((hour) => (
                    <SelectItem
                      key={hour}
                      value={hour.toString().padStart(2, "0")}
                    >
                      {hour.toString().padStart(2, "0")}h
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="flex-1">
              <Select
                value={routeInfo?.duration.split(":")[1] || "00"}
                onValueChange={(value) => {
                  const hours = routeInfo?.duration.split(":")[0] || "00";
                  setRouteInfo((prev) => ({
                    ...prev!,
                    duration: `${hours}:${value}`,
                  }));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Min" />
                </SelectTrigger>
                <SelectContent>
                  {Array.from({ length: 60 }, (_, i) => i).map((minute) => (
                    <SelectItem
                      key={minute}
                      value={minute.toString().padStart(2, "0")}
                    >
                      {minute.toString().padStart(2, "0")}min
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="distance">Distância</Label>
          <Input
            id="distance"
            name="distance"
            placeholder="Ex: 12km"
            value={routeInfo?.distance || ""}
            onChange={() => {}}
            required
          />
        </div>

        <div className="space-y-2 md:col-span-2">
          <Label htmlFor="description">Descrição</Label>
          <Textarea id="description" name="description" required />
        </div>
      </div>

      <Tabs defaultValue="list" className="w-full">
        <TabsList>
          <TabsTrigger value="list">Lista de Paradas</TabsTrigger>
          <TabsTrigger value="map">Mapa</TabsTrigger>
        </TabsList>

        <TabsContent value="list">
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <Label>Paradas da Rota</Label>
              {/* <Select onValueChange={handleAddStop}>
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
              </Select> */}
            </div>

            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="stops">
                {(provided) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className="space-y-2"
                  >
                    {selectedStops.map((stop, index) => (
                      <Draggable
                        key={stop.id}
                        draggableId={stop.id}
                        index={index}
                      >
                        {(provided) => (
                          <Card
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            className="p-4"
                          >
                            <div className="flex items-center gap-4">
                              <div
                                {...provided.dragHandleProps}
                                className="cursor-move"
                              >
                                <GripVertical className="h-5 w-5 text-gray-500" />
                              </div>
                              <div className="flex-1">
                                <p className="font-medium">{stop.name}</p>
                                <div className="mt-2 flex gap-2">
                                  <div className="flex-1">
                                    <Select
                                      value={
                                        stop.estimatedTime.split(":")[0] || "0"
                                      }
                                      onValueChange={(value) => {
                                        const newStops = [...selectedStops];
                                        const [_, hours, minutes] = newStops[
                                          index
                                        ].estimatedTime
                                          .split(":")
                                          .map(String);
                                        newStops[
                                          index
                                        ].estimatedTime = `${value}:${
                                          hours || "00"
                                        }:${minutes || "00"}`;
                                        setSelectedStops(newStops);
                                      }}
                                    >
                                      <SelectTrigger>
                                        <SelectValue placeholder="Dia" />
                                      </SelectTrigger>
                                      <SelectContent>
                                        {diasDaSemana.map((dia) => (
                                          <SelectItem
                                            key={dia.value}
                                            value={dia.value}
                                          >
                                            {dia.label}
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex-1">
                                    <Select
                                      value={
                                        stop.estimatedTime.split(":")[1] || "00"
                                      }
                                      onValueChange={(value) => {
                                        const newStops = [...selectedStops];
                                        const [day, _, minutes] = newStops[
                                          index
                                        ].estimatedTime
                                          .split(":")
                                          .map(String);
                                        newStops[index].estimatedTime = `${
                                          day || "0"
                                        }:${value}:${minutes || "00"}`;
                                        setSelectedStops(newStops);
                                      }}
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
                                            {hour.toString().padStart(2, "0")}h
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                  <div className="flex-1">
                                    <Select
                                      value={
                                        stop.estimatedTime.split(":")[2] || "00"
                                      }
                                      onValueChange={(value) => {
                                        const newStops = [...selectedStops];
                                        const [day, hours] = newStops[
                                          index
                                        ].estimatedTime
                                          .split(":")
                                          .map(String);
                                        newStops[index].estimatedTime = `${
                                          day || "0"
                                        }:${hours || "00"}:${value}`;
                                        setSelectedStops(newStops);
                                      }}
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
                                            {minute.toString().padStart(2, "0")}
                                            min
                                          </SelectItem>
                                        ))}
                                      </SelectContent>
                                    </Select>
                                  </div>
                                </div>
                              </div>
                              <Button
                                type="button"
                                variant="ghost"
                                size="icon"
                                onClick={() => handleRemoveStop(index)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
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

        <TabsContent value="map">
          {selectedStops.length > 0 && (
            <RouteMap
              route={{
                id: "new",
                name: "Nova Rota",
                description: "",
                isActive: true,
                stops: selectedStops,
                estimatedDuration: routeInfo?.duration || "0min",
                distance: routeInfo?.distance || "0km",
                schedules: [],
              }}
            />
          )}
        </TabsContent>
      </Tabs>

      <div className="flex items-center space-x-2">
        <Switch id="active" checked={isActive} onCheckedChange={setIsActive} />
        <Label htmlFor="active">Rota Ativa</Label>
      </div>

      <Button type="submit" className="w-full">
        Criar Rota
      </Button>
    </form>
  );
}
