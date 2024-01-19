import { useIonRouter } from "@ionic/react";
import { formatCurrency } from "@adelantto/utils"

export default function TotalCard({ amount, url }) {
  const router = useIonRouter();
  const showMore = () => router.push(url)

  return (
    <div className="heading heading--blue heading--compact">
      <div>
        <h5 className="text-xl mb-4 text-green-300">
          Adelantto total
        </h5>
        <p className="text-3xl font-bold">{formatCurrency(amount)}</p>
      </div>
    </div>
  )
}