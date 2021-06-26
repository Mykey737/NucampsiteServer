const express = require("express");
const Partner = require('../models/partner');

const partnerRouter = express.Router();

partnerRouter.route("/")
  .get((req, res, next) => {
    Partner.find()
   .then(partners => {
     res.statusCode = 200;
     res.setHeader('Content-Type', 'application/json');
     res.json(partners);
   })
   .catch(err => next(err));
  })
  .post((req, res, next) => {
    Partner.create(req.body)
    .then(partner => {
      console.log('Partner Created ', partner);
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partner);
    })
    .catch(err => next(err));
  })
  .put((req, res) => {
    res.statusCode = 403;
    res.end("Put operation not supported on /partners");
  })
  .delete((req, res, next) => {
    Partner.deleteMany()
    .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
    })
    .catch(err => next(err));
  });

partnerRouter.route("/deletePartner")
.delete((req, res, next) => {
  Partner.findOneAndDelete(req.body.name)
  .then(response => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json(response);
  })
  .catch(err => next(err));
});

partnerRouter.route("/getFeaturedPartnersCount")
.get((req, res, next) => {
  Partner.count({featured: true})
 .then(count => {
   res.statusCode = 200;
   res.setHeader('Content-Type', 'application/json');
   res.json(count);
 })
 .catch(err => next(err));
})

.get(function(req, res) {
  detail.count({}, function(err, result) {
    if (err) {
      console.log(err);
    } else {
      res.json("Number of documents in the collection: " + result);
    }
  });
});

partnerRouter.route("/:partnerId")
  .get((req, res, next) => {
    Partner.findById(req.params.partnerId)
    .then(partner => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partner);
    })
    .catch(err => next(err));
  })
  .post((req, res) => {
    res.statusCode = 403;
    res.end(
      `POST operation not supported on /partners/${req.params.partnerId}`
    );
  })
  .put((req, res, next) => {
    Partner.findByIdAndUpdate(req.params.partnerId, {
      $set: req.body
    }, {new: true})
    .then(partner => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(partner);
    })
    .catch(err => next(err));
  })
  .delete((req, res, next) => {
    Partner.findByIdAndDelete(req.params.partnerId)
    .then(response => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.json(response);
    })
    .catch(err => next(err));
  });


module.exports = partnerRouter;
