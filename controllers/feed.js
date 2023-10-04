const Post = require('../models/PostModel');
const PostImage = require('../models/PostImageModel');
const PostLike = require('../models/postLikeModel');

exports.getPosts = async function (req, res) {
    try {

        const page = parseInt(req.query.page) || 1; // Página padrão: 1
        const pageSize = parseInt(req.query.pageSize) || 10; // Tamanho padrão: 10

        // Cálculo do deslocamento (offset) com base na página atual e tamanho da página
        const offset = (page - 1) * pageSize;

        // Consulta ao banco de dados para obter os posts paginados
        // Exemplo de uso de OFFSET e LIMIT no Sequelize (ou SQL)
        const posts = await Post.findAll({
            offset: offset,
            limit: pageSize,
            include: PostImage,
            order: [['created_at', 'DESC']], // Ordenar por data de criação, por exemplo
        })

        res.json({ page: page, pageSize: pageSize, posts: posts });
    } catch (error) {
        console.error('Error fetching posts:', error);
        res.status(500).json({ message: 'Error fetching posts' });
    }
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
            users_id: req.user.id, // Use o ID do usuário atual
        });

        res.status(201).json({
            message: 'Post created successfully',
            post: createdPost,
        });
    } catch (error) {
        console.error('Error creating post:', error);
        res.status(500).json({ message: 'Error creating post' });
    }
};

exports.uploadPostImages = async function (req, res) {
    try {
        // Verifique se o arquivo foi enviado no req.file
        if (!req.file) {
            return res.status(400).json({ message: 'No file uploaded' });
        }

        console.log(req.file);
        console.log(process.env.STORAGE_TYPE);
        // return
        const { originalname, mimetype, filename = null, size, key, location: url = '' } = req.file;
        // return

        // Crie o registro de imagem do post no banco de dados usando o modelo PostImage
        const createdImage = await PostImage.create({
            post_id: req.body.postId, // Substitua pelo ID do post ao qual a imagem está associada
            originalname,
            type: mimetype,
            path: req.file.path,
            filename,
            url,
            size,
        });

        res.status(201).json({
            message: 'Image uploaded successfully',
            image: createdImage,
        });
    } catch (error) {
        console.error('Error uploading image:', error);
        res.status(500).json({ message: 'Error uploading image' });
    }
};

exports.likePost = async function (req, res) {
    try {
        const postId = req.params.postId; // Você deve ter um parâmetro postId na rota
        const userId = req.user.userId; // Suponha que você tenha informações do usuário autenticado

        console.log(req.user);

        await PostLike.create({
            post_id: postId,
            user_id: userId,
        });

        res.json({ message: 'Você curtiu o post.' });
    } catch (error) {
        if (error.parent.sqlState === '23000') {

            if (error.index === 'fk_users_has_posts_posts1' && error.value === String(req?.params?.postId)) {
                return res.status(404).json({ message: 'O post não existe.' });

            } else if (error.parent.code === 'ER_DUP_ENTRY') {
                return res.status(400).json({ message: 'Post já curtido anteriormente' });
            }
        } else {
            console.error('Erro ao curtir o post:', error);
            res.status(500).json({ message: 'Erro ao curtir o post.' });
        }
    }
};