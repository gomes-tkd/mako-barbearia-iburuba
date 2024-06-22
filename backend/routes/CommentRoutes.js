const router = require("express").Router();
const verifyToken = require("../helpers/verify-token");
const CommentController = require("../controller/CommentController");

// GETS
router.get("/", CommentController.getAllComments);

// protected routes
router.post("/:id/comments/post", verifyToken, CommentController.postComment);
router.patch("/:userId/comments/:commentId", verifyToken, CommentController.updateComment);
router.delete("/:userId/comments/:commentId", verifyToken, CommentController.deleteComment);
router.get("/:id/comments/get", verifyToken, CommentController.getCommentById);


module.exports = router;
