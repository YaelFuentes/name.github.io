import { withIronSession } from "next-iron-session";

export default function withSession(handler) {
  return withIronSession(handler, {
    password: '5y:j$Q$x>8f9~Fqj81J$In6rb?JsWe?"K;',
    cookieName: "dev_cookieMevepTest",
    cookieOptions: {
      // the next line allows to use the session in non-https environments like
      // Next.js dev mode (http://localhost:3000)
      secure: process.env.NODE_ENV === "production" ? true :false,
      maxAge: 60 * 60,
    },
  });
}
