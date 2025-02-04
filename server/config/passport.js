import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/userModel";
import "dotenv/config"

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.envGOOGLE_SECRET_ID,
            callbackURL: '/auth/google/callback'
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ $or: [{ email: profile.emails[0].value }, { googleId: profile.id }] })

                if (!user) {
                    const newUser = new userModel({
                        name: profile.displayName,
                        password: '',
                        email: profile.emails[0].value,
                        isAccountVerified: true,
                        googleId: profile.id
                    })
                    user = await newUser.save()
                }

                done(user, null)

            } catch (error) {
                done(error, null)
            }
        }
    )
)

passport.serializeUser((user, done) => {
    done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
    try {

        const user = await userModel.findById(id)
        done(user, null)

    } catch (error) {
        done(error, null)
    }
})