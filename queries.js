// see all the databses
show databases

//use existing database
use sample_airbnb

// see all collections
show collections

// display ALL documents from a collection
// db.<collection>.find()
db.listingsAndReviews.find();

// prettify the output
db.listingsAndReviews.find().pretty();

// projecting
// select which keys to display
db.listingsAndReviews.find({},{
    name: 1,
    address: 1
}).pretty();

// project a key of an embeded document
db.listingsAndReviews.find({},{
    name: 1,
    'address.country': 1
}).pretty();

// finding by criteria

// find all listings with exactly 5 beds
db.listingsAndReviews.find({
    beds: 5
},{
    name: 1,
    beds: 1
}).pretty();

// find by a key in an embedded document
// (aka sub-document, aka nested object)
// find all listings in Brazil
db.listingsAndReviews.find({
    'address.country':'Brazil'
},{
    name: 1,
    'address.country': 1
}).pretty();

// multiple criteria
// find listings that have 5 beds
// and 5 bedrooms
db.listingsAndReviews.find({
    beds: 5,
    bedrooms: 5
},{
    name: 1,
    beds: 1,
    bedrooms: 1
}).pretty();

// find listings with 5 beds and 5 bedrooms
// and in Brazil
db.listingsAndReviews.find({
    beds: 5,
    bedrooms: 5,
    'address.country':'Brazil'
},{
    name: 1,
    beds: 1,
    bedrooms: 1,
    'address.country': 1
}).pretty();

// listings that have more than 3 beds
db.listingsAndReviews.find({
    beds: {
        '$gt': 3
    }
}, {
    name: 1,
    beds: 1
}).pretty();

// listings with less than 4 beds
db.listingsAndReviews.find({
    beds: {
        '$lt': 4
    }
}, {
    name: 1,
    beds: 1
}).pretty();

// find listings that have 4 to 8 beds
db.listingsAndReviews.find({
    beds: {
        '$gte': 4,
        '$lte': 8
    }
}, {
    name: 1,
    beds: 1
}).pretty();

//combine with multiple criteria
db.listingsAndReviews.find({
    beds: {
        '$gte': 4,
        '$lte': 8
    },
    'address.country':'Brazil'
}, {
    name: 1,
    beds: 1,
    'address.country': 1
}).pretty();

// find all listings that allowed pets
db.listingsAndReviews.find({
    'amenities':'Pets allowed'
}, {
    name: 1,
    'amenities': 1
}).pretty();

// find all listings that have pets allowed
// and pets live on this property
db.listingsAndReviews.find({
    'amenities': {
        '$all':['Pets allowed', 'Pets live on this property', 'Dog(s)', 'Cat(s)']
    }
}, {
    name: 1,
    'amenities': 1
}).pretty();

// count how many listings
// that have dogs and cats
db.listingsAndReviews.find({
    'amenities': {
        '$all':['Pets allowed', 'Pets live on this property', 'Dog(s)', 'Cat(s)']
    }
}, {
    name: 1,
    'amenities': 1
}).count();

// find listings that have either dogs or cats
db.listingsAndReviews.find({
    'amenities': {
        '$in':['Dog(s)', 'Cat(s)']
    }
}, {
    name: 1,
    'amenities': 1
}).pretty();

// select a document by Object ID
use sample_mflix
db.movies.find({
    "_id":ObjectId("573a1390f29313caabcd4135")
}).pretty()

// how to find by a substring
// eg. look for all the lisitngs that have the
// word "spacious" in the name and in Brazil
use sample_airbnb
db.listingsAndReviews.find({
    'name': {
        '$regex':'spacious', '$options':'i'
    },
    'address.country':'Brazil'
}, {
    name: 1,
    'address.country': 1
}).pretty();

// sample hands on

//sample_restaurants
use sample_restaurants

// qn 1
db.restaurants.find({
    'cuisine': 'Hamburgers'
}, {
    name: 1,
    cuisine: 1
}).pretty()

// qn 2
db.restaurants.find({
    'cuisine': 'American',
    'borough': 'Bronx'
}, {
    name: 1,
    cuisine: 1,
    borough: 1
}).pretty()

// qn 3
db.restaurants.find({
    'address.street':'Stillwell Avenue'
}, {
    name: 1,
    'address.street': 1
}).pretty()

// sample_mflix
use sample_mflix

// qn 1
db.movies.find({
    type:'movie'
}).count()

db.movies.find({
    type: {
        '$not':{
            '$in':['movie']
        }
    }
}, {
        title: 1,
        type: 1
}).pretty()

// qn 2
db.movies.find({
    year: {
        '$lt': 2000
    }
}).count()

// qn 3
db.movies.find({
    'countries': {
        '$in': ['USA']
    }
}, {
    title: 1,
    countries: 1
}).pretty().limit(10)

