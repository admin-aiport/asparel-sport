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

## Üye girişi (Supabase)

Hesaplar siteden açılmaz; kulüp Supabase’ten kullanıcı oluşturur. Yeni sporcu/antrenör başvuruları Calendly’de kalır.

1. [Supabase](https://supabase.com) projesi açın.
2. `supabase/schema.sql` dosyasını SQL Editor’da çalıştırın.
3. Authentication → Users → **Add user** ile e-posta ve şifre verin.
4. Table Editor’da `profiles` satırı ekleyin: `id` = kullanıcının UUID’si, `full_name`, `role` (`sporcu` veya `antrenor`). Kullanıcıyı **e-posta onaylı** oluşturun (Authentication → Confirm email kapalı veya Add user’da auto-confirm).
5. `.env.local` (ve Vercel env) içine kopyalayın. URL kök olmalı (`/rest/v1` olmadan):

```
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT_REF.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=
```

`SUPABASE_SERVICE_ROLE_KEY` yalnızca sunucuda durur (Vercel env, `NEXT_PUBLIC` değil). Antrenörün panelden sporcu eklemesi / silmesi için gerekir. Schema değişince `supabase/schema.sql` dosyasını SQL Editor’da yeniden çalıştırın.

Giriş: `/giris` · Panel: `/panel`

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
