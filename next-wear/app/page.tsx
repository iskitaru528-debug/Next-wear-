import Link from "next/link";
import { db } from "@/lib/db";

export default async function Home() {
  const products = await db.product.findMany({ where:{active:true}, orderBy:{createdAt:"desc"}, take:4, include:{category:true} });
  const cats = await db.category.findMany({ where:{active:true}, take:8 });
  return <main>
    <section className="hero"><div><p>NEXT WEAR · KABARAK</p><h1>Upgrade Your Style With Next Wear</h1><p>Quality fashion. Fresh styles. Affordable prices.</p><Link className="btn" href="/shop">SHOP NOW</Link><Link className="btn alt" href="/shop?new=true">VIEW NEW ARRIVALS</Link></div></section>
    <section className="section"><h2>Shop Categories</h2><div className="categories">{cats.map(c=><Link className="category" href={`/shop?category=${c.slug}`} key={c.id}>{c.name}</Link>)}</div></section>
    <section className="section"><h2>New Arrivals</h2><div className="grid">{products.map(p=><Link className="card" href={`/product/${p.slug}`} key={p.id}><img src={p.images.split(",")[0]}/><div className="card-body"><h3>{p.name}</h3><span className="price">KES {(p.salePrice??p.price).toLocaleString()}</span>{p.salePrice&&<span className="old">KES {p.price.toLocaleString()}</span>}</div></Link>)}</div></section>
    <section className="section" style={{textAlign:"center",background:"#211a15",color:"#fff"}}><h2>Fresh styles. Better prices.</h2><p>Discover your next favourite look.</p><Link className="btn" href="/shop">SHOP THE COLLECTION</Link></section>
  </main>
}
