const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Vote = require("../models/Vote");

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
    const newVote = {
        points: 1,
        os: req.body.os        
    }

    new Vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
    })
    .catch((error) => {
        return res.status(404).json({success:false, message: 'Something went wrong in the voting process, please try again'})
        console.log(error);
    });
    return res.status(200).json({success:true, message: 'Voting was succesful'})   
})


module.exports = router;