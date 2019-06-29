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
}
exports.postFish = ( req, res) =>{
    const user = isLoggedIn(req);
    if(!user) res.render('fucku');
    const link = uuid();

    UserM.update(
        { link: link },
        { where: { email: user.email } }
    )
    .then(result =>
        console.log(`postFish result----> ${result}`)
    )
    .catch(err =>{
        console.log(`postFish result ---->${err}`);
    });       

    const name = req.body.name;
    const surname = req.body.surname;
    const hobby = req.body.hobby;
    const email = req.body.email;

    console.log(name)
    console.log(surname);
    console.log(hobby);

    res.redirect('/');
    transporter.sendMail({
        to: email,
        from: 'kiguno1996@gmail.com',
        subject: "Ты можешь стать кем угодно!!",
        html: `<p style="text-align: justify; padding: 5%; margin: 0 auto;">Поздравляем ${name} ${surname}, у вас есть уникальная возможность!</p>
        <p style="text-align: justify; padding: 5%; margin: 0 auto;">Станьте участником нашего конкурса и получите приз в размере 5000000 рублей, раелизовав мечту ${hobby}.</p>`,

    });  
}

exports.getFishPage = (req,res) => {
    const link = req.params.link;
    
    res.render('./moks/fishpage');
};

//authentication  function
async function isLoggedIn (req) {
    const result = {};
    try {
        let user = await UserM.findOne({
            where: { cookie : req.cookies.seals},
            attributes:['name','avatar','id','email','phone','link']
        });
        result.name = user.name;
        result.avatar = user.avatar;
        result.id = user.id;
        result.status = true;
        result.email = user.email;
        result.link = user.link;
        result.phone = user.phone;
    } catch (error) {
        result.status = false;
    }
    return result;
}; 

