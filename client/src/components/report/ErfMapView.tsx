/*
 * ErfMapView — Satellite map with teal erf boundary polygon overlay
 * Design: MyHome Editorial Finance — navy #0C2340, teal #3DBFAD, white bg
 *
 * Shows the property's stand/erf boundary drawn as a polygon on a satellite
 * tile, mimicking cadastral boundary data from providers like AfriGIS or
 * Lightstone. In production, polygon coordinates would come from the
 * Surveyor General's cadastral database.
 */

import { useRef, useState } from "react";
import { MapView } from "@/components/Map";
import { ownerProperty } from "@/lib/mockData";
import { Layers, ZoomIn } from "lucide-react";

type MapType = "satellite" | "roadmap";

export function ErfMapView({ compact }: { compact?: boolean }) {
  const mapRef = useRef<google.maps.Map | null>(null);
  const [mapType, setMapType] = useState<MapType>("satellite");
  const [polygonRef, setPolygonRef] = useState<google.maps.Polygon | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;

    // Set satellite view
    map.setMapTypeId("satellite");
    map.setTilt(0); // flat top-down view like cadastral maps

    // Draw the erf boundary polygon in MyHome teal
    const erfPolygon = new google.maps.Polygon({
      paths: ownerProperty.erfBoundary,
      strokeColor: "#3DBFAD",
      strokeOpacity: 1,
      strokeWeight: 2.5,
      fillColor: "#3DBFAD",
      fillOpacity: 0.18,
      map,
    });
    setPolygonRef(erfPolygon);

    // Add a small label marker at the centroid of the polygon
    const centroid = ownerProperty.erfBoundary.reduce(
      (acc, pt) => ({ lat: acc.lat + pt.lat / ownerProperty.erfBoundary.length, lng: acc.lng + pt.lng / ownerProperty.erfBoundary.length }),
      { lat: 0, lng: 0 }
    );

    const labelEl = document.createElement("div");
    labelEl.innerHTML = `
      <div style="
        background: #0C2340;
        color: white;
        padding: 3px 8px;
        border-radius: 6px;
        font-size: 11px;
        font-weight: 600;
        white-space: nowrap;
        box-shadow: 0 2px 8px rgba(0,0,0,0.25);
        font-family: 'Plus Jakarta Sans', sans-serif;
        letter-spacing: 0.2px;
      ">
        ${ownerProperty.erfNumber} · ${ownerProperty.erfSize}m²
      </div>
    `;

    new google.maps.marker.AdvancedMarkerElement({
      map,
      position: centroid,
      content: labelEl,
      zIndex: 10,
    });
  };

  const toggleMapType = () => {
    if (!mapRef.current) return;
    const next: MapType = mapType === "satellite" ? "roadmap" : "satellite";
    mapRef.current.setMapTypeId(next);
    setMapType(next);
  };

  const zoomIn = () => {
    if (!mapRef.current) return;
    mapRef.current.setZoom((mapRef.current.getZoom() ?? 19) + 1);
  };

  return (
    <div className={`relative overflow-hidden ${compact ? "h-full" : "rounded-xl border border-border bg-white"}`}>
      {/* Map */}
      <MapView
        className={compact ? "h-full w-full" : "h-[220px] sm:h-[260px]"}
        initialCenter={{ lat: ownerProperty.lat, lng: ownerProperty.lng }}
        initialZoom={19}
        onMapReady={handleMapReady}
      />

      {/* Label overlay */}
      <div className="absolute top-2 left-2 bg-[#0C2340]/80 backdrop-blur-sm text-white text-[10px] font-semibold px-2.5 py-1 rounded-md tracking-wide">
        ERF BOUNDARY
      </div>

      {/* Controls */}
      <div className="absolute top-2 right-2 flex flex-col gap-1.5">
        <button
          onClick={toggleMapType}
          className="bg-white/90 backdrop-blur-sm hover:bg-white border border-border rounded-md p-1.5 shadow-sm transition-colors"
          title={mapType === "satellite" ? "Switch to map view" : "Switch to satellite view"}
        >
          <Layers className="w-3.5 h-3.5 text-[#0C2340]" />
        </button>
        <button
          onClick={zoomIn}
          className="bg-white/90 backdrop-blur-sm hover:bg-white border border-border rounded-md p-1.5 shadow-sm transition-colors"
          title="Zoom in"
        >
          <ZoomIn className="w-3.5 h-3.5 text-[#0C2340]" />
        </button>
      </div>

      {/* Bottom info bar */}
      <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/60 to-transparent px-3 py-2">
        <p className="text-white text-[10px] font-medium">
          Satellite View — {ownerProperty.address}, {ownerProperty.suburb}
        </p>
        <p className="text-white/70 text-[9px]">
          Erf boundary is indicative. Source: Surveyor General (mock data)
        </p>
      </div>
    </div>
  );
}
