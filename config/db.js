const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/uffc7n', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

module.exports = mongoose;
