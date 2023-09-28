exports.login = function(req, res, next) {
    res.status(200).json({a: 1})
};

exports.createPost = function(req, res, next) {
    const title = req.body.title
    const comment = req.body.comment
    //Create a new post
    res.status(201).json({
        message: "Post created successfully",
        post: {id: new Date().toISOString(), title: title, comment: comment}
    })
};