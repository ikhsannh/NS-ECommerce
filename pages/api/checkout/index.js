import dbConnect from "@/server/config/dbConnect";
import Product from "@/server/models/Product";
import Order from "@/server/models/Order";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

export default async function handler(req,res) {
    await dbConnect();

     // handle POST request
  if (req.method !== 'POST') {
    res.json('should a post but its not!');
    return;
  }

  const {email,name,address,city} = req.body;
  const productsIds = req.body.products.split(',');
  const uniqIds = [...new Set(productsIds)];
  const products = await Product.find({_id:{$in:uniqIds}}).exec();
  // res.json(products); // cek apakah data produk sudah sesuai dengan yang diinginkan ketika checkout
  // return;

  // fungsi ketika user memilih 2 item yang sama, maka hanya butuh 1 ID.
  let line_items = [];
  for (let productId of uniqIds) {
    const quantity = productsIds.filter(id => id === productId).length;
    const product = products.find(p => p._id.toString() === productId);
    line_items.push({
      quantity,
      price_data: {
        currency: 'USD',
        product_data: {name:product.name},
        unit_amount: product.price * 100,
      },
    });
  }
//  return res.json({line_items});

  // prepare state order for DB
  const order = await Order.create({
    products:line_items,
    name,
    email,
    address,
    city,
    paid:0,
  });

  // create checkout session
  const session = await stripe.checkout.sessions.create({
    line_items: line_items,
    mode: 'payment',
    customer_email: email, // mengambil value email dari user untuk ditampilkan di session stripe
    success_url: `${req.headers.origin}/?success=true`, // redirect/notice ke halaman sukses jika pembayaran berhasil
    cancel_url:  `${req.headers.origin}/?canceled=true`, // redirect/notice ke halaman cancel jika user cancel pembayaran
    metadata: {orderId:order._id.toString()}, // untuk mengetahui order id 
  });

  res.redirect(303, session.url);

  //res.json(req.method);
}