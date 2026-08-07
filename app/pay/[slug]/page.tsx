"use client";

import {
  FormEvent,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useParams } from "next/navigation";

import {
  AlertCircle,
  ArrowLeft,
  CheckCircle2,
  CreditCard,
  Loader2,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from "lucide-react";


// =====================================================
// CONFIG API
// =====================================================

const API_URL =
  process.env.NEXT_PUBLIC_API_URL ||
  "http://localhost:5000/api";


// =====================================================
// TYPES
// =====================================================

type ProductFieldType =
  | "TEXT"
  | "TEXTAREA"
  | "NUMBER"
  | "PHONE"
  | "EMAIL"
  | "DATE"
  | "SELECT"
  | "IMAGE"
  | "FILE"
  | "BOOLEAN";


interface ProductField {
  id: number;

  name: string;

  label: string;

  type: ProductFieldType | string;

  value?: string | null;

  required: boolean;
}


interface Product {

  id: number;

  userId?: number;

  name: string;

  subtitle?: string | null;

  description?: string | null;

  type: string;

  price: number;

  currency: string;

  imageUrl?: string | null;

  status?: string;

  createdAt?: string;

  fields?: ProductField[];
}



interface PaymentPage {

  id:number;

  title:string;

  slug:string;

  description?:string|null;

  active:boolean;

  createdAt?:string;
}



// Réponse réelle API backend
// GET /public/payment-pages/:slug

interface PublicPaymentApiResponse {

  success:boolean;

  paymentPage:PaymentPage;

  totalProducts:number;

  products:Product[];

  message?:string;
}



// Format utilisé dans le composant

interface PublicPaymentResponse {

  success:boolean;

  paymentPage:PaymentPage;

  product:Product;

  instructor:null;

  company:null;

  message?:string;
}



type Telecom =
  | "AM"
  | "OM"
  | "MP"
  | "AF";



// =====================================================
// HELPERS
// =====================================================


function formatPrice(
  price:number,
  currency:string
){

  return (
    new Intl.NumberFormat(
      "fr-FR",
      {
        maximumFractionDigits:2,
      }
    ).format(price)
    +
    ` ${currency}`
  );

}



function formatProductType(
  type:string
){

 const types:Record<string,string>={

  PHYSICAL:"Produit physique",

  DIGITAL:"Produit numérique",

  COURSE:"Formation",

  SERVICE:"Service",

  SCHOOL:"École",

  SUBSCRIPTION:"Abonnement",

 };


 return types[type] || type;

}




function getFieldType(
 type:string
):ProductFieldType{


 const supported:ProductFieldType[]=[

 "TEXT",
 "TEXTAREA",
 "NUMBER",
 "PHONE",
 "EMAIL",
 "DATE",
 "SELECT",
 "IMAGE",
 "FILE",
 "BOOLEAN",

 ];


 if(
  supported.includes(
    type as ProductFieldType
  )
 ){

  return type as ProductFieldType;

 }


 return "TEXT";

}




// =====================================================
// PAGE
// =====================================================


export default function PublicPaymentPage(){


const params = useParams();


// =====================================================
// SLUG
// =====================================================


const rawSlug = params?.slug;


const slug = useMemo(()=>{


 if(
  Array.isArray(rawSlug)
 ){

  return rawSlug[0];

 }


 if(
  typeof rawSlug==="string" &&
  rawSlug.trim()
 ){

  return rawSlug;

 }


 return undefined;


},[rawSlug]);



// =====================================================
// STATES
// =====================================================


const [
 data,
 setData
] =
useState<PublicPaymentResponse|null>(null);



const [
 loading,
 setLoading
]
=
useState(true);



const [
 error,
 setError
]
=
useState<string|null>(null);



const [
 formValues,
 setFormValues
]
=
useState<
Record<string,string|boolean>
>({});



const [
 telecom,
 setTelecom
]
=
useState<Telecom|"">("");



const [
 phone,
 setPhone
]
=
useState("");



const [
 paying,
 setPaying
]
=
useState(false);



const [
 paymentMessage,
 setPaymentMessage
]
=
useState<string|null>(null);



const [
 paymentSuccess,
 setPaymentSuccess
]
=
useState(false);


// =====================================================
// CHARGER LA PAGE PUBLIQUE
// =====================================================

useEffect(() => {

  if (!slug) {

    setLoading(false);

    setError(
      "Le lien de paiement est invalide."
    );

    return;

  }


  let cancelled = false;



  async function loadPage(){


    try {


      setLoading(true);

      setError(null);


const encodedSlug =
  encodeURIComponent(slug ?? "");


const url =
  `${API_URL}/public/payment-pages/${encodedSlug}`;


console.log(
  "🔎 URL PAGE PUBLIQUE :",
  url
);


      const response =
        await fetch(
          url,
          {
            method:"GET",
            cache:"no-store",
          }
        );



      let responseData:unknown = null;



      try {

        responseData =
          await response.json();

      } catch {

        responseData = null;

      }




      console.log(
        "📦 PAGE PUBLIQUE :",
        responseData
      );





      if(!response.ok){


        const message =
          typeof responseData === "object" &&
          responseData !== null &&
          "message" in responseData
            ? String(
                (
                  responseData as {
                    message?:string
                  }
                ).message
              )
            : 
              "Cette page de paiement est indisponible.";



        throw new Error(message);

      }




      if(
        !responseData ||
        typeof responseData !== "object"
      ){

        throw new Error(
          "Réponse serveur invalide."
        );

      }





      const apiData =
        responseData as PublicPaymentApiResponse;




      if(!apiData.success){


        throw new Error(
          apiData.message ||
          "Cette page de paiement est indisponible."
        );


      }





      // ================================
      // RÉCUPÉRATION DU PRODUIT
      // ================================


      const product =
        apiData.products?.[0];



      if(!product){


        throw new Error(
          "Le produit associé à cette page est introuvable."
        );


      }





      if(cancelled){

        return;

      }





      // ================================
      // ADAPTATION API -> FRONTEND
      // ================================


      const publicData:
        PublicPaymentResponse =
      {


        success:
          apiData.success,


        paymentPage:
          apiData.paymentPage,


        product,


        instructor:
          null,


        company:
          null,


        message:
          apiData.message,


      };





      setData(publicData);





      // ================================
      // INITIALISER CHAMPS FORMULAIRE
      // ================================


      const fields =
        Array.isArray(product.fields)
          ? product.fields
          : [];



      const initialValues:
        Record<string,string|boolean>
      = {};




      fields.forEach(
        (field)=>{


          if(
            field.type === "BOOLEAN"
          ){

            initialValues[field.name] =
              false;

          }
          else{


            initialValues[field.name] =
              field.value || "";


          }


        }
      );




      setFormValues(
        initialValues
      );




    }
    catch(err:unknown){


      if(cancelled){

        return;

      }



      console.error(
        "❌ PUBLIC PAYMENT PAGE ERROR :",
        err
      );



      setError(
        err instanceof Error
          ? err.message
          : "Impossible de charger cette page."
      );



    }
    finally{


      if(!cancelled){

        setLoading(false);

      }


    }


  }




  loadPage();



  return ()=>{

    cancelled = true;

  };


},[slug]);




// =====================================================
// PRODUIT ACTUEL
// =====================================================


const product =
  data?.product ?? null;



// =====================================================
// CHAMPS PRODUIT
// =====================================================


const productFields =
  Array.isArray(product?.fields)
    ? product.fields
    : [];



const hasFields =
  productFields.length > 0;



// =====================================================
// UPDATE CHAMP
// =====================================================


function updateField(
  fieldName:string,
  value:string|boolean
){

  setFormValues(
    previous=>({

      ...previous,

      [fieldName]:
        value,

    })
  );

}





// =====================================================
// VALIDATION CHAMPS
// =====================================================


function validateFields(){


 for(
  const field of productFields
 ){


  if(!field.required){

    continue;

  }



  const value =
    formValues[field.name];



  if(
    value === undefined ||
    value === null ||
    value === "" ||
    value === false
  ){

    return (
      `Veuillez remplir le champ "${field.label}".`
    );


  }


 }



 return null;


}





// =====================================================
// TELEPHONE RDC
// =====================================================


function normalizePhone(
 value:string
){


 let cleaned =
 value.replace(/\D/g,"");



 if(
  cleaned.startsWith("00")
 ){

  cleaned =
   cleaned.substring(2);

 }



 if(
  cleaned.startsWith("0")
 ){

  cleaned =
   "243" +
   cleaned.substring(1);

 }



 if(
  cleaned.length===9
 ){

  cleaned =
   "243"+cleaned;

 }



 return cleaned;


}

// =====================================================
// PAIEMENT
// =====================================================

async function handlePayment(
  event: FormEvent
) {

  event.preventDefault();


  if(!product){

    setPaymentMessage(
      "Produit introuvable."
    );

    return;

  }



  setPaymentMessage(null);

  setPaymentSuccess(false);



  const fieldsError =
    validateFields();



  if(fieldsError){

    setPaymentMessage(
      fieldsError
    );

    return;

  }




  if(!telecom){

    setPaymentMessage(
      "Veuillez sélectionner un moyen de paiement."
    );

    return;

  }




  const normalizedPhone =
    normalizePhone(phone);



  if(
    normalizedPhone.length !== 12 ||
    !normalizedPhone.startsWith("243")
  ){

    setPaymentMessage(
      "Numéro Mobile Money invalide. Exemple : 243812345678."
    );

    return;

  }





  try {


    setPaying(true);




    const payload = {


      productId:
        product.id,


      paymentPageId:
        data?.paymentPage.id ?? null,


      amount:
        product.price,


      currency:
        product.currency,


      phone:
        normalizedPhone,


      telecom,



      customer:{


        name:
          typeof formValues.name === "string"
            ? formValues.name
            : null,


        email:
          typeof formValues.email === "string"
            ? formValues.email
            : null,


        phone:
          normalizedPhone,


      },



      fields:
        formValues,


    };




    console.log(
      "💳 PAYMENT PAYLOAD",
      payload
    );





    const response =
      await fetch(
        `${API_URL}/public/payments`,
        {

          method:"POST",

          headers:{
            "Content-Type":
              "application/json",
          },

          body:
            JSON.stringify(payload),

        }
      );





    let result:any = null;



    try {

      result =
        await response.json();

    }catch{

      result=null;

    }





    console.log(
      "📦 PAYMENT RESPONSE",
      result
    );





    if(!response.ok){


      throw new Error(
        result?.message ||
        "Impossible d'effectuer le paiement."
      );


    }




    setPaymentSuccess(true);


    setPaymentMessage(
      "Votre demande de paiement a été envoyée avec succès."
    );



  }

  catch(error:unknown){


    console.error(
      "❌ PAYMENT ERROR",
      error
    );



    setPaymentSuccess(false);



    setPaymentMessage(
      error instanceof Error
        ? error.message
        : "Erreur pendant le paiement."
    );

  }


  finally{


    setPaying(false);


  }


}





// =====================================================
// LOADING
// =====================================================


if(loading){

 return (

  <main className="min-h-screen bg-slate-100 flex items-center justify-center">

    <div className="text-center">

      <Loader2
        className="mx-auto animate-spin"
        size={40}
      />

      <p className="mt-4 text-slate-500">
        Chargement de la page de paiement...
      </p>

    </div>

  </main>

 );

}




// =====================================================
// ERREUR
// =====================================================


if(
 error ||
 !data ||
 !product
){

 return (

  <main className="min-h-screen bg-slate-100 flex items-center justify-center">

    <div className="rounded-3xl bg-white p-8 text-center shadow">

      <AlertCircle
        className="mx-auto text-red-500"
        size={40}
      />


      <h1 className="mt-4 text-2xl font-bold">
        Page indisponible
      </h1>


      <p className="mt-3 text-slate-500">
        {error}
      </p>



      <button

        onClick={() =>
          window.history.back()
        }

        className="mt-6 rounded-xl bg-[#08192D] px-5 py-3 text-white"

      >

        <ArrowLeft
          size={18}
          className="inline mr-2"
        />

        Retour

      </button>


    </div>

  </main>

 );

}





// =====================================================
// AFFICHAGE
// =====================================================


return (

<main className="min-h-screen bg-slate-100">


<header className="bg-white border-b">

<div className="mx-auto max-w-6xl px-5 py-5">

<h1 className="text-xl font-bold text-[#08192D]">

{data.paymentPage.title}

</h1>


</div>

</header>





<div className="mx-auto max-w-6xl px-5 py-10">


<div className="grid gap-8 lg:grid-cols-2">





{/* ================= PRODUIT ================= */}


<section>


<div className="rounded-3xl bg-white p-6 shadow">


<h2 className="text-3xl font-bold text-[#08192D]">

{product.name}

</h2>



{product.description && (

<p className="mt-4 text-slate-600">

{product.description}

</p>

)}



<div className="mt-6 text-4xl font-bold">

{formatPrice(
 product.price,
 product.currency
)}

</div>



</div>


</section>





{/* ================= PAIEMENT ================= */}


<section>


<form

onSubmit={handlePayment}

className="rounded-3xl bg-white p-6 shadow"

>


<h2 className="text-xl font-bold">

Paiement

</h2>





<div className="mt-5 grid grid-cols-2 gap-3">


{[
["AM","Airtel Money"],
["OM","Orange Money"],
["MP","M-Pesa"],
["AF","Afrimoney"]

].map(([code,label])=>(


<button

key={code}

type="button"

onClick={() =>
 setTelecom(code as Telecom)
}

className={`
rounded-xl border p-4 font-bold
${
telecom===code
?
"bg-[#08192D] text-white"
:
"bg-white"
}
`}

>

{label}

</button>


))}


</div>






<div className="mt-6">


<label className="font-semibold">

Numéro Mobile Money

</label>


<input

type="tel"

value={phone}

onChange={(e)=>
 setPhone(e.target.value)
}

placeholder="243812345678"

className="mt-2 w-full rounded-xl border px-4 py-3"

/>


</div>





{paymentMessage && (

<div

className={`
mt-5 rounded-xl p-4
${
paymentSuccess
?
"bg-green-100 text-green-700"
:
"bg-red-100 text-red-700"
}
`}

>

{paymentMessage}

</div>

)}





<button

disabled={paying}

className="mt-6 flex w-full justify-center gap-3 rounded-xl bg-[#08192D] px-6 py-4 font-bold text-white"

>


{paying
?
<>

<Loader2
className="animate-spin"
/>

Traitement...

</>

:

<>

<CreditCard/>

Payer maintenant

</>

}



</button>





<div className="mt-5 flex justify-center gap-2 text-sm text-slate-400">


<ShieldCheck size={18}/>

Paiement sécurisé


</div>



</form>


</section>




</div>


</div>


</main>

);

}