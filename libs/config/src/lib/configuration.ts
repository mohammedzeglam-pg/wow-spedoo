export const configuration = () => ({
  environment: process.env.NODE_ENV,
  port: parseInt(process.env.PORT || '3000', 10),
  admin: {
    phone: process.env.ADMIN_PHONE,
    password: process.env.ADMIN_PASSWORD,
    email: process.env.ADMIN_EMAIL,
  },
});
