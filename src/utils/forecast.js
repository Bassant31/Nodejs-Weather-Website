const request = require('postman-request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=459f26e1b0eb349da26f0cfb8e3c6238&query='+latitude+','+longitude+'&units=f'
    console.log(url)
    request({url:url,json:true},(error,response)=>{
       if(error){
        callback("cannot conect weather service!!",undefined)

       }else if(response.body.error){
        callback(url,undefined)
       }else{
        callback(undefined,{
            region:response.body.location.region,
            country:response.body.location.country,
            feelsLike:response.body.current.feelslike,
            humidity:response.body.current.humidity,
            description:response.body.current.weather_descriptions[0]
        })

       }
    

    })


}

module.exports=forecast