// qn 4
db.movies.find({
    'countries': {
        '$not': {
            '$in': ['USA']
        }
    }
}, {
    title: 1,
    countries: 1
}).pretty().limit(10)

// qn 5
db.movies.find({
    'awards.wins': {
        '$gte': 3
    }
}, {
    title: 1,
    'awards.wins': 1
}).pretty()

// qn 6
db.movies.find({
    'awards.nominations': {
        '$gte': 3
    }
}, {
    title: 1,
    'awards.nominations': 1
}).pretty()

// qn 7
db.movies.find({
    cast: {
        '$in': ['Tom Cruise']
    }
}, {
    title: 1,
    cast: 1
}).pretty()

// qn 8
db.movies.find({
    directors: {
        '$in': ['Charles Chaplin']
    }
}, {
    title: 1,
    directors: 1
}).pretty()

// Creating our own database in mongo

// 1. use <name of the new database>
// 2. insert a document into a new collection
use tgc10_shelter
db.animals.insert({
    'name':'Fluffy',
    'age': 3,
    'breed': 'Golden Retriever',
    'type':'Dog'
})

// insert many
db.animals.insertMany([
    {
        'name':'Dazzy',
        'age': 4,
        'breed': 'Greyhound',
        'type': 'Dog'
    },
    {
        'name':'Timmy',
        'age': 5,
        'breed': 'Border Collie',
        'type': 'Dog'
    },
    {
        'name':'Fishy',
        'age': 1,
        'breed': 'Goldfish',
        'type': 'Fish'
    }
])

// update by providing A NEW DOCUMENT
// HTTP RESTFUL - PUT
db.animals.update({
    '_id':ObjectId("6030bdf6c549e33bd9b36e73")
}, {
    "name" : "Timmy",
    "age" : 1.5,
    "breed" : "Border Collie",
    "type" : "Dog"
})

// update by modifying a key
// HTTP RESTFUL - PATCH
db.animals.update({
        '_id':ObjectId("6030bdf6c549e33bd9b36e73")
}, {
    '$set': {
        'name':'Thunder'
    }
})

// DELETE
db.animals.remove({
    '_id': ObjectId("6030bdf6c549e33bd9b36e74")
})

// hands on 

// qn 1
use fake_school

// qn 2
db.students.insert({
    'name': 'Jane Doe',
    'age': 13,
    'subjects': 'Defense Against the Dark Arts, Charms, History of Magic',
    'date enrolled':'13th May 2016'
})

// qn 3
db.students.insertMany([
    {
        'name': 'James Verses',
        'age': 14,
        'subjects': 'Transfiguration, Alchemy',
        'date enrolled': '15th June 2015'
    },
    {
        'name': 'Jonathan Goh',
        'age': 12,
        'subjects': 'Divination, Study of Ancient Runes',
        'date enrolled': '16th April 2017'
    }
])

// qn 4
db.students.update({
        '_id':ObjectId("6030c2aac549e33bd9b36e76")
}, {
    '$set': {
        'age': 13
    }
})

// qn 5
db.students.update({
    '_id':ObjectId("6030c19ec549e33bd9b36e75")
}, {
    "name": "Jane Doe Jr",
    "age": 11,
    "subjects": "Defense Against the Dark Arts, Charms, History of Magic",
    "date enrolled":"13th May 2016"
})

// qn 6
db.students.remove({
    '_id': ObjectId("6030c2aac549e33bd9b36e77")
})

// add embedded documents
db.animals.insert({
    'name':'Cookie',
    'age': 3,
    'breed':'Lab Retriever',
    'type':'Dog',
    'checkups':[
        {
            'id':ObjectId(),
            'name': 'Dr Chua',
            'diagnosis':'Heartworms',
            'treatment':'Steroids'
        }
    ]
})

// add a new checkup to cookie
db.animals.update({
    '_id':ObjectId("6030c9dcc549e33bd9b36e79"),
}, {
    '$push': {
        'checkups': {
            '_id':ObjectId(),
            'name':'Dr Tan',
            'diagnosis':'Diabetes',
            'treatment':'Medication'
        }
    }
})

// update checkup
db.animals.update({
    'checkups._id': ObjectId("6030caa2c549e33bd9b36e7a")
}, {
    '$set': {
        'checkups.$.diagnosis':'Stomach Ulcers',
        'checkups.$.treatment': 'Drink more water'
    }
})

// remove checkup
db.animals.update({
    '_id':ObjectId("6030c9dcc549e33bd9b36e79")
}, {
    '$pull': {
        'checkups': {
              '_id':ObjectId("6030c9dcc549e33bd9b36e78")
        }
    }
})






