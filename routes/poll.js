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
    Vote.find().then((votes) => res.json({succes:true,Votes:votes}))
               .catch((error) => console.log(error));
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
        return res.status(200).json({success:true, message: 'Voting was succesful'})   
    })
    .catch((error) => {
        console.log(error);
    });
})


module.exports = router;