const ApiError = require("../exceptions/api-error");
const BlogModel = require("../models/blog-model");
const CommentModel = require("../models/comment-model");

class BlogService {
  async createPost(data) {
    try {
      const post = new BlogModel(data);
      await post.save();
      return post;
    } catch (error) {
      throw error;
    }
  }

  async getAllPosts() {
    try {
      const posts = await BlogModel.find().populate("author").sort({ date: -1 }).populate({
        path: "comments",
        populate: { path: "author" }
      });;;
      return posts;
    } catch (error) {
      throw error;
    }
  }

  async deletePost(postId, userId) {
    try {
      const post = await BlogModel.findById(postId);
      if (!post) {
        throw ApiError.NotFound("Пост не найден");
      }

      if (post.author.toString() !== userId) {
        throw ApiError.Forbidden("Вы не можете удалить этот пост");
      }

      await BlogModel.findByIdAndDelete(postId);
      return { message: "Пост успешно удален" };
    } catch (error) {
      throw error;
    }
  }


  async createComment(data) {
    try {
      const comment = new CommentModel(data);
      await comment.save();

      await BlogModel.findByIdAndUpdate(data.post, {
        $push: { comments: comment._id }
      });

      return comment;
    } catch (error) {
      throw error;
    }
  }

  async getCommentsByPost(postId) {
    try {
      const comments = await CommentModel.find({ post: postId }).populate("author");
      return comments;
    } catch (error) {
      throw error;
    }
  }

  async likePost(postId, userId) {
    try {
      // Добавить идентификатор пользователя в массив лайков поста
      await BlogModel.findByIdAndUpdate(postId, {
        $addToSet: { likes: userId }
      });
    } catch (error) {
      throw error;
    }
  }

  async unlikePost(postId, userId) {
    try {
      // Удалить идентификатор пользователя из массива лайков поста
      await BlogModel.findByIdAndUpdate(postId, {
        $pull: { likes: userId }
      });
    } catch (error) {
      throw error;
    }
  }
}

module.exports = new BlogService();
