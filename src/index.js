/* CONSTANTS */
const bookList = document.querySelector("#book-list"); //container for individual book cards
const toggleBookFormButton = document.querySelector('#toggleForm') //button to open and close form
const bookForm = document.querySelector('#book-form'); //book form


//✅ 1a. start json-server, examine data structure
//json-server --watch db.json
//json-server: the package you will be using (the program json-server)
//--watch: this is a flag (an option to include with starting the program)
//db.json: file name (MAKE SURE YOU ARE IN THE FOLDER WITH DB.JSON)

//if you ever see resources /posts /comments /profile
//you probably started json-server in a folder with no existing db.json
//therefore it created a default one for you

//✅ 1b. use chat-gpt to generate additional stores
    //generate JSON for 5 technology bookstores with the following fields: location, name, address, number
    //add an id field that increments by one starting with an id of 4

//saving in a const for ease of access later on
const url = "http://localhost:4000"
//✅ 2. fetch request to get all books
//✅ 2a. save the base url as a const (to reuse later)
//✅ 2b. render books from database instead of from data.js
fetch(`${url}/books`) //returns promise
//promise is resolved 
.then((res) => {
  return res.json() //res.json returns a promise
})
.then((books) => {
  //coming from data.js
  //bookStore.inventory.forEach(renderBook)
  //data is coming from our json-server (localhost:3000) which is connected to db.json
  books.forEach(renderBook)
})

//✅ 3. use db.json to get information about the store
//✅ 3a. make a fetch request
//✅ 3b. use data to update DOM
//✅ 3c. add a .catch for errors
//this is a fetch GET, the default
fetch(`${url}/books`) 
//.then wil execute once previous promise has been fulfilled
.then(response => response.json()) //res.json() is also a promise
.then(data => data.forEach(book => renderBook(book)))
.catch(error => alert(error)) //this is part of fetch...then...then..catch

fetch(`${url}/stores`)
.then(response => response.json())
.then(data => {
  let curStore = data[0]
  renderHeader(curStore)
  renderFooter(curStore)
})

/**
 * 
 * 
 *OLD BUSINESS
 *
 * 
 */

/* helper function to format the price of a book */
function formatPrice(price) {
  return '$' + Number.parseFloat(price).toFixed(2);
}

/* adds name of bookstore to header */
function renderHeader(bookStore) {
  document.querySelector('#store-name').textContent = bookStore.name;
}

/* adds details of bookstore to footer */
function renderFooter(bookStore) {
  document.querySelector('#address').textContent = bookStore.address;
  document.querySelector('#number').textContent = bookStore.number;
  document.querySelector('#store').textContent = bookStore.location;
}

/* renders one book object as card*/
function renderBook(book) {
  const li = document.createElement("li");
	const titleNode = document.createElement("h3");
	const authorNode = document.createElement("p");
	const priceNode = document.createElement("p");
	const imgNode = document.createElement("img");
	const deleteBtn = document.createElement("button");

  li.className = "card";
  titleNode.textContent = book.title;
	authorNode.textContent = book.author;
	priceNode.textContent = formatPrice(book.price);
	imgNode.src = book.imageUrl;

  deleteBtn.textContent = "Delete";
  deleteBtn.addEventListener("click", (e) => {
		li.remove();
	});

  bookList.append(li);
	li.append(titleNode);
	li.append(authorNode);
	li.append(priceNode);
	li.append(imgNode);
	li.append(deleteBtn);
  //logic to display in or out of stock
  const pStock = document.createElement('p');
  pStock.className = "grey";
  if (book.inventory === 0) {
    pStock.textContent = "Out of stock";
  } else if (book.inventory < 3) {
    pStock.textContent = "Only a few left!";
  } else {
    pStock.textContent = "In stock"
  }
  li.append(pStock);
}

/*
*
*
* event listeners and render on DOM content loaded
*
*
*/

/*  on click helper function: toggles collapsed class on form */
function toggleBookForm() {
  const bookFormHidden = bookForm.classList.toggle('collapsed');
  if (bookFormHidden) {
    toggleBookFormButton.textContent = "New Book";
  } else {
    toggleBookFormButton.textContent = "Hide Book Form";
  }
}

/* on click event using helper function to toggle collapsed class on form */
toggleBookFormButton.addEventListener('click', (e) => {
  toggleBookForm();
});

/* submit event listener for book form */
bookForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const book = {
    title: e.target.title.value,
    author: e.target.author.value,
    price: parseFloat(e.target.price.value),
    inventory: parseInt(e.target.inventory.value),
    imageUrl: e.target.imageUrl.value,
    reviews: []
  }
  e.target.reset(); // clear form
  toggleBookForm(); // hide book form
  renderBook(book); // display new book to DOM
})





