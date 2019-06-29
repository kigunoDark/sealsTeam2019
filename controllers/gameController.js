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
    var name = req.body.name;
    var surname = req.body.surname;
    var hobby = req.body.hobby;
    var email = req.body.email;
        
            res.redirect('/');
            return transporter.sendMail({
                to: email,
                from: 'kiguno1996@gmail.com',
                subject: "Ты можешь стать кем угодно!!",
                html: `<p style="text-align: justify; padding: 5%; margin: 0 auto;">Поздравляем ${name} ${surname}, у вас есть уникальная возможность!</p>
                <p style="text-align: justify; padding: 5%; margin: 0 auto;">Станьте участником нашего конкурса и получите приз в размере 5000000 рублей, раелизовав мечту ${hobby}.</p>`,
                

            }); 
         
       
}