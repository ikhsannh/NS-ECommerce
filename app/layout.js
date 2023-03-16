"use client"
import './globals.css'
import Footer from '@/components/Footer'
import { ProductsContextProvider } from '@/components/ProductsContext'
// import { useContext, useEffect, useState } from 'react'
// import { ProductsContext } from '@/components/ProductsContext'

export default function RootLayout({ children }) {
  // const {setSelectedProducts} = useContext(ProductsContext);
  // const [success,setSuccess] = useState(false);

  
  // useEffect(() => {
  //   if (window.location.href.includes('success')) {
  //     setSelectedProducts([]); // mengembalikan nilai awal cart (ke nol) ketika checkout succes
  //     setSuccess(true); // pesan success ketika checkout succes
  //   }
  // }, []);
  return (
    <html lang="en">
      <body>
        <ProductsContextProvider>
        {/* {success && (
          <div className="mb-5 bg-green-400 text-white text-lg p-5 rounded-xl">
            Thanks for your order!
          </div>
        )} */}
           {children}
         <Footer />
        </ProductsContextProvider>
      </body>
    </html>
  )
}
