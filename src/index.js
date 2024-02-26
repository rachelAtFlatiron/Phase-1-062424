//✅ 1. refactor: event handler functions, render functions, testing functions

/* constants */
const url = "http://localhost:3000"
const bookList = document.querySelector("#book-list");
const toggleBookFormButton = document.querySelector("#toggle-form");
const bookForm = document.querySelector("#book-form"); 
const toggleStoreFormButton = document.querySelector("#toggle-store-form");
const storeForm = document.querySelector('#store-form')
const storeSelector = document.querySelector("#store-selector")
//✅ 3. store drop-down list
//✅ 3. store-form const

//✅ 2. include POST request on new book form submit
  //✅ 2a. create fetch request: pessimistic and optimistic approach
  //✅ 2b. use boilerplate from request_helpers.js to execute POST request
	//✅ 2c. use dev tools to simulate a slow collection (network) and add a loading class to li 


//on submit:
//1. preventDefault()
//2. create new object for database
//3. make POST request including options (method, headers, body)
//4. take POST request response (should be new data) and apply to display
bookForm.addEventListener('submit', (e) => {
	e.preventDefault()
	//e.target.imageUrl.value
	const newBook = {
		//do not give id, json-server handles that for you
		//id is super important, and it always has to be unique 
		title: e.target.title.value,
		author: e.target.author.value,
		price: e.target.price.value,
		reviews: [],
		inventory: e.target.inventory.value,
		imageUrl: e.target.imageUrl.value
	}
	/*
		fetch(`${url}/books`, {
			method: 'POST',
			headers: {
				'content-type': 'application/json'
			},
			body: JSON.stringify(newBook)
		})
		.then(res => res.json())
		//POST requests always send back new data that was added to the database
		.then(data => {
			//pessimistic rendering, INSIDE FETCH
			renderBook(data) //passing in data -> what the POST request actually returned, NOT the object I built up to send in the fetch body
		}) 
	*/

	//optimistic rendering NOT PART OF FETCH
	//renderBook(newBook)
	let postResponse = postJSON(`${url}/books`, newBook)
	postResponse
	.then(data => {
		renderBook(data) //pessimistic rendering because it relies on the fetch succeeding
	})
	// ~~~~~~ SEE request_helpers.js:21-29 ON HOW TO HANDLE ERRORS



})
//✅ 3. implement store form and store dropdown
//✅ 3a. create eventListener for form
storeForm.addEventListener('submit', (e) => {
	e.preventDefault()
	let newStore = {
		location: e.target.location.value,
		address: '',
		number: e.target.number.value,
		name: e.target.name.value,
		hours: ''
	}
	//✅ 3b. create POST request for new store
	fetch(`${url}/stores`, {
		method: 'POST',
		headers: {
			'content-type': 'application/json'
		},
		body: JSON.stringify(newStore)
	})
	.then(res => {
		if(res.ok){ //if response gave a successful status code 
			return res.json() //gets returned to next .then
		} else {
			alert("POST not successful")
		}
	})
	.then(data => addSelectOptionForStore(data)) //pessimistic rendering, adds store name to dropdown
	.catch(err => alert(err)) //in case fetch did not generate a promise (ex. server was down)

})


/* fetches and renders all books */
fetch(`${url}/books`)
	.then((res) => res.json())
	.then((books) => books.forEach((book) => renderBook(book)));
getJSON(`${url}/stores`)
.then(stores => {
	renderStoreSelectionOptions(stores)
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
