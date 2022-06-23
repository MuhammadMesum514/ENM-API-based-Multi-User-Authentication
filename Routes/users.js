const router=require('express').Router();
// * BRING User register method
const {userRegister} = require('../utils/Auth');
//* user registration route
router.post('/user-registration', async(req, res) => {
    // res.status(200).json("successfully registered");
    await userRegister(req.body,'user', res);    
});
//* Admin registration route
router.post('/admin-registration', async(req, res) => {
    await userRegister(req.body,'admin', res);    
    
});
//* SuperAdmin registration route
router.post('/superAdmin-registration', async(req, res) => {
await userRegister(req.body,'superadmin', res);    

});


//* User login route
router.post('/user-login', async(req, res) => {});
//* Admin login route
router.post('/admin-login', async(req, res) => {});
//* superAdmin login route
router.post('/superAdmin-login', async(req, res) => {});


//* profile route
router.get('/profile', (req, res) => {});

//* User protected route
router.post('/user-protected', async(req, res) => {});
//* Admin protected route
router.post('/admin-protected', async(req, res) => {});
//* superAdmin protected route
router.post('/superAdmin-protected', async(req, res) => {});

module.exports = router;