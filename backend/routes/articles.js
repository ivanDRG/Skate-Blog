const router = require("express").Router();
let Article = require("../models/articles.model");

router.route("/").get((req, res) => {
  Article.find()
    .then((users) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const title = req.body.title;
  const subtitle = req.body.subtitle;
  const content = req.body.content;
  const imageURL = req.body.image;

  const newArticle = new Article({ title, subtitle, content, imageURL });

  newArticle
    .save()
    .then(() => res.json("Article added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Article.findById(req.params.id)
    .then((article) => res.json(article))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Article.findByIdAndDelete(req.params.id)
    .then(() => res.json("Exercise deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Article.findById(req.params.id)
    .then((article) => {
      article.title = req.body.title;
      article.subtitle = req.body.subtitle;
      article.content = req.body.content;
      article.imageURL = req.body.imageURL;

      article
        .save()
        .then(() => res.json("Exercise updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});
module.exports = router;
