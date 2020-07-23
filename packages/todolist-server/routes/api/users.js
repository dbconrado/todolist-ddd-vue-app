const router = require('express').Router();
const todolist = require('@todolist/model');

router.post('/login', async (req, res) => {
    try {
        console.log(req.body.password);
        const user = await todolist.getUserByUsername(req.body.username);
        console.log(user);
        if (!user || user.password !== req.body.password) {
            res.status(404).end();
        } else {
            res.status(200).json({
                user,
                token: Math.random().toString(36).substring(7)
            });
        }
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
})

module.exports = router;