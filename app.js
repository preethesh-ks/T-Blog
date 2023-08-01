//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require('lodash');
const mongoose = require('mongoose');
// const _ = require('lodash/core');

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "built by Preethesh ks"
const contactContent = "Email: crystalclearray@gmail.com";

const app = express();
main().catch(err => console.log(err));
async function main() {
  // await mongoose.connect('mongodb://localhost:27017/blogDB');  
  await mongoose.connect('mongo db url here')
  }


//  let posts = [];
const postSchema = {

title: String,

content: String

};
const Post = mongoose.model("Post", postSchema);



app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

app.get("/", function (req, res) {
    // res.render("home",{
    //   home:homeStartingContent,
    //   posts:posts});
    Post.find({}, function(err, posts){
// console.log(posts);
res.render("home", {

startingContent: homeStartingContent,
posts: posts

});

})
     
});
app.get("/about",function (req,res){
  res.render("about",{about:aboutContent});
})
app.get("/contact",function (req,res){
  res.render("contact",{contact:contactContent});
})
app.get("/compose",function(req,res){
  res.render("compose");
})
app.post("/compose",function(req,res){
  
   

    const post = new Post ({
    title: req.body.inputtitle,
    content: req.body.inputpost
    });
    post.save(function(err){ //better to add callback function avoids unwanted data like favicon data being added

if (!err){

res.redirect("/");

}

});

  
})

app.get("/posts/:postId",function(req,res){
  // console.log(req.params.postName);
  // console.log(req.params.title);
  var match  = req.params.postId;
    // console.log(posts.title);
    Post.findOne({_id: match}, function(err, post){

res.render("posts", {

title: post.title,

content: post.content

});

});
});

// const g = _.lowerCase('--Foo-Bar--');
// console.log(g);













app.listen(7000, function() {
  console.log("Server started on port 7000");
});
