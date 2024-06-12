const BlogService = require("../service/blog-service");
const CommentService = require("../service/blog-service");
class BlogController {
  async createPost(req, res, next) {
    try {
      const { title, content, author } = req.body;

      const fileUrls = req.files.map(file => `/blog/${file.filename}`);
      const post = await BlogService.createPost({
        title,
        content,
        author,
        images: fileUrls,
      });
      res.status(201).json(post);
    } catch (error) {
      next(error);
    }
  }

  async getAllPosts(req, res, next) {
    try {
      const posts = await BlogService.getAllPosts();
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }

  async deletePost(req, res, next) {
    try {
      const { postId } = req.params;
      const {userId} = req.body; // Предполагается, что userId находится в req.user
      const result = await BlogService.deletePost(postId, userId);
      res.status(200).json(result);
    } catch (error) {
      next(error);
    }
  }

  async createComment(req, res, next) {
    try {
      const { content, author, post } = req.body;
      const comment = await CommentService.createComment({ content, author, post });
      res.status(201).json(comment);
    } catch (error) {
      next(error);
    }
  }

  async getCommentsByPost(req, res, next) {
    try {
      const { postId } = req.params;
      const comments = await CommentService.getCommentsByPost(postId);
      res.status(200).json(comments);
    } catch (error) {
      next(error);
    }
  }

  async likePost(req, res, next) {
    try {
      const postId = req.params.id;
      const { userId }= req.body; // Предполагается, что пользователь авторизован

      await BlogService.likePost(postId, userId);

      res.status(200).json({ message: "Post liked successfully" });
    } catch (error) {
      next(error);
    }
  }

  async unlikePost(req, res, next) {
    try {
      const { userId, postId }= req.body; // Предполагается, что пользователь авторизован

      await BlogService.unlikePost(postId, userId);

      res.status(200).json({ message: "Post unliked successfully" });
    } catch (error) {
      next(error);
    }
  }

  async getPostsByUser(req, res, next) {
    try {
      const { userId } = req.params;
      const posts = await BlogService.getPostsByUser(userId);
      res.status(200).json(posts);
    } catch (error) {
      next(error);
    }
  }
}

module.exports = new BlogController();
