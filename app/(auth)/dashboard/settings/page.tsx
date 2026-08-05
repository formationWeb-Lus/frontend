import {
  User,
  Lock,
  CreditCard,
  Bell,
  Globe,
  Save,
} from "lucide-react";



export default function SettingsPage(){


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
Paramètres
</h1>


<p
className="
mt-2
text-slate-500
"
>
Gérez votre compte et les préférences de votre plateforme.
</p>


</div>







{/* PROFIL */}


<section
className="
rounded-3xl
bg-white
p-8
shadow-sm
"
>


<div className="
flex
items-center
gap-3
mb-6
">


<User
className="text-yellow-500"
/>


<h2
className="
text-2xl
font-bold
text-[#08192D]
"
>
Informations du profil
</h2>


</div>





<div className="
grid
gap-5
md:grid-cols-2
">


<div>

<label className="block mb-2 font-semibold">
Nom complet
</label>

<input

type="text"

placeholder="Jean Dupont"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>

</div>





<div>

<label className="block mb-2 font-semibold">
Email
</label>


<input

type="email"

placeholder="email@gmail.com"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>

</div>





<div>

<label className="block mb-2 font-semibold">
Téléphone
</label>


<input

type="text"

placeholder="+243970000000"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>

</div>





<div>

<label className="block mb-2 font-semibold">
Nom entreprise
</label>


<input

type="text"

placeholder="Mon entreprise"

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


</section>










{/* SECURITE */}


<section
className="
rounded-3xl
bg-white
p-8
shadow-sm
"
>


<div className="
flex
items-center
gap-3
mb-6
">


<Lock
className="text-red-500"
/>


<h2
className="
text-2xl
font-bold
text-[#08192D]
"
>
Sécurité
</h2>


</div>





<div>

<label className="block mb-2 font-semibold">
Nouveau mot de passe
</label>


<input

type="password"

placeholder="********"

className="
w-full
rounded-xl
border
px-4
py-3
"

/>


</div>



</section>









{/* MOYENS DE PAIEMENT */}


<section
className="
rounded-3xl
bg-white
p-8
shadow-sm
"
>


<div className="
flex
items-center
gap-3
mb-6
">


<CreditCard
className="text-blue-500"
/>


<h2
className="
text-2xl
font-bold
text-[#08192D]
"
>
Paiements reçus
</h2>


</div>





<p className="text-slate-500 mb-5">

Configurez les comptes où vous recevez vos paiements.

</p>





<div className="
grid
gap-5
md:grid-cols-2
">


<input

placeholder="Airtel Money"

className="
rounded-xl
border
px-4
py-3
"

/>


<input

placeholder="Orange Money"

className="
rounded-xl
border
px-4
py-3
"

/>


<input

placeholder="Vodacom M-Pesa"

className="
rounded-xl
border
px-4
py-3
"

/>


<input

placeholder="Afrimoney"

className="
rounded-xl
border
px-4
py-3
"

/>


<input

placeholder="Visa / Mastercard"

className="
rounded-xl
border
px-4
py-3
"

/>


</div>



</section>









{/* NOTIFICATIONS */}


<section
className="
rounded-3xl
bg-white
p-8
shadow-sm
"
>


<div className="
flex
items-center
gap-3
"
>


<Bell
className="text-yellow-500"
/>


<h2
className="
text-2xl
font-bold
text-[#08192D]
"
>
Notifications
</h2>


</div>



<div className="mt-5 space-y-4">


<label className="flex gap-3">

<input type="checkbox" defaultChecked/>

Recevoir les notifications de paiement


</label>



<label className="flex gap-3">

<input type="checkbox"/>

Recevoir les rapports mensuels


</label>



</div>



</section>









{/* DEVISE */}


<section
className="
rounded-3xl
bg-white
p-8
shadow-sm
"
>


<div className="
flex
items-center
gap-3
"
>


<Globe
className="text-green-600"
/>


<h2
className="
text-2xl
font-bold
text-[#08192D]
"
>
Préférences
</h2>


</div>





<select

className="
mt-5
rounded-xl
border
px-4
py-3
"

>


<option>
USD Dollar
</option>


<option>
CDF Franc Congolais
</option>


</select>



</section>









{/* SAUVEGARDER */}


<button

className="
flex
items-center
justify-center
gap-2
rounded-xl
bg-[#08192D]
px-8
py-4
font-bold
text-white
hover:bg-[#102c4e]
"

>

<Save size={20}/>

Enregistrer les modifications


</button>






</div>


);


}