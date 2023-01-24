const express = require('express');
const router = express.Router();

router.post('/login' , (req , res) => {
    const User = req.body;
    if(User.username == 'admin' && User.password == 'admin'){
        const response = {
            status : true,
            id : req.session.id
        }

        res.send(response);
    }
    else{
        res.send({staus : false});
    }
})

router.get('/logout' , (req , res) => {
    req.session.destroy();
    res.send(true);
})

module.exports = router;