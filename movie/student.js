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

 

async function createList(rno,subject,mark) { 

    const author = new Author({

      rno, 
      subject,
      mark

    });

   

    const result = await author.save();

    console.log(result);

  }


async function listAll(){
// Count how many time every student present in the collection 
const getCount=await Author.aggregate([{$group:{_id:'$rno'}},{$count:'count'}])
// console.log(getCount);

//Provide individual Count for every student 
const indCount=await Author.aggregate([{$group:{_id:'$rno',count:{$sum:1}}}])
// console.log(indCount);

//Find the total amount paid by every student
const totAmount=await Author.aggregate([{$group:{_id:'$rno',totalPaid:{$sum:'$amount'}}}])
// console.log(totAmount)

//Count how many payment made by individual department
const paiddep=await Author.aggregate([{$group:{_id:'$dept',transaction:{$sum:1}}}])
// console.log(paiddep)

//Provide the total amount paid by every department
const totdep=await Author.aggregate([{$group:{_id:'$dept',totalPaid:{$sum:'$amount'}}}])
// console.log(totdep)

//list the highest amount paid by individual departments 
const highdep=await Author.aggregate([{$group:{_id:'$dept',totalPaid:{$sum:'$amount'}}},{$sort:{totalPaid:-1}}])
// console.log(highdep)

//Find the average amount paid by every department
const avgdep=await Author.aggregate([{$group:{_id:'$dept',Average:{$avg:'$amount'}}}])
// console.log(avgdep);

//Who has paid the heighest amount in the MCA department
const highpaid=await Author.aggregate([{$match:{dept:'MCA'}},{$group:{_id:'$rno',totalPaid:{$sum:'$amount'}}}])
// console.log(highpaid);

//Who has paid the heighest amount in the college
const highclg=await Author.aggregate([{$group:{_id:'$rno',totalPaid:{$sum:'$amount'}}},{$sort:{totalPaid:-1}}]).limit(1)
// console.log(highclg);

//Who has paid the lowest amount in the college
const lowclg=await Author.aggregate([{$group:{_id:'$rno',totalPaid:{$sum:'$amount'}}},{$sort:{totalPaid:1}}]).limit(1)
// console.log(lowclg)

//Who has paid the lowest "mess fee" in MBA department
const lowmess=await Author.aggregate([{$match:{dept:'MBA',fees:"mess"}},{$group:{_id:'$rno',totalPaid:{$sum:'$amount'}}},{$sort:{totalPaid:1}}]).limit(1)
// console.log(lowmess)

//Who has paid the lowest "mess fee" in the college
const lowmessclg=await Author.aggregate([{$match:{fees:"mess"}},{$group:{_id:'$rno',totalPaid:{$sum:'$amount'}}},{$sort:{totalPaid:1}}]).limit(1)
// console.log(lowmessclg);

//Which department has paid the lowest "mess fee"
const lowmessdep=await Author.aggregate([{$match:{fees:"mess"}},{$group:{_id:'$dept',totalPaid:{$sum:'$amount'}}},{$sort:{totalPaid:1}}]).limit(1)
// console.log(lowmessdep); 

//Who hs paid the lowest tution fees
const lowtut=await Author.aggregate([{$match:{fees:"tution"}},{$group:{_id:'$rno',totalPaid:{$sum:'$amount'}}},{$sort:{totalPaid:1}}]).limit(1)
// console.log(lowtut); 

//List out all all the id with their highest fee in ascending order 	
const highfee=await Author.aggregate([{$match:{amount:{$gte:2000}}},{$group:{_id:{rollno:'$rno',fee:'$fees'},paid:{$sum:'$amount'}}},{$sort:{_id:1,paid:1}}])
// console.log(highfee)

//.Who is the second highest payer in the MCOM department
const feemcom=await Author.aggregate([{$match:{dept:'MCOM'}},{$group:{_id:{rollno:'$rno',fee:'$fees'},paid:{$sum:'$amount'}},high:{$max:'$amount'}},{$sort:{_id:1,paid:-1}}]).limit(1)
console.log(feemcom)


}


listAll()