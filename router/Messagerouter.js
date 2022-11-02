const express = require('express');
const Messagerouter = express.Router();
const conn = require('../config/DBConfig.js');

//1.app.js 미들웨어 등록
//2. DBConfig.js

Messagerouter.get('/Message', (req,res) => {
    // 현재 로그인한 사람에게 온 메세지를 검색

    let sql ="select * from web_message where rec=?"
    if(req.session.user){
        conn.query(sql, [req.session.user.email], (err,row)=>{
            console.log(row);
            res.render("message",{
                user : req.session.user,
                row_name : row
        
            });
            
        })
    }else{
        res.render("message",{
            user : req.session.user
    
        });
    }
    
});

Messagerouter.post('/MessageJoin', (req,res) => {
    const email = req.body.email;
    const pw = req.body.pw;
    const tel = req.body.tel;
    const address = req.body.address;

    let sql = 'insert into web_member values(?,?,?,?,now())';

    conn.query(sql, [email,pw,tel,address], (err,row) => {
        if(!err){
            console.log('입력성공' + row);
            res.redirect("http://127.0.0.1:3000/Message")
        }else{
            console.log('입력실패 : '+ err);
        }
    });
    

});

Messagerouter.post('/MessageLogin', (req,res) => {
    const email = req.body.email;
    const pw = req.body.pw;

    let sql = 'select * from web_member where email = ? and pw=?';
    conn.query(sql,[email,pw], (err, row) => {
        if (err){
            console.log("로그인 실패 : "+err);
        }else if(row.length > 0 ) {
            console.log(email);
            req.session.user = {
                "email" : row[0].email,
                'tel' : row[0].tel,
                'address' :row[0].address
            };
            console.log("session 영역 id 저장 성공" + req.session.user);
            res.redirect('http://127.0.0.1:3000/Message')
        }else if (row.length == 0 ){
            res.render('message',{

            })
        }
    });
});

Messagerouter.get('/MessageLogout', (req,res) => {
    delete req.session.user

    res.redirect("http://127.0.0.1:3000/Message");
});

Messagerouter.get('/MessageUpdate', (req,res) => {

    //update.ejs 파일을 랜더링
    res.render("update",{
        user : req.session.user
    });
});

Messagerouter.post('/MessageUpdateExe', (req,res) => {
    const email = req.session.user.email
    const pw = req.body.pw;
    const tel = req.body.tel;
    const address = req.body.address;

    let sql = 'update web_member set pw = ?, tel = ?, address = ? where email = ?';

    conn.query(sql, [pw,tel,address,email], (err,row) => {
        if(!err){
            console.log('입력성공' + row);

            req.session.user = {
                "email" : pw,
                "tel" : tel,
                "address": address,
            };

            res.redirect("http://127.0.0.1:3000/Message")
        }else{
            console.log('입력실패 : '+ err);
        }
    });
    

});

Messagerouter.get('/MessageSelectAll', (req,res) => {// /plus 라우터를 기능정의 및 등록
    let sql = 'select * from web_member';

    conn.query(sql, (err, row) => {
        if (err){
            console.log("검색 실패 : "+err);
        }else if(row.length > 0 ) {
            res.render("selectMember",{
                row_names : row
            })
        }else if (row.length = 0 ){
            console.log("검색된 데이터가 없습니다.")
        }
    });
});

Messagerouter.get('/MessageDelete', (req,res) => {// /plus 라우터를 기능정의 및 등록
    
    let email = req.query.email
    
    let sql = 'delete from web_member where email = ?';

    conn.query(sql, email, (err, row) => {
        if (!err){
            console.log("삭제 성공")
            res.redirect("http://127.0.0.1:3000/MessageSelectAll")
        }else{
            console.log("삭제실패 :"+err)
        }
    });
});

Messagerouter.post('/MessageSend', (req,res) => {

    const send = req.body.send;
    const rec = req.body.rec;
    const content = req.body.content;

    let sql = 'insert into web_message(send, rec, content, send_date) values(?, ?, ?, now())';

    conn.query(sql, [send,rec,content], (err,row) => {
        if(!err){
            console.log('전송성공' + row);
            res.redirect("http://127.0.0.1:3000/Message")
        }else{
            console.log('전송실패 : '+ err);
        }
    });
    

});






module.exports = Messagerouter;