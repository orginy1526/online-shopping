export default {
  type: "object",
  properties: {
    id: { type: "string" },
    created_at: { type: "string" },
  },
  required: ["id", "created_at"],
} as const;
