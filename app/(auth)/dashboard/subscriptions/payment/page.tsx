import SubscriptionPaymentForm from "@/components/payment/SubscriptionPaymentForm";

const plans = {
  starter: {
    name: "Starter",
    priceUSD: 5,
  },

  business: {
    name: "Business",
    priceUSD: 10,
  },

  premium: {
    name: "Premium",
    priceUSD: 25,
  },
};


const exchangeRate = 2230;



interface Props {

  searchParams: Promise<{
    plan?: string;
    currency?: string;
  }>;

}



export default async function SubscriptionPaymentPage({
  searchParams,
}: Props) {


  const params = await searchParams;


  const selectedPlan =
    plans[
      params.plan as keyof typeof plans
    ] || plans.starter;



  const currency =
    params.currency === "CDF"
      ? "CDF"
      : "USD";


const amount =
  currency === "USD"
    ? selectedPlan.priceUSD
    : selectedPlan.priceUSD * exchangeRate;
return (

  <SubscriptionPaymentForm

    plan={selectedPlan.name}

    amount={amount}

    currency={currency}

    exchangeRate={exchangeRate}

    originalPriceUSD={selectedPlan.priceUSD}

  />

)};