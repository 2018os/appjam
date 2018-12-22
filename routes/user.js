const router = require('express').Router();
const User = require('../databases/User');
const jwt = require('jsonwebtoken');
const constants = require('../config/config');
const filter = require('../tools/authentication');

router.post('/register', async (req, res) => {
    try {
        if((await User.findOne({ id: req.body.id }))) {
            throw new Error('이미 등록된 아이디입니다');
        }
        const data = { id: req.body.id , pw: req.body.pw , name: req.body.name, isSenior: req.body.isSenior, tag: req.body.tag };
        const user = await User.create(data);
        user.password = user.__v = undefined;
        return res.json({ "result": { "success": true , "message": "회원가입에 성공했습니다." } });
    } catch (err) {
        const { message } = err;
        res.status(200).json({ "result": { "success": false, message } });
    }
});

router.delete('/delete', async (req, res) => {
    try {
        const target = await User.findOne({ id: req.body.id }); 
        if(!target) {
            throw new Error('계정이 존재하지 않습니다.');
        }
        const user = await target.remove();
        return res.json({ "resutl": { "success": true , "message": "계정이 삭제되었습니다." } });
    }catch(err) {
        const { message } = err;
        res.status(200).json({ "result": { "success": false , message } });
    }
});

router.post('/login', async (req, res) => {
    try {
        const target = await User.findOne({ id: req.body.id });
        if(!target) {
            throw new Error('아이디 혹은 비밀번호가 틀렸습니다.');
        }
        if(!req.body.pw === target.pw) {
            throw new Error('아이디 혹은 비밀번호가 틀렸습니다');
        }
        const token = jwt.sign({ id: target._id } ,constants.JWT_SALT);
        return res.json({ "result": { "success": true , "message": "로그인에 성공했습니다" }, "auth": { "token": token, "name": target.name } });
    }catch(err) {
        const { message } = err;
        res.status(200).json({ "result": { "success": false , message } });
    }
});

module.exports = router;