const mongoose = require('mongoose');

const WinnersSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
});

const WinnersDetails = mongoose.model('WinnersDetails', WinnersSchema);

module.exports = WinnersDetails;
