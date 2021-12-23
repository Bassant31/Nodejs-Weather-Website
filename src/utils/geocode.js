const request = require('postman-request')
const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+encodeURIComponent(address)+'.json?access_token=pk.eyJ1IjoiYmFzc2FudDMxIiwiYSI6ImNreGQ2d3R2eTBwMWYycm8zb3ZucXducXIifQ.1xoOyQBeOYwhgNURN2peaQ&limit=1'
    request({url:url,json:true},(error,response)=>{
        if(error){
            callback('unable to connect to location services!',undefined)

        }else if(response.body.message){
            callback('unable to find to location!',undefined)

        }else{
            callback(undefined,{
                latitude:response.body.features[0].center[1],
                longitude:response.body.features[0].center[0],
                location:response.body.features[0].place_name
            })

        }
    })
   

}

module.exports = geocode
