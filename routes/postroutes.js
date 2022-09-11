const router = require('express').Router();
const postController=require("../controllers/postControllers");

//registring the user
router.post("/register",postController.register )

//logging in
router.post("/login", postController.login)

//createposts
router.post("/posts", postController.posts)

//put post
router.put("/posts/:id",postController.putposts)

//delete post
router.delete("/posts/:id",postController.deleteposts)

//fetch posts
router.get("/fetchPosts",postController.fetchposts)

//
router.get("/getusers",postController.getusers)
module.exports=router;