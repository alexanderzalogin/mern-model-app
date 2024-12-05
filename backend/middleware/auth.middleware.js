import User from '../models/user.model.js';

export const auth = function(req, res, next) {
    const token = req.headers["x-token"];
    if (!token) return res.status(401).send('Access denied');

    try {
        const user = User.findOne({ token });
        if (user) {
            next();
        }
    } catch (err) {
        res.status(400).send('Invalid token');
    }
};
