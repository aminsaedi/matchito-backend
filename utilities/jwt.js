const config = require("config");
const jwt = require("jsonwebtoken");

module.exports.generateToken = (user) => {
  const toknen = jwt.sign(
    {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      mobile: user.mobile,
      score: user.score,
      type: "user",
    },
    config.get("matchitoKey")
  );
  return toknen;
};

module.exports.generateAdminToken = (admin) => {
  const toknen = jwt.sign(
    {
      admin_id: admin.admin_id,
      username: admin.username,
      type: "admin",
    },
    config.get("matchitoKey")
  );
  return toknen;
};

module.exports.generateRefereeToken = (refree) => {
  const toknen = jwt.sign(
    {
      refree_id: refree.refree_id,
      name: refree.name,
      username: refree.username,
      type: "refree",
    },
    config.get("matchitoKey")
  );
  return toknen;
};
