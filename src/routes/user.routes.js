const {Router} = require ('express')
const router = Router();

const { renderSignUpForm,
    SignUp,
    renderSigninForm,
    Signin,
    Logout
} = require('../controllers/user.controller')

router.get('/user/signup', renderSignUpForm);

router.post('/user/signup', SignUp)

router.get('/user/signin', renderSigninForm)

router.post('/user/signin', Signin)

router.get('/user/logout', Logout)
module.exports = router;