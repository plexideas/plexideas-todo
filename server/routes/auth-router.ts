import { Router } from 'express'
import passport from 'passport';

const router = Router();

router.get('/login/success', (req, res) => {
  if (req.user) {
    res.json({
      success: true,
      message: "user has successfully authenticated",
      user: req.user,
      cookies: req.cookies
    })
  }
}); 

router.get('/login/failed', (req, res) => {
  res.status(401).json({
    success: false,
    message: "user failed to authenticate."
  });
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
});

router.get('/google', 
  passport.authenticate("google", {scope: ["profile", "email"]})
);

router.get('/google/callback', 
  passport.authenticate('google', { successRedirect: '/', failureRedirect: '/login' }),
);

export default router;
