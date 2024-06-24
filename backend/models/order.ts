import { model, Schema, Types } from "mongoose";

interface OrderItem {
  name: string;
  qty: number;
  image: string;
  price: number;
  product: Types.ObjectId;
}

interface ShippingAddress {
  address: string;
  city: string;
  postalCode: string;
  country: string;
}

interface PaymentResult {
  id: string;
  status: string;
  update_time: string;
  payer: { email_address: string };
}

interface Order {
  user: Types.ObjectId;
  orderItems: OrderItem[];
  shippingAddress: ShippingAddress;
  paymentMethod: string;
  paymentResult?: PaymentResult;
  itemsPrice: number;
  taxPrice: number;
  shippingPrice: number;
  totalPrice: number;
  isPaid: boolean;
  paidAt?: Date;
  isDelivered: boolean;
  deliveredAt?: Date;
}

const orderItemSchema = new Schema<OrderItem>({
  name: { type: String, required: [true, "Order item name is required"] },
  qty: { type: Number, required: [true, "Order item quantity is required"] },
  image: { type: String, required: [true, "Order item image is required"] },
  price: { type: Number, required: [true, "Order item price is required"] },
  product: {
    type: Schema.Types.ObjectId,
    required: [true, "Product ID is required"],
    ref: "Product",
  },
});

const shippingAddressSchema = new Schema<ShippingAddress>({
  address: { type: String, required: [true, "Shipping address is required"] },
  city: { type: String, required: [true, "City is required"] },
  postalCode: { type: String, required: [true, "Postal code is required"] },
  country: { type: String, required: [true, "Country is required"] },
});

const paymentResultSchema = new Schema<PaymentResult>({
  id: { type: String },
  status: { type: String },
  update_time: { type: String },
  payer: { email_address: { type: String } },
});

const orderSchema = new Schema<Order>(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: [true, "User ID is required"],
      ref: "User",
    },
    orderItems: [orderItemSchema],
    shippingAddress: shippingAddressSchema,
    paymentMethod: { type: String, required: [true, "Payment method is required"] },
    paymentResult: paymentResultSchema,
    itemsPrice: { type: Number, required: [true, "Items price is required"], default: 0.0 },
    taxPrice: { type: Number, required: [true, "Tax price is required"], default: 0.0 },
    shippingPrice: { type: Number, required: [true, "Shipping price is required"], default: 0.0 },
    totalPrice: { type: Number, required: [true, "Total price is required"], default: 0.0 },
    isPaid: { type: Boolean, required: [true, "Payment status is required"], default: false },
    paidAt: { type: Date },
    isDelivered: { type: Boolean, required: [true, "Delivery status is required"], default: false },
    deliveredAt: { type: Date },
  },
  { timestamps: true }
);

const Order = model<Order>("Order", orderSchema);
export default Order;
