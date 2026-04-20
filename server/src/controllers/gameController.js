const getAllGames = (req, res) => {
  res.json({ message: "Get all games route works" });
};

const getGameById = (req, res) => {
  res.json({ message: `Get single game route works for id ${req.params.id}` });
};

module.exports = {
  getAllGames,
  getGameById,
};