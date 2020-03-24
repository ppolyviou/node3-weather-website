console.log('loadddd')




const weatherForm = document.querySelector('form')
const search = document.querySelector('input')


weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    const location = search.value

    document.getElementById("message-1").innerHTML="Loading..."


    fetch('http://localhost:3000/weather/?address=' + location).then((Response) => {
        Response.json().then((data) => {
            if (data.error) {
                console.log(data.error)
                document.getElementById("message-1").innerHTML=data.error
                document.getElementById('message-2').innerHTML=""
            } else {
                console.log(data.forecast)
                document.getElementById('message-1').innerHTML=data.forecast

                console.log(data.location)
                document.getElementById('message-2').innerHTML=data.location
            }
        })
    })
})
// fetch('https://puzzle.mead.io/puzzle').then((Response)=>{
//     Response.json().then((data)=>{
//         console.log(data)
//     })
// })