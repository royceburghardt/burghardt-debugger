import { useLanguage } from "@/contexts/LanguageContext";
import { Salon } from "@/types/salon";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Phone, MapPin, Clock } from "lucide-react";

interface SalonCardProps {
  salon: Salon;
  onViewMap: (salon: Salon) => void;
}

export const SalonCard = ({ salon, onViewMap }: SalonCardProps) => {
  const { t } = useLanguage();

  const handleContact = () => {
    window.location.href = `tel:${salon.phone}`;
  };

  return (
    <Card className="overflow-hidden shadow-card hover:shadow-card-hover transition-all duration-300">
      <CardHeader className="space-y-2">
        <div className="flex items-start justify-between">
          <h3 className="text-xl font-semibold">{salon.name}</h3>
          <Badge variant={salon.isOpen ? "default" : "secondary"}>
            {salon.isOpen ? t("openNow") : t("closed")}
          </Badge>
        </div>
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-accent text-accent" />
            <span className="font-medium">{salon.rating}</span>
            <span>({salon.reviewCount} {t("reviews")})</span>
          </div>
          <div className="flex items-center gap-1">
            <span className="font-medium">{t("priceRange")}:</span>
            <span>{salon.priceRange}</span>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex items-start gap-2 text-sm">
          <MapPin className="h-4 w-4 text-muted-foreground mt-0.5 shrink-0" />
          <span>{salon.address}</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span>{t("openingHours")}</span>
          </div>
          <div className="grid gap-1 text-sm pl-6">
            {salon.openingHours.slice(0, 3).map((schedule) => (
              <div key={schedule.day} className="flex justify-between">
                <span className="text-muted-foreground capitalize">
                  {t(schedule.day)}:
                </span>
                <span>
                  {schedule.hours === "closed_day" ? t("closed_day") : schedule.hours}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {salon.specialties.map((specialty) => (
            <Badge key={specialty} variant="secondary">
              {specialty}
            </Badge>
          ))}
        </div>
      </CardContent>

      <CardFooter className="flex gap-2">
        <Button onClick={handleContact} className="flex-1">
          <Phone className="h-4 w-4" />
          {t("contact")}
        </Button>
        <Button variant="outline" onClick={() => onViewMap(salon)} className="flex-1">
          <MapPin className="h-4 w-4" />
          {t("viewOnMap")}
        </Button>
      </CardFooter>
    </Card>
  );
};
