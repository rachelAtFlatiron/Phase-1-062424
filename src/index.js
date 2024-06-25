//✅ 1. fork and sync git

//✅ 2. Review data.js and order of script tags in HTML <head> 

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

//✅ 3. explore the debugger

//✅ 4. update the store name with "easley's technical books"
//.querySelector('#store-name')
// # - id
// . - class


function renderHeader(store){
  const storeName = document.getElementById('store-name')
  storeName.textContent = store.name
}

renderHeader(bookStore)

//✅ 5. create a function for render footer
const renderFooter = (store) => {
  //READ
  const storeName = document.getElementById('store')
  //document.querySelector("#number")
  const storeNumber = document.getElementById('number')
  const storeAddress = document.getElementById('address')

  //UPDATE
  //.textContent is a property
  //you will update it similarly to an object
  //in this analogy 
  //storeName would be the object, textContent would the key, and store.name would be the value
  storeName.textContent = store.name 
  storeNumber.textContent = store.number 
  storeAddress.textContent = store.address
}
renderFooter(bookStore)

//✅ 6. create a function called renderBook(book)

/***
function: create HTML structure for single book and append to page
input: a book object
output: none
***/

const renderBook = (book) => {
  // READing (accessing) an existing node
  const bookList = document.getElementById('book-list')

  // CREATEing new nodes
  const li = document.createElement('li')
  const titleNode = document.createElement('h3')
  const authorNode = document.createElement('p')
  const priceNode = document.createElement('p')
  const imageNode = document.createElement('img')
  const buttonNode = document.createElement('button')

  // parent.append (child)
  bookList.append(li)
  li.append(titleNode)
  li.append(authorNode)
  li.append(priceNode)
  li.append(imageNode)
  li.append(buttonNode)

  // UPDATING node contents (whether it be id, textContent, src, classNames)
  li.className = 'card'
  titleNode.textContent = book.title
  authorNode.textContent = book.author 
  priceNode.textContent = formatPrice(book.price)
  //ALWAYS DOUBLE CHECK THE KEYS
  //DO NOT ASSUME THEM
  imageNode.src = book.imageUrl
  buttonNode.textContent = 'Delete'
}


// for(let curBook of bookStore.inventory){
//   renderBook(curBook)
// }

// for(let i = 0; i < bookStore.inventory.length; i++){
//   renderBook(bookStore.inventory[i])
// }


// bookStore.inventory.forEach( (curBook) => {renderBook(curBook)} )
let mapArray = bookStore.inventory.forEach(renderBook)

//✅ 7. iterate over all the books in data and show book on page


//pseudocoding - writing out your code in plain english before actually typing it up

//get book information
//create new nodes for title, author, price, image, button
//update new nodes with book information, book.title, book.author, book.imageUrl
//add new nodes to page (specifically bookList)

//get info (to populate node contents, text, imageUrls, etc.)
//create nodes 
//update nodes
//add nodes to page