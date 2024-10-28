const moment = require("moment");

exports.generateDate = () => moment().format("DD/MM/YYYY HH:mm:ss");

exports.formatDate = (date) => moment(date).format("DD/MM/YYYY HH:mm:ss");
