"use client";

import { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  useMap,
} from "react-leaflet";
import { LatLng, Icon } from "leaflet";
import "leaflet/dist/leaflet.css";

// Corrigir o ícone do marcador que não carrega por padrão no Next.js
const icon = new Icon({
  iconUrl: "/marker-icon.png",
  shadowUrl: "/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface StopMapProps {
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
  initialPosition: { lat: number; lng: number };
}

function RecenterMap({ position }: { position: { lat: number; lng: number } }) {
  const map = useMap();

  useEffect(() => {
    map.setView([position.lat, position.lng], 13);
  }, [map, position]);

  return null;
}

function LocationMarker({
  position,
  onLocationSelect,
}: {
  position: LatLng;
  onLocationSelect: (coords: { lat: number; lng: number }) => void;
}) {
  const map = useMapEvents({
    click(e) {
      onLocationSelect({ lat: e.latlng.lat, lng: e.latlng.lng });
      map.flyTo(e.latlng, map.getZoom());
    },
  });

  return (
    <Marker
      position={position}
      icon={icon}
      draggable={true}
      eventHandlers={{
        dragend: (e) => {
          const marker = e.target;
          const position = marker.getLatLng();
          onLocationSelect({ lat: position.lat, lng: position.lng });
        },
      }}
    />
  );
}

export function StopMap({ onLocationSelect, initialPosition }: StopMapProps) {
  const [positionState, setPositionState] = useState<LatLng>(
    new LatLng(initialPosition.lat, initialPosition.lng)
  );

  const handleLocationSelect = (coords: { lat: number; lng: number }) => {
    setPositionState(new LatLng(coords.lat, coords.lng));
    onLocationSelect(coords);
  };

  // Atualizar o estado quando initialPosition mudar
  useEffect(() => {
    setPositionState(new LatLng(initialPosition.lat, initialPosition.lng));
  }, [initialPosition]);

  return (
    <MapContainer
      center={[initialPosition.lat, initialPosition.lng]}
      zoom={13}
      scrollWheelZoom={true}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "0.5rem",
        zIndex: 0,
      }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <LocationMarker
        position={positionState}
        onLocationSelect={handleLocationSelect}
      />
      <RecenterMap position={initialPosition} />
    </MapContainer>
  );
}
