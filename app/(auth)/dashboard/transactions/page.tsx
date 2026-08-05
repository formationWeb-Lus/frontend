import {
  ArrowDownLeft,
  CheckCircle,
  Clock,
  CreditCard,
  DollarSign,
  Search,
  Smartphone,
} from "lucide-react";


const transactions = [
  {
    id: "TRX-001",
    customer: "Jean Dupont",
    amount: "120 USD",
    method: "Orange Money",
    status: "Réussi",
    date: "01 Août 2026",
  },

  {
    id: "TRX-002",
    customer: "Sarah Mukendi",
    amount: "45 USD",
    method: "Vodacom M-Pesa",
    status: "En attente",
    date: "01 Août 2026",
  },

  {
    id: "TRX-003",
    customer: "David Kalala",
    amount: "250 USD",
    method: "Visa",
    status: "Réussi",
    date: "31 Juillet 2026",
  },

  {
    id: "TRX-004",
    customer: "Marie Joseph",
    amount: "75 USD",
    method: "Airtel Money",
    status: "Échec",
    date: "30 Juillet 2026",
  },
];



export default function TransactionsPage() {


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


          <p
            className="
              mt-2
              text-slate-500
            "
          >
            Suivez tous vos paiements et opérations financières.
          </p>

        </div>


        {/* Recherche */}

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
            className="text-green-600"
            size={30}
          />

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              text-[#08192D]
            "
          >
            12 450 USD
          </h2>

          <p className="text-slate-500">
            Revenus totaux
          </p>

        </div>





        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <CreditCard
            className="text-blue-600"
            size={30}
          />

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              text-[#08192D]
            "
          >
            1 248
          </h2>

          <p className="text-slate-500">
            Transactions
          </p>

        </div>





        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <CheckCircle
            className="text-green-600"
            size={30}
          />

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              text-[#08192D]
            "
          >
            1 120
          </h2>

          <p className="text-slate-500">
            Réussies
          </p>

        </div>






        <div className="rounded-2xl bg-white p-6 shadow-sm">

          <Clock
            className="text-yellow-500"
            size={30}
          />

          <h2
            className="
              mt-4
              text-3xl
              font-bold
              text-[#08192D]
            "
          >
            128
          </h2>

          <p className="text-slate-500">
            En attente
          </p>

        </div>



      </section>








      {/* TABLE TRANSACTIONS */}


      <section
        className="
          rounded-3xl
          bg-white
          p-6
          shadow-sm
        "
      >


        <div
          className="
            mb-6
            flex
            items-center
            gap-3
          "
        >

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
                transactions.map((transaction)=>(


                  <tr
                    key={transaction.id}
                    className="
                      border-b
                      last:border-none
                    "
                  >

                    <td
                      className="
                        py-5
                        font-semibold
                        text-[#08192D]
                      "
                    >
                      {transaction.id}
                    </td>


                    <td>
                      {transaction.customer}
                    </td>


                    <td
                      className="
                        font-bold
                      "
                    >
                      {transaction.amount}
                    </td>


                    <td>

                      <div
                        className="
                          flex
                          items-center
                          gap-2
                        "
                      >

                        <Smartphone
                          size={18}
                          className="text-yellow-500"
                        />

                        {transaction.method}

                      </div>

                    </td>



                    <td>

                      {
                        transaction.status === "Réussi" && (

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
                            Réussi
                          </span>

                        )
                      }


                      {
                        transaction.status === "En attente" && (

                          <span
                            className="
                              rounded-full
                              bg-yellow-100
                              px-3
                              py-1
                              text-sm
                              font-semibold
                              text-yellow-700
                            "
                          >
                            En attente
                          </span>

                        )
                      }



                      {
                        transaction.status === "Échec" && (

                          <span
                            className="
                              rounded-full
                              bg-red-100
                              px-3
                              py-1
                              text-sm
                              font-semibold
                              text-red-700
                            "
                          >
                            Échec
                          </span>

                        )
                      }


                    </td>



                    <td>
                      {transaction.date}
                    </td>


                  </tr>


                ))
              }



            </tbody>


          </table>


        </div>


      </section>



    </div>

  );

}