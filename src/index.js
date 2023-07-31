//Data 

//💡 What data types do you see?
const inventory = [
  {
    id: 1,
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
//🛑 run live server and call in console
//🛑 wsl users have to manually type in the address
//wsl is subsystem (ubuntu in windows, chrome on windows), port is exposed (can't open another computer) 
function helloWorld(){
  //🛑 show difference between returning/getting undefined
  //return "Hello, World!";
  console.log("hello, world!");
}

//✅ 2. I DO: For Easley's bookstore, create formatPrice(price)
function formatPrice(price){
  //🛑 look up .toFixed on the internet - MDN docs?
  //🛑 .prototype means the function will apply to every instance of a Number
  return `$${Number.parseFloat(price).toFixed(2)}`
  //console.log('$' + Number.parseFloat(price).toFixed(2))
  //console.log(`$${Number.parseFloat(price).toFixed(2)})`
}

//✅ 3. I DO: Make an arrow function version of formatPrice
//💡 why const and not let?
//💡 implicit return, how to do explicit return?
formatPrice = (price) => `$${Number.parseFloat(price).toFixed(2)}`

//🛑 demo HOISTING arrow vs defined functions
//console.log(formatPrice(3.3))
//console.log(formatPriceArrow(3))


//✅ 4. WE DO: create a blurb() function that accepts a book as an argument and logs a message in the following format:
//'Eloquent JavaScript: A Modern Introduction to Programming by Marjin Haverbeke is on sale for $10.00'
//❔ how to access a key/value pair
const blurb = (book) => {
  return `${book.title} is on sale for ${formatPrice(book.price)}`
}

// 💡 ~~~~~~~~~~ slides: callbacks ~~~~~~~~~~~~~

//✅ 5. Call formatPrice on an array of prices

//✅ 5a. Create an array
const prices = [3, 2.3, 55, 9.3]

//✅ 5b. Use a for loop to iterate over prices
for(let i = 0; i < prices.length; i++){
  console.log(formatPrice(prices[i]))
}

//✅ 5c. Use .forEach to iterate over prices
//🛑 check MDN for .forEach
prices.forEach((price, i) => {
  console.log(formatPrice(price))
})

// 💡 ~~~~~~~~ slides: scope ~~~~~~~~~~~~~~~

//✅ 5d. Use .map to iterate over prices
//🛑 check MDN for .map
//💡 is this implicit or explicit return?
//🛑 notice how we're using 'price' like in .forEach
//💡 why are we allowed to do this, are they different?
prices.map((price, i) => {
  return formatPrice(price)
})
console.log(prices)

//✅ 5e. WE DO: using .map, for each book in inventory, return blurb(book)
//output: ['Eloquent JavaScript: A Modern Introduction to Programming is on sale for $10.00', ...]
let blurbs = inventory.map(book => {
  return blurb(book)
}) 
console.log(blurbs)

//✅ 6. Create a version of myMap that uses a for loop to mimic .map
//input: array, callback function
//output: a new array
function myMap(array, cb){
  const newArray = []
  for(let i = 0; i < array.length; i++){
    newArray.push(cb(array[i]))
  }
  return newArray;
}