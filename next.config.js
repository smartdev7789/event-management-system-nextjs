const withTM = require("next-transpile-modules")([
  "@babel/preset-react",
  "@fullcalendar/daygrid",
  "@fullcalendar/interaction",
  "@fullcalendar/react",
]);

module.exports = withTM({
  reactStrictMode: true,
  serverRuntimeConfig: {
    secret:
      "THIS IS USED TO SIGN AND VERIFY JWT TOKENS, REPLACE IT WITH YOUR OWN SECRET, IT CAN BE ANY STRING",
  },
  publicRuntimeConfig: {
    apiUrl:
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000/api" // development api
        : "https://event-management-system-nextjs-sta9.vercel.app/api", // production api
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
});
