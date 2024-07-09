import { Request, Response } from "express"
import prisma from "../../lib/db"


export const createPost = async (req: Request, res: Response) => {
    const { title, content, authorId, image } = req.body
    try {
        const user = await prisma.user.findUnique({
            where: { id: authorId }
        })
        if (!user) {
            return res.status(400).json({ ok: false, message: "User not found" })
        }
        const post = await prisma.post.create({
            data: {
                title,
                content,
                authorId,
                image: image || ""
            }
        })
        if (!post) {
            return res.status(400).json({ ok: true, message: "Post not created" })
        }
        return res.status(201).json({ ok: true, message: "Post created", post })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        })
    }
}
export const updetePost = async (req: Request, res: Response) => {
    const { title, content, image } = req.body
    const idPost = req.query.id as string;
    try {
        const post = await prisma.post.update({
            where: { id: idPost },
            data: {
                title,
                content,
                image: image || ""
            }
        })
        if (!post) {
            return res.status(400).json({ ok: false, message: "Post not updated" })
        }
        return res.status(201).json({ ok: true, message: "Post updated", post })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        })
    }
}
export const deletePost = async (req: Request, res: Response) => {
    const idPost = req.query.id as string;
    try {
        const isexistePost = await prisma.post.findUnique({
            where: { id: idPost }
        })
        if (!isexistePost) {
            return res.status(400).json({ ok: false, message: "Post not found" })
        }
        const post = await prisma.post.delete({
            where: { id: idPost }
        })
        if (!post) {
            return res.status(400).json({ message: "Post not deleted" })
        }
        return res.status(201).json({ ok: true, message: "Post deleted", post })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        })
    }
}
export const getPost = async (req: Request, res: Response) => {
    const idPost = req.query.id as string;
    try {
        const post = await prisma.post.findUnique({
            where: { id: idPost },
            include: {
                comments: true,
                likes: true,
            }
        });
        if (!post) {
            return res.status(400).json({ ok: false, message: "Post not found" })
        }
        return res.status(201).json({
            ok: true,
            message: "Post found",
            post,
            countOfLikes: post.likes.length,
            countOfComments: post.comments.length,
        })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error
        })
    }
}
export const allPosts = async (req: Request, res: Response) => {
    const page = parseInt(req.query.page as string) || 1;
    const limit = parseInt(req.query.limit as string) || 10;
    const skip = (page - 1) * limit;
    try {
        const posts = await prisma.post.findMany({
            include: {
                comments: true,
                likes: true,
            },
            skip,
            take: limit,
            orderBy: { createdAt: 'desc' },
        });
        if (posts.length <= 0) {
            return res.status(404).json({ ok: false, message: "No posts found" })
        }
        return res.status(200).json({
            ok: true,
            message: "Posts found",
            posts,
            countOfPosts: posts.length,
        });
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error,
        });
    }
}


export const myPosts = async (req: Request, res: Response) => {
    const idUser = req.query.id as string;
    try {
        const posts = await prisma.post.findMany({
            where: { authorId: idUser }
        })
        if (posts.length <= 0) {
            return res.status(404).json({ ok: false, message: "No posts found" })
        }
        return res.status(200).json({ ok: true, message: "Posts found", posts })
    } catch (error) {
        return res.status(500).json({
            ok: false,
            message: "Internal Server Error",
            error,
        });
    }
}