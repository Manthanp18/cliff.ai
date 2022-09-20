import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

export default NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  secret: process.env.JWT_SECRET,
  jwt: {
    encryption: true,
  },

  //   callbacks: {
  //     async jwt(token, account) {
  //       if (account?.accessToken) {
  //         token.accessToken = account.accessToken;
  //       }
  //       return token;
  //     },
  //     redirect: async (url, _baseUrl) => {
  //       if (url === "/subscription") {
  //         return Promise.resolve("/subscription");
  //       }
  //       return Promise.resolve("/subscription");
  //     },
  //   },
});
