const moment = require("moment");

exports.formatDate = () => moment().format("DD/MM/YYYY HH:mm:ss");
