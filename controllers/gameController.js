const UserM = require('../models/moksModel');
const uuid = require('uuidv4');
const crypto = require('crypto');

exports.getFishing = (req, res) => {
    res.render('./moks/fishing');
}
exports.postFish = ( req, res) =>{
    const user = isLoggedIn(req);
    if(!user) res.render('fucku');
    const link = crypto.createHmac('sha256', 'SEALS')
                   .update(req.body.email)
                   .digest('hex');
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

    
}

exports.getFishPage = (req,res) => {
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