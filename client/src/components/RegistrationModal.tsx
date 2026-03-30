/*
 * RegistrationModal — MyHome branded sign-up modal
 * Navy #0C2340, Teal #3DBFAD, white background
 * Plus Jakarta Sans headings, Inter body
 * Opens when any premium/unlock button is clicked
 */

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRegistration } from "@/contexts/RegistrationContext";
import { X, Lock, CheckCircle, ArrowRight } from "lucide-react";
import { toast } from "sonner";

const LOGO_FULL = "https://d2xsxph8kpxj0f.cloudfront.net/310419663031491909/TspP3qLjTap5M6WtdxfZix/myhome-logo-full_208030e1.png";

const FEATURES = [
  "Full property scorecard with neighbourhood ranking",
  "Equity & bond tracker updated monthly",
  "Buyer demand insights for your area",
  "Instant alerts when a nearby property sells",
];

export function RegistrationModal() {
  const { isOpen, featureLabel, closeModal } = useRegistration();
  const [step, setStep] = useState<"form" | "success">("form");
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate registration
    setStep("success");
    toast.success("Welcome to MyHome, " + formData.firstName + "!");
  };

  const handleClose = () => {
    closeModal();
    // Reset after animation
    setTimeout(() => {
      setStep("form");
      setFormData({ firstName: "", lastName: "", email: "", phone: "" });
    }, 300);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            className="fixed inset-0 z-[100] bg-[#0C2340]/50 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={handleClose}
          />

          {/* Modal */}
          <motion.div
            className="fixed inset-0 z-[101] flex items-center justify-center p-4"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="relative w-full max-w-[480px] max-h-[90vh] overflow-y-auto bg-white rounded-2xl shadow-2xl shadow-[#0C2340]/20"
              initial={{ scale: 0.9, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.95, y: 10 }}
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close button */}
              <button
                onClick={handleClose}
                className="absolute top-4 right-4 z-10 w-8 h-8 flex items-center justify-center rounded-full bg-[#0C2340]/5 hover:bg-[#0C2340]/10 transition-colors"
              >
                <X className="w-4 h-4 text-[#5A7A9A]" />
              </button>

              {step === "form" ? (
                <>
                  {/* Header */}
                  <div className="px-5 sm:px-7 pt-5 sm:pt-7 pb-4 sm:pb-5">
                    <img src={LOGO_FULL} alt="MyHome" className="h-6 sm:h-7 mb-4 sm:mb-5" />

                    {featureLabel && (
                      <div className="flex items-center gap-2 mb-3 px-3 py-2 rounded-lg bg-[#3DBFAD]/8 border border-[#3DBFAD]/15">
                        <Lock className="w-3.5 h-3.5 text-[#3DBFAD] flex-shrink-0" />
                        <span className="text-xs text-[#1E3A5A] font-medium">
                          Register free to unlock: <strong className="text-[#0C2340]">{featureLabel}</strong>
                        </span>
                      </div>
                    )}

                    <h2 className="font-heading font-bold text-xl sm:text-2xl text-[#0C2340] leading-tight mb-1.5">
                      Get the full picture on your property
                    </h2>
                    <p className="text-sm text-[#5A7A9A] leading-relaxed">
                      Join thousands of SA homeowners tracking their biggest asset. It's completely free.
                    </p>
                  </div>

                  {/* Feature list */}
                  <div className="px-5 sm:px-7 pb-3 sm:pb-4">
                    <div className="grid grid-cols-1 gap-2">
                      {FEATURES.map((feat, i) => (
                        <div key={i} className="flex items-start gap-2.5">
                          <CheckCircle className="w-4 h-4 text-[#3DBFAD] flex-shrink-0 mt-0.5" />
                          <span className="text-xs text-[#1E3A5A] leading-relaxed">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="px-5 sm:px-7 pb-5 sm:pb-7">
                    <div className="space-y-3">
                      <div className="grid grid-cols-2 gap-3">
                        <div>
                          <label className="block text-[10px] font-semibold text-[#5A7A9A] uppercase tracking-wider mb-1">
                            First name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            placeholder="Rudi"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#0C2340]/10 bg-[#f0f5fa]/50 text-sm text-[#0C2340] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3DBFAD] focus:ring-2 focus:ring-[#3DBFAD]/20 transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-[10px] font-semibold text-[#5A7A9A] uppercase tracking-wider mb-1">
                            Last name
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            placeholder="Botha"
                            className="w-full px-3.5 py-2.5 rounded-lg border border-[#0C2340]/10 bg-[#f0f5fa]/50 text-sm text-[#0C2340] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3DBFAD] focus:ring-2 focus:ring-[#3DBFAD]/20 transition-all"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#5A7A9A] uppercase tracking-wider mb-1">
                          Email address
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="rudi@example.co.za"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#0C2340]/10 bg-[#f0f5fa]/50 text-sm text-[#0C2340] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3DBFAD] focus:ring-2 focus:ring-[#3DBFAD]/20 transition-all"
                        />
                      </div>

                      <div>
                        <label className="block text-[10px] font-semibold text-[#5A7A9A] uppercase tracking-wider mb-1">
                          Mobile number
                        </label>
                        <input
                          type="tel"
                          required
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          placeholder="082 123 4567"
                          className="w-full px-3.5 py-2.5 rounded-lg border border-[#0C2340]/10 bg-[#f0f5fa]/50 text-sm text-[#0C2340] placeholder:text-[#94A3B8] focus:outline-none focus:border-[#3DBFAD] focus:ring-2 focus:ring-[#3DBFAD]/20 transition-all"
                        />
                      </div>
                    </div>

                    <button
                      type="submit"
                      className="mt-5 w-full flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl bg-[#3DBFAD] hover:bg-[#35ab9b] text-white font-heading font-bold text-sm tracking-wide transition-all hover:shadow-lg hover:shadow-[#3DBFAD]/25 active:scale-[0.98]"
                    >
                      Create my free account
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <p className="mt-3 text-center text-[10px] text-[#94A3B8] leading-relaxed">
                      By registering you agree to MyHome's{" "}
                      <a href="#" className="underline hover:text-[#3DBFAD]">Terms of Service</a>{" "}
                      and{" "}
                      <a href="#" className="underline hover:text-[#3DBFAD]">Privacy Policy</a>.
                    </p>
                  </form>
                </>
              ) : (
                /* Success state */
                <div className="px-5 sm:px-7 py-8 sm:py-10 text-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 15, stiffness: 200 }}
                    className="w-16 h-16 mx-auto mb-5 rounded-full bg-[#3DBFAD]/10 flex items-center justify-center"
                  >
                    <CheckCircle className="w-8 h-8 text-[#3DBFAD]" />
                  </motion.div>

                  <img src={LOGO_FULL} alt="MyHome" className="h-6 mx-auto mb-4" />

                  <h2 className="font-heading font-bold text-2xl text-[#0C2340] mb-2">
                    Welcome to MyHome!
                  </h2>
                  <p className="text-sm text-[#5A7A9A] mb-6 max-w-xs mx-auto leading-relaxed">
                    Your account has been created. Check your email for a link to access your full property dashboard.
                  </p>

                  <button
                    onClick={handleClose}
                    className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#0C2340] hover:bg-[#1E3A5A] text-white font-heading font-bold text-sm transition-all"
                  >
                    Continue exploring
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
