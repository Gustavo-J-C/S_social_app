const Post = require('../models/PostModel');
const PostImage = require('../models/PostImageModel');

exports.getPosts = async function (req, res, next) {
    const posts = await Post.findAll({
        include: PostImage
    });
    res.json(posts)
};

exports.deletePost = async function (req, res) {
    try {
        const postId = req.params.id;

        // Busque o post a ser excluído
        const post = await Post.findByPk(postId);

        if (!post) {
            return res.status(404).json({ message: 'Post not found' });
        }

        // Busque todas as imagens associadas ao post
        const postImages = await PostImage.findAll({ where: { post_id: postId } });

        // Exclua todas as imagens associadas ao post
        for (const postImage of postImages) {
            await postImage.destroy();
        }

        // Exclua o post após excluir as imagens associadas
        await post.destroy();

        return res.status(204).send(); // Retorna um status 204 (No Content) após a exclusão
    } catch (error) {
        console.error('Error deleting post:', error);
        res.status(500).json({ message: 'Error deleting post' });
    }
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

        let createdImage
        // Verifique se o arquivo foi enviado no req.file
        if (req.file) {
            console.log(req.file);
            const { originalname, mimetype, filename = null, size, key, location: url = "" } = req.file;

            // Crie o registro de imagem do post no banco de dados usando o modelo PostImage
            createdImage = await PostImage.create({
                post_id: createdPost.id,
                originalname,
                type: mimetype,
                path: req.file.path,
                filename: key,
                url,
                size,
            });
        }

        res.status(201).json({
            message: 'Post created successfully',
            post: { ...createdPost.dataValues, post_images: createdImage },
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post' });
    }
};