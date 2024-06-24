//array of objects
const inventory = [
  {
    id: 1, //unique identifier
    title: 'Eloquent JavaScript: A Modern Introduction to Programming',
    author: 'Marjin Haverbeke',
    price: 10.00,
    reviews: [{userID: 1, content:'Good book, but not great for new coders'}],
    inventory: 10,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/51IKycqTPUL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id: 2,
    title: 'JavaScript & JQuery: Interactive Front-End Web Development',
    author: 'Jon Duckett',
    price: 45.75,
    reviews: [{userID: 15, content:'good way to learn JQuery'}],
    inventory: 2,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/31SRWF+LkKL._SX398_BO1,204,203,200_.jpg'
  },
  {
    id: 3,
    title: 'JavaScript: The Good Parts',
    author: 'Douglas Crockford',
    price: 36.00,
    reviews: [{userID: 25, content:'I disagree with everything in this book'}, {userID: 250, content:'Only JS book anyone needs'}],
    inventory: 8,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/5131OWtQRaL._SX218_BO1,204,203,200_QL40_FMwebp_.jpg'
  },
  {
    id: 4,
    title: 'JavaScript: The Definitive Guide',
    author: 'David Flanagan',
    price: 25.50,
    reviews: [{userID: 44, content:'Great intro to js book'}, {userID: 350, content:'It really is the Definitive guide'}],
    inventory: 0,
    imageUrl: "https://images-na.ssl-images-amazon.com/images/I/51wijnc-Y8L._SX379_BO1,204,203,200_.jpg"
  },
  {
    id: 5,
    title: 'You Don’t Know JS',
    author: 'Kyle Simpson',
    price: 6.00,
    reviews: [{userID: 76, content:'You can find this for free online, no need to pay for it!'}],
    inventory: 7,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41T5H8u7fUL._SX331_BO1,204,203,200_.jpg'
  }, 
  {
    id: 6,
    title: 'Learn Enough JavaScript to Be Dangerous',
    author: 'Michael Hartl',
    price: 24.00,
    reviews: [{userID: 50, content:'pretty good'}],
    inventory: 5,
    imageUrl: 'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQyf6xSyTHc7a8mx17ikh6GeTohc88Hn0UgkN-RNF-h4iOwVlkW'
  },
  {
    id: 7,
    title: 'Cracking the Coding Interview',
    author: 'Gayle Laakmann McDowell',
    price: 49.95,
    reviews: [{userID: 99, content:'One of the most helpful books for taking on the tech interview'}, {userID: 20, content: 'Great but I just wish it was in JavaScript instead of Java' }],
    inventory: 20,
    imageUrl: 'https://images-na.ssl-images-amazon.com/images/I/41oYsXjLvZL._SY344_BO1,204,203,200_.jpg'
  }
]


//✅ 1. Create hello world using REGULAR functions
//entire definition gets hoisted to the top
function helloWorld(name){
    // string interpolation
    return `hello ${name}`
}

//only variable declaration gets hoisted to the top, not the assigned arrow function
//this used explicit return (curly braces and 'return' keyword)
const helloArrow = (name) => {
    return `hello ${name}`
}


//✅ 2. For Easley's bookstore, create formatPrice(price)
// paramter: float
// return a string in the format $xx.xx
// formatPrice(3.3) => $3.30
function formatPrice(price){
    return `$${parseFloat(price).toFixed(2)}`
}

//✅ 3. Make an arrow function version of formatPrice
// if arrow function only has one line of code (return) use implicit return
const arrowPrice = (price) => `$${parseFloat(price).toFixed(2)}`

//✅ 4. WE DO: create a blurb() function that accepts a book as an argument and logs a message in the following format:
//'Eloquent JavaScript: A Modern Introduction to Programming by Marjin Haverbeke is on sale for $10.00'

//let book = inventory[0]
//arguments that are passed in on invocation will henceforth be known as "book"
const blurb = (book) => { 
    let price = formatPrice(book.price)
    //console.log(`${book.title} by ${book.author} is on sale for ${price}`)
    return `${book.title} by ${book.author} is on sale for ${price}`
    // return `${book.title} by ${book.author} is on sale for ${formatPrice(book.price)}`
}

let firstBook = inventory[0]
blurb(firstBook) // 'Eloquent JavaScript: A Modern Introduction to Programming by Marjin Haverbeke is on sale for $10.00'
blurb(inventory[1]) //'JavaScript & JQuery: Interactive Front-End Web Development by Jon Duckett is on sale for $45.75'
blurb(inventory[2]) //'JavaScript: The Good Parts by Douglas Crockford is on sale for $36.00'

//using let...of... to access element directly
for(let book of inventory){
    //console.log(blurb(book))
}
//using index to access index of book in inventory
for(let i = 0; i < inventory.length; i++){
    //console.log(blurb(inventory[i]))
}

//forEach iterates over each element of inventory
//it accepts a function as an argument (a.k.a a callback function)
//forEach invokes the callback function for each book 
inventory.forEach(blurb)

//defining the callback function directly inside of .forEach
inventory.forEach((curBook) => {
    //console.log(curBook.author)
})

//✅ 5. Call formatPrice on an array of prices

//✅ 5a. Create an array
const prices = [3.25, 98.33333, 0, 37, 2]

//✅ 5b. Use a for loop to iterate over prices
for(let curPrice of prices){
    //console.log(formatPrice(curPrice))
}

prices.forEach(formatPrice)

//DOES NOT MUTATE ARRAY
//DOES NOT RETURN NEW ARRAY
prices.forEach((curPrice) => {
    //console.log(`$${parseFloat(curPrice).toFixed(2)}`)
})

//✅ 5c. Use .forEach to iterate over prices

//✅ 5d. Use .map to iterate over prices
//RETURNS NEW ARRAY WHERE EACH ELEMENT IS UPDATED WITH NEW ELEMENT
let formattedPrices = prices.map((curPrice) => {
    //the return value is what will replace the original element
    return (`$${parseFloat(curPrice).toFixed(2)}`)
})

//✅ 5e. using .map, for each book in inventory, return blurb(book)
//output: ['Eloquent JavaScript: A Modern Introduction to Programming is on sale for $10.00', ...]
let formattedBlurbs = inventory.map((curBook) => {
    return `${curBook.title} by ${curBook.author} is on sale for ${curBook.price}`
})
// formattedBlurbs = inventory.map(blurb)

//✅ 6. Create a version of myMap that uses a for loop to mimic .map
//input: array, callback function
//output: a new array

const nums = [1, 2, 3, 4, 5]
//[10, 20, 30, 40, 50]
const newNums = nums.map((curNum) => {return curNum * 10})

const strings = ["one", "two", "three", "four", "five"]
//[3, 3, 5, 4, 4]
const stringLengths = strings.map((curString) => {return curString.length})

