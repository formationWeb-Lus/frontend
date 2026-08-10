"use client";

import {
Bell,
Search,
Menu,
} from "lucide-react";

// =====================================================
// PROPS
// =====================================================

interface HeaderProps {
onMenuClick: () => void;
}

// =====================================================
// HEADER
// =====================================================

export default function Header({
onMenuClick,
}: HeaderProps) {

return ( <header
   className="
     sticky
     top-0
     z-20
     flex
     h-20
     items-center
     justify-between
     border-b
     border-slate-200
     bg-white
     px-4
     sm:px-6
   "
 >


  {/* =================================================
      MOBILE MENU
  ================================================= */}

  <button
    type="button"
    onClick={onMenuClick}
    aria-label="Ouvrir le menu"
    aria-controls="dashboard-sidebar"
    className="
      rounded-xl
      p-2
      text-slate-600
      transition
      hover:bg-slate-100
      hover:text-[#08192D]
      focus:outline-none
      focus:ring-2
      focus:ring-[#08192D]/20
      lg:hidden
    "
  >

    <Menu
      size={24}
    />

  </button>

  {/* =================================================
      SEARCH
  ================================================= */}

  <div
    className="
      hidden
      items-center
      gap-3
      rounded-xl
      bg-slate-100
      px-4
      py-3
      md:flex
      md:w-96
    "
  >

    <Search
      size={20}
      className="
        text-slate-400
      "
    />

    <input
      type="text"
      placeholder="Rechercher..."
      className="
        w-full
        bg-transparent
        text-sm
        text-slate-700
        outline-none
      "
    />

  </div>

  {/* =================================================
      RIGHT SIDE
  ================================================= */}

  <div
    className="
      ml-auto
      flex
      items-center
      gap-3
      sm:gap-5
    "
  >

    {/* =================================================
        NOTIFICATION
    ================================================= */}

    <button
      type="button"
      aria-label="Notifications"
      className="
        relative
        rounded-xl
        p-2
        text-slate-600
        transition
        hover:bg-slate-100
      "
    >

      <Bell
        size={22}
      />

      <span
        className="
          absolute
          right-1
          top-1
          h-2.5
          w-2.5
          rounded-full
          bg-yellow-400
        "
      />

    </button>

    {/* =================================================
        USER
    ================================================= */}

    <div
      className="
        flex
        items-center
        gap-3
      "
    >

      <div
        className="
          flex
          h-10
          w-10
          shrink-0
          items-center
          justify-center
          rounded-full
          bg-[#08192D]
          font-bold
          text-yellow-300
        "
      >
        J
      </div>

      <div
        className="
          hidden
          sm:block
        "
      >

        <p
          className="
            text-sm
            font-bold
            text-[#08192D]
          "
        >
          Jean
        </p>

        <p
          className="
            text-xs
            text-slate-500
          "
        >
          Administrateur
        </p>

      </div>

    </div>

  </div>

</header>


);
}
