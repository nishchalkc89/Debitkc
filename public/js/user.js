// var mongoose = require('mongoose');
// var bcrypt = require('bcryptjs');

// var User = module.exports = mongoose.model('User', UserSchema);

const { MongoClient, ServerApiVersion } = require("mongodb");
const uri = "mongodb+srv://anitakarki41:JKNVHuN7pCEZGBkG@cluster0.sjr2p1t.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri,
    {
        serverApi: {
            version: ServerApiVersion.v1,
            strict: true,
            deprecationErrors: true,
        }
    });

const router = express.Router();

