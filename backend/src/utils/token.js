const { v4: uuid } = require("uuid");

exports.generateToken = () => "DORA-" + uuid().slice(0, 8);