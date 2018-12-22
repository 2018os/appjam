const router = require('express').Router();
const User = require('../databases/User');

router.get('/:id', async (req, res) => {
    try {
        const mentor = await User.findOne({ id: req.params.id });
        res.json({ "mentor": { "tag": mentor.tag, "id": mentor.id, "name": mentor.name, "isSenior": mentor.isSenior } });
    } catch (err) {
        const { message } = err;
        res.status(200).json({ "result": { "success": false, message } });
    }
});

module.exports = router;