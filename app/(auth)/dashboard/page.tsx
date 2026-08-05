
"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

import {
    ArrowUpRight,
    DollarSign,
    Users,
    CreditCard,
    Wallet,
    Plus,
    Loader2,
    Lock,
} from "lucide-react";

import RevenueChart from "@/components/dashboard/RevenueChart";
import PaymentMethodChart from "@/components/dashboard/PaymentMethodChart";
import RecentTransactions from "@/components/dashboard/RecentTransactions";


// =====================================================
// TYPES
// =====================================================

type SubscriptionStatus =
    | "FREE"
    | "PENDING"
    | "ACTIVE"
    | "EXPIRED"
    | "CANCELLED";


interface Company {

    id: number;

    name: string;

    logo?: string | null;

    address?: string | null;

    phone?: string | null;

    email?: string | null;

}


interface User {

    id: number;

    name: string | null;

    email: string;

    phone: string | null;

    role: string;

    subscriptionStatus: SubscriptionStatus;

    company: Company | null;

}


// =====================================================
// DASHBOARD
// =====================================================

export default function DashboardPage() {

    const router = useRouter();


    // =================================================
    // STATES
    // =================================================

    const [user, setUser] =
        useState<User | null>(null);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState("");


    // =================================================
    // RECUPERER L'UTILISATEUR CONNECTE
    // =================================================

    useEffect(() => {

        async function loadUser() {

            try {

                setLoading(true);

                setError("");


                // -----------------------------------------
                // TOKEN
                // -----------------------------------------

                const token =
                    localStorage.getItem("token");


                if (!token) {

                    router.replace("/login");

                    return;

                }


                // -----------------------------------------
                // API /ME
                // -----------------------------------------

                const response = await fetch(
                    "http://localhost:5000/api/auth/me",
                    {
                        method: "GET",

                        headers: {
                            Authorization:
                                `Bearer ${token}`,
                        },

                        cache: "no-store",
                    }
                );


                const result =
                    await response.json();


                // -----------------------------------------
                // TOKEN INVALIDE
                // -----------------------------------------

                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    localStorage.removeItem(
                        "token"
                    );

                    localStorage.removeItem(
                        "user"
                    );

                    router.replace("/login");

                    return;

                }


                // -----------------------------------------
                // AUTRE ERREUR
                // -----------------------------------------

                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Impossible de récupérer votre compte"
                    );

                }


                // -----------------------------------------
                // USER
                // -----------------------------------------

                if (!result.user) {

                    throw new Error(
                        "Utilisateur introuvable"
                    );

                }


                setUser(result.user);


                // -----------------------------------------
                // CACHE LOCAL
                // -----------------------------------------

                localStorage.setItem(
                    "user",
                    JSON.stringify(
                        result.user
                    )
                );


            } catch (error) {

                console.error(
                    "DASHBOARD USER ERROR:",
                    error
                );


                setError(
                    error instanceof Error
                        ? error.message
                        : "Une erreur est survenue"
                );


            } finally {

                setLoading(false);

            }

        }


        loadUser();

    }, [router]);


    // =================================================
    // LOADING
    // =================================================

    if (loading) {

        return (

            <div className="
                flex
                min-h-[500px]
                items-center
                justify-center
            ">

                <div className="
                    flex
                    flex-col
                    items-center
                    text-center
                ">

                    <Loader2
                        className="
                            h-9
                            w-9
                            animate-spin
                            text-yellow-500
                        "
                    />

                    <p className="
                        mt-4
                        text-sm
                        text-slate-500
                    ">

                        Chargement de votre
                        tableau de bord...

                    </p>

                </div>

            </div>

        );

    }


    // =================================================
    // ERROR
    // =================================================

    if (error) {

        return (

            <div className="
                flex
                min-h-[500px]
                items-center
                justify-center
            ">

                <div className="
                    max-w-md
                    rounded-2xl
                    border
                    border-red-200
                    bg-red-50
                    p-6
                    text-center
                ">

                    <h2 className="
                        text-lg
                        font-bold
                        text-red-700
                    ">

                        Impossible de charger
                        votre compte

                    </h2>


                    <p className="
                        mt-2
                        text-sm
                        text-red-600
                    ">

                        {error}

                    </p>


                    <button
                        onClick={() =>
                            window.location.reload()
                        }
                        className="
                            mt-5
                            rounded-xl
                            bg-[#08192D]
                            px-5
                            py-3
                            font-semibold
                            text-white
                        "
                    >

                        Réessayer

                    </button>

                </div>

            </div>

        );

    }


    // =================================================
    // SI USER ABSENT
    // =================================================

    if (!user) {

        return null;

    }


    // =================================================
    // SUBSCRIPTION
    // =================================================

    const isActive =
        user.subscriptionStatus === "ACTIVE";


    const subscriptionLabel: Record<
        SubscriptionStatus,
        string
    > = {

        FREE: "Gratuit",

        PENDING: "En attente",

        ACTIVE: "Actif",

        EXPIRED: "Expiré",

        CANCELLED: "Annulé",

    };


    const subscriptionLabelText =
        subscriptionLabel[
            user.subscriptionStatus
        ];


    // =================================================
    // STATISTIQUES
    // =================================================
    //
    // Pour l'instant les données sont à 0.
    //
    // Elles seront remplacées ensuite par les données
    // provenant de Prisma :
    //
    // - revenus
    // - transactions
    // - clients
    // - pages de paiement
    //
    // =================================================

    const stats = [

        {
            title: "Revenus",

            value: "$0",

            icon: DollarSign,

            color:
                "bg-green-100 text-green-700",

        },

        {
            title: "Transactions",

            value: "0",

            icon: CreditCard,

            color:
                "bg-blue-100 text-blue-700",

        },

        {
            title: "Clients",

            value: "0",

            icon: Users,

            color:
                "bg-yellow-100 text-yellow-700",

        },

        {
            title: "Pages de paiement",

            value: "0",

            icon: Wallet,

            color:
                "bg-purple-100 text-purple-700",

        },

    ];


    // =================================================
    // NAVIGATION
    // =================================================

    function goToProducts() {

        router.push(
            "/dashboard/products"
        );

    }


    function goToSubscription() {

        router.push(
            "/dashboard/subscription"
        );

    }


    function goToPayment() {

        if (!isActive) {

            router.push(
                "/dashboard/subscription"
            );

            return;

        }


        router.push(
            "/dashboard/payment"
        );

    }


    function goToCustomers() {

        if (!isActive) {

            router.push(
                "/dashboard/subscription"
            );

            return;

        }


        router.push(
            "/dashboard/customers"
        );

    }


    // =================================================
    // RENDER
    // =================================================

    return (

        <div className="space-y-8">


            {/* ================================================= */}
            {/* BIENVENUE */}
            {/* ================================================= */}

            <section className="
                overflow-hidden
                rounded-3xl
                bg-[#08192D]
                p-8
                text-white
                shadow-sm
            ">

                <div className="
                    flex
                    flex-col
                    gap-6
                    lg:flex-row
                    lg:items-center
                    lg:justify-between
                ">


                    {/* TEXT */}

                    <div>

                        <p className="
                            text-sm
                            font-medium
                            text-slate-300
                        ">

                            Tableau de bord

                        </p>


                        <h1 className="
                            mt-2
                            text-3xl
                            font-extrabold
                            sm:text-4xl
                        ">

                            Bonjour{" "}

                            {user.name ||
                                "Utilisateur"}{" "}

                            👋

                        </h1>


                        <p className="
                            mt-3
                            max-w-2xl
                            text-slate-300
                        ">

                            Bienvenue sur votre
                            espace PayLink.
                            Gérez vos produits,
                            vos paiements et
                            vos clients depuis
                            une seule plateforme.

                        </p>


                        {user.company && (

                            <p className="
                                mt-4
                                text-sm
                                text-slate-400
                            ">

                                Entreprise :{" "}

                                <span className="
                                    font-semibold
                                    text-white
                                ">

                                    {user.company.name}

                                </span>

                            </p>

                        )}

                    </div>


                    {/* STATUS */}

                    <div className="
                        shrink-0
                    ">

                        <div className="
                            rounded-2xl
                            border
                            border-white/10
                            bg-white/10
                            p-5
                            backdrop-blur
                        ">

                            <p className="
                                text-xs
                                uppercase
                                tracking-wider
                                text-slate-400
                            ">

                                Abonnement

                            </p>


                            <p className="
                                mt-1
                                text-xl
                                font-bold
                            ">

                                {subscriptionLabelText}

                            </p>


                            <p className="
                                mt-1
                                text-xs
                                text-slate-400
                            ">

                                Statut :{" "}

                                {user.subscriptionStatus}

                            </p>

                        </div>

                    </div>

                </div>

            </section>


            {/* ================================================= */}
            {/* ABONNEMENT */}
            {/* ================================================= */}

            {!isActive && (

                <section className="
                    rounded-2xl
                    border
                    border-yellow-200
                    bg-yellow-50
                    p-6
                ">

                    <div className="
                        flex
                        flex-col
                        gap-5
                        md:flex-row
                        md:items-center
                        md:justify-between
                    ">

                        <div>

                            <div className="
                                flex
                                items-center
                                gap-3
                            ">

                                <div className="
                                    rounded-xl
                                    bg-yellow-100
                                    p-3
                                ">

                                    <Lock
                                        size={20}
                                        className="
                                            text-yellow-700
                                        "
                                    />

                                </div>


                                <div>

                                    <h2 className="
                                        font-bold
                                        text-[#08192D]
                                    ">

                                        Activez votre
                                        abonnement

                                    </h2>


                                    <p className="
                                        mt-1
                                        text-sm
                                        text-slate-600
                                    ">

                                        Votre compte est
                                        actuellement en
                                        statut{" "}

                                        <strong>
                                            {
                                                user.subscriptionStatus
                                            }
                                        </strong>.

                                    </p>

                                </div>

                            </div>


                            <p className="
                                mt-4
                                max-w-2xl
                                text-sm
                                text-slate-600
                            ">

                                Pour connecter vos moyens
                                de paiement et accéder aux
                                fonctionnalités avancées,
                                vous devez choisir un plan
                                et activer votre abonnement.

                            </p>

                        </div>


                        <button
                            onClick={
                                goToSubscription
                            }
                            className="
                                shrink-0
                                rounded-xl
                                bg-[#08192D]
                                px-6
                                py-3
                                font-bold
                                text-white
                                transition
                                hover:bg-[#102c4e]
                            "
                        >

                            Choisir un plan

                        </button>

                    </div>

                </section>

            )}


            {/* ================================================= */}
            {/* STATISTIQUES */}
            {/* ================================================= */}

            <section className="
                grid
                gap-6
                sm:grid-cols-2
                xl:grid-cols-4
            ">

                {stats.map((item) => {

                    const Icon =
                        item.icon;


                    return (

                        <div
                            key={
                                item.title
                            }
                            className="
                                rounded-2xl
                                bg-white
                                p-6
                                shadow-sm
                            "
                        >

                            <div className="
                                flex
                                items-center
                                justify-between
                            ">

                                <div>

                                    <p className="
                                        text-sm
                                        text-slate-500
                                    ">

                                        {item.title}

                                    </p>


                                    <h2 className="
                                        mt-2
                                        text-3xl
                                        font-bold
                                        text-[#08192D]
                                    ">

                                        {item.value}

                                    </h2>

                                </div>


                                <div
                                    className={`
                                        rounded-xl
                                        p-3
                                        ${item.color}
                                    `}
                                >

                                    <Icon
                                        size={26}
                                    />

                                </div>

                            </div>


                            <div className="
                                mt-5
                                flex
                                items-center
                                gap-2
                                text-sm
                                text-slate-400
                            ">

                                <ArrowUpRight
                                    size={16}
                                />

                                Pas encore de données

                            </div>

                        </div>

                    );

                })}

            </section>


            {/* ================================================= */}
            {/* GRAPHIQUES */}
            {/* ================================================= */}

            {isActive && (

                <section className="
                    grid
                    gap-6
                    xl:grid-cols-3
                ">

                    <div className="
                        xl:col-span-2
                    ">

                        <RevenueChart />

                    </div>


                    <PaymentMethodChart />

                </section>

            )}


            {/* ================================================= */}
            {/* MESSAGE FREE */}
            {/* ================================================= */}

            {!isActive && (

                <section className="
                    rounded-2xl
                    border
                    border-slate-200
                    bg-white
                    p-6
                ">

                    <div className="
                        flex
                        items-center
                        gap-4
                    ">

                        <div className="
                            rounded-xl
                            bg-slate-100
                            p-3
                        ">

                            <Lock
                                size={22}
                                className="
                                    text-slate-500
                                "
                            />

                        </div>


                        <div>

                            <h2 className="
                                font-bold
                                text-[#08192D]
                            ">

                                Fonctionnalités
                                avancées verrouillées

                            </h2>


                            <p className="
                                mt-1
                                text-sm
                                text-slate-500
                            ">

                                Les statistiques de paiement,
                                les graphiques et les
                                fonctionnalités avancées
                                seront disponibles après
                                activation de votre abonnement.

                            </p>

                        </div>

                    </div>

                </section>

            )}


            {/* ================================================= */}
            {/* ACTIONS RAPIDES */}
            {/* ================================================= */}

            <section>

                <div className="
                    mb-5
                    flex
                    items-center
                    justify-between
                ">

                    <h2 className="
                        text-2xl
                        font-bold
                        text-[#08192D]
                    ">

                        Actions rapides

                    </h2>

                </div>


                <div className="
                    grid
                    gap-5
                    md:grid-cols-3
                ">


                    {/* ========================================= */}
                    {/* PRODUIT */}
                    {/* ========================================= */}

                    <button
                        onClick={
                            goToProducts
                        }
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            text-left
                            transition
                            hover:border-yellow-400
                            hover:shadow-lg
                        "
                    >

                        <Plus className="
                            mb-4
                            text-yellow-500
                        " />


                        <h3 className="
                            font-bold
                            text-[#08192D]
                        ">

                            Nouveau produit

                        </h3>


                        <p className="
                            mt-2
                            text-sm
                            text-slate-500
                        ">

                            Créez un nouveau produit
                            à vendre.

                        </p>

                    </button>


                    {/* ========================================= */}
                    {/* PAIEMENT */}
                    {/* ========================================= */}

                    <button
                        onClick={
                            goToPayment
                        }
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            text-left
                            transition
                            hover:border-yellow-400
                            hover:shadow-lg
                        "
                    >

                        {isActive ? (

                            <Plus className="
                                mb-4
                                text-yellow-500
                            " />

                        ) : (

                            <Lock className="
                                mb-4
                                text-slate-400
                            " />

                        )}


                        <h3 className="
                            font-bold
                            text-[#08192D]
                        ">

                            Nouvelle page
                            de paiement

                        </h3>


                        <p className="
                            mt-2
                            text-sm
                            text-slate-500
                        ">

                            {isActive

                                ? "Générez un lien de paiement partageable."

                                : "Abonnement requis pour cette fonctionnalité."
                            }

                        </p>

                    </button>


                    {/* ========================================= */}
                    {/* CLIENT */}
                    {/* ========================================= */}

                    <button
                        onClick={
                            goToCustomers
                        }
                        className="
                            rounded-2xl
                            border
                            border-slate-200
                            bg-white
                            p-6
                            text-left
                            transition
                            hover:border-yellow-400
                            hover:shadow-lg
                        "
                    >

                        {isActive ? (

                            <Plus className="
                                mb-4
                                text-yellow-500
                            " />

                        ) : (

                            <Lock className="
                                mb-4
                                text-slate-400
                            " />

                        )}


                        <h3 className="
                            font-bold
                            text-[#08192D]
                        ">

                            Ajouter un client

                        </h3>


                        <p className="
                            mt-2
                            text-sm
                            text-slate-500
                        ">

                            {isActive

                                ? "Enregistrez un nouveau client."

                                : "Abonnement requis pour cette fonctionnalité."
                            }

                        </p>

                    </button>

                </div>

            </section>


            {/* ================================================= */}
            {/* TRANSACTIONS RECENTES */}
            {/* ================================================= */}

            {isActive && (

                <section>

                    <RecentTransactions />

                </section>

            )}

        </div>

    );

}

