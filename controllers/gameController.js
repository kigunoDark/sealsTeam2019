const UserM = require('../models/moksModel');
const uuid = require('uuidv4');
const nodemailer = require('nodemailer');
const sendgridTransport= require('nodemailer-sendgrid-transport');
const env = require('dotenv').config();

const transporter = nodemailer.createTransport(sendgridTransport({
    auth:{
        api_key: process.env.SENDGRID_API_KEY
    }
}));


exports.getFishing = (req, res) => {
    res.render('./moks/fishing');
};

exports.postFish = async ( req, res) =>{
    const user = await isLoggedIn(req);
    if(!user) res.render('fucku');
    const link = `http://localhost:3000/friend/${uuid()}`;

    try {
     const updatelink = await UserM.update(
        { link },
        { where: { id: user.id }});

    console.log(`postFish win result----> ${updatelink}`); 
    } catch (err) {
        console.log(`postFish result ---->${err}`);
    };
    
    const name = req.body.name;
    const surname = req.body.surname;
    const hobby = req.body.hobby;
    const email = req.body.email;

    console.log(name)
    console.log(surname);
    console.log(hobby);

    
    transporter.sendMail({
        to: email,
        from: 'kiguno1996@gmail.com',
        subject: "Ты можешь стать кем угодно!!",
        html: `<p style="text-align: justify; padding: 5%; margin: 0 auto;">Поздравляем ${name} ${surname}, у вас есть уникальная возможность!</p>
        <p style="text-align: justify; padding: 5%; margin: 0 auto;">Станьте участником нашего конкурса и получите приз в размере 5000000 рублей, раелизовав мечту ${hobby}. сылка - ${link}</p>`,

    },function(err){
        if(err){
            res.status(500).send('неработает отправка писемь, сорян бро');
        };
    });

    res.status(201).send('сообщение доставлено');
}

exports.getFishPage = async (req,res) => {
    let score = 0;
    const link = `http://localhost:3000/friend/${req.params.link}`
    console.log('ссылка по котороый перешли       ' + req.params.link);
    try {
        let user = await UserM.findOne({
            where: {link },
            attributes:['score']
        });
        score = user.score;
        score = +score + 10;
        const updateScore = await UserM.update(
            { score : score },
            { where: { link}});
        console.log(`getFishPage win---> ${updateScore}`);
        res.render('./moks/fishpage');
    } catch (err) {
        console.log(`getFishPage lose---> ${err}`);
        res.render('404');
    };
       
};

//authentication  function
async function isLoggedIn (req) {
    const result = {};
    try {
        let user = await UserM.findOne({
            where: { cookie : req.cookies.seals},
            attributes:['name','avatar','id','email','phone','link','score']
        });
        result.name = user.name;
        result.avatar = user.avatar;
        result.id = user.id;
        result.status = true;
        result.email = user.email;
        result.link = user.link;
        result.phone = user.phone;
        result.score = user.score;
    } catch (error) {
        result.status = false;
    }
    return result;
}; 

