let express = require("express");
mongoose = require("mongoose");
faker = require("faker");
cors = require('cors');
app = express();

app.use(cors());
app.use(
    express.urlencoded({
      extended: true
    })
  )
  
app.use(express.json())
let PORT = 5000;

const Schema = mongoose.Schema;

mongoose.connect(mongoDB,
    {
        useNewUrlParser: true,
        // useUnifiedTopology: true,
        reconnectTries: 60,
        reconnectInterval: 1000
    }, function (err) {
        if (err) {
            console.log(err);
        }
    });

const FakerData = new Schema({
    firstName: String,
    lastName: String,
    email: String,
    lat: Number,
    lon: Number,
    country: String,
    username: String,
    password: String,
    date: Date
});

const FakerModel = mongoose.model('Faker', FakerData);

app.get("/", function (req, res) {
    res.send("<h1>World</h1>")

})

app.get("/faker", function (req, res) {

    console.log("setting timeout");
    setTimeout(function () {
        FakerModel.find({}, function (err, fakers) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "MongoDB Service Error" });
            } else {
                res.json(fakers);
                console.log(fakers.length);
            }
        })
    }, 10);
})

app.post("/faker", function (req, res) {

    console.log("setting timeout");
    let countryQuery = req.body.country;
    console.log(countryQuery);
    setTimeout(function () {
        FakerModel.find({country: countryQuery}, function (err, fakers) {
            if (err) {
                console.log(err);
                res.status(500).send({ message: "MongoDB Service Error" });
            } else {
                res.json(fakers);
                console.log(fakers.length);
            }
        })
    }, 10);
})

app.get("/generate/faker", function (req, res) {
    res.send("<h1>FakerPage</h1>")

    // for(let i=0; i<10000; i++){

    //     let newEntry = {
    //         firstName: faker.name.firstName(),
    //         lastName: faker.name.lastName(),
    //         email: faker.internet.email(),
    //         lat: faker.address.latitude(),
    //         lon: faker.address.longitude(),
    //         country: faker.address.country(),
    //         username: faker.internet.userName(),
    //         password: faker.internet.password(),
    //         date: faker.date.between('2015-01-01', '2020-10-17'),
    //     }

    //     FakerModel.create(newEntry, function (err, faker) {
    //         if (err) {
    //             console.log(err);
    //         } else {
    //             if(i%10===0){
    //                 console.log(i);
    //             }
    //             //console.log("Successfully created entry.")
    //             // console.log(faker);
    //         }
    //     })
    // }
})

app.listen(PORT, function () {
    console.log(`Server listening on port: ${PORT}`);
})
