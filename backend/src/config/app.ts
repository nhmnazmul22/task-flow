export default {
  PORT: process.env.PORT || 3000,

  JWT: {
    SECRET_KEY: process.env.JWT_SECRET_KEY || "your-secret-key",
    EXPIRED_IN: process.env.JWT_EXPIRED_IN || "7d",
  }
};
