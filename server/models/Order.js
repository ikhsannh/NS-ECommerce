import {model, models, Schema} from "mongoose";

// Schema Order to DB
const OrderSchema = new Schema({
  products: Object,
  name: String,
  email: String,
  address: String,
  city: String,
  paid: {type:Number,defaultValue:0}, // when paid = 1, order is paid
}, {timestamps: true}); // add createdAt and updatedAt

const Order = models?.Order || model('Order', OrderSchema);

export default Order;