"use client";

import {
  ArrowDownLeft,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Search,
  Smartphone,
} from "lucide-react";

import {
  useEffect,
  useState,
} from "react";


interface Transaction {

  id:number;

  reference:string;

  customer:string;

  amount:number;

  currency:string;

  method:string;

  status:string;

  createdAt:string;

}



export default function TransactionsPage() {


  const [transactions,setTransactions] =
    useState<Transaction[]>([]);


  const [loading,setLoading] =
    useState(true);


  const [search,setSearch] =
    useState("");



  /**
   * CHARGEMENT TRANSACTIONS
   */
  useEffect(()=>{


    async function loadTransactions(){


      try {


        const token =
          localStorage.getItem("token");


        const response =
          await fetch(
            "http://localhost:5000/api/payment/transactions",
            {
              headers:{
                Authorization:
                  `Bearer ${token}`
              }
            }
          );


        const data =
          await response.json();



        if(data.success){

          setTransactions(
            data.transactions
          );

        }



      }catch(error){

        console.error(
          "TRANSACTIONS ERROR",
          error
        );


      }finally{

        setLoading(false);

      }


    }


    loadTransactions();


  },[]);





  const filteredTransactions =
    transactions.filter(
      (transaction)=>

        transaction.customer
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )
        ||

        transaction.reference
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          )

    );




  const total =
    transactions.reduce(
      (sum,item)=>
        sum + item.amount,
      0
    );



  const successCount =
    transactions.filter(
      item =>
        item.status === "SUCCESS"
    ).length;



  const pendingCount =
    transactions.filter(
      item =>
        item.status === "PENDING"
    ).length;



  if(loading){

    return (
      <div className="p-10 text-slate-500">
        Chargement des transactions...
      </div>
    );

  }





return (

<div className="space-y-8">



{/* HEADER */}

<div
className="
flex
flex-col
justify-between
gap-4
md:flex-row
md:items-center
"
>


<div>

<h1
className="
text-4xl
font-bold
text-[#08192D]
"
>
Transactions
</h1>


<p className="mt-2 text-slate-500">
Suivez tous vos paiements et opérations financières.
</p>


</div>



<div
className="
flex
items-center
gap-3
rounded-xl
bg-white
px-4
py-3
shadow-sm
"
>


<Search
size={20}
className="text-slate-400"
/>


<input

value={search}

onChange={(e)=>
setSearch(e.target.value)
}

placeholder="Rechercher..."

className="
outline-none
text-sm
"

/>


</div>



</div>







{/* STATISTIQUES */}

<section
className="
grid
gap-5
sm:grid-cols-2
lg:grid-cols-4
"
>



<div className="rounded-2xl bg-white p-6 shadow-sm">

<DollarSign
size={30}
className="text-green-600"
/>


<h2
className="
mt-4
text-3xl
font-bold
text-[#08192D]
"
>

{total} USD

</h2>


<p className="text-slate-500">
Revenus totaux
</p>

</div>





<div className="rounded-2xl bg-white p-6 shadow-sm">

<CreditCard
size={30}
className="text-blue-600"
/>


<h2
className="
mt-4
text-3xl
font-bold
text-[#08192D]
"
>

{transactions.length}

</h2>


<p className="text-slate-500">
Transactions
</p>


</div>





<div className="rounded-2xl bg-white p-6 shadow-sm">

<CheckCircle
size={30}
className="text-green-600"
/>


<h2
className="
mt-4
text-3xl
font-bold
text-[#08192D]
"
>

{successCount}

</h2>


<p className="text-slate-500">
Réussies
</p>


</div>





<div className="rounded-2xl bg-white p-6 shadow-sm">


<Clock
size={30}
className="text-yellow-500"
/>


<h2
className="
mt-4
text-3xl
font-bold
text-[#08192D]
"
>

{pendingCount}

</h2>


<p className="text-slate-500">
En attente
</p>


</div>



</section>







{/* TABLE */}


<section
className="
rounded-3xl
bg-white
p-6
shadow-sm
"
>



<div className="
mb-6
flex
items-center
gap-3
">

<ArrowDownLeft
className="text-yellow-500"
/>


<h2
className="
text-2xl
font-bold
text-[#08192D]
"
>
Historique des transactions
</h2>


</div>





<div className="overflow-x-auto">


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
Référence
</th>

<th className="pb-4">
Client
</th>

<th className="pb-4">
Montant
</th>

<th className="pb-4">
Méthode
</th>

<th className="pb-4">
Statut
</th>

<th className="pb-4">
Date
</th>


</tr>

</thead>



<tbody>


{
filteredTransactions.map(
(transaction)=>(


<tr
key={transaction.id}
className="
border-b
last:border-none
"
>


<td className="
py-5
font-semibold
text-[#08192D]
">

{transaction.reference}

</td>



<td>
{transaction.customer}
</td>



<td className="font-bold">

{transaction.amount}
{" "}
{transaction.currency}

</td>



<td>

<div className="
flex
items-center
gap-2
">

<Smartphone
size={18}
className="text-yellow-500"
/>


{transaction.method}


</div>

</td>




<td>


<span
className={`
rounded-full
px-3
py-1
text-sm
font-semibold

${
transaction.status==="SUCCESS"

?
"bg-green-100 text-green-700"

:

transaction.status==="PENDING"

?
"bg-yellow-100 text-yellow-700"

:

"bg-red-100 text-red-700"

}
`}
>

{
transaction.status==="SUCCESS"
?
"Réussi"

:

transaction.status==="PENDING"
?
"En attente"

:
"Échec"

}


</span>


</td>




<td>

{
new Date(
transaction.createdAt
).toLocaleDateString(
"fr-FR"
)
}

</td>



</tr>


)

)

}



</tbody>


</table>


</div>



</section>



</div>

);


}