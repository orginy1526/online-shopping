export default {
  type: "object",
  properties: {
    first_name: { type: "string" },
    last_name: { type: "string" },
    email: { type: "string" },
    password: { type: "string" },
    city: { type: "string" },
    street: { type: "string" },
  },
  required: ["first_name", "last_name", "email", "password", "city", "street"],
} as const;
