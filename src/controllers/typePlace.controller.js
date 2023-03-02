const TypePlace = require("../models/typePlace.model.js");
const Place = require("../models/place.model");

const result = {
  typePlace: false,
  message: null,
};

exports.createTypePlace = (req, res) => {
  TypePlace.create(req.body)
    .then((typePlace) => {
      res.json({ 
        ...result,
        typePlace: typePlace,
        message: `Create a type of place success`,
      });
    })
    .catch((err) => res.status(500).send(err));
};

exports.updateTypePlace = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      updated: false,
      typePlace: false,
      message: `Please provide an id`
    });
  }

  TypePlace.findByIdAndUpdate(
    [id], 
    req.body, 
    { new: true }, 
    (err, data) => {
    if (err) {
      return res.status(500).send({ 
        updated: false, 
        typePlace: false, 
        message: err 
      });
    };

    res.json({ 
      updated: true, 
      typePlace: data, 
      message: `Place type update success`,
    });
  });
};

exports.getTypesPlace = (req, res) => {
  TypePlace.find()
    .then((typePlace) => res.send({ 
      ...result,
      typePlace: typePlace,
      message: `Get all types of places success`,
    }))
    .catch((err) => res.status(500).send(err));
};

exports.getTypePlaceById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      typePlace: false,
      message: `Please provide an id`,
    });
  }

  TypePlace.findById(id)
    .then((typePlace) => {
      if (!typePlace) return res.status(404).send({ 
        typePlace: false,
        message: `This place type doesn't exist`,
      });
      return res.send({
        typePlace: typePlace,
        message: `Get type place success`,
      });
    })
    .catch((err) => res.status(500).send(err));
};

exports.deletePlaceType = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ 
      deleted: false, 
      message: `Please provide an id`,
    });
  }

  Place.find({ type: id })
    .then((response) => {
      if (response.length > 0) {
        return res.status(400).json({
          deleted: false,
          message: `Places with this type already exist, cannot delete this type of place.`,
        });
      } else {
        TypePlace.findByIdAndRemove([id], {}, (err) => {
          if (err) return res.status(500).send({
            deleted: false,
            message: err,
          });
          return res.json({
            deleted: true,
            message: `Type place delete success`,
          });
        });
      }
    })
    .catch((err) => {
      return res.status(500).send({
        deleted: false,
        message: err,
      });
    });
};