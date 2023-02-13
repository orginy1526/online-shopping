export default {
  type: "object",
  properties: {
    id: { type: "string" },
    products: { type: "object" },
    created_at: { type: "string" },
  },
  required: ["id", "products", "created_at"],
} as const;
