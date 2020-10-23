const express = require("express");
const discussions = express.Router();
const cors = require("cors");
const authenticate = require("../authenticate");
const Discussion = require("../models/Discussion");
discussions.use(cors());

discussions
  .route("/")
  .get(authenticate.authenticateToken, (req, res) => {
    Discussion.find({})
      .then((discussion) => {
        if (discussion != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(discussion);
        } else {
          res.send("No queries published");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  })

  .post(authenticate.authenticateToken, (req, res) => {
    Discussion.create({
      title: req.body.title,
      description: req.body.description,
      first_name: req.body.first_name,
      last_name: req.body.last_name,
      email: req.body.email,
    })
      .then((discussion) => {
        if (discussion != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(discussion);
        } else {
          res.send("Query cannot be published");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  })
  .put(authenticate.authenticateToken, (req, res) => {
    //res.send(req.body);
    Discussion.findById(req.body.discussionId)
      .then((discussion) => {
        //res.send(discussion);
        if (discussion.email == req.body.email) {
          console.log(discussion.email + "   " + req.body.email);
          //res.send("ucees")
          Discussion.findByIdAndUpdate(
            req.body.discussionId,
            {
              $set: {
                title: req.body.title,
                description: req.body.description,
              },
            },
            { new: true }
          ).then((discussion) => {
            //res.send(discussion)
            if (discussion != null) {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(discussion);
            } else {
              res.end("PUT operation failed");
            }
          });
        } else {
          res.statusCode = 403;
          res.end("You are not authorized to perform this operation!");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  })
  .delete(authenticate.authenticateToken, (req, res) => {
    Discussion.findById(req.body.discussionId)
      .then((discussion) => {
        if (discussion.email == req.body.email) {
          //res.send("Success");
          Discussion.findByIdAndDelete(req.body.discussionId).then(
            (discussion) => {
              if (discussion != null) {
                res.statusCode = 200;
                res.setHeader("Content-Type", "application/json");
                res.json(discussion);
              } else {
                res.end("DELETE operation failed");
              }
            }
          );
        } else {
          res.statusCode = 403;
          res.end("You are not authorized to perform this operation!");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  });

discussions
  .route("/comments")
  .get(authenticate.authenticateToken, (req, res) => {
    Discussion.findById(req.body.discussionId)
      .then((discussion) => {
        if (discussion != null) {
          res.statusCode = 200;
          res.setHeader("Content-Type", "application/json");
          res.json(discussion.comments);
        } else {
          res.statusCode = 404;
          res.end(req.body.discussionId + " not found");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  })
  .post(authenticate.authenticateToken, (req, res) => {
    Discussion.findById(req.body.discussionId)
      .then((discussion) => {
        if (discussion != null) {
          discussion.comments.push({
            comment: req.body.comment,
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email: req.body.email,
          });
          discussion.save().then((discussion) => {
            res.statusCode = 200;
            res.setHeader("Content-Type", "application/json");
            res.json(discussion);
          });
        } else {
          res.statusCode = 404;
          res.end(req.body.discussionId + " not found");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  })

  .put(authenticate.authenticateToken, (req, res) => {
    //res.send(req);
    Discussion.findById(req.body.discussionId)
      .then((discussion) => {
        if (
          discussion != null &&
          discussion.comments.id(req.body.commentId) != null
        ) {
          if (
            req.body.email == discussion.comments.id(req.body.commentId).email
          ) {
            discussion.comments.id(req.body.commentId).comment =
              req.body.comment;
            discussion.save().then((discussion) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(discussion);
            });
          } else {
            res.statusCode = 403;
            res.end("You are not authorized to perform this operation!");
          }
        } else if (discussion == null) {
          res.statusCode = 404;
          res.end(req.body.discussionId + " not found");
        } else {
          res.statusCode = 404;
          res.end(req.body.commentId + " not found");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  })

  .delete(authenticate.authenticateToken, (req, res) => {
    Discussion.findById(req.body.discussionId)
      .then((discussion) => {
        if (
          discussion != null &&
          discussion.comments.id(req.body.commentId) != null
        ) {
          if (
            req.body.email == discussion.comments.id(req.body.commentId).email
          ) {
            discussion.comments.id(req.body.commentId).remove();
            discussion.save().then((discussion) => {
              res.statusCode = 200;
              res.setHeader("Content-Type", "application/json");
              res.json(discussion);
            });
          } else {
            res.statusCode = 403;
            res.end("You are not authorized to perform this operation!");
          }
        } else if (discussion == null) {
          res.statusCode = 404;
          res.end(req.body.discussionId + " not found");
        } else {
          res.statusCode = 404;
          res.end(req.body.commentId + " not found");
        }
      })
      .catch((err) => {
        res.send("error: " + err);
      });
  });

module.exports = discussions;
