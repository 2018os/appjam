const router = require('express').Router();
const User = require('../databases/User');

router.get('/:id', async (req, res) => {
    try {
        const mentor = await User.findOne({ id: req.params.id });
        res.json({ "mentor": mentor });
    } catch (err) {
        const { message } = err;
        res.status(200).json({ "result": { "success": false, message } });
    }
});

module.exports = router;