const Photo = require('../models/Photo');
const petsManager = require('../manager/petsManager');
const { getErrorMessage } = require('../utils/errorHandler.js');
const { isAuth } = require('../middleware/authMiddleware.js');

const router = require('express').Router();




router.get('/', async (req, res) => {
    

       const pet = await petsManager.getAll();
         res.render('photo', {pet})
    
   
});




router.get('/create', (req, res) => {
    res.render('photo/create')
});

router.post('/create', async (req, res) => {
   
    const photoData = {
        ...req.body,
        owner: req.user._id,
    }
        
try {
    await petsManager.create(photoData)
    res.redirect('/photo')
    
} catch (err) {

     res.render('photo/create', {error: getErrorMessage(err)})
    
}
    




});

router.get('/:photoId', async (req,res) => {

    try {
        const photoId = req.params.photoId;
        const photo = await petsManager.getOne(photoId).lean();
        const isOwner = req.user?._id == photo.owner._id;
        const userEmails = photo.votes
        const userMail = req.user?.email
        const hasVoted = userEmails.map((x => x == userMail))
    
      
        
            res.render('photo/details', { photo, isOwner, userEmails, hasVoted})
        
      

    
        
    } catch (error) {
        
        res.render('photo/details', {error: getErrorMessage(error)})
        
    }



})
router.get('/:photoId/delete', async (req, res) => {

    try {
        const photo = await petsManager.delete(req.params.photoId);
        res.redirect('/')
        
    } catch (error) {
        
        res.render('photo/details', {error: getErrorMessage(error)})
    }

    
});

router.get('/:photoId/edit', async (req, res) => {

    

    try {
        const photo = await petsManager.getOne(req.params.photoId).lean();
    
        res.render('photo/edit', { photo })
        
    } catch (error) {
        
        res.render('photo/edit', {error: getErrorMessage(error)})

    }

});


router.post('/:photoId/edit', async (req, res) => {
const petData = req.body;
const photoId = req.params.photoId



try {
    await petsManager.edit(photoId, petData);
    res.redirect(`/photo/${photoId}`) 
    
} catch (err) {
    res.render('/', {error: getErrorMessage(err)})
}

}); 





router.get('/:photoId/vote', isAuth,  async (req, res) => {
    const email = req.user.email.toString()
    await petsManager.votePhoto(email, req.params.photoId)
  
    
    res.redirect(`/photo/${req.params.photoId}`)

});








module.exports = router; 