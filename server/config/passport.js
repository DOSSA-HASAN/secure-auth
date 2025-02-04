import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import userModel from "../models/userModel";
import "dotenv/config"

passport.use(
    new GoogleStrategy(
        {
            clientID: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_SECRET_ID,
            callbackURL: "/google/callback"
        },

        async (accessToken, refreshToken, profile, done) => {
            try {
                const user = await userModel.findOne({ $or: [{ email: profile.emails[0].value }, { googleId: profile.id }] })

                if (!user) {
                    const newUser = new userModel({
                        name: profile.displayName,
                        googleId: profile.id,
                        email: profile.emails[0].values,
                        password: '',
                        isAccountVerified: true
                    })
                    const user = await newUser.save()
                }

                done(null, user)

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
        done(null, user)
    } catch (error) {
        done(error, null)
    }
})