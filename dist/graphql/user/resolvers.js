"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    Query: {
        profile(root, args, req) {
            if (req.user) {
                return req.user;
            }
            return 'Not Authenticated!';
        },
    },
};
