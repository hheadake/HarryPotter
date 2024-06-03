const router = require('express').Router();
const userManager = require('../manager/userManager');
const { getErrorMessage } = require('../utils/errorHandler.js');
const petsManager = require('../manager/petsManager');




router.get('/profile', async (req, res) => {

    const photos = await petsManager.getByOwner(req.user._id).lean();
    const email = req.user.email
    console.log(email)
    res.render('users/profile', { photos, email})


});

router.get('/login', (req,res) => {
    res.render('users/login')
});

router.post('/login', async (req,res) => {
    const { email, password } = req.body;

    
try {
    const token = await userManager.login(email, password);
    res.cookie('token', token)
    res.redirect('/');
    
} catch (err) {
    
    res.render('users/login', { error: getErrorMessage(err)})
}

});

router.get('/register', (req,res) => {
    res.render('users/register')
});

router.post('/register', async (req,res) => {
    const { firstName, lastName, email, password, repeatPassword } = req.body;

    try {
        await userManager.register({firstName, lastName, email, password, repeatPassword});
        res.redirect('/')
        
    } catch (err) {
        res.render('users/register', {error: getErrorMessage(err)})
    }

});


router.get('/logout', (req,res) => {
    res.clearCookie('token');
    res.redirect('/')
});





module.exports = router; 