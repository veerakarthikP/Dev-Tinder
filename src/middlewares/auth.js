const adminAuth = (req, res, next) => {
  const token = "karthikaa";
  const isTokenVerified = token === "karthik";
  if (!isTokenVerified) {
    res.status(401).send("unautharaised user");
  } else {
    next();
  }
};

module.exports = { adminAuth };
