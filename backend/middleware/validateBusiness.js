// Validates the request body before creating a business
const validateBusiness = (req, res, next) => {
  const { placeId, name } = req.body;

  if (!placeId || typeof placeId !== "string" || !placeId.trim()) {
    return res.status(400).json({ message: "placeId is required and must be a non-empty string" });
  }

  if (!name || typeof name !== "string" || !name.trim()) {
    return res.status(400).json({ message: "name is required and must be a non-empty string" });
  }

  // Sanitise whitespace
  req.body.placeId = placeId.trim();
  req.body.name = name.trim();

  next();
};

module.exports = validateBusiness;
