const Task = require("../models/Tasks");
const asyncwrapper = require("../middleware/asyncwrapper");
const { createCustomError, customError } = require("../errors/custom-error");

const getAllTasks = asyncwrapper(async (req, res) => {
  const item = await Task.find({});
  res.status(200).json({ item });
});
const createTask = asyncwrapper(async (req, res) => {
  const item = await Task.create(req.body);
  res.status(200).json({ item });
});

const getTask = asyncwrapper(async (req, res, next) => {
  const { id: taskid } = req.params;
  const item = await Task.findOne({ _id: taskid });
  if (!item) {
    return next(createCustomError("No such id exists", 404));
  }
  res.status(200).json({ item });
});
const updateTask = asyncwrapper(async (req, res, next) => {
  const { id: taskid } = req.params;
  const item = await Task.findOneAndUpdate({ _id: taskid }, req.body, {
    new: true,
    runValidators: true,
    // overwrite:true, do this in PUT (since it updates the already present object with a new object)
  });
  if (!item) {
    return next(createCustomError("No such id exists", 404));
    // return res.status(400).json({ msg: "No such id exists" });
  }
  res.status(200).json({ item });
});
const deleteTask = asyncwrapper(async (req, res, next) => {
  const { id: taskid } = req.params;
  const item = await Task.findOneAndDelete({ _id: taskid });
  if (!item) {
    return next(createCustomError("No such id exists", 404));
    // return res.status(400).json({ msg: "No such id exists" });
  }
  res.status(200).json({ item });
});
module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
