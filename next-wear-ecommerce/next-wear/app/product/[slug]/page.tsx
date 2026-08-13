import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function Product({params}:{params:Promise<{slug:string}>}) {
  const {slug}=await params; const p=await db.product.findUnique({where:{slug},include:{category:true,reviews:{where:{approved:true}}}});
  if(!p)return notFound();
  const price=p.salePrice??p.price;
  return <main className="product"><div><img src={p.images.split(",")[0]}/></div><div className="product-info"><small>{p.category.name}</small><h1>{p.name}</h1><h2>KES {price.toLocaleString()} {p.salePrice&&<span className="old">KES {p.price.toLocaleString()}</span>}</h2><p>{p.description}</p><p><b>Stock:</b> {p.stock}</p><label>Size</label><select>{p.sizes.split(",").map(s=><option key={s}>{s}</option>)}</select><label>Color</label><select>{p.colors.split(",").map(c=><option key={c}>{c}</option>)}</select><br/><button className="btn" style={{marginLeft:0}}>ADD TO CART</button><button className="btn alt">BUY NOW</button><hr/><h3>Specifications</h3><p>Brand: {p.brand||"Next Wear"} · SKU: {p.sku}</p><h3>Reviews</h3>{p.reviews.length?p.reviews.map(r=><p key={r.id}>★ {r.rating} — {r.comment}</p>):<p>No reviews yet.</p>}</div></main>
}
