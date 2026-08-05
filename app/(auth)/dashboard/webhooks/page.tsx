import {
  Webhook,
  Plus,
  CheckCircle,
  XCircle,
  Clock,
} from "lucide-react";



const webhooks = [

  {
    id:1,
    url:"https://monsite.com/api/webhooks/payment",
    event:"payment.success",
    status:"Actif",
  },


  {
    id:2,
    url:"https://monsite.com/api/webhooks/serdipay",
    event:"payment.failed",
    status:"Actif",
  },


];





const events=[

{
name:"Payment Success",
status:"success",
date:"31/07/2026 15:20",
transaction:"SERDMG7MW6ZV"
},


{
name:"Payment Failed",
status:"failed",
date:"31/07/2026 14:10",
transaction:"SERDMG8AB21"
},


];





export default function WebhooksPage(){


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
Webhooks
</h1>



<p
className="
mt-2
text-slate-500
"
>
Gérez les notifications automatiques de paiement.
</p>


</div>





<button

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-[#08192D]
px-6
py-3
font-bold
text-white
hover:bg-[#102c4e]
"

>


<Plus size={20}/>

Ajouter un webhook


</button>



</div>









{/* WEBHOOKS CONFIGURES */}



<section
className="
rounded-3xl
bg-white
p-8
shadow-sm
"
>


<div
className="
flex
items-center
gap-3
mb-6
"
>


<Webhook
className="text-yellow-500"
/>


<h2
className="
text-2xl
font-bold
text-[#08192D]
"
>

Webhooks configurés

</h2>


</div>







<div className="space-y-5">


{

webhooks.map((item)=>(


<div

key={item.id}

className="
rounded-2xl
border
p-5
"

>


<div className="
flex
flex-col
gap-3
md:flex-row
md:justify-between
"
>



<div>


<h3
className="
font-bold
text-[#08192D]
"
>

{item.event}

</h3>



<p
className="
text-sm
text-slate-500
"
>

{item.url}

</p>


</div>





<span
className="
w-fit
rounded-full
bg-green-100
px-3
py-1
text-sm
font-semibold
text-green-700
"
>

{item.status}

</span>



</div>


</div>


))


}



</div>


</section>









{/* HISTORIQUE EVENEMENTS */}



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

Derniers événements

</h2>





<div className="space-y-4">


{

events.map((event)=>(


<div

key={event.transaction}

className="
flex
flex-col
gap-4
rounded-xl
border
p-5
md:flex-row
md:items-center
md:justify-between
"

>


<div
className="
flex
items-center
gap-3
"
>


{

event.status==="success"

?

<CheckCircle
className="text-green-600"
/>

:

<XCircle
className="text-red-600"
/>

}



<div>

<h3 className="font-bold">

{event.name}

</h3>


<p className="text-sm text-slate-500">

{event.transaction}

</p>


</div>


</div>





<div
className="
flex
items-center
gap-2
text-sm
text-slate-500
"
>


<Clock size={16}/>

{event.date}


</div>




</div>



))


}



</div>



</section>







</div>


);


}