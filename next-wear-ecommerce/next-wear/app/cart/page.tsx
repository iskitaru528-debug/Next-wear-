import Link from "next/link";
export default function Cart(){return <main className="checkout"><h1>Your Cart</h1><p>Your cart is ready for products. Connect the cart state to your preferred persistence layer or extend the included API/database models.</p><Link className="btn" href="/shop">CONTINUE SHOPPING</Link><Link className="btn" href="/checkout">CHECKOUT</Link></main>}
