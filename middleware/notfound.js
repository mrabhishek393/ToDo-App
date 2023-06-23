const notfound = (req, res) => {
  res.status(404).json({ msg: "This domain does not exist" });
};

module.exports = notfound;
