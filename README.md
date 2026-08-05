This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.



frontend/
│
├── public/
│   ├── images/
│   │   ├── logo.png
│   │   ├── hero.png
│   │   ├── payment.png
│   │   └── avatar.png
│   │
│   ├── icons/
│   │   ├── airtel.svg
│   │   ├── orange.svg
│   │   ├── mpesa.svg
│   │   ├── afrimoney.svg
│   │   └── visa.svg
│   │
│   └── favicon.ico
│
├── src/
│
│   ├── app/
│   │
│   │   ├── (auth)/
│   │   │
│   │   │   ├── login/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── register/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── forgot-password/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   └── reset-password/
│   │   │          page.tsx
│   │   │
│   │   ├── dashboard/
│   │   │
│   │   │   ├── layout.tsx
│   │   │   │
│   │   │   ├── overview/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── products/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── payment-pages/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── transactions/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── subscriptions/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── customers/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── analytics/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── api-keys/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── webhooks/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   └── settings/
│   │   │          page.tsx
│   │   │
│   │   ├── admin/
│   │   │
│   │   │   ├── layout.tsx
│   │   │   │
│   │   │   ├── dashboard/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── users/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── companies/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── subscriptions/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   ├── payments/
│   │   │   │      page.tsx
│   │   │   │
│   │   │   └── settings/
│   │   │          page.tsx
│   │   │
│   │   ├── pay/
│   │   │
│   │   │   └── [slug]/
│   │   │          page.tsx
│   │   │
│   │   ├── pricing/
│   │   │      page.tsx
│   │   │
│   │   ├── about/
│   │   │      page.tsx
│   │   │
│   │   ├── contact/
│   │   │      page.tsx
│   │   │
│   │   ├── privacy/
│   │   │      page.tsx
│   │   │
│   │   ├── terms/
│   │   │      page.tsx
│   │   │
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── loading.tsx
│   │   ├── error.tsx
│   │   ├── not-found.tsx
│   │   └── globals.css
│   │
│   ├── components/
│   │
│   │   ├── ui/
│   │   │      Button.tsx
│   │   │      Input.tsx
│   │   │      Card.tsx
│   │   │      Modal.tsx
│   │   │      Badge.tsx
│   │   │      Table.tsx
│   │   │
│   │   ├── layout/
│   │   │      Header.tsx
│   │   │      Footer.tsx
│   │   │      Sidebar.tsx
│   │   │      Navbar.tsx
│   │   │
│   │   ├── forms/
│   │   │      LoginForm.tsx
│   │   │      RegisterForm.tsx
│   │   │      CompanyForm.tsx
│   │   │      ProductForm.tsx
│   │   │
│   │   ├── dashboard/
│   │   │      DashboardCard.tsx
│   │   │      Statistics.tsx
│   │   │      RecentTransactions.tsx
│   │   │
│   │   ├── payment/
│   │   │      PaymentForm.tsx
│   │   │      PaymentMethods.tsx
│   │   │      PaymentSuccess.tsx
│   │   │
│   │   ├── charts/
│   │   │      RevenueChart.tsx
│   │   │      PaymentChart.tsx
│   │   │
│   │   ├── tables/
│   │   │      ProductsTable.tsx
│   │   │      TransactionsTable.tsx
│   │   │
│   │   ├── cards/
│   │   │      PlanCard.tsx
│   │   │      ProductCard.tsx
│   │   │
│   │   ├── modals/
│   │   │      DeleteModal.tsx
│   │   │      UpgradeModal.tsx
│   │   │
│   │   └── shared/
│   │          Logo.tsx
│   │          Loader.tsx
│   │          EmptyState.tsx
│   │
│   ├── hooks/
│   │      useAuth.ts
│   │      usePayment.ts
│   │      useSubscription.ts
│   │
│   ├── lib/
│   │      axios.ts
│   │      auth.ts
│   │      validators.ts
│   │
│   ├── services/
│   │      auth.service.ts
│   │      payment.service.ts
│   │      company.service.ts
│   │      subscription.service.ts
│   │
│   ├── store/
│   │      auth.store.ts
│   │      payment.store.ts
│   │
│   ├── types/
│   │      auth.ts
│   │      payment.ts
│   │      company.ts
│   │
│   ├── utils/
│   │      formatCurrency.ts
│   │      formatDate.ts
│   │      helpers.ts
│   │
│   ├── constants/
│   │      routes.ts
│   │      plans.ts
│   │      paymentMethods.ts
│   │
│   └── middleware.ts
│
├── .env.local
├── package.json
├── next.config.ts
├── tailwind.config.ts
├── tsconfig.json
├── postcss.config.js
└── eslint.config.mjs



backend/
│
├── prisma/
│   ├── migrations/
│   ├── schema.prisma
│   └── seed.ts
│
├── src/
│
│   ├── config/
│   │      database.ts
│   │      jwt.ts
│   │      redis.ts
│   │      mail.ts
│   │      upload.ts
│   │
│   ├── controllers/
│   │      auth.controller.ts
│   │      user.controller.ts
│   │      company.controller.ts
│   │      subscription.controller.ts
│   │      payment.controller.ts
│   │      webhook.controller.ts
│   │      dashboard.controller.ts
│   │
│   ├── services/
│   │      auth.service.ts
│   │      payment.service.ts
│   │      company.service.ts
│   │      subscription.service.ts
│   │      notification.service.ts
│   │
│   ├── repositories/
│   │      user.repository.ts
│   │      company.repository.ts
│   │      payment.repository.ts
│   │
│   ├── middlewares/
│   │      auth.middleware.ts
│   │      admin.middleware.ts
│   │      merchant.middleware.ts
│   │      validate.middleware.ts
│   │      error.middleware.ts
│   │
│   ├── validators/
│   │      auth.validator.ts
│   │      payment.validator.ts
│   │      subscription.validator.ts
│   │
│   ├── routes/
│   │      auth.routes.ts
│   │      user.routes.ts
│   │      company.routes.ts
│   │      payment.routes.ts
│   │      webhook.routes.ts
│   │      subscription.routes.ts
│   │
│   ├── utils/
│   │      logger.ts
│   │      token.ts
│   │      response.ts
│   │      encryption.ts
│   │
│   ├── jobs/
│   │      subscription.job.ts
│   │      reminder.job.ts
│   │
│   ├── sockets/
│   │      socket.ts
│   │
│   ├── uploads/
│   │      logos/
│   │      products/
│   │
│   ├── app.ts
│   └── server.ts
│
├── .env
├── package.json
└── tsconfig.json