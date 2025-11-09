import { createContext, useContext, useState, ReactNode } from "react";

type Language = "en" | "de";

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations = {
  en: {
    siteName: "Hair Dresser Close to Me",
    heroTitle: "Find Your Perfect Hair Salon in Heidelberg",
    heroSubtitle: "Discover top-rated hair dressers in 69121 Heidelberg, Germany",
    searchPlaceholder: "Search for services or salon names...",
    searchButton: "Search",
    openNow: "Open Now",
    closed: "Closed",
    priceRange: "Price Range",
    rating: "Rating",
    reviews: "reviews",
    contact: "Contact",
    viewOnMap: "View on Map",
    openingHours: "Opening Hours",
    monday: "Monday",
    tuesday: "Tuesday",
    wednesday: "Wednesday",
    thursday: "Thursday",
    friday: "Friday",
    saturday: "Saturday",
    sunday: "Sunday",
    closed_day: "Closed",
  },
  de: {
    siteName: "Frisur hier vor Ort",
    heroTitle: "Finden Sie Ihren perfekten Friseursalon in Heidelberg",
    heroSubtitle: "Entdecken Sie top-bewertete Friseure in 69121 Heidelberg, Deutschland",
    searchPlaceholder: "Nach Dienstleistungen oder Salonnamen suchen...",
    searchButton: "Suchen",
    openNow: "Jetzt geöffnet",
    closed: "Geschlossen",
    priceRange: "Preisspanne",
    rating: "Bewertung",
    reviews: "Bewertungen",
    contact: "Kontakt",
    viewOnMap: "Auf Karte anzeigen",
    openingHours: "Öffnungszeiten",
    monday: "Montag",
    tuesday: "Dienstag",
    wednesday: "Mittwoch",
    thursday: "Donnerstag",
    friday: "Freitag",
    saturday: "Samstag",
    sunday: "Sonntag",
    closed_day: "Geschlossen",
  },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[language][key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within LanguageProvider");
  }
  return context;
};
