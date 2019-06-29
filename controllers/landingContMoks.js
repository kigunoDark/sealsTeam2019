const UserM = require('../models/moksModel');
const multer = require('multer');
const crypto = require('crypto');
const path = require('path');
const uuid = require('uuidv4');



// this is my(MOKS) JOB

//seting for multer 

let storage = multer.diskStorage({
    destination: './public/uploads',
    filename: function(req, file, cb,){
        req.body.avatar = uuid() + "" + file.originalname;
        cb(null, req.body.avatar);
    }
});

const upload = multer({
    storage:storage,
    fileFilter: checkFileType
}).single('avatar');

function checkFileType(req,file, cb) {
    const fileTypes = /jpeg|jpg|png/;
    const extname = fileTypes.test(path.extname(file.originalname).toLocaleLowerCase());
    
    const mimetype = fileTypes.test(file.mimetype);
    if(mimetype && extname){
        return cb(null,true);
    }else{
        cb('Error:Только Картинки');
    };
};

//authentication  function
async function isLoggedIn (req) {
    const result = {};
    try {
        let user = await UserM.findOne({
            where: { cookie : req.cookies.seals},
            attributes:['name','avatar','id']
        });
        result.name = user.name;
        result.avatar = user.avatar;
        result.id = user.id;
        result.status = true;
    } catch (error) {
        result.status = false;
    }
    return result;
};

exports.getMoksLand = async (req, res) => {
    res.render('moks/moks', {
        msg: null
    });
};

exports.getLogin = async (req,res) => {
    res.render('moks/login',{
        msg: null
    });
};

exports.getAvatar = async (req , res) => {
    const name = req.params.name;
    UserM.findOne({
        where: { name : name},
        attributes:['name','avatar']
    })
    .then(user =>{
        res.render('moks/avatarTest',{
            name: user.name,
            avatar: `../uploads/${user.avatar}`
        });
    })
    .catch(err => {
        console.log(`Error ----> ${err}`);
    });
    
};

exports.postMoksland = async (req, res) => {
    upload(req, res, (err) => {
        if(err){
          res.render('moks/moks', {
            msg: err
          });
        } else {
            const hash = crypto.createHmac('sha256', 'SEALS')
                   .update(req.body.password)
                   .digest('hex');

            const cookie = crypto.createHmac('sha256', 'SEALS')
            .update(uuid())
            .digest('hex');

            console.log('MOKS this is a new user: ' + req.body.name + ' ' + req.body.avatar + " " + hash + ' ' + req.body.email);
            // UserM.sync({force: true}).then(() => {
            //     // Table created
            //     UserM.create({
            //         name:req.body.name,
            //         password:hash,
            //         avatar:req.body.avatar,
            //         email:req.body.email,
            //         phone:req.body.phone + '',
            //         cookie:cookie
            //     })
            //     .then(user => {
            //         console.log(`MOKS this is a new user: 
            //         NAME: ${user.name} 
            //         AVATAR: ${user.avatar}
            //         PASSWORD: ${hash}
            //         EMAIL: ${user.email}
            //         phone: ${user.phone}
            //         link: ${user.link}`);
    
            //         res.cookie('seals',cookie, { maxAge:86400000, httpOnly: true });
            //         res.status(201).send('ok');
            //     })
            //     .catch(err =>{
            //         res.render('moks/moks', {
            //             msg: err
            //           });
            //         console.log(err);
            //     });
            //   });
            UserM.create({
                    name:req.body.name,
                    password:hash,
                    avatar:req.body.avatar,
                    email:req.body.email,
                    phone:req.body.phone + '',
                    cookie:cookie
                })
                .then(user => {
                    console.log(`MOKS this is a new user: 
                    NAME: ${user.name} 
                    AVATAR: ${user.avatar}
                    PASSWORD: ${hash}
                    EMAIL: ${user.email}
                    phone: ${user.phone}`);
    
                    res.cookie('seals',cookie, { maxAge:86400000, httpOnly: true });
                    res.status(201).send('ok');
                })
                .catch(err =>{
                    res.render('moks/moks', {
                        msg: err
                      });
                    console.log(err);
                });
        
        }
    
    });
};

exports.postLogin = async (req , res) => {
    console.log(req.body)
    const hash = crypto.createHmac('sha256', 'SEALS')
                   .update(req.body.password)
                   .digest('hex');
    UserM.findOne({
        where: { name : req.body.name},
        attributes:['password' , 'cookie']
    })
    .then(user => {
        if(user.password === hash){
            console.log(`${req.body.name} авторизировался`)
            res.cookie('seals',user.cookie, { maxAge:86400000, httpOnly: true });
            res.status(200).send(`С возвращением ${req.body.name}`);
        }else{
            res.render('moks/login',{
                msg: 'Неверный Пароль'
            });
        }
    })
    .catch(err =>{
        res.render('moks/login',{
            msg: 'Пользователя с таким именем не существует' 
        });
    })
};

exports.authentication = async (req, res) => {
    const user = await isLoggedIn(req);
    if(user.status){
        console.log(`user ${user.name} авторизовался`);
        res.status(200).send(`name - ${user.name}<br> id - ${user.id}<br> avatar - ${user.avatar}`);
    }else{ 
        res.status(401).send('Вы не авторизованы');
    }
};

exports.logout = async  (req,res) => {
    res.clearCookie('seals');
    res.redirect('/');
};

