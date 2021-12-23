const express = require('express')
const path = require('path')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const { title } = require('process')
const app = express()

//Define paths for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const partialPath = path.join(__dirname,'../views/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
hbs.registerPartials(partialPath)
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title:'Weather',
        name:'Bassant'
    })
})

app.get('/about',(req,res)=>{
   res.render('about',{
       title:'About'

   }) 
})

app.get('/help',(req,res)=>{
    res.render('help',{
        title:'Help!'

    })
})

app.get('/weather',(req,res)=>{
    if(!req.query.address){
        return res.send({
            error:"Adress must be included"})
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        else{
            forecast(latitude,longitude,(error,forecastData)=>
            {
                if(error){
                    return res.send({error})
                }
                else{

                    res.send({
                        country:forecastData.country,
                        region:forecastData.region,
                        feelsLike:forecastData.feelsLike,
                        humidity:forecastData.humidity,
                        description:forecastData.description,
                        address:location
                    })

                }

            })
        }
    })


    
})

app.get('/help/*',(req,res)=>{
     res.render('404',{
         title:'404',
         msg:'Help artile not found'})
})
// 404 must be last get
app.get('*',(req,res)=>{
    res.render('404',{
        title:'Weather',
        msg:'My Page 404'})
     
})
app.listen(3000,()=>{
    console.log("server work on port 3000.")
})




/*console.log(__dirname)
console.log(__filename)
console.log(path.join(__dirname,'..'))*/


/*
// app.use(express.static(publicDirectoryPath)) 
//use express make the server go and render index.html
//by deafult & put it in the root  so no need to create 
// app.get function for the html pages*/

/*app.get('/help',(req,res)=>{

    res.send('Help page')
})*/
