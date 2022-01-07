const axios = require('axios');

const function1 = (char) => {
    return new Promise((resolve, reject) => {
        if(char.length <= 20){
            resolve('C\est bon !')
        }else{
            reject('C\'est pas bon !')
        }
    })
}

const function2 = (int1,int2) => {
    return new Promise((resolve, reject) => {
        if(int1>=int2){
            resolve(int1-int2)
        }else{
            reject('La première valeure est inférieur à la seconde')
        }
    })
}

const function3 = (date) => {
    return new Promise((resolve,reject) => {
        let dateParts = date.split('/')
        let today = Date.now();
        let birthDate = new Date(+dateParts[2], dateParts[1]-1,+dateParts[0]).getTime()
        let major = 18 * 31557600000
        if(today-birthDate>=major){
            resolve('Tu es majeur !')
        }else{
            reject('Tu n\'es pas majeur')
        }
    })
}


async function execute() {
    try{
        const firstPromise = await function1('sacha')
        console.log(firstPromise)
        const secondPromise = await function2(40,20)
        console.log(secondPromise)
        const ThirdPromise = await function3('15/04/1998')
        console.log(ThirdPromise)
    }catch(e){
        console.log(e)
    }
}

execute()

//EXO AVEC THEN/CATCH
function1('sacha').then((res) => console.log(res)).catch((err) => console.log(err))
function2(40,20).then((res) => console.log(res)).catch((err) => console.log(err))
function3('15/04/1998').then((res) => console.log(res)).catch((err) => console.log(err))


//EXO API
axios.get('https://swapi.dev/api/people/1')
.then((res)=> {
    // console.log(res.data)
    function1(res.data.name).then((res) => console.log(res)).catch((err) => console.log(err))
    function2(parseInt(res.data.height),parseInt(res.data.mass)).then((res) => console.log(res)).catch((err) => console.log(err))
    function3('15/04/1998').then((res) => console.log(res)).catch((err) => console.log(err))
})
.catch((err)=>{
    console.log
})