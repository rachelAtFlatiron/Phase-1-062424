//✅ 1. refactor: event handler functions, render functions, testing functions

/* constants */
const bookList = document.querySelector("#book-list");
const toggleBookFormButton = document.querySelector("#toggle-form");
const bookForm = document.querySelector("#book-form"); 
const storeForm = document.querySelector("#store-form")
const toggleStoreFormButton = document.querySelector("#toggle-store-form");
const url = "http://localhost:3000"

//✅ 2. include POST request on new book form submit
  //✅ 2a. create fetch request: pessimistic and optimistic approach
  

//on form submit
//add new book to page
//post new book to db.json
//therefore, when we refresh the page and get all data from db.json, our new book will also be there
//therefore our new book will show up on a page on refresh
//in other words our book persists

//pessimistic: relies on a successful post request to render new things on the page (i.e. you'll put any side effects in .then)
bookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  //collect all the form information into a javascript object
  const newBook = {
    //you can do either e.target.name.value OR you can do e.target['input-id'].value
    //EX. e.target.title.value OR e.target['form-title'].value
    "title": e.target.title.value,
    "author": e.target.author.value,
    "inventory": e.target.inventory.value,
    "price": e.target.price.value,
    "imageUrl": e.target.imageUrl.value
  }
  //make a post request
  //let fetch know to use POST and not rely on the default GET
  fetch(`${url}/books`, {
    method: 'POST', //say its POST instead of GET
    //let request know i will be sending in json
    headers: {
      'Content-Type': 'application/json'
    },
    //pass in the information itself (newBook)
    //DO NOT INCLUDE THE ID
    //LET JSON-SERVER HANDLE THE ID
    //THE ID NEEDS TO BE UNIQUE (and json-server is accurate on assigning unique id)
    body: JSON.stringify(newBook)
  }) 
  .then(res => {
    //ask if the res was ok?
    //if it was ok then we can return res.json() and move to the next .then
    //res.ok just means everything in the 200s, if it was successful
    //we successfully retrieved the data, we succesfully posted/deleted/updated

    //res.ok is for if the fetch request reached the server and came back with a bad response (such as 404, 401, 422, etc)
    if(res.ok){ 
      return res.json()
    } else {
      //if it wasn't ok then we will return an error
      throw res.statusText
    }
  })
  //POST request returns new books as it shows up in the database (i.e. including the new unique id)
  .then(data => {
    renderBook(data)
  })
  //if the fetch request failed to reach the server entirely (such as if the server is down)
  .catch(err => console.log(err))
  
    //post request will also send information to the server
    //in this case our information will be our newBook
    //this newBook will be added to our db.json
    //if our post request is successful we will render book to page
})

/* fetches and renders all books */
fetch(`${url}/books`) //default is GET
	.then((res) => res.json())
	.then((books) => books.forEach((book) => renderBook(book)));
fetch(`${url}/stores`)
.then(res => res.json())
.then(stores => {
	// renderStoreSelectionOptions(stores)
	renderHeader(stores[0])
	renderFooter(stores[0])
})

/* event listeners to toggle forms */
toggleBookFormButton.addEventListener("click", (e) => {
	toggleBookForm();
});
toggleStoreFormButton.addEventListener("click", (e) => {
	toggleStoreForm();
});

/* fills in form with data for testing */
fillStore(storeForm, {
	name: "BooksRUs",
	location: "LaLaLand",
	number: "555-555-5555"
});

fillBook(bookForm, {
	title: "Designing Data Intensive Applications",
	author: "Martin Kleppmann",
	price: 20,
	imageUrl: "https://m.media-amazon.com/images/I/91YfNb49PLL._SY522_.jpg",
	inventory: 11
})


//////////////////////
// render functions //
//////////////////////


////////////////////////////////////////////////////////////////
// Event Listeners/Handlers (Behavior => Data => Display) //////
////////////////////////////////////////////////////////////////


///////////////////////////
// Testing functions //////
///////////////////////////