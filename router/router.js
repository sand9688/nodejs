const express = require('express');
const router = express.Router(); //express 갖고잇는 기능 중에 router기능 사용

router.get('/plus', function(req,res){// /plus 라우터를 기능정의 및 등록
    console.log("/plus 라우터 호출")
    console.log(req.query.num1);
    console.log(req.query.num2);
    console.log(parseInt(req.query.num1)+parseInt(req.query.num2));
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.write("<html>");
    res.write("<body>");
    res.write("응답성공<br>");
    res.write('결과 값: '+ (parseInt(req.query.num1)+parseInt(req.query.num2)));
    res.write("</body>");
    res.write("</html>");
    res.end();

});

router.get('/cal', (req,res) => { // /cal 라우터 기능정의 및 등록
    //1. 사용자 입력한 값을 가져오기.
    let num1 = parseInt(req.query.num1);
    let num2 = parseInt(req.query.num2);
    let cal = req.query.cal 
    console.log(num1 + cal + num2)
    // 사용자가 입력한 기호에 맞는 연산결과 값을 브라우저에 출력하시오.
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.write("<html>");
    res.write("<body>");
    res.write("응답성공<br>");
    if (cal == '+' ){ 
        res.write('결과 값: '+ (parseInt(req.query.num1)+parseInt(req.query.num2)));
    }else if(cal == '-'){
        res.write('결과 값: '+ (parseInt(req.query.num1)-parseInt(req.query.num2)));
    }else if(cal == '*'){
        res.write('결과 값: '+ (parseInt(req.query.num1)*parseInt(req.query.num2)));
    }else if(cal == '/'){
        res.write('결과 값: '+ (parseInt(req.query.num1)/parseInt(req.query.num2)));
    }else{
        res.write('기호를 선택해 주세요');
    }
    res.write("</body>");
    res.write("</html>");
    res.end();

});

router.post('/Grade', (req,res) => { // /Grade 라우터 기능정의 및 등록
    const name = req.body.name;
    const java = parseInt(req.body.java);
    const web = parseInt(req.body.web);
    const iot = parseInt(req.body.iot);
    const android = parseInt(req.body.android);
    const avg = ((java+web+iot+android)/4)
    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.write("<html>");
    res.write("<body>");
    res.write("응답성공<br>");
    res.write('name : '+name+'<br>');
    res.write('java : '+java+'<br>');
    res.write('web : '+web+'<br>');
    res.write('iot : '+iot+'<br>');
    res.write('android : '+android+'<br>');
    res.write('avg : '+ avg+'<br>');
    if( avg > 100 ){
        res.write('표기오류')
    }else if (avg >= 95){
        res.write('Grade : A+');
    }else if( avg >= 90){
        res.write('Grade : A');
    }else if( avg >= 85) {
        res.write('Grade : B+');
    }else if ( avg >= 80) {
        res.write('Grade : B');
    }else if( avg >= 75) {
        res.write('Grade : C');
    }else{
        res.write('Grade : F');
    }

    res.write("</body>");
    res.write("</html>");
    res.end();
    
});

router.post('/join', function(req,res){// /plus 라우터를 기능정의 및 등록
    const id = req.body.id 
    const name= req.body.name
    const email= req.body.email
    const tel = req.body.tel
    // const man = req.body.man;
    const country= req.body.country
    const birth = req.body.birth
    const color = req.body.color
    // const study = req.body.study;
    // const eating = req.body.eating;
    // const sport = req.body.sport;
    const talk = req.body.talk;

    const gender = req.body.gender;
    const hobby = req.body.hobby;
    // let hobby = "";
    // let gender= "";
    // if (man == "on"){
    //     gender = "Man";
    // }else{
    //     gender = "Woman";
    // };
    // if (study=="on"){
    //     hobby += "Study";
    //     hobby+= " ";
    // };
    // if (eating == "on"){
    //     hobby += "Eating"
    //     hobby += " ";
    // };
    // if (sport == "on"){
    //     hobby += "Sport"
    //     hobby += " ";
    // };

    res.writeHead(200, {"Content-Type": "text/html;charset=utf-8"});
    res.write("<html>");
    res.write("<body>");
    res.write("응답성공<br>");
    res.write('id:' + id + '<br>')
    res.write('name:' + name +'<br>')
    res.write('email:' + email + '<br>')
    res.write('tel:' + tel + '<br>')
    res.write('Gender:' + gender + '<br>')
    res.write('Country :' + country + '<br>')
    res.write('Birth:' + birth + '<br>')
    res.write('Color :' + color + '<br>')
    res.write('Hobby:' + hobby + '<br>')
    res.write('Talk :' + talk + '<br>')
    res.write("</body>");
    res.write("</html>");
    res.end();

});





module.exports = router;