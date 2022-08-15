// const mongoose = require('mongoose');
import mongoose from 'mongoose'
 

mongoose.connect('mongodb://localhost/aggregate')

  .then(() => console.log('Connected to MongoDB...'))

  .catch(err => console.error('Could not connect to MongoDB...', err));

 

//creating an author

const Author = mongoose.model('Author', new mongoose.Schema({

    rno : String, 

    mode:String, 

    fees : String, 

    amount : Number, 

    dept : String 

}));

 

async function createPayment(rno,mode,fees,amount,dept ) { 

    const author = new Author({

      rno, 

      mode, 

      fees,

      amount,

      dept 

    });

   

    const result = await author.save();

    console.log(result);

  }

 

  async function listCourses() { 

    // const author = await Author

    //   .find()

    //  // .populate('author')

    //   //.select('')

    //   .count()

  //department count
    // const course=await Author.aggregate([{$group: {_id:'$dept'}},{$count: "count"}])
    // console.log(course);

//transactions count per dept
    // const result=await Author.aggregate([{$group:{_id:'$dept',count:{$sum:1}}}])
    // console.log(result)

//highest consolidated payment
// const result=await Author.aggregate([{$group:{_id:'$dept',count:{$sum:1}}},{$sort:{count:-1}},{$limit:1}])
// console.log(result)

//find student who paid more payment
// const result=await Author.aggregate([{$group:{_id:'$rno',count:{$sum:1}}},{$sort:{count:-1}},{$limit:1}])
// console.log(result)

//who paid 1st in dept
// const result=await Author.aggregate([{$match:{dept:"MCA"}},{$group:{_id:'$rno',count:{$sum:1}}},{$sort:{count:-1}},{$limit:1}])
// console.log(result)

//who paid gt 1000
// const result=await Author.aggregate([{$match:{amount:{$gt:1000}}},{$group:{_id:'$rno',count:{$sum:1}}},{$sort:{count:-1}},{$limit:1}])
// console.log(result)

//consolidated pay by students per dept wise using amount
// const result=await Author.aggregate([{$match:{dept:"MCA"}},{$group:{_id:{amount:'$amount',rno:'$rno'},count:{$sum:1}}}])
// console.log(result)

//find all the students usingdept find fees type
// const result=await Author.aggregate([{$match:{dept:"MCA"}},{$group:{_id:{rollno:'$rno',fee:'$fees'},paid:{$sum:'$amount'}}},{$sort:{_id:1}}])
// console.log(result)

//find student using rno
// const result=await Author.aggregate([{$match:{rno:2}},{$group:{_id:'$fees',paid:{$sum:'$amount'}}},{$sort:{_id:1}}])
// console.log(result)

//conditon  after consolidates
const result=await Author.aggregate([{$match:{fee:'mess',fee:'tution'}},{$group:{_id:'$rno',paid:{$sum:'$amount'}}},{$sort:{_id:1,paid:-1}}])
console.log(result)


}
 

// createPayment("1P21MC021","NEFT","TUTION",1600,"BIOTECH") 
listCourses()