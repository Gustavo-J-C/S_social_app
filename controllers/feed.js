const Post = require('../models/PostModel');
const PostImage = require('../models/PostImageModel');

exports.getPosts = function (req, res, next) {
    res.status(200).json({ a: 1 })
};

exports.createPost = async function (req, res) {
    const { title, description } = req.body;

    try {
        // Crie o post no banco de dados usando o modelo Post
        const createdPost = await Post.create({
            title: title,
            description: description,
            users_id: 1, // Substitua 'req.user.id' pelo ID do usuário atual
        });

        // Verifique se o arquivo foi enviado no req.file
        if (req.file) {
            const { originalname, mimetype, destination, filename, size } = req.file;

            // Crie o registro de imagem do post no banco de dados usando o modelo PostImage
            await PostImage.create({
                post_id: createdPost.id,
                originalname,
                type: mimetype,
                destination,
                path: req.file.path,
                filename,
                size,
            });
        }

        res.status(201).json({
            message: 'Post created successfully',
            post: createdPost,
        });
    } catch (error) {
        console.error('Error creating post:', error.original);
        res.status(500).json({ message: 'Error creating post' });
    }
};