import { Button } from '@/components/ui/button';

interface PricingDetailsProps {
  price: {
    monthly: number;
    yearly: number;
    shortTerm: number;
  };
  onBookNow: () => void;
  onScheduleVisit: () => void;
}

export function PricingDetails({
  price,
  onBookNow,
  onScheduleVisit,
}: PricingDetailsProps) {
  return (
    <div className="bg-card rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-foreground mb-4">Pricing</h2>

      <div className="space-y-4">
        <div className="flex justify-between items-center pb-2 border-b border-border">
          <div>
            <p className="font-medium">Monthly Rent</p>
            <p className="text-sm text-muted-foreground">Long-term rental</p>
          </div>
          <p className="text-xl font-bold">K{price.monthly.toLocaleString()}</p>
        </div>

        <div className="flex justify-between items-center pb-2 border-b border-border">
          <div>
            <p className="font-medium">Yearly Rent</p>
            <p className="text-sm text-muted-foreground">1 month free</p>
          </div>
          <p className="text-xl font-bold">K{price.yearly.toLocaleString()}</p>
        </div>

        <div className="flex justify-between items-center">
          <div>
            <p className="font-medium">Short-term</p>
            <p className="text-sm text-muted-foreground">Per day</p>
          </div>
          <p className="text-xl font-bold">
            K{price.shortTerm.toLocaleString()}
          </p>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-2">
        <Button onClick={onBookNow} className="flex-1">
          Book Now
        </Button>
        <Button variant="outline" onClick={onScheduleVisit} className="flex-1">
          Schedule Visit
        </Button>
      </div>
    </div>
  );
}
