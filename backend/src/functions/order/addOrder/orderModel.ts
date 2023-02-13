export default {
  type: "object",
  properties: {
    user_id: { type: "string" },
    shopping_cart_id: { type: "string" },
    final_price: { type: "number" },
    city: { type: "string" },
    street: { type: "string" },
    date_to_deliver: { type: "string" },
    four_last_credit_digits: { type: "string" },
  },
  required: [
    "user_id",
    "shopping_cart_id",
    "final_price",
    "city",
    "street",
    "date_to_deliver",
    "four_last_credit_digits",
  ],
} as const;
