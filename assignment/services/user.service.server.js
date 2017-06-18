var app = require('../../express');
var userModel = require('../models/user/user.model.server');
var bcrypt = require("bcrypt-nodejs");
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var googleConfig = {
    clientID     : process.env.GOOGLE_CLIENT_ID,
    clientSecret : process.env.GOOGLE_CLIENT_SECRET,
    callbackURL  : process.env.GOOGLE_CALLBACK_URL
};
passport.use(new GoogleStrategy(googleConfig, googleStrategy));
function googleStrategy(token, refreshToken, profile, done) {
    console.log(profile);

    userModel
        .findUserByGoogleId(profile.id)
        .then(
            function (user) {
                if (user) {
                    return done(null, user);
                } else {
                    var email = profile.emails[0].value;
                    var emailParts = email.split("@");
                    var newGoogleUser = {
                        username: emailParts[0],
                        firstName: profile.name.givenName,
                        lastName: profile.name.familyName,
                        email: email,
                        google: {
                            id: profile.id,
                            token: token
                        }
                    };
                    return userModel.createUser(newGoogleUser);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        )
        .then(
            function (user) {
                return done(null, user);
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );

}
app.get('/auth/google/callback',
    passport.authenticate('google', {
        successRedirect: '/assignment/#!/profile',
        failureRedirect: '/assignment/#!/login'
    }));
passport.use(new LocalStrategy(localStrategy));
passport.serializeUser(serializeUser);
passport.deserializeUser(deserializeUser);

app.post('/api/assignment/user', createUser);
app.get('/api/assignment/user/username/:username', findUserByUsername); //fix this!
app.get('/api/assignment/user/username/:username/password/:password', findUserByCredentials);
app.get('/api/assignment/user/:userId', findUserById);
app.put('/api/assignment/user/:userId', updateUser);
app.delete('/api/assignment/user/:userId', deleteUser);

app.post('/api/assignment/login', passport.authenticate('local'), login);
app.get('/api/assignment/checkLoggedIn', checkLoggedIn);
app.post('/api/assignment/logout', logout);
app.post('/api/assignment/register', register);
app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));

var users = [
    {_id: "123", username: "alice", password: "alice", firstName: "Alice", lastName: "Wonder"},
    {_id: "234", username: "bob", password: "bob", firstName: "Bob", lastName: "Marley"},
    {_id: "345", username: "charly", password: "charly", firstName: "Charly", lastName: "Garcia"},
    {_id: "456", username: "jannunzi", password: "jannunzi", firstName: "Jose", lastName: "Annunzi"}
];

function localStrategy(username, password, done) {
    userModel
        .findUserByUsername(username)
        .then(
            function (user) {
                console.log(user);
                if (user && bcrypt.compareSync(password, user.password)) {
                    return done(null, user);
                } else {
                    return done(null, false);
                }
            },
            function (err) {
                if (err) {
                    return done(err);
                }
            }
        );
}

function login(req, res) {
    var user = req.user;
    res.json(user);
}
function logout(req, res) {
    req.logout();
    res.sendStatus(200);
}
function register(req, res) {
    var user = req.body;
    user.password = bcrypt.hashSync(user.password);
console.log(user.password);
    userModel
        .createUser(user)
        .then(function (user) {
            req.login(user, function (status) {
                res.send(user);
            });
        }, function (err) {
            res.send(err);
        });
}
function deleteUser(req, res) {
    var userId = req.params.userId;
    userModel
        .deleteUser(userId)
        .then(function () {
            res.sendStatus(200);
        }, function (err) {
            res.send(err);
        });
}

function updateUser(req, res) {
    var user = req.body;
    var userId = req.params.userId;
    userModel
        .updateUser(userId, user)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });

}
function findUserByCredentials(req, res) {
    var username = req.params.username;
    var password = req.params.password;
    userModel
        .findUserByCredentials(username, password)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserByUsername(req, res) {
    var username = req.params.username;
    console.log('finding by username');
    console.log(username);
    userModel
        .findUserByUsername(username)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.send(err);
        });
}

function findUserById(req, res) {
    var userId = req.params['userId'];
    userModel
        .findUserById(userId)
        .then(function (user) {
            res.json(user);
        }, function (err) {
            res.send(err);
        });
    /*var user = users.find(function (user) {
     return user._id === userId;
     });
     res.send(user);*/
}
function createUser(req, res) {
    var user = req.body;
    userModel
        .createUser(user)
        .then(function (user) {
            res.send(user);
        }, function (err) {
            res.send(err);
        });
    // user._id = (new Date()).getTime() + "";
    // users.push(user);
}

function serializeUser(user, done) {
    done(null, user);
}

function deserializeUser(user, done) {
    userModel
        .findUserById(user._id)
        .then(
            function (user) {
                done(null, user);
            },
            function (err) {
                done(err, null);
            }
        );
}
function checkLoggedIn(req, res) {
    if (req.isAuthenticated()) {
        res.json(req.user);
    }
    else {
        res.send('0');
    }
}