import { withIronSessionApiRoute } from 'iron-session/next';

export default withIronSessionApiRoute(
  function logout(req, res) {
    req.session.destroy();
    res.send({ ok: true });
  },
  {
    cookieName: 'givexlm_session',
    password: process.env.IRON_SESSION_KEY,
    // secure: true should be used in production (HTTPS) but can't be used in development (HTTP)
    cookieOptions: {
      secure: process.env.NODE_ENV === 'production'
    }
  }
);
