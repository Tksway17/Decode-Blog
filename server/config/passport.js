const passport = require('passport')
const User = require('../auth/User')
const bcrypt = require('bcrypt')
const LocalStrategy = require('passport-local')
const GitHubStrategy = require("passport-github2").Strategy;

passport.use(new LocalStrategy(
    {
        usernameField: 'email'
    },
    function(email, password, done){
        User.findOne({email}).then(user => {
        if(user.password){
            bcrypt.compare(password, user.password, function(err, result) {
                if (err) {return done(error)}
                if(result) {return done (null, user)}
            });
        }else{
            return done('Пользователь не найден')
        }
        }).catch(e => {
            return done(e)
        })
    }
))

passport.use(
    new GitHubStrategy(
        {
            clientID: "Ov23liJydBS1l7iMVlqZ",
            clientSecret: "a8869c3ccc55fd6a2a28a664ce943cd52814114d",
            callbackURL: "http://localhost:3001/api/auth/github",
            scope: ["user", "email"],
        },
        async function (accessToken, refreshToken, profile, cb) {
            try {
                let user = await User.findOne({ githubId: profile.id });
                if (!user) {
                    user = await new User({
                        githubId: profile.id,
                        full_name: profile.displayName,
                        email: profile.emails[0].value,
                    }).save();
                }
                return cb(null, user);
            } catch (err) {
                return cb(err, null);
            }
        }
    )
);

passport.serializeUser(function(user, done) {
    done(null, user._id)
})
passport.deserializeUser(function(id, done){
    User.findById(id).then((user, err) => {
        done(err, user)
    })
})
