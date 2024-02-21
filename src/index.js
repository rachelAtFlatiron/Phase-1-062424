//✅ 1. fork and sync git

//✅ 2. Review data.js and order of script tags in HTML <head> 

function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

//✅ 3. explore the debugger

//✅ 4. update the store name with "easley's technical books"
//get store node from HTML
const storeNameNode = document.getElementById('store-name')
//get value from data.js
const storeName = bookStore.name 
storeNameNode.textContent = storeName

//✅ 5. create a function for render footer
const renderFooter = () => {
  const footerStore = document.getElementById('store')
  const footerNumber = document.getElementById('number')
  const footerAddress = document.getElementById('address')
  footerStore.textContent = bookStore.name 
  footerNumber.textContent = bookStore.number 
  footerAddress.textContent = bookStore.address
  //do not need to return anything, the above paints the page, the coder does not need any information from renderFooter()
  return "something"
}
renderFooter()

//✅ 6. create a function called renderBook(book)
//these are consts because I don't intend on setting variable to new elements, just changing things (textContent) within that element

/***
function: create HTML structure for single book and append to page
input: a book object
output: none
***/
const renderBook = (book) => {
  //create elements
  const li = document.createElement('li')
  const bookTitle = document.createElement('h3')
  const bookAuthor = document.createElement('p')
  const bookPrice = document.createElement('p')
  const bookImage = document.createElement('img')
  const bookButton = document.createElement('button')

  //update elements with text
  bookTitle.textContent = book.title 
  bookAuthor.textContent = book.author 
  bookPrice.textContent = formatPrice(book.price)
  bookImage.src = book.imageUrl 
  bookButton.textContent = "Delete"

  const bookList = document.getElementById('book-list')
  bookList.append(li)
  li.append(bookTitle)
  li.append(bookAuthor)
  li.append(bookPrice)
  li.append(bookImage)
  li.append(bookButton)
  li.className = 'card'
}
// renderBook(bookStore.inventory[1])
// renderBook(bookStore.inventory[2])
// renderBook(bookStore.inventory[3])
// renderBook(bookStore.inventory[4])




//✅ 7. iterate over all the books in data and show book on page
//purpose of .forEach is to execute logic (in this case renderBook) for each item in an array
//.map would be used for updating each item in an array 
bookStore.inventory.forEach((book) => {
  renderBook(book)
})
