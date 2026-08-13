# Next Wear E-Commerce

A Next.js + Prisma starter for the Next Wear clothing store.

## Run locally

1. Install Node.js 20+.
2. Copy `.env.example` to `.env`.
3. Run:
   `npm install`
4. Create the database:
   `npx prisma db push`
5. Seed sample products:
   `npm run db:seed`
6. Start:
   `npm run dev`
7. Open `http://localhost:3000`.

## Important production steps

- Replace SQLite with PostgreSQL/MySQL in `prisma/schema.prisma` and set `DATABASE_URL`.
- Add production authentication and role enforcement before exposing `/admin`.
- Implement Daraja STK Push initiation and callback verification using the provided M-Pesa environment variables.
- Add secure image storage (S3/Cloudinary/etc.).
- Add email/SMS/WhatsApp provider credentials.
- Add real cart state and order creation API before accepting live orders.
- Never commit `.env` or payment credentials.
