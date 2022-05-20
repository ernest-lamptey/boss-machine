const checkMillionDollarIdea = (req, res, next) => {
    const weeks = +req.body.numWeeks
    const revenue = +req.body.weeklyRevenue

    const totalValue = weeks * revenue;
    if (totalValue < 1000000) {
        res.status(400).send("Not enough revenue")
    } else if (!weeks || !revenue) {
        res.status(400)
    } else {
        next()
    }
};

// Leave this exports assignment so that the function can be used elsewhere
module.exports = checkMillionDollarIdea;
