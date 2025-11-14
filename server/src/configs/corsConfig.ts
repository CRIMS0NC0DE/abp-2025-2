import { CorsOptions } from "cors";

const allowedOrigins = [process.env.CORS_ORIGIN || "http://localhost:3002"];

export const corsOptions: CorsOptions = {
  origin: (origin, callback) => {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ["Content-Type", "Authorization"],
  // Permite que o frontend (fetch) leia este cabeçalho
  exposedHeaders: ['Content-Disposition'],
};


