const express = require('express');
const DBrouter = express.Router(); //express 갖고잇는 기능 중에 router기능 사용
const conn = require('../config/DBConfig.js');

DBrouter.post('/Login', (req,res) => { // /Grade 라우터 기능정의 및 등록
    const id = req.body.id;
    const pw = req.body.pw;

    let sql = 'select * from member where id = ? and pw=?';

    conn.query(sql,[id,pw], (err, row) => {
        if (err){
            console.log("로그인 실패 : "+err);
        }else if(row.length > 0 ) {
            console.log(id);
            req.session.user = id;
            console.log("session 영역 id 저장 성공" + req.session.user);
            res.render('LoginS',{
                cor_id : id
            })
        }else if (row.length == 0 ){
            res.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html");
        }
    });
    
    // if (id == 'smart' && pw == '123'){
    //     res.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginS.html");
    // }else{
    //     res.redirect("http://127.0.0.1:5500/mynodejs/public/ex05LoginF.html");
    // }
    
    
});

DBrouter.post('/JoinDB', (req,res) => { // /Grade 라우터 기능정의 및 등록
    const id = req.body.id;
    const pw = req.body.pw;
    const nick = req.body.nick;

    let sql = 'insert into member values(?,?,?)';

    conn.query(sql, [id,pw,nick], (err,row) => {
        if(!err){
            console.log('입력성공' + row);
            res.redirect("http://127.0.0.1:3000/Main")
        }else{
            console.log('입력실패 : '+ err);
        }
    });
});

DBrouter.get('/Delete', (req,res) => { // /Grade 라우터 기능정의 및 등록
    
    const id = req.query.id;
    let sql = "delete from member where id = ?";

    conn.query(sql, id, (err,row) => {
        if(err){
            console.log('삭제실패 : '+ err);
        }else if(row.affectedRows>0){
            console.log("명령의 성공한 수" + row.affectedRows);
            res.redirect("http://127.0.0.1:3000/Main")
        }else if(row.affectedRows == 0){
            
            console.log("명령의 성공한 수 가 없습니다");
        }
    });
});

DBrouter.post('/Update', (req,res) => { // /Grade 라우터 기능정의 및 등록
    const select = req.body.select
    const id = req.body.id;
    const data = req.body.data;

    if (select == 'pw'){
        sql = "update member set pw=? where id=?";
        

    }else if(select== 'nick'){
        sql = "update member set nick=? where id=?";
        
    }
    // const sql =`update member set ${select}=${data} where id=${id}`
    conn.query(sql, [data, id], (err,row) => {
        if(err){
            console.log('수정실패 : '+ err);
        }else if(row.affectedRows>0){
            console.log("명령의 성공한 수" + row.affectedRows);
            res.redirect("http://127.0.0.1:3000/Main")
        }else if(row.affectedRows == 0){
            
            console.log("명령의 성공한 수 가 없습니다");
        }
    });
});

DBrouter.get('/SelectAll', (req,res) => {// /plus 라우터를 기능정의 및 등록
    let sql = 'select * from member';

    conn.query(sql, (err, row) => {
        if (err){
            console.log("검색 실패 : "+err);
        }else if(row.length > 0 ) {
            res.render("SelectAll",{
                row_names : row
            })
        }else if (row.length = 0 ){
            console.log("검색된 데이터가 없습니다.")
        }
    });
});

DBrouter.get('/SelectOne', (req,res) => {// /plus 라우터를 기능정의 및 등록
    const id = req.query.id

    let sql = 'select * from member where id = ?';

    conn.query(sql,[id], (err, row) => {
        if (err){
            console.log("검색 실패 : "+err);
        }else if(row.length > 0 ) {
            res.render("SelectOne",{
                row_name :row
            })
        }else if (row.length == 0 ){
            console.log("검색된 데이터가 없습니다.")
        }
    });
});

DBrouter.get('/SelectDelete', (req,res) => { // /Grade 라우터 기능정의 및 등록
    
    const id = req.query.id;
    let sql = "delete from member where id = ?";

    conn.query(sql, id, (err,row) => {
        if(err){
            console.log('삭제실패 : '+ err);
        }else if(row.affectedRows>0){
            console.log("명령의 성공한 수" + row.affectedRows);
            res.redirect("http://127.0.0.1:3000/SelectAll")
        }else if(row.affectedRows == 0){
            
            console.log("명령의 성공한 수 가 없습니다");
        }
    });
});

DBrouter.get('/Main', (req,res) => {
    res.render("Main",{
        id : req.session.user
    });
});
DBrouter.get('/Logout', (req,res) => {
    delete req.session.user;
    res.render("Main",{
        id : req.session.user
    });
});

module.exports = DBrouter;