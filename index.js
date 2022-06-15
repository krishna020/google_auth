const express = require('express');
const speakeasy = require('speakeasy');
const uuid = require('uuid');


const { JsonDB } = require('node-json-db');
const{ Config } = require('node-json-db/dist/lib/JsonDBConfig')

const app = express()


app.use(express.json())

const db = new JsonDB(new Config('myDatabase',true,false,'/'))


app.get('/api' , (eeq,res) => res.json({message:'welcome to two factor authenication factor example'}))

//register user and temp secret

app.post('/api/register',(req,res) =>{

const id = uuid.v4()

try{
    const path =`/user/${id}`
    const temp_secret = speakeasy.generateSecret()
    
    db.push(path,{id,temp_secret})
    res.json({id,secret:temp_secret.base32})




}catch(error){
    console.log(error)
    res.status(500).json({message:'Error generating the secret'})

}

})



//verify token 
app.post('/api/verify',(req,res) =>{
    const{token,userId}=req.body
    
    try{
        const path=`/user/${userId}`
        const user =db.getData(path)

        const {base32: secret}=  user.temp_secret

    
        const verified = speakeasy.totp.verify({ secret,
        encoding:'base32',
        token 
        
        });


        if(verified){
            db.push(path,{ id : userId, secret:user.temp_secret})
            res.json({ verified: true })
        }else{
            res.json({  verified: false })
        }
    } catch(error){
        console.log(error)
        res.status(500).json({message:'Error finding user'})
    }
})





//validate
app.post('/api/validate',(req,res) =>{
    const{token,userId}=req.body
    
    try{
        const path=`/user/${userId}`
        const user =db.getData(path)

        const {base32: secret}=  user.temp_secret

    
        const tokenValidates= speakeasy.totp.verify({ secret,
        encoding:'base32',
        token ,window:1
        
        });


        if(tokenValidates){
          
            res.json({ validated: true })
        }else{
            res.json({  validated: false })
        }
    } catch(error){
        console.log(error)
        res.status(500).json({message:'Error finding user'})
    }
})

const PORT= process.env.PORT || 5000

app.listen(PORT,() => console.log(`server is running on port ${PORT}`))





