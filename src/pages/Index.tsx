import { useState } from "react";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { SalonCard } from "@/components/SalonCard";
import { Map } from "@/components/Map";
import { salons } from "@/data/salons";
import { Salon } from "@/types/salon";

const Index = () => {
  const [selectedSalon, setSelectedSalon] = useState<Salon | null>(null);

  const handleViewMap = (salon: Salon) => {
    setSelectedSalon(salon);
    document.getElementById("map-section")?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <Hero />

      <section className="container py-12 md:py-16">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Hair Salons in Heidelberg 69121</h2>
          <p className="text-muted-foreground">
            {salons.length} professional hair salons available
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2 mb-12">
          {salons.map((salon) => (
            <SalonCard key={salon.id} salon={salon} onViewMap={handleViewMap} />
          ))}
        </div>

        <div id="map-section" className="mt-12">
          <h2 className="text-3xl font-bold mb-6">Map View</h2>
          <Map salons={salons} selectedSalon={selectedSalon} />
        </div>
      </section>

      <footer className="border-t py-8 mt-16">
        <div className="container text-center text-muted-foreground">
          <p>&copy; 2024 Hair Dresser Close to Me. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
