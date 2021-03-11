var express = require('express');
var router = express.Router();
const util = require('util');
const fs = require('fs');

const stat = util.promisify(fs.stat);

var movie1={
    title: "Inception",
    character: "Leonardo DiCaprio, Ken Watanabe",
    genre:"Science fiction",
    imgpath:"/images/poster_1.jpg"
}

var movie2={
    title: "Begin Again",
    character:"Keira Knightley, Mark Ruffalo",
    genre:"Romance",
    imgpath:"/images/poster_2.jpg"
}

var movie3={
    title: "About Time",
    character: "Domhnall Gleeson, Rachel McAdams",
    genre:"Romance",
    imgpath:"/images/poster_3.jpg"
}
async function callStat(path) {
    //p='/public'+path
    try{
        const stats = await stat(path);
        //console.log(stats);
    } catch (err){
        console.log(err);
    }
}

router.post('/',function(req,res){
    var mvtitle=req.body.mvtitle;
    var character=req.body.character;
    var genre=req.body.genre;
    var imgpath=req.body.imgpath;
    var score=req.body.score;
    var dir='./public'

    try{
        if(mvtitle==undefined||!(character)||!(genre))
            throw new Error("undefined");
    }catch (e) {
        res.send("undefined!!");
    }



    imgF='./public'+imgpath;
    res.sendFile(imgF, { root: '.' })

    callStat(imgF);

    if(mvtitle===movie1.title){
        res.render('result',{title:'Express', movie:movie1,score:score, imgPath:imgpath});
    }
    else if(mvtitle===movie2.title){
        res.render('result',{title:'Express', movie:movie2,score:score,imgPath:imgpath});
    }
    else if(mvtitle===movie3.title){
        res.render('result',{title:'Express', movie:movie3, score:score,imgPath:imgpath});
    }
    else{

    }



})

module.exports = router;