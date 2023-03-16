import dbConnect from '@/server/config/dbConnect';
import  Product from '@/server/models/Product';

// export const findAllProducts = async (req, res => {
// return Product.find().exec();
// });

// export const findAllProducts = async (req, res) => {
//     res.json(await Product.find().exec());
// }

// export async function findAllProducts(req, res) {
//     res.json(await Product.find().exec());
//    }
export async function findAllProducts() {
    return Product.find().exec();
  }
 

 // export default async function handle(req, res) {
 // await dbConnect();
 // const {ids} = req.query;
 // if (ids) {
 //     const idsArray = ids.split(',');
 //     console.log(idsArray);
 //     res.json(await Product.find({_id: {$in: idsArray}}).exec());
 // } else {
 //     res.json(await getProducts())
 // }
 // }
 
   export default async function handle(req, res) { 
     await dbConnect();
   const {ids} = req.query;
   if (ids) {
     const idsArray = ids.split(",");
    //console.log(idsArray);
     
     res.json (await Product.find({_id: {$in: idsArray}}).exec());
   } else {
     res.json(await findAllProducts());
   }
   }