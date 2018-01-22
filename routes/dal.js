var express = require('express');
var router = express.Router();
var mongoClient = require('mongodb').MongoClient;
// var mongodbUri = "mongodb://beshutaf:jerucoop@ds129442.mlab.com:29442/beshutaf-shifts-test"
// var mongodbUri = "mongodb://beshutaf:jerucoop@ds211588.mlab.com:11588/beshutaf-shifts"
var mongodbUri = "mongodb://girush:girushifts@ds111608.mlab.com:11608/girush-shifts"

router.get('/get-month', function (req, res) {
  res.json(genrateMonthJson(req.query.year, req.query.month));
});

router.get('/new', function (req, res) {
  res.json(genrateMonthJson(req.query.year, req.query.month));
});

router.get('/get-polls', (req, res) => {
  mongoClient.connect(mongodbUri, (err, db) => {
    db.collection('polls').find()
      .toArray((err, docs) => {
        res.json(docs);
      })
  });
});

router.post('/publish-poll', function (req, res) {
  mongoClient.connect(mongodbUri, function (err, db) {
    db.collection('polls').insertOne(req.body);
    db.close();
  });
});

router.post('/save-assignments', function (req, res) {
  mongoClient.connect(mongodbUri, function (err, db) {
    let query = {};
    db.collection('shift-assignments').updateOne({ pollId: req.body.pollId }, req.body, { upsert: true });
    db.close();
  });
});

router.post("/save-user-preferences", function (req, res) {
  mongoClient.connect(mongodbUri, function (err, db) {
    db.collection('user-preferences')
      .updateOne({
        name: req.body.name,
        "preferences.month": req.body.preferences.month,
        "preferences.year": req.body.preferences.year,
        "preferences.name": req.body.preferences.name
      }, req.body, {
        upsert: true
      });
    db.close();
  });
});

router.get("/load-shift-assignments", (req, res) => {
  mongoClient.connect(mongodbUri, (err, db) => {
    let query = {};
    if (req.query.publishedOnly)
      query['isPublished'] = true
    if (req.query.pollId)
      query['pollId'] = req.query.pollId;
    db.collection('shift-assignments').findOne(query, (err, result) => {
        res.json(result);
        db.close();
      });
  });
});

router.get("/load-user-preferences", (req, res) => {
  mongoClient.connect(mongodbUri, (err, db) => {
    let query = {};
    if (req.query.pollId)
      query['preferences._id'] = req.query.pollId;
    db.collection('user-preferences').find(query)
      .toArray((err, result) => {
        res.json(result);
        db.close();
      });
  });
});

function genrateMonthJson(year, month) {
  let result = [];
  let firstOfMonth = new Date(year, month, 1);
  if (firstOfMonth.getDay() !== 0 && firstOfMonth.getDay() !== 6) {
    result.push([]);
    for (var i = 0; i < firstOfMonth.getDay(); i++) {
      result[0].push({});
    }
  }
  for (var i = 1; i <= new Date(year, month + 1, 0).getDate(); i++) {
    let current = new Date(year, month, i);
    let weekday = current.getDay();
    if (weekday === 6) continue;
    else if (weekday === 0) {
      result.push([]);
    }
    result[result.length - 1].push({
      date: `${i}/${parseInt(month) + 1}`,
      shifts: getShiftsByWeekday(weekday)
    });
  }
  return result;
}

function getShiftsByWeekday(weekday) {
  switch (weekday) {
    case 0: return [{ time: "19:00-22:00" }];
    case 1: return [{ time: "16:00-19:00" }, { time: "19:00-22:00" }];
    case 2: return [{ time: "16:00-19:00" }, { time: "19:00-22:00" }];
    case 3: return [{ time: "16:00-19:00" }, { time: "19:00-22:00" }];
    case 4: return [{ time: "18:00-21:00" }, { time: "21:00-00:00" }];
    case 5: return [{ time: "08:00-11:00" }, { time: "11:00-14:00" }, { time: "13:00-16:00" }];
    default: return [];
  }
}

module.exports = router;