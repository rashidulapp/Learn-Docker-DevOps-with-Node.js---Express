const Post = require("../models/post_model");

exports.getAllPost = async (req, res, next) => {
  try {
    const posts = await Post.find();
    res.status(200).json({
      status: "success",
      result: posts.length,
      data: {
        posts,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: `Fail  ${error}`,
    });
  }
};

exports.getOnePost = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).josn({
      status: "Fail",
    });
  }
};

exports.createPost = async (req, res, next) => {
  try {
    const post = await Post.create(req.body);
    res.status(200).json({
      status: "success",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.updatePost = async (req, res, next) => {
  try {
    const update = await Post.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      status: "success",
      data: {
        update,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
    });
  }
};

exports.deletePost = async (req, res, next) => {
  try {
    const post = await Post.findOneAndDelete(req.params.id);
    res.status(200).json({
      status: "succes",
      data: {
        post,
      },
    });
  } catch (error) {
    res.status(400).json({
      status: "Fail",
    });
  }
};
