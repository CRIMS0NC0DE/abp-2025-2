import { CorsOptions } from "cors";

// Lista de endereços permitidos (Whitelist)
const allowedOrigins = [
  "http://localhost:3002",
  "http://localhost:5173",
  "http://127.0.0.1:5173",
  process.env.CORS_ORIGIN
];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (origin && allowedOrigins.includes(origin) || !origin) {
      callback(null, true); // Permite a requisição
    } else {
      callback(new Error("Not allowed by CORS")); // Bloqueia a requisição
    }
  },
  methods: ["GET"],
  allowedHeaders: ["Content-Type", "Authorization"],
};