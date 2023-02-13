export default {
  type: "object",
  properties: {
    user_id: { type: "string" },
    products: { type: "object" },
    price: { type: "number" },
    cart_status: { type: "string" },
    created_at: { type: "string" },
  },
  required: ["user_id", "products", "price", "cart_status"],
} as const;
