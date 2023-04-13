const Place = require('../models/place.model');
const User = require('../models/user.model');
const { startSession } = require("mongoose");

const result = {
  places: false,
  message: null,
};

exports.createPlace = async (req, res) => {
  const session = await startSession();
  session.startTransaction();

  try {
    const newPlace = await Place.create(
      [{ 
        ...req.body, 
        owner: res.locals._id,
      }],
      { session },
    );
    await User.findByIdAndUpdate(
      [res.locals._id], 
      { $push: { places: newPlace[0]._id } },
      { session },
    );
    await session.commitTransaction();
    return res.json({ 
      place: newPlace[0], 
      message: `Create new place success!` 
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
  } finally {
    session.endSession();
  }

  return res.status(500).json({ 
    place: false, 
    message: `An error happened` 
  });
};

exports.getPlaces = (req, res) => {
  Place.find(
    {},
    {
      rate: {
        $divide: [
          { $sum: "$rating.rate" },
          { $cond: [
            { $eq: [{ $size: "$rating" }, 0] }, 
            1, 
            { $size: "$rating" }
          ] },
        ],
      },
      title: 1,
      type: 1,
      owner: 1,
      pricing: 1,
      images: 1,
      capacity: 1,
      description: 1,
      address: 1,
    }
  )
    .populate('owner', "-password -isAdmin -places")
    .populate("type")
    .then((places) => res.send({ 
      ...result, 
      message: `Get all places success`, 
      places: places 
    }))
    .catch(err => res.status(400)
      .send(err)
    );
};

exports.getUserPlaces = (req, res) => {
  const id = res.locals._id;

  if (!id) {
    return res.status(400).json({ 
      place: false, 
      message: `Please provide an id`,
    });
  }

  User.findById([id])
    .populate({ 
      path: "places", 
      populate: "type",
    })
    .then((user) => {
      if (!user) return res.status(404).json({ 
        place: false, 
        message: `User doesn't exist`,
      });
      res.json({ 
        ...result, 
        places: user.places, 
        message: `Get user's places success`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ 
        ...result, 
        message: err, 
        places: false,
      });
    });
};

exports.getMyPlaces = (req, res) => {
  User.findById([res.locals._id])
    .populate({ 
      path: "places", 
      populate: "type",
    })
    .then((user) => {
      if (!user) return res.status(500).json({ 
        place: false, 
        message: `An error happened`,
      });
      res.json({ 
        ...result, 
        places: user.places, 
        message: `Get user places success`,
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ 
        ...result, 
        message: err, 
        places: false,
      });
    });
};

exports.getPlaceById = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({ 
      place: false, 
      message: `Please provide an id`,
    });
  };

  Place.getPlaceById(id)
    .populate("owner", "-password")
    .populate("type")
    .then((place) => {
      if (!place) return res.status(404).json({
        place: false, 
        message: `This place doesn't exist`,
      });
      return res.json({ 
        place: place,
        message: `Get place success`,
      });
    })
    .catch((err) => res.status(500).json({ 
      message: err, 
      place: false,
    }));
};

exports.updatePlace = (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      updated: false,
      place: false,
      message: `Please provide an id`,
    });
  };

  Place.findByIdAndUpdate(
    [id], 
    req.body, 
    { new: true }, 
    (err, data) => {
      if (err) return res.status(500).send({ 
        updated: false, 
        place: false, 
        message: err,
      });
      if (!data) return res.status(404).send({ 
        updated: false, 
        place: false, 
        message: `This place doesn't exist`,
      });
      return res.json({ 
        updated: true, 
        place: data, 
        message: `Place update success`,
      });
    }
  );
};

exports.deleteMyPlace = async (req, res) => {
  const { id } = req.params;

  if (!id) {
    return res.status(400).json({
      updated: false,
      place: false,
      message: `Id not provided`,
    });
  }

  const session = await startSession();
  session.startTransaction();

  try {
    const deletedPlace = await Place.findByIdAndDelete([id], { session });
    if (!deletedPlace) return res.status(404).send({
      deleted: false,
      message: `This place doesn't exist`,
    });
    await User.findByIdAndUpdate(
      [deletedPlace.owner], 
      { $pull: { places: deletedPlace._id } }, 
      { session },
    );

    await session.commitTransaction();
    return res.json({ 
      deleted: true, 
      message: `Delete place success`,
    });
  } catch (err) {
    await session.abortTransaction();
    console.log(err);
  } finally {
    session.endSession();
  }
  return res.status(500).json({ 
    place: false, 
    message: `An error happened`,
  });
};