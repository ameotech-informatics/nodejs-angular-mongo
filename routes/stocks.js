var mongo = require('mongodb');

var Server = mongo.Server,
    Db = mongo.Db,
    BSON = mongo.BSONPure;

var server = new Server('localhost', 27017, { auto_reconnect: true });
db = new Db('stockdb', server);

db.open(function (err, db) {
    if (!err) {
        console.log("Connected to 'stockddb' database");
        db.collection('stocks', { strict: true }, function (err, collection) {
            if (err) {
                console.log("The 'stocks' collection doesn't exist. Creating it with sample data...");
                createDB();
            }
        });

        client = db;
        client.on('close', function () {
            client = null; // clear client
            collections = {}; // clear old collections
            console.log("The 'stocks' connection closed..");
        });
    }
});

exports.findAll = function (req, res) {
    db.collection('stocks', function (err, collection) {
        collection.find().toArray(function (err, items) {
            res.send(items);
        });
    });
};

exports.searchAllByDate = function (req, res) {
    var startDate = req.params.startDate;
    var endDate = req.params.endDate;

    console.log("startdate=" + startDate);
    console.log("enddate=" + endDate);

    db.collection('stocks', function (err, collection) {
        collection.find({
            StockPriceInfo: {
                $elemMatch: {
                    Day: {
                        $gt: startDate,
                        $lte: endDate
                    },
                }
            }
        }).toArray(function (err, items) {
            res.send(items);
        });
    });
}

exports.addStock = function (req, res) {
    var stock = req.body;

    db.collection('stocks', function (err, collection) {
        collection.insert(stock, { safe: true }, function (err, result) {
            if (err) {
                res.send({ 'error': 'An error has occurred' });
            } else {
                console.log('Success: ' + JSON.stringify(result[0]));
                res.send(result[0]);
            }
        });
    });
}

/*--------------------------------------------------------------------------------------------------------------------*/

var createDB = function () {

    var stocks = [
    {
        Name: "Stock Test 1 Example",
        StockPriceInfo: [{ Price: 5000, Day: new Date() }]
    }];

    db.collection('stocks', function (err, collection) {
        collection.insert(stocks, { safe: true }, function (err, result) { });
    });
};