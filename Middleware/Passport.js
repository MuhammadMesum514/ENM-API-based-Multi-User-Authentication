const User = require('../Models/User-Schema');
const {SECRET}= require('../Config/index');
const {Strategy,ExtractJwt} = require('passport-jwt'); 
const passport = require('passport');
const { use } = require('passport');

const opts={
    jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey : SECRET,

}
module.exports =passport => {
    passport.use(new Strategy(opts,async(jwt_payload,done)=>{
      await User.findById(jwt_payload.user_id).then(user=>{
        if (user){
            return done(null, user);
        }
        else{   return  done(null, false); }
      }).catch(err=>{
        return done(err, false);
      });  
    }))
}