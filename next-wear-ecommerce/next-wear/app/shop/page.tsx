import Link from "next/link";
import { db } from "@/lib/db";

export default async function Shop({searchParams}:{searchParams:Promise<{category?:string;new?:string;sale?:string;search?:string}>}) {
  const q=await searchParams;
  const products=await db.product.findMany({where:{active:true,...(q.category?{category:{slug:q.category}}:{}),...(q.new?{newArrival:true}:{}),...(q.sale?{salePrice:{not:null}}:{})},include:{category:true},orderBy:{createdAt:"desc"}});
  return <main className="shop"><h1>Shop</h1><div className="filters"><input placeholder="Search products..." defaultValue={q.search}/><select><option>Sort: Featured</option><option>Price: Low to High</option><option>Price: High to Low</option></select></div><div className="grid">{products.map(p=><Link className="card" href={`/product/${p.slug}`} key={p.id}><img src={p.images.split(",")[0]}/><div className="card-body"><small>{p.category.name}</small><h3>{p.name}</h3><span className="price">KES {(p.salePrice??p.price).toLocaleString()}</span>{p.salePrice&&<span className="old">KES {p.price.toLocaleString()}</span>}<p>{p.stock>0?"In stock":"Out of stock"}</p></div></Link>)}</div></main>
}
