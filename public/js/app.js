console.log('client side javascript is loaded')

const msgOne = document.querySelector('#msg-1')
const msgTwo = document.querySelector('#msg-2')

const weatherForm = document.querySelector('form')
const Location = document.querySelector('input')
weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault()
    fetch('http://localhost:3000/weather?address='+Location.value).then((response)=>{
    response.json().then((data)=>{
        if(data.error){
            msgOne.textContent=data.error

        }else{
            msgOne.textContent=data.country
             msgTwo.textContent= data.description


        }
        
    })
})
})