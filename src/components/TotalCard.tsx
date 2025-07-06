import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils"

interface ComponentProps {
  amount: number;
}

export default function TotalCard({ amount }: ComponentProps) {
  const router = useIonRouter();

  return (
    <div className="heading heading--blue heading--compact">
      <div>
        <h5 className="mb-4 text-green-300 text-xl">
          AdelanttoCash® total
        </h5>
        <p className="font-bold text-3xl">{formatCurrency(amount)}</p>
      </div>
    </div>
  )
}