exports.getFishing = (req, res) => {
    res.render('./moks/fishing');
}
exports.postFish = ( req, res) =>{
    var name = req.body.name;
    var surname = req.body.surname;
    var hobby = req.body.hobby;
    console.log(name)
    console.log(surname);
    console.log(hobby);
}