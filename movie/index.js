import express from 'express'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'


const app=express()

app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:true}))

//connecting db
mongoose.connect('mongodb://localhost:27017/pmovie')
.then(()=>console.log('db connected'))
.catch((e)=>console.log('error'))


//schema
const movieSchema={
    id:Number,
    name:String
}

//create collection
const Movie=mongoose.model('Movie',movieSchema)

app.post('/api/insert',(req,res)=>{
    async function createMovie(){
        try {
            Movie.insertMany([{id:1,name:'Action'},
            {id:2,name:'Horror'},{id:3,name:'Romance'}])
        } catch (error) {
            console.log(error.message);
        }
    }
    // createMovie()
})

//get all documents
app.get('/api/getall',(req,res)=>{
    async function findAll(){
    const getMovie=await Movie.find({})
    res.send(getMovie)
    }
//    findAll()
})

app.post('/api/add',(req,res)=>{
    var add={
        id:req.body.id,
        name:req.body.name
        }
//add user in users      
    async function createMovie(){
       const userId=parseInt(req.body.id)
    //    console.log(typeof(userId));
        try {
        const findMovie= await Movie.find({id:userId},{})//find email from user in mca(db)
         if(findMovie.id==add.id){
            res.send("user exist")
        }
        else{
            var insert=await Movie.insertMany([add])//insert new user in mca(db)
            res.send(insert)
        }
       
        } catch (error) {
            console.log(error.message)
        }
}
// createMovie()
})

app.put('/api/update/',(req,res)=>{
    async function updateMovie(){

        const upName=req.body.name        
        const userId=parseInt(req.body.id)

        try {
          
            const update=await Movie.updateOne({id:userId},{$set:{name:upName}})
            res.send(update);
           
            } catch (error) {
                console.log(error.message)
            }

    }
    updateMovie()
})

app.delete('/api/delete',(req,res)=>{
    async function deleteMovie(){
        const userId=parseInt(req.body.id)
        try {
          
            const remove=await Movie.deleteOne({id:userId},{})
            console.log(remove);
           
            } catch (error) {
                console.log(error.message)
            }


    }
    deleteMovie()
})


app.listen(2001,()=>{
    console.log("server is running on 2001");
})