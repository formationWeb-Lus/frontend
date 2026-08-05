"use client";

import {
  Package,
  FileText,
  GraduationCap,
  Briefcase,
  Crown,
  Check,
} from "lucide-react";



interface Props {

  value?: string;

  onChange?: (type:string)=>void;

}




const paymentTypes = [

  {
    id:"physical",

    name:"Produit physique",

    description:
      "Vendez des produits avec livraison.",

    icon:Package,
  },



  {
    id:"digital",

    name:"Produit numérique",

    description:
      "Vendez des fichiers, ebooks, logiciels.",

    icon:FileText,
  },



  {
    id:"course",

    name:"Formation en ligne",

    description:
      "Créez et vendez des cours.",

    icon:GraduationCap,
  },



  {
    id:"service",

    name:"Service",

    description:
      "Vendez vos prestations en ligne.",

    icon:Briefcase,
  },



  {
    id:"subscription",

    name:"Abonnement",

    description:
      "Créez un accès récurrent mensuel.",

    icon:Crown,
  },

];







export default function PaymentTypeSelector({

  value,

  onChange,

}:Props){



return (


<div className="space-y-5">





<h2

className="
text-2xl
font-bold
text-[#08192D]
"

>

Type de paiement

</h2>





<p

className="
text-slate-500
"

>

Choisissez ce que vous souhaitez vendre.

</p>








<div

className="
grid
gap-5
md:grid-cols-2
"

>


{

paymentTypes.map((item)=>{


const Icon=item.icon;


const selected=value===item.id;



return (


<button


type="button"


key={item.id}


onClick={()=>onChange?.(item.id)}


className={`

relative

rounded-2xl

border

p-6

text-left

transition


${

selected

?

"border-yellow-400 bg-yellow-50 shadow-md"

:

"border-slate-200 bg-white hover:border-yellow-300"

}


`}



>





{

selected && (

<div

className="
absolute
right-4
top-4
rounded-full
bg-yellow-400
p-1
"

>

<Check

size={16}

className="text-[#08192D]"

/>


</div>


)

}





<Icon

size={35}

className={

selected

?

"text-yellow-500"

:

"text-slate-500"

}


/>







<h3

className="
mt-4
text-lg
font-bold
text-[#08192D]
"

>

{item.name}

</h3>





<p

className="
mt-2
text-sm
text-slate-500
"

>

{item.description}

</p>







</button>



)


})

}



</div>







</div>


);


}