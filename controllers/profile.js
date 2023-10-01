const express = require('express');
const User = require('../models/UserModel');
const Follower = require('../models/followerModel');
// const  User, Followers = require('../models'); // Importe os modelos

// Rota para exibir o perfil do usuário
exports.getProfile = async function (req, res) {
    try {
        const userId = req.params.userId;
        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        const responseObj = {
            id: user.id,
            name: user.name,
            email: user.email,
            created_at: user.created_at,
            email_verified_at: user.email_verified_at,
        }
        // Aqui você pode retornar os detalhes do perfil do usuário para exibição
        return res.json(responseObj);
    } catch (error) {
        console.error('Erro ao buscar perfil de usuário:', error);
        res.status(500).json({ message: 'Erro ao buscar perfil de usuário' });
    }
};

// Rota para editar o perfil do usuário
exports.editProfile = async function (req, res) {
    try {
        const userId = req.params.userId;
        const { name, email } = req.body; // Aceitar apenas os campos 'name' e 'email'

        if (!name || !email) {
            return res.status(400).json({ message: 'Os campos "name" e "email" são obrigatórios' });
        }

        const user = await User.findByPk(userId);

        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }

        // Atualize os campos do perfil com os dados fornecidos
        await user.update({ name, email });

        return res.json({ message: 'Perfil atualizado com sucesso' });
    } catch (error) {
        console.error('Erro ao atualizar perfil de usuário:', error);
        res.status(500).json({ message: 'Erro ao atualizar perfil de usuário' });
    }
};

exports.getFollowing = async function(req, res) {
    try {
        const userId = req.params.userId;

        const following = await Follower.findAll({
            where: { user_follower_id: userId }, 
            include: [{ model: User, as: 'followingUser' }],
        });

        const followingUsers = following.map((entry) => {
            const { id, name, email } = entry.followingUser
            return {
                id,
                name, 
                email
            }
        });

        return res.json({
            count: followingUsers.length,
            following: followingUsers
        });
    } catch (error) {
        console.error('Erro ao buscar usuários seguidos:', error);
        res.status(500).json({ message: 'Erro ao buscar usuários seguidos' });
    }
}

exports.getFollowers = async function (req, res) {
    try {
        const userId = req.params.userId;

        const followers = await Follower.findAll({
            where: { users_followed_id: userId }, 
            include: [{ model: User, as: 'followerUser' }],
        });

        const followerUsers = followers.map((entry) => {
            const { id, name, email } = entry.followerUser
            return {
                id,
                name, 
                email
            }
        });

        return res.json({
            count: followerUsers.length,
            followers: followerUsers
        });
    } catch (error) {
        console.error('Erro ao buscar seguidores:', error);
        res.status(500).json({ message: 'Erro ao buscar seguidores' });
    }
}

exports.follow = async function (req, res) {
    try {
        const userId = req.user.userId;
        console.log(req.user);
        const { targetUserId } = req.body;

        await Follower.create({
            user_follower_id: userId,
            users_followed_id: targetUserId,
        });

        return res.json({ message: 'Você está seguindo o usuário agora.' });
    } catch (error) {
        console.error('Erro ao seguir o usuário:', error);
        res.status(500).json({ message: 'Erro ao seguir o usuário' });
    }
}

exports.unfollow = async function (req, res) {
    try {
        const userId = req.user.userId;
        const { targetUserId } = req.body;

        await Follower.destroy({
            where: {
                user_follower_id: userId,
                users_followed_id: targetUserId,
            },
        });

        return res.json({ message: 'Você deixou de seguir o usuário.' });
    } catch (error) {
        console.error('Erro ao deixar de seguir o usuário:', error);
        res.status(500).json({ message: 'Erro ao deixar de seguir o usuário' });
    }
};