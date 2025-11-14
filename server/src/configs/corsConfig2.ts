const corsOptions = {
  origin: 'http://localhost:5173', // Ou use '*' para testes
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['Content-Disposition'],
};

export { corsOptions };