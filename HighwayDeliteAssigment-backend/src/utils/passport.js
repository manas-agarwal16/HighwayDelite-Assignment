import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { User } from "../models/users"; // adjust import based on your structure

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails?.[0]?.value;

        if (!email) {
          return done(new Error("Google account has no email."), null);
        }

        // Check if user already exists
        let user = await User.findOne({ where: { email } });

        if (user) {
          if (user.authProvider !== "google") {
            // 🚫 Signed up via OTP → block Google login
            return done(
              new Error(
                "This email is registered with OTP login. Please use OTP login instead."
              ),
              null
            );
          }
          // Already a Google user → login
          return done(user, null);
        }

        // No auto-signup via Google
        return done(
          new Error("No account found. Please sign up using OTP first."),
          null
        );

      } catch (err) {
        console.error("Error in Google Strategy:", err);
        return done(err, null);
      }
    }
  )
);

export default passport;
