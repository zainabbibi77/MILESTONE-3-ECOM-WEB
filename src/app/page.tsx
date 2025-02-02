import Cart from "@/components/Cart";
import Product from "@/components/Product";


const products :Product[] =[
  {
    id:"1",
    name:"Headphones",
    price:57,
    quantity:0,
    image: "/images/img1.jpeg"
    
  },
  {
    id:"2",
    name:"Tripod",
    price:7.99,
    quantity:0,
    image: "/images/img2.jpeg"

    
  },
  {
    id:"3",
    name:"Earbuds",
    price:44.99,
    quantity:0,
    image:"/images/img3.jpeg"

    
  }

]

export default function Home() {
  return (
  <main className="flex min-h-screen flex-col items-center justify-between p-24">
    
    <div className="flex flex-col gap-8">
      <h1 className="text-3xl">Basic E-Commerce Website</h1>
      <div className="grid grid-cols-3 gap-4">
        {products.map((data)=>(
          <Product key={data.id}  product={data}/>
        ))}
      </div>
      <Cart/>

    </div>
  </main>
  )
}
    












