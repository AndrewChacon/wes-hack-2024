const validatePoints = (req, res, next) => {
    const { points } = req.body;

    // Check if 'points' exists and is a valid number
    if (typeof points !== 'number' || isNaN(points)) {
        return res.status(400).json({ message: 'Invalid points value. Points must be a number.' });
    }

    // Check if 'points' is positive
    if (points <= 0) {
        return res.status(400).json({ message: 'Points must be a positive number.' });
    }

    // If validation passes, proceed to the next middleware or controller
    next();
};
//ensures points exist w/ user,

module.exports = validatePoints;
