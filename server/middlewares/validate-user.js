const validateUserOwn = (req, res, next) => {
    const useridRequest = req.params.id;
    const {id: useridToken} = req.user;

    if (useridToken != useridRequest) {
        return res.status(401).json({
            msg: 'You are not allowed'
        })
    }
    
    next();
}

module.exports = validateUserOwn