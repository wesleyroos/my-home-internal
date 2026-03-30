/*
 * ActiveListingsSection — Properties currently for sale nearby
 * Horizontal scrollable cards with status badges
 */

import { SectionReveal } from "@/components/SectionReveal";
import { activeListings, formatRand, ownerProperty } from "@/lib/mockData";
import { Bed, Bath, Maximize, Clock, ExternalLink } from "lucide-react";
import { motion } from "framer-motion";
import { useRegistration } from "@/contexts/RegistrationContext";

const statusColors: Record<string, { bg: string; text: string }> = {
  New: { bg: "bg-[#3DBFAD]/10", text: "text-[#3DBFAD]" },
  "Price Reduced": { bg: "bg-amber-50", text: "text-amber-700" },
  "Offer Pending": { bg: "bg-purple-50", text: "text-purple-700" },
};

function ListingCard({
  listing,
  index,
}: {
  listing: (typeof activeListings)[0];
  index: number;
}) {
  const priceDiff = listing.askingPrice - ownerProperty.currentValue;
  const priceDiffPercent = ((priceDiff / ownerProperty.currentValue) * 100).toFixed(0);
  const colors = statusColors[listing.status] || statusColors.New;

  return (
    <motion.div
      className="min-w-[260px] sm:min-w-[320px] lg:min-w-[340px] bg-white rounded-xl border border-border overflow-hidden hover:shadow-md hover:shadow-black/[0.03] transition-shadow duration-300 flex-shrink-0 snap-start"
      initial={{ opacity: 0, x: 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 0.08 * index }}
    >
      {/* Status + price header */}
      <div className="p-3.5 sm:p-5 pb-3 sm:pb-4">
        <div className="flex items-center justify-between mb-3">
          <span className={`text-xs font-semibold px-2.5 py-1 rounded-full ${colors.bg} ${colors.text}`}>
            {listing.status}
          </span>
          <span className="text-xs text-muted-foreground">{listing.daysListed}d listed</span>
        </div>

        <h4 className="font-semibold text-sm text-foreground mb-1">{listing.address}</h4>
        <p className="text-xs text-muted-foreground mb-3">{listing.agent}</p>

        <div className="flex items-baseline gap-2">
          <span className="font-heading font-bold text-xl text-foreground">{formatRand(listing.askingPrice)}</span>
          <span className={`text-xs font-medium ${priceDiff >= 0 ? 'text-muted-foreground' : 'text-[#3DBFAD]'}`}>
            {priceDiff >= 0 ? '+' : ''}{priceDiffPercent}% vs yours
          </span>
        </div>
      </div>

      {/* Details */}
      <div className="px-3.5 sm:px-5 pb-3.5 sm:pb-5">
        <div className="flex flex-wrap items-center gap-2.5 sm:gap-4 pt-2.5 sm:pt-3 border-t border-border">
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Bed className="w-3.5 h-3.5" />
            <span>{listing.bedrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Bath className="w-3.5 h-3.5" />
            <span>{listing.bathrooms}</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Maximize className="w-3.5 h-3.5" />
            <span>{listing.erfSize}m²</span>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Clock className="w-3.5 h-3.5" />
            <span>R{listing.pricePerSqm.toLocaleString()}/m²</span>
          </div>
        </div>
      </div>

      {/* CTA */}
      <div className="bg-[#f0f5fa] px-3.5 sm:px-5 py-2.5 sm:py-3 flex items-center justify-between">
        <span className="text-xs text-muted-foreground">View on MyHome</span>
        <ExternalLink className="w-3.5 h-3.5 text-[#3DBFAD]" />
      </div>
    </motion.div>
  );
}

export function ActiveListingsSection() {
  const { openModal } = useRegistration();
  const avgAskingPrice =
    activeListings.reduce((sum, l) => sum + l.askingPrice, 0) / activeListings.length;

  return (
    <section className="bg-[#f0f5fa] py-10 sm:py-12 lg:py-16">
      <div className="container">
        <SectionReveal>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 sm:gap-4 mb-6 sm:mb-8">
            <div>
              <h2 className="font-heading font-bold text-xl sm:text-2xl lg:text-3xl text-foreground mb-2">
                Currently For Sale Near You
              </h2>
              <p className="text-muted-foreground text-sm max-w-lg">
                {activeListings.length} properties are currently listed within 600m of your home.
                Average asking price: <strong className="text-foreground">{formatRand(avgAskingPrice)}</strong>.
              </p>
            </div>
            <button
              onClick={() => openModal("Full listings & market data")}
              className="inline-flex items-center gap-2 text-sm font-medium text-[#0C2340] hover:text-[#3DBFAD] transition-colors flex-shrink-0"
            >
              <img src="/private-property-logo.png" alt="Private Property" className="h-6 w-auto" />
              View all listings on Private Property
              <ExternalLink className="w-3.5 h-3.5" />
            </button>
          </div>
        </SectionReveal>
      </div>

      {/* Horizontal scroll */}
      <div className="pl-4 sm:pl-8 lg:pl-[max(2rem,calc((100vw-1216px)/2))]">
        <div className="flex gap-3 sm:gap-4 overflow-x-auto pb-4 snap-x snap-mandatory scrollbar-hide pr-4 sm:pr-8" style={{ WebkitOverflowScrolling: 'touch' }}>
          {activeListings.map((listing, i) => (
            <ListingCard key={listing.id} listing={listing} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
