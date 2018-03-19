const express = require("express");
const router = express.Router();

const Pusher = require('pusher');

var pusher = new Pusher({
    appId: '494374',
    key: '33cff15253d6e12abb18',
    secret: '2d9761e635c34d576033',
    cluster: 'eu',
    encrypted: true
});

router.get('/',(req,res) => {
    res.send('POLL');
});

router.post('/',(req,res) => {
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });
    return res.status(200).json({success:true, message: 'Thank you for voting'});
})


module.exports = router;