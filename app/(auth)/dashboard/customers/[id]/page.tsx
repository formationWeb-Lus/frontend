import {
  User,
  Phone,
  Mail,
  ShoppingBag,
  DollarSign,
  CreditCard,
} from "lucide-react";



interface Props {

  params: Promise<{
    id:string;
  }>;

}




export default async function CustomerDetailPage({
  params,
}:Props){


const {id} = await params;



// Données temporaires
// À remplacer plus tard par Prisma

const customer = {

  id,

  name:"Jean Dupont",

  email:"jean@gmail.com",

  phone:"+243970000000",

  totalOrders:5,

  totalAmount:"250 USD",

  subscription:"Business",

};





const purchases=[

{
 name:"Formation Next.js",
 type:"Numérique",
 amount:"49 USD",
 date:"31/07/2026",
},


{
 name:"Casque Bluetooth",
 type:"Produit physique",
 amount:"120 USD",
 date:"28/07/2026",
},


];





return (

<div className="space-y-8">





{/* HEADER */}


<div>

<h1
className="
text-4xl
font-bold
text-[#08192D]
"
>
Profil client
</h1>


<p
className="
mt-2
text-slate-500
"
>
Détails et historique du client.
</p>


</div>









{/* INFORMATIONS CLIENT */}



<section
className="
rounded-3xl
bg-[#08192D]
p-8
text-white
"
>


<div
className="
flex
flex-col
gap-6
md:flex-row
md:items-center
"
>


<div
className="
flex
h-20
w-20
items-center
justify-center
rounded-full
bg-yellow-400
text-[#08192D]
"
>

<User size={40}/>

</div>





<div>


<h2
className="
text-3xl
font-bold
"
>

{customer.name}

</h2>


<div
className="
mt-3
space-y-2
text-slate-300
"
>


<p className="flex gap-2">

<Mail size={18}/>

{customer.email}

</p>



<p className="flex gap-2">

<Phone size={18}/>

{customer.phone}

</p>


</div>


</div>



</div>


</section>









{/* STATISTIQUES */}


<div
className="
grid
gap-5
md:grid-cols-3
"
>




<div
className="
rounded-2xl
bg-white
p-6
shadow-sm
"
>

<ShoppingBag
className="text-yellow-500"
/>


<h3
className="
mt-4
text-3xl
font-bold
"
>
{customer.totalOrders}
</h3>


<p className="text-slate-500">
Commandes
</p>


</div>







<div
className="
rounded-2xl
bg-white
p-6
shadow-sm
"
>

<DollarSign
className="text-green-600"
/>


<h3
className="
mt-4
text-3xl
font-bold
"
>
{customer.totalAmount}
</h3>


<p className="text-slate-500">
Total payé
</p>


</div>








<div
className="
rounded-2xl
bg-white
p-6
shadow-sm
"
>

<CreditCard
className="text-blue-600"
/>


<h3
className="
mt-4
text-3xl
font-bold
"
>
{customer.subscription}
</h3>


<p className="text-slate-500">
Abonnement
</p>


</div>



</div>









{/* HISTORIQUE ACHATS */}



<section
className="
rounded-3xl
bg-white
p-8
shadow-sm
"
>


<h2
className="
mb-6
text-2xl
font-bold
text-[#08192D]
"
>

Historique des achats

</h2>




<div className="space-y-4">


{
purchases.map((item)=>(


<div
key={item.name}
className="
flex
flex-col
justify-between
gap-3
rounded-xl
border
p-5
md:flex-row
"
>


<div>


<h3 className="font-bold">

{item.name}

</h3>


<p className="text-slate-500">

{item.type}

</p>


</div>





<div className="text-right">


<p className="
font-bold
text-[#08192D]
">

{item.amount}

</p>


<p className="text-sm text-slate-500">

{item.date}

</p>


</div>



</div>


))
}


</div>



</section>






</div>


);


}