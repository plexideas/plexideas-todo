"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const passport_1 = __importDefault(require("passport"));
const router = express_1.Router();
router.get('/login/success', (req, res) => {
    if (req.user) {
        res.json({
            success: true,
            message: "user has successfully authenticated",
            user: req.user,
            cookies: req.cookies
        });
    }
});
router.get('/login/failed', (req, res) => {
    res.status(401).json({
        success: false,
        message: "user failed to authenticate."
    });
});
router.get('/logout', (req, res) => {
    var _a;
    (_a = req.session) === null || _a === void 0 ? void 0 : _a.destroy(() => {
        req.logout();
        res.redirect('/');
    });
});
router.get('/google', passport_1.default.authenticate("google", { scope: ["profile", "email"] }));
router.get('/google/callback', passport_1.default.authenticate('google', { successRedirect: 'http://localhost:3000', failureRedirect: '/api/auth/login/failed' }));
exports.default = router;
