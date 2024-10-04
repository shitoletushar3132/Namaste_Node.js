const adminAuth = (req, res, next) => {
  const token = "xy";
  const isAdminAuth = token === "xyz";
  if (!isAdminAuth) {
    res.status(401).send("not authorize");
  } else {
    next();
  }
};

module.exports = { adminAuth };
