const { response } = require('express');
const express = require('express');
const EJSrouter = express.Router(); //express 갖고잇는 기능 중에 router기능 사용

EJSrouter.get("/ejs01", (req,res)=> {

    console.log("/ejs01 라우터실행")
    res.render("ex01EJS",{ }); 
})

module.exports = EJSrouter;
