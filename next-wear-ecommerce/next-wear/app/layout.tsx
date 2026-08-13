import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Next Wear | Fashion in Kenya",
  description: "Quality fashion. Fresh styles. Affordable prices.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <header className="nav">
          <Link href="/" className="logo">NEXT<span>WEAR</span></Link>
          <nav>
            <Link href="/">Home</Link><Link href="/shop">Shop</Link>
            <Link href="/shop?category=men-s-clothing">Men</Link>
            <Link href="/shop?category=women-s-clothing">Women</Link>
            <Link href="/shop?category=jerseys">Jerseys</Link>
            <Link href="/shop?new=true">New Arrivals</Link>
            <Link href="/shop?sale=true">Sale</Link>
          </nav>
          <div className="nav-actions"><Link href="/shop">⌕</Link><Link href="/cart">🛒</Link><Link href="/account">♙</Link></div>
        </header>
        {children}
        <a className="wa" href={`https://wa.me/${process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "254700000000"}`} target="_blank">WhatsApp</a>
        <footer><div><h2>NEXT WEAR</h2><p>Quality fashion. Fresh styles. Affordable prices.</p></div><div><b>Quick Links</b><p>Shop · New Arrivals · Sale · Contact</p></div><div><b>Location</b><p>Kabarak, Rafiki, Kenya</p></div></footer>
      </body>
    </html>
  );
}
