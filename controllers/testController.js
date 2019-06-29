const User = require('../models/user');

exports.getTest = (req, res) => {
    res.render('test');
}

exports.postTest = (req, res) => {
    const name = req.body.name;
    const password = req.body.password;

    User.create({
        name: name,
        password: password
    }
    ).then((user) => {
        console.log("Successful registration!");
        res.redirect('/');
    })
    .catch( err => {
        if(err)
        {
            console.log(err);
        } else {
            console.log("Success!!");
        }
    })

  
}