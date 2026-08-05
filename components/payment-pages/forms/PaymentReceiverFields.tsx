"use client";

import {
  Smartphone,
  CreditCard
} from "lucide-react";


export default function PaymentReceiverFields() {


return (

<div className="space-y-6">


<h3 className="
text-xl
font-bold
text-[#08192D]
">
Recevoir les paiements
</h3>



<p className="text-slate-500">
Ajoutez vos comptes Mobile Money et carte bancaire.
</p>





{/* Airtel Money */}

<div>

<label className="block mb-2 font-semibold">
Airtel Money
</label>

<input

type="text"

placeholder="243970000000"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>

</div>






{/* Orange Money */}

<div>

<label className="block mb-2 font-semibold">
Orange Money
</label>


<input

type="text"

placeholder="243850000000"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>

</div>






{/* Vodacom */}

<div>

<label className="block mb-2 font-semibold">
Vodacom M-Pesa
</label>


<input

type="text"

placeholder="243810000000"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>

</div>







{/* Afrimoney */}

<div>

<label className="block mb-2 font-semibold">
Afrimoney
</label>


<input

type="text"

placeholder="243990000000"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>

</div>








{/* VISA */}


<div>

<label className="flex items-center gap-2 mb-2 font-semibold">

<CreditCard size={18}/>

Visa / Mastercard

</label>


<input

type="text"

placeholder="Email Stripe / compte bancaire"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>

</div>






</div>


);


}