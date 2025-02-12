"use client";

import { Route } from "@/types/route";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Polyline,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon, LatLngBounds, LatLng } from "leaflet";
import { useMemo, useEffect, useState } from "react";

interface RouteMapProps {
  route: Route;
}

function RoutingMachine({ stops }: { stops: [number, number][] }) {
  const [routeCoordinates, setRouteCoordinates] = useState<[number, number][]>(
    []
  );
  const [routeInfo, setRouteInfo] = useState<{
    distance: number;
    duration: number;
  } | null>(null);
  const map = useMap();

  useEffect(() => {
    async function fetchRoute() {
      if (stops.length < 2) return;

      try {
        // Criar a string de coordenadas no formato correto: longitude,latitude
        const coordinates = stops
          .map(([lat, lng]) => `${lng},${lat}`)
          .join(";");

        const url = `https://router.project-osrm.org/route/v1/driving/${coordinates}?overview=full&geometries=geojson&steps=true`;

        const response = await fetch(url);
        const data = await response.json();

        if (data.code === "Ok" && data.routes?.[0]) {
          const route = data.routes[0];

          // Converter as coordenadas do GeoJSON (que vêm como [lng, lat]) para [lat, lng]
          const coords = route.geometry.coordinates.map(
            ([lng, lat]: number[]) => [lat, lng] as [number, number]
          );

          setRouteCoordinates(coords);
          setRouteInfo({
            distance: route.distance / 1000,
            duration: route.duration / 60,
          });

          // Criar bounds para ajustar o zoom
          const bounds = new LatLngBounds(
            coords.map(([lat, lng]: [number, number]) => new LatLng(lat, lng))
          );
          map.fitBounds(bounds, { padding: [50, 50] });
        }
      } catch (error) {
        console.error("Erro ao buscar rota:", error);
      }
    }

    fetchRoute();
  }, [stops, map]);

  return (
    <>
      {routeCoordinates.length > 0 && (
        <>
          <Polyline
            positions={routeCoordinates}
            color="#0066CC"
            weight={3}
            opacity={0.7}
          />
          {routeInfo && (
            <div className="absolute bottom-4 right-4 bg-white p-3 rounded-lg shadow-lg z-[1000]">
              <p className="text-sm font-medium">
                Distância: {routeInfo.distance.toFixed(1)} km
              </p>
              <p className="text-sm font-medium">
                Tempo estimado: {Math.round(routeInfo.duration)} min
              </p>
            </div>
          )}
        </>
      )}
    </>
  );
}

export function RouteMap({ route }: RouteMapProps) {
  const center = useMemo(() => {
    if (route.stops.length === 0) {
      return { lat: -5.08921, lng: -42.8016 }; // Centro de Teresina como padrão
    }
    const lats = route.stops.map((stop) => stop.coordinates.lat);
    const lngs = route.stops.map((stop) => stop.coordinates.lng);

    return {
      lat: (Math.max(...lats) + Math.min(...lats)) / 2,
      lng: (Math.max(...lngs) + Math.min(...lngs)) / 2,
    };
  }, [route.stops]);

  const positions = useMemo(() => {
    return route.stops.map((stop) => [
      stop.coordinates.lat,
      stop.coordinates.lng,
    ]) as [number, number][];
  }, [route.stops]);

  const customIcon = new Icon({
    iconUrl: "/marker-icon.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
  });

  return (
    <MapContainer
      center={[center.lat, center.lng]}
      zoom={13}
      style={{ height: "400px", width: "100%", borderRadius: "0.5rem" }}
      className="z-0"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <RoutingMachine stops={positions} />

      {route.stops.map((stop) => (
        <Marker
          key={stop.id}
          position={[stop.coordinates.lat, stop.coordinates.lng]}
          icon={customIcon}
        >
          <Popup>
            <div className="p-2">
              <h3 className="font-semibold">{stop.name}</h3>
              <p className="text-sm text-muted-foreground">
                Horário previsto: {stop.estimatedTime}
              </p>
            </div>
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
