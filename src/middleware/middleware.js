const cors = require("cors");
const express = require("express");
const { LOCAL_CLIENT, CLIENT } = require("../config/default");

// Strict whitelist of permitted origins
const allowedOrigins = new Set([
  "http://localhost:5173",
  "http://localhost:5174",
  "http://localhost:5175",
  "http://localhost:3000",
  "http://localhost:3001",
  "http://127.0.0.1:5173",
  "http://127.0.0.1:5174",
  "http://127.0.0.1:3000",
  "https://buetcricket.web.app",
  "https://buetcricket.firebaseapp.com",
]);

// Include environment-configured origins
const parseOrigins = (val) => {
  if (!val) return;
  val.split(",").forEach((item) => {
    const trimmed = item.trim().replace(/\/$/, "");
    if (trimmed) allowedOrigins.add(trimmed);
  });
};

parseOrigins(LOCAL_CLIENT);
parseOrigins(CLIENT);
parseOrigins(process.env.CLIENT);
parseOrigins(process.env.LOCAL_CLIENT);
parseOrigins(process.env.ALLOWED_ORIGINS);

const isOriginAllowed = (origin) => {
  if (!origin) return false;
  const clean = origin.trim().replace(/\/$/, "");

  if (allowedOrigins.has(clean)) return true;

  // Allow localhost / 127.0.0.1 on any port for local development
  if (/^https?:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/.test(clean)) {
    return true;
  }

  // Allow official buetcricket subdomains (Firebase / Vercel)
  if (
    /^https:\/\/buetcricket[a-z0-9-]*\.(web\.app|firebaseapp\.com|vercel\.app)$/.test(
      clean
    )
  ) {
    return true;
  }

  return false;
};

const corsOptions = {
  origin: (origin, callback) => {
    // Non-browser requests (e.g. server-to-server, curl, Postman)
    if (!origin) {
      return callback(null, true);
    }

    if (isOriginAllowed(origin)) {
      return callback(null, true);
    }

    // Block unknown origins completely
    return callback(new Error("Blocked by CORS: Unauthorized Network Origin"), false);
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: [
    "Content-Type",
    "Authorization",
    "X-Requested-With",
    "Accept",
    "Origin",
    "Access-Control-Request-Method",
    "Access-Control-Request-Headers",
  ],
  optionsSuccessStatus: 200,
};

const applyMiddleWare = (app) => {
  // Hide Express signature
  app.disable("x-powered-by");

  // Strict network security middleware: block untrusted origins immediately
  app.use((req, res, next) => {
    const origin = req.headers.origin;
    if (origin && !isOriginAllowed(origin)) {
      return res.status(403).json({
        error: "Access Denied: Unauthorized network origin",
        message: "No API response for unauthorized callers.",
      });
    }

    // Security headers
    res.setHeader("X-Content-Type-Options", "nosniff");
    res.setHeader("X-Frame-Options", "DENY");
    res.setHeader("X-XSS-Protection", "1; mode=block");
    res.setHeader("Referrer-Policy", "strict-origin-when-cross-origin");
    next();
  });

  // CORS middleware
  app.use(cors(corsOptions));
  app.options("*", cors(corsOptions));

  // Body parsers with size limit
  app.use(express.json({ limit: "10mb" }));
  app.use(express.urlencoded({ extended: true, limit: "10mb" }));
};

module.exports = applyMiddleWare;
