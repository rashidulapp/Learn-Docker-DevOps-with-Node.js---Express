const express = require("express");
const postController = require("../controller/post_controller");

const routes = express.Router();

routes
  .route("/")
  .get(postController.getAllPost)
  .post(postController.createPost);
routes
  .route("/:id")
  .get(postController.getOnePost)
  .patch(postController.updatePost)
  .delete(postController.deletePost);

module.exports = routes
