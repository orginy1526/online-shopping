export default {
  type: "object",
  properties: {
    category: { type: "string" },
    user_id: { type: "string" },
    product_name: { type: "string" },
    price: { type: "number" },
    image: { type: "string" },
  },
  required: ["category", "product_name", "price", "image"],
} as const;
