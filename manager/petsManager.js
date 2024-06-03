const Photo = require("../models/Photo")

exports.create = async (photoData) => Photo.create(photoData)

exports.getAll = async () => Photo.find().populate('owner').lean();


exports.getOne = (photoId) => Photo.findById(photoId).populate('owner');


exports.delete = (photoId) => Photo.findByIdAndDelete(photoId);

exports.edit = (photoId, photoData) => Photo.findByIdAndUpdate(photoId, photoData);

exports.votePhoto = async (email, photoId) => {
    const photo = await Photo.findById(photoId).populate('owner');
   
    photo.votes.push(email);
    return photo.save();
}

exports.getByOwner = (userId) => Photo.find({owner: userId})