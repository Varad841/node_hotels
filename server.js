/*function add(a,b)
{
    return a+b;
}*/

// var add= function(a,b){
//     return a+b;
// }

// var add = (a,b) =>{return a+b}
// // var add = (a, b) => a+b;


// var result = add(1 ,8);

// console.log(result);

//CALLBACK FUNCTIONS
// function callback(){
//     console.log('Callback function called successfully')
// }

// const add = function(a, b, callback){
//     var result= a+b;
//     console.log("Result is :" +result);
//     callback();
// }

// add(2,3, callback)


// LEARN ABOUT 'FS' AND 'OS'
// var fs = require('fs');
// var os = require('os');

// var user = os.userInfo();
// console.log(user);
// console.log(user.username);


// fs.appendFile('greetings.txt', 'hi '+user.username+' !\n',()=>{console.log("File created!")})

// const notes  = require('./notes.js')
// console.log('server is available')

// var age  = notes.age;
// console.log(age)

// var result = notes.addnum(10,20);
// console.log('Result is:'+ result)


const express = require ('express');
const app = express();
const db = require('./db');

const bodyParser = require('body-parser');
app.use(bodyParser.json());




app.get('/', (req, res) => {
  res.send('Welcome to the hotel')
})

app.get('/chicken', (req, res)=>{
    res.send('will serve you chicken!')
})

app.get('/Mutton', (req, res)=>{
    var custom_dish={
        name:"Mutton Angara",
        size:"10kg",
        is_sause:true,
        is_roti:true
    }
    res.send(custom_dish)
})

app.get('/Biryani', (req, res)=>{
    res.send('will serve you Biryani!')
})

app.get('/Pizza', (req, res)=>{
    res.send('will serve you Pizza!')
})


//Import the routes
const personRoutes = require('./routes/personRoutes');
const MenuRoutes = require('./routes/menuRoutes');

//Use the router
app.use('/person',personRoutes);
app.use('/menuItem', MenuRoutes);



app.listen(3000, ()=>{
    console.log('Listineing to port 3000')
})