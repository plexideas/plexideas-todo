export default {
  Query: {
    profile(root: any, args: any, req: any) {
      if (req.user) {
        return req.user;
      }
      return'Not Authenticated!';
    },
  },
}
