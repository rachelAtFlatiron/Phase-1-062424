/* CONSTANTS */
const bookList = document.querySelector("#book-list"); //container for individual book cards
const toggleBookFormButton = document.querySelector("#toggleForm"); //button to open and close form
const bookForm = document.querySelector("#book-form"); //book form


//why are we using servers?

//servers exist somewhere else and are always running
//multiple people might want to access wikipedia at all hours of the day
//if our wikipedia information was stored on data.js on one singular computer, those multiple people will not be able to access information from that singular computer
//instead we put the information on a server so anyone can have access to it at any time of the day
//we can also perform other actions on the server such as creating new books, updating existing books, and deleting books

//right now, we have db.json and json-server which exists only on our individual computers
//db.json is the data that is meant to be living in the json-server
//the json-server is the thing that we will be making requests to
//however it is a simulation of having a server that exists somewhere else that is accessible by anyone at any time and capable of actions such as updating/deleting/updating/getting information

//restaurant
//customer (client - asking for the fetch request) (asking for an order)
//waiters (fetch, meant to take our "customer orders" to the cooks) (taking that order to the cook)
//cooks (json-server)(assembling the order)

// customer (fetch/request) => waiter brings request to cook => cook assembles the order (data) => waiter brings the data back to the customer (response) => customer does whatever they want with the food (doing things such as iterating, console.logging, whatever it may be)

//db.json would be the menu because it is what we can get, its what the json-server can offer us


//id is the unique identifier for each individual store
//not only can you access all the stores with /stores
//you can access individual stores via its unique id
//such as stores/1
fetch("http://localhost:3000/stores/1") // => Promise
  //extract the data from the response
  //response contains a lot of other things such as the status code, status text, timestamp, content type, content length
	.then(res => res.json()) 
  .then(store => {
    console.log(store.name)
    renderHeader(store)
    renderFooter(store)
  })

//asking the server to get the data at /books
//this returns a promise which we are going to have to wait for
//to fulfill
fetch("http://localhost:3000/books") // => Promise
//if the promise successfully fulfills, we will get back a response from the server
//which contains a bunch of stuff including our data (as JSON)
.then(res => {
  console.log(res)
  //specifically extracting the data from our response
  //res.json returns a promise so we also have to wait for that to successfully fulfill
  return res.json()
})
//once our res.json()'s promise successfully fulfills you can do whatever we want with the data 
.then(books => {
  console.log(books)
  //in this case, we are iterating over books, and rendering each individual book to the page
  books.forEach(renderBook)
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
	return "$" + Number.parseFloat(price).toFixed(2);
}

/* adds name of bookstore to header */
function renderHeader(bookStore) {
	document.querySelector("#store-name").textContent = bookStore.name;
}

/* adds details of bookstore to footer */
function renderFooter(bookStore) {
	document.querySelector("#address").textContent = bookStore.address;
	document.querySelector("#number").textContent = bookStore.number;
	document.querySelector("#store").textContent = bookStore.location;
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
	const pStock = document.createElement("p");
	pStock.className = "grey";
	if (book.inventory === 0) {
		pStock.textContent = "Out of stock";
	} else if (book.inventory < 3) {
		pStock.textContent = "Only a few left!";
	} else {
		pStock.textContent = "In stock";
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
	const bookFormHidden = bookForm.classList.toggle("collapsed");
	if (bookFormHidden) {
		toggleBookFormButton.textContent = "New Book";
	} else {
		toggleBookFormButton.textContent = "Hide Book Form";
	}
}

/* on click event using helper function to toggle collapsed class on form */
toggleBookFormButton.addEventListener("click", (e) => {
	toggleBookForm();
});

/* submit event listener for book form */
bookForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const book = {
		title: e.target.title.value,
		author: e.target.author.value,
		price: parseFloat(e.target.price.value),
		inventory: parseInt(e.target.inventory.value),
		imageUrl: e.target.imageUrl.value,
		reviews: [],
	};
	e.target.reset(); // clear form
	toggleBookForm(); // hide book form
	renderBook(book); // display new book to DOM
});
