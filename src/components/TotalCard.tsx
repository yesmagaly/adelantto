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
        <h5 className="mb-4 text-xl text-green-300">
          AdelanttoCash® total
        </h5>
        <p className="text-3xl font-bold">{formatCurrency(amount)}</p>
      </div>
    </div>
  )
}