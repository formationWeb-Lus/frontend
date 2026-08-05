import Link from "next/link";

import {
  Users,
  ShoppingBag,
  DollarSign,
  Search,
  Eye,
} from "lucide-react";



const customers = [

  {
    id:"1",
    name:"Jean Dupont",
    phone:"+243970000000",
    orders:5,
    amount:"250 USD",
    status:"Actif",
  },


  {
    id:"2",
    name:"Sarah Mukendi",
    phone:"+243850000000",
    orders:2,
    amount:"90 USD",
    status:"Actif",
  },


  {
    id:"3",
    name:"David Kalala",
    phone:"+243810000000",
    orders:8,
    amount:"540 USD",
    status:"Actif",
  },

];





export default function CustomersPage(){



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
Clients
</h1>



<p
className="
mt-2
text-slate-500
"
>
Gérez vos clients et suivez leurs achats.
</p>


</div>








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

<Users
className="text-yellow-500"
size={32}
/>


<h2
className="
mt-4
text-3xl
font-bold
"
>
326
</h2>


<p className="text-slate-500">
Clients total
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


<ShoppingBag
className="text-green-600"
size={32}
/>


<h2
className="
mt-4
text-3xl
font-bold
"
>
1248
</h2>


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
className="text-blue-600"
size={32}
/>


<h2
className="
mt-4
text-3xl
font-bold
"
>
12 450 USD
</h2>


<p className="text-slate-500">
Revenus clients
</p>


</div>



</div>









{/* RECHERCHE */}



<div
className="
rounded-2xl
bg-white
p-5
shadow-sm
"
>


<div
className="
flex
items-center
gap-3
"
>


<Search
className="text-slate-400"
/>


<input

placeholder="Rechercher un client..."

className="
w-full
outline-none
"

/>


</div>


</div>









{/* LISTE CLIENTS */}



<section
className="
rounded-3xl
bg-white
p-6
shadow-sm
overflow-x-auto
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

Liste des clients

</h2>





<table className="w-full">


<thead>


<tr
className="
border-b
text-left
text-slate-500
"
>


<th className="pb-4">
Client
</th>


<th>
Téléphone
</th>


<th>
Achats
</th>


<th>
Montant
</th>


<th>
Statut
</th>


<th>
Action
</th>


</tr>


</thead>







<tbody>


{

customers.map((customer)=>(


<tr

key={customer.id}

className="
border-b
hover:bg-slate-50
transition
"

>



<td className="
py-5
font-semibold
text-[#08192D]
">


<Link

href={`/dashboard/customers/${customer.id}`}

className="
hover:text-yellow-500
"

>

{customer.name}

</Link>


</td>







<td>

{customer.phone}

</td>







<td>

{customer.orders}

</td>







<td>

{customer.amount}

</td>







<td>


<span

className="
rounded-full
bg-green-100
px-3
py-1
text-sm
font-semibold
text-green-700
"

>

{customer.status}

</span>


</td>







<td>


<Link

href={`/dashboard/customers/${customer.id}`}

className="
flex
w-fit
items-center
gap-2
rounded-xl
bg-[#08192D]
px-4
py-2
text-sm
font-semibold
text-white
hover:bg-[#102c4e]
"

>


<Eye size={16}/>

Voir


</Link>


</td>






</tr>



))


}



</tbody>


</table>



</section>






</div>


);


}