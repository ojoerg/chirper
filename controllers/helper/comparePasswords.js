const bcrypt = require("bcryptjs");
const User = require("../../models/User");

exports.comparePasswords = async (username, password) => {
  try {
    const user = await User.findOne({ username });

    if (user) {
      const passwordsMatch = await new Promise((resolve, reject) => {
        bcrypt.compare(password, user.password, (err, isMatch) => {
          if (err) reject(err);
          if (isMatch) {
            resolve(true);
          } else {
            resolve(false);
          }
        });
      });
      return passwordsMatch;
    }

    return false;
  } catch (err) {
    console.log(err);
    return false;
  }
};
