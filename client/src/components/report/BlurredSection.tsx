/*
 * BlurredSection — Premium locked content overlay
 * Shows blurred preview of data with a registration CTA
 * Clicking the CTA opens the registration modal
 */

import { motion } from "framer-motion";
import { Lock, ArrowRight } from "lucide-react";
import { type ReactNode } from "react";
import { useRegistration } from "@/contexts/RegistrationContext";

interface BlurredSectionProps {
  children: ReactNode;
  title: string;
  description: string;
  ctaText?: string;
}

export function BlurredSection({
  children,
  title,
  description,
  ctaText = "Register free to unlock",
}: BlurredSectionProps) {
  const { openModal } = useRegistration();

  return (
    <div className="relative rounded-xl border border-border overflow-hidden">
      {/* Blurred content */}
      <div className="blur-[6px] pointer-events-none select-none opacity-70">
        {children}
      </div>

      {/* Lock overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-white/70 to-white/90 flex items-center justify-center">
        <motion.div
          className="text-center max-w-sm px-6"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <div className="w-12 h-12 rounded-full bg-[#3DBFAD]/10 flex items-center justify-center mx-auto mb-4">
            <Lock className="w-5 h-5 text-[#3DBFAD]" />
          </div>
          <h3 className="font-heading font-bold text-xl text-foreground mb-2">{title}</h3>
          <p className="text-muted-foreground text-sm leading-relaxed mb-5">{description}</p>
          <motion.button
            className="inline-flex items-center gap-2 bg-[#3DBFAD] text-white font-semibold text-sm px-6 py-3 rounded-lg hover:bg-[#3DBFAD]/90 transition-colors shadow-lg shadow-[#3DBFAD]/20"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            onClick={() => openModal(title)}
          >
            {ctaText}
            <ArrowRight className="w-4 h-4" />
          </motion.button>
          <p className="text-xs text-muted-foreground mt-3">Free account. No credit card required.</p>
        </motion.div>
      </div>
    </div>
  );
}
