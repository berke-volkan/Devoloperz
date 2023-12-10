import { authMiddleware } from "@clerk/nextjs";
 
// This example protects all routes including api/trpc routes
// Please edit this to allow other routes to be public as needed.
// See https://clerk.com/docs/references/nextjs/auth-middleware for more information about configuring your Middleware
export default authMiddleware({
      publicRoutes: [
<<<<<<< HEAD
            "/","/blog","/blog/adm","/api/cortex"
=======
            "/","/blog","/blog/adm",/^\/l\//
>>>>>>> a110e6357021ed3e7be487e33eba9e8927171adb
      ]
});
 
export const config = {
      matcher: ['/((?!.+\\.[\\w]+$|_next).*)', '/', '/(api|trpc)(.*)'],
};
 
