import { createContext, useContext, useState, useCallback, type ReactNode } from "react";

interface RegistrationContextType {
  isOpen: boolean;
  featureLabel: string;
  openModal: (feature?: string) => void;
  closeModal: () => void;
}

const RegistrationContext = createContext<RegistrationContextType | null>(null);

export function RegistrationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [featureLabel, setFeatureLabel] = useState("");

  const openModal = useCallback((feature?: string) => {
    setFeatureLabel(feature || "");
    setIsOpen(true);
  }, []);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    setFeatureLabel("");
  }, []);

  return (
    <RegistrationContext.Provider value={{ isOpen, featureLabel, openModal, closeModal }}>
      {children}
    </RegistrationContext.Provider>
  );
}

export function useRegistration() {
  const ctx = useContext(RegistrationContext);
  if (!ctx) throw new Error("useRegistration must be used within RegistrationProvider");
  return ctx;
}
