
"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import {
    ArrowLeft,
    Users,
    DollarSign,
    CreditCard,
    Calendar,
    CheckCircle,
    Loader2,
    AlertCircle,
} from "lucide-react";

import { useParams, useRouter } from "next/navigation";


// =====================================================
// TYPES
// =====================================================

interface Plan {

    id: number;

    name: string;

    description: string | null;

    priceUSD: number;

    priceCDF: number;

    maxProducts: number | null;

    features: unknown;

}


interface Subscriber {

    id: number;

    status:
        | "PENDING"
        | "ACTIVE"
        | "EXPIRED"
        | "CANCELLED";

    startDate: string | null;

    endDate: string | null;

    autoRenew: boolean;

    user: {

        id: number;

        name: string | null;

        email: string;

        phone: string | null;

    };

}


interface PlanDetails {

    plan: Plan;

    subscribers: Subscriber[];

    totalSubscribers: number;

    activeSubscribers: number;

    revenueUSD: number;

    revenueCDF: number;

}


// =====================================================
// PAGE
// =====================================================

export default function SubscriptionDetailsPage() {

    const params = useParams();

    const router = useRouter();


    // =================================================
    // PLAN ID
    // =================================================

    const planId =
        Number(params.id);


    // =================================================
    // STATES
    // =================================================

    const [data, setData] =
        useState<PlanDetails | null>(null);


    const [loading, setLoading] =
        useState(true);


    const [error, setError] =
        useState("");


    // =================================================
    // LOAD PLAN
    // =================================================

    useEffect(() => {

        async function loadPlan() {

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
                // VALIDATION ID
                // -----------------------------------------

                if (
                    !planId ||
                    Number.isNaN(planId)
                ) {

                    throw new Error(
                        "Identifiant du plan invalide"
                    );

                }


                // -----------------------------------------
                // API
                // -----------------------------------------

               const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/plans/${planId}`,
    {
        method: "GET",

        headers: {
            Authorization: `Bearer ${token}`,
        },

        cache: "no-store",
    }
);


                const result =
                    await response.json();


                // -----------------------------------------
                // AUTH
                // -----------------------------------------

                if (
                    response.status === 401 ||
                    response.status === 403
                ) {

                    localStorage.removeItem(
                        "token"
                    );

                    router.replace("/login");

                    return;

                }


                // -----------------------------------------
                // ERROR
                // -----------------------------------------

                if (!response.ok) {

                    throw new Error(
                        result.message ||
                        "Impossible de récupérer le plan"
                    );

                }


                // -----------------------------------------
                // DATA
                // -----------------------------------------

                setData(result);

            } catch (error) {

                console.error(
                    "PLAN DETAILS ERROR:",
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


        loadPlan();

    }, [planId, router]);


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

                        Chargement du plan...

                    </p>

                </div>

            </div>

        );

    }


    // =================================================
    // ERROR
    // =================================================

    if (error || !data) {

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

                    <AlertCircle
                        className="
                            mx-auto
                            h-10
                            w-10
                            text-red-500
                        "
                    />


                    <h2 className="
                        mt-4
                        text-lg
                        font-bold
                        text-red-700
                    ">

                        Impossible de charger le plan

                    </h2>


                    <p className="
                        mt-2
                        text-sm
                        text-red-600
                    ">

                        {error ||
                            "Plan introuvable."
                        }

                    </p>


                    <Link
                        href="/dashboard/subscriptions"
                        className="
                            mt-5
                            inline-flex
                            rounded-xl
                            bg-[#08192D]
                            px-5
                            py-3
                            font-semibold
                            text-white
                        "
                    >

                        Retour aux abonnements

                    </Link>

                </div>

            </div>

        );

    }


    // =================================================
    // DATA
    // =================================================

    const {
        plan,
        subscribers,
        totalSubscribers,
        activeSubscribers,
        revenueUSD,
    } = data;


    // =================================================
    // RENDER
    // =================================================

    return (

        <div className="space-y-8">


            {/* ================================================= */}
            {/* HEADER */}
            {/* ================================================= */}

            <div className="
                flex
                flex-col
                gap-5
                md:flex-row
                md:items-center
                md:justify-between
            ">


                <div className="
                    flex
                    items-center
                    gap-4
                ">


                    <Link
                        href="/dashboard/subscriptions"
                        className="
                            rounded-xl
                            bg-white
                            p-3
                            shadow-sm
                            transition
                            hover:bg-slate-50
                        "
                    >

                        <ArrowLeft size={20} />

                    </Link>


                    <div>

                        <h1 className="
                            text-4xl
                            font-bold
                            text-[#08192D]
                        ">

                            {plan.name}

                        </h1>


                        <p className="
                            mt-2
                            text-slate-500
                        ">

                            {plan.description ||
                                "Détails de votre abonnement."
                            }

                        </p>

                    </div>

                </div>

            </div>


            {/* ================================================= */}
            {/* INFORMATIONS PRINCIPALES */}
            {/* ================================================= */}

            <section className="
                grid
                gap-6
                md:grid-cols-4
            ">


                {/* PRIX */}

                <div className="
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-sm
                ">

                    <DollarSign
                        className="text-green-600"
                    />


                    <h2 className="
                        mt-4
                        text-3xl
                        font-bold
                        text-[#08192D]
                    ">

                        ${plan.priceUSD}

                    </h2>


                    <p className="
                        text-slate-500
                    ">

                        Prix mensuel

                    </p>

                </div>


                {/* ABONNES */}

                <div className="
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-sm
                ">

                    <Users
                        className="text-blue-600"
                    />


                    <h2 className="
                        mt-4
                        text-3xl
                        font-bold
                        text-[#08192D]
                    ">

                        {totalSubscribers}

                    </h2>


                    <p className="
                        text-slate-500
                    ">

                        Abonnés

                    </p>

                </div>


                {/* REVENUS */}

                <div className="
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-sm
                ">

                    <CreditCard
                        className="text-yellow-500"
                    />


                    <h2 className="
                        mt-4
                        text-3xl
                        font-bold
                        text-[#08192D]
                    ">

                        ${revenueUSD.toLocaleString()}

                    </h2>


                    <p className="
                        text-slate-500
                    ">

                        Revenus générés

                    </p>

                </div>


                {/* FREQUENCE */}

                <div className="
                    rounded-2xl
                    bg-white
                    p-6
                    shadow-sm
                ">

                    <Calendar
                        className="text-purple-600"
                    />


                    <h2 className="
                        mt-4
                        text-xl
                        font-bold
                        text-[#08192D]
                    ">

                        Mensuel

                    </h2>


                    <p className="
                        text-slate-500
                    ">

                        Fréquence

                    </p>

                </div>

            </section>


            {/* ================================================= */}
            {/* STATUT */}
            {/* ================================================= */}

            <section className="
                rounded-3xl
                bg-[#08192D]
                p-8
                text-white
            ">


                <div className="
                    flex
                    items-center
                    justify-between
                ">


                    <div>

                        <h2 className="
                            text-2xl
                            font-bold
                        ">

                            Statut du plan

                        </h2>


                        <p className="
                            mt-2
                            text-slate-300
                        ">

                            Ce plan est disponible
                            pour les abonnements.

                        </p>


                        <div className="
                            mt-5
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-green-500/20
                            px-4
                            py-2
                            text-sm
                            font-semibold
                            text-green-300
                        ">

                            <CheckCircle size={17} />

                            {activeSubscribers} abonnés actifs

                        </div>

                    </div>


                    <CheckCircle
                        size={40}
                        className="text-green-400"
                    />

                </div>

            </section>


            {/* ================================================= */}
            {/* CLIENTS */}
            {/* ================================================= */}

            <section className="
                rounded-3xl
                bg-white
                p-8
                shadow-sm
            ">


                <div className="
                    mb-6
                    flex
                    items-center
                    justify-between
                ">


                    <div>

                        <h2 className="
                            text-2xl
                            font-bold
                            text-[#08192D]
                        ">

                            Clients abonnés

                        </h2>


                        <p className="
                            mt-1
                            text-sm
                            text-slate-500
                        ">

                            Liste des utilisateurs
                            ayant choisi ce plan.

                        </p>

                    </div>


                    <span className="
                        rounded-full
                        bg-slate-100
                        px-4
                        py-2
                        text-sm
                        font-semibold
                        text-slate-600
                    ">

                        {totalSubscribers} abonnés

                    </span>

                </div>


                <div className="overflow-x-auto">


                    {subscribers.length === 0 ? (

                        <div className="
                            rounded-2xl
                            bg-slate-50
                            p-10
                            text-center
                        ">

                            <Users
                                className="
                                    mx-auto
                                    h-10
                                    w-10
                                    text-slate-400
                                "
                            />


                            <p className="
                                mt-3
                                font-semibold
                                text-slate-600
                            ">

                                Aucun abonné

                            </p>


                            <p className="
                                mt-1
                                text-sm
                                text-slate-400
                            ">

                                Aucun utilisateur
                                n'a encore souscrit à ce plan.

                            </p>

                        </div>

                    ) : (

                        <table className="w-full">


                            <thead className="border-b">

                                <tr className="
                                    text-left
                                    text-slate-500
                                ">

                                    <th className="pb-4">
                                        Client
                                    </th>

                                    <th className="pb-4">
                                        Email
                                    </th>

                                    <th className="pb-4">
                                        Date
                                    </th>

                                    <th className="pb-4">
                                        Statut
                                    </th>

                                </tr>

                            </thead>


                            <tbody>

                                {subscribers.map(
                                    (subscriber) => {

                                        const isActive =
                                            subscriber.status ===
                                            "ACTIVE";


                                        return (

                                            <tr
                                                key={
                                                    subscriber.id
                                                }
                                                className="
                                                    border-b
                                                    last:border-0
                                                "
                                            >


                                                <td className="
                                                    py-5
                                                    font-semibold
                                                    text-[#08192D]
                                                ">

                                                    {
                                                        subscriber.user.name ||
                                                        "Utilisateur"
                                                    }

                                                </td>


                                                <td className="
                                                    py-5
                                                    text-slate-600
                                                ">

                                                    {
                                                        subscriber.user.email
                                                    }

                                                </td>


                                                <td className="
                                                    py-5
                                                    text-slate-600
                                                ">

                                                    {
                                                        subscriber.startDate
                                                            ? new Date(
                                                                subscriber.startDate
                                                            ).toLocaleDateString(
                                                                "fr-FR"
                                                            )
                                                            : "-"
                                                    }

                                                </td>


                                                <td className="py-5">


                                                    {isActive ? (

                                                        <span className="
                                                            inline-flex
                                                            items-center
                                                            rounded-full
                                                            bg-green-100
                                                            px-3
                                                            py-1
                                                            text-sm
                                                            font-semibold
                                                            text-green-700
                                                        ">

                                                            Actif

                                                        </span>

                                                    ) : subscriber.status === "PENDING" ? (

                                                        <span className="
                                                            inline-flex
                                                            items-center
                                                            rounded-full
                                                            bg-yellow-100
                                                            px-3
                                                            py-1
                                                            text-sm
                                                            font-semibold
                                                            text-yellow-700
                                                        ">

                                                            En attente

                                                        </span>

                                                    ) : (

                                                        <span className="
                                                            inline-flex
                                                            items-center
                                                            rounded-full
                                                            bg-red-100
                                                            px-3
                                                            py-1
                                                            text-sm
                                                            font-semibold
                                                            text-red-700
                                                        ">

                                                            {subscriber.status}

                                                        </span>

                                                    )}

                                                </td>

                                            </tr>

                                        );

                                    }
                                )}

                            </tbody>

                        </table>

                    )}

                </div>

            </section>

        </div>

    );

}

