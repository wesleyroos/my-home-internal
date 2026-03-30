/*
 * SurroundingSalesSection — Recent sales near the property
 * Editorial cards with key sale details, interactive map
 */

import { useState, useRef } from "react";
import { SectionReveal } from "@/components/SectionReveal";
import { MapView } from "@/components/Map";
import {
  surroundingSales,
  ownerProperty,
  formatRand,
  formatDate,
  formatDistance,
} from "@/lib/mockData";
import { Bed, Bath, Maximize, Clock, ChevronDown, ChevronUp, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface SaleCardProps {
  sale: (typeof surroundingSales)[0];
  index: number;
  isExpanded: boolean;
  onToggle: () => void;
}

function SaleCard({ sale, index, isExpanded, onToggle }: SaleCardProps) {
  const priceDiff = sale.salePrice - ownerProperty.currentValue;
  const priceDiffPercent = ((priceDiff / ownerProperty.currentValue) * 100).toFixed(0);

  return (
    <SectionReveal delay={0.05 * index}>
      <div
        className="bg-white rounded-xl border border-border overflow-hidden hover:shadow-md hover:shadow-black/[0.03] transition-all duration-300 cursor-pointer"
        onClick={onToggle}
      >
        <div className="p-3.5 sm:p-5">
          <div className="flex items-start justify-between gap-2 sm:gap-3">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-1">
                <MapPin className="w-3.5 h-3.5 text-[#3DBFAD] flex-shrink-0" />
                <h4 className="font-semibold text-sm text-foreground truncate">{sale.address}</h4>
              </div>
              <p className="text-muted-foreground text-xs">
                {formatDistance(sale.distanceFromProperty)} from your property
              </p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="font-heading font-bold text-lg text-foreground">{formatRand(sale.salePrice)}</p>
              <p className={`text-xs font-medium ${priceDiff >= 0 ? 'text-[#3DBFAD]' : 'text-red-500'}`}>
                {priceDiff >= 0 ? '+' : ''}{priceDiffPercent}% vs yours
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mt-2.5 sm:mt-3 pt-2.5 sm:pt-3 border-t border-border">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Bed className="w-3.5 h-3.5" />
              <span>{sale.bedrooms}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Bath className="w-3.5 h-3.5" />
              <span>{sale.bathrooms}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Maximize className="w-3.5 h-3.5" />
              <span>{sale.erfSize}m²</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3.5 h-3.5" />
              <span>{sale.daysOnMarket}d on market</span>
            </div>
            <div className="ml-auto">
              {isExpanded ? (
                <ChevronUp className="w-4 h-4 text-muted-foreground" />
              ) : (
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>

        <AnimatePresence>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5 pt-0">
                <div className="bg-[#f0f5fa] rounded-lg p-3 sm:p-4 grid grid-cols-2 gap-2 sm:gap-3">
                  <div>
                    <p className="text-xs text-muted-foreground">Sale Date</p>
                    <p className="text-sm font-medium">{formatDate(sale.saleDate)}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Price per m²</p>
                    <p className="text-sm font-medium">R{sale.pricePerSqm.toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">Building Size</p>
                    <p className="text-sm font-medium">{sale.buildingSize}m²</p>
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">
                      {sale.aboveAsking ? "Sold Above Asking" : "Sold Below Asking"}
                    </p>
                    <p className={`text-sm font-medium ${sale.aboveAsking ? 'text-[#3DBFAD]' : 'text-red-600'}`}>
                      {sale.aboveAsking ? '+' : ''}{formatRand(sale.salePrice - sale.askingPrice)}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </SectionReveal>
  );
}

// Clean map styles — hides all POI icons/labels, transit, and visual noise
const CLEAN_MAP_STYLES: google.maps.MapTypeStyle[] = [
  { featureType: "poi", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "poi.business", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "poi.medical", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "poi.school", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "poi.attraction", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "poi.government", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "poi.place_of_worship", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "poi.sports_complex", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "transit", elementType: "all", stylers: [{ visibility: "off" }] },
  { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
  { featureType: "road.highway", elementType: "labels", stylers: [{ visibility: "simplified" }] },
  { featureType: "administrative", elementType: "labels", stylers: [{ visibility: "simplified" }] },
];

export function SurroundingSalesSection() {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  const mapRef = useRef<google.maps.Map | null>(null);

  const handleMapReady = (map: google.maps.Map) => {
    mapRef.current = map;
    map.setMapTypeId("hybrid");
    map.setTilt(0);

    // Custom HTML label overlay — defined here so google.maps is already loaded
    class LabelOverlay extends google.maps.OverlayView {
      private pos: google.maps.LatLngLiteral;
      private html: string;
      private el: HTMLDivElement | null = null;
      constructor(pos: google.maps.LatLngLiteral, html: string) { super(); this.pos = pos; this.html = html; }
      onAdd() {
        this.el = document.createElement("div");
        this.el.style.cssText = "position:absolute;transform:translate(-50%,-100%);pointer-events:none;";
        this.el.innerHTML = this.html;
        this.getPanes()!.overlayMouseTarget.appendChild(this.el);
      }
      draw() {
        const p = this.getProjection().fromLatLngToDivPixel(new google.maps.LatLng(this.pos));
        if (p && this.el) { this.el.style.left = `${p.x}px`; this.el.style.top = `${p.y}px`; }
      }
      onRemove() { this.el?.remove(); this.el = null; }
    }

    // "Your Home" label
    new LabelOverlay(
      { lat: ownerProperty.lat, lng: ownerProperty.lng },
      `<div style="display:flex;flex-direction:column;align-items:center;">
        <div style="background:#0C2340;color:white;padding:4px 10px;border-radius:8px;font-size:12px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.18);">Your Home</div>
        <div style="width:12px;height:12px;background:#0C2340;border:2px solid white;border-radius:50%;margin-top:-2px;box-shadow:0 2px 4px rgba(0,0,0,0.2);"></div>
      </div>`
    ).setMap(map);

    // Sale price labels
    surroundingSales.forEach((sale) => {
      new LabelOverlay(
        { lat: sale.lat, lng: sale.lng },
        `<div style="display:flex;flex-direction:column;align-items:center;">
          <div style="background:white;color:#1E3A5A;padding:3px 8px;border-radius:6px;font-size:11px;font-weight:600;white-space:nowrap;box-shadow:0 2px 8px rgba(0,0,0,0.12);border:1px solid #e2e8f0;">${formatRand(sale.salePrice)}</div>
          <div style="width:8px;height:8px;background:#3DBFAD;border:2px solid white;border-radius:50%;margin-top:-2px;box-shadow:0 1px 3px rgba(0,0,0,0.15);"></div>
        </div>`
      ).setMap(map);
    });
  };

  const avgSalePrice =
    surroundingSales.reduce((sum, s) => sum + s.salePrice, 0) / surroundingSales.length;
  const salesAboveAsking = surroundingSales.filter((s) => s.aboveAsking).length;

  return (
    <section className="container py-10 sm:py-12 lg:py-16">
      <SectionReveal>
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
          <div>
            <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">
              Recent Sales Near You
            </h2>
            <p className="text-muted-foreground text-sm max-w-lg">
              {surroundingSales.length} properties sold within 600m of your home in the last 6 months.
              Average sale price: <strong className="text-foreground">{formatRand(avgSalePrice)}</strong>.{" "}
              {salesAboveAsking} of {surroundingSales.length} sold above asking price.
            </p>
          </div>
        </div>
      </SectionReveal>

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
        {/* Map */}
        <SectionReveal delay={0.1} className="lg:col-span-3 order-2 lg:order-1">
          <div className="bg-white rounded-xl border border-border overflow-hidden">
            <MapView
              className="h-[280px] sm:h-[380px] lg:h-[520px]"
              initialCenter={{ lat: ownerProperty.lat, lng: ownerProperty.lng }}
              initialZoom={16}
              useMapId={false}
              mapStyles={CLEAN_MAP_STYLES}
              onMapReady={handleMapReady}
            />
          </div>
        </SectionReveal>

        {/* Sale cards */}
        <div className="lg:col-span-2 order-1 lg:order-2 space-y-3 lg:max-h-[520px] lg:overflow-y-auto lg:pr-1">
          {surroundingSales.map((sale, i) => (
            <SaleCard
              key={sale.id}
              sale={sale}
              index={i}
              isExpanded={expandedId === sale.id}
              onToggle={() =>
                setExpandedId(expandedId === sale.id ? null : sale.id)
              }
            />
          ))}
        </div>
      </div>
    </section>
  );
}
