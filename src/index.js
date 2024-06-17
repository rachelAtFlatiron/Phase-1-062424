//✅ 1. refactor: event handler functions, render functions, testing functions
//💡 why should all consts be in index.js
//💡 what types of things should be in index.js? - everything you would put in DOMContentLoaded
//💡 why do all the other scripts run if consts are in a different file?
//🛑 review: fillIn testing functions, submit new book form
//💡 why does the new book disappear when we refresh the page - will all the books disappear?

/* constants */
const bookList = document.querySelector("#book-list");
const toggleBookFormButton = document.querySelector("#toggle-form");
const bookForm = document.querySelector("#book-form"); 
const toggleStoreFormButton = document.querySelector("#toggle-store-form");
//✅ 3. store drop-down list
const storeSelector = document.querySelector('#store-selector'); 
//✅ 3. store-form const
const storeForm = document.querySelector("#store-form"); 
const url = "http://localhost:3000";

//✅ 2. include POST request on new book form submit
//🛑 review: fetch request
bookForm.addEventListener("submit", (e) => {
	e.preventDefault();
  //do not give id, json-server handles that for you
	//id is super important, and it always has to be unique
	const book = {
		title: e.target.title.value,
		author: e.target.author.value,
		price: parseFloat(e.target.price.value),
		inventory: parseInt(e.target.inventory.value),
		imageUrl: e.target.imageUrl.value,
		reviews: [],
	};

  //✅ 2a. create fetch request: pessimistic and optimistic approach
  //💡 are we doing optimistic or pessimistic rendering of the book?
  //🛑 OPTIMISTIC because the server and client actions are decoupled, notice no '.then'
  /*
	renderBook(book);
	fetch(`${url}/books`, {
		method: "POST", 
		//🛑 demonstrate: kill server to show when server update is not successful
		headers: {'content-type': 'application/json'},
		body: JSON.stringify(book)
	})
  */

  //🛑 PESSIMISTIC approach - DOM update relies on server update
  /*
	fetch(`${url}/books`, {
		method: 'POST', 
		headers: {'content-type': 'application/json'},
		body: JSON.stringify(book)
	})
	.then(res => res.json())
	.then(book => {
		renderBook(book) //🛑 DOM update happens IN CALLBACK after request is successful 
	})
	//🛑 kill server to demo catch
	.catch(err => {
		alert('sorry')
	})
  */

  //✅ 2b. use boilerplate from request_helpers.js to execute POST request
  /*
	postJSON(`${url}/books`, book)
	.then(renderBook)
	.catch(err => alert('sorry'))
  */
	e.target.reset()
	toggleBookForm()

	//✅ 2c. use dev tools to simulate a slow collection (network) and add a loading class to li 
  //🛑 review: CSS for loading class
	//🛑 approach: return renderBook() li (render.js) -> add class 'loading' -> if res.ok remove class 'loading'
	const li = renderBook(book);
	li.classList.add('loading')
	fetch(`${url}/books`, {
		method: "POST", 
		headers: {'content-type': 'application/json'},
		body: JSON.stringify(book)
	})
	//🛑 json-server will not validate data
	.then(res => {
		if(res.ok){
			li.classList.remove('loading')
		}
	})
	//🛑 demo catch by killing server
	.catch(err => {
		li.remove()
		alert('something went wrong')
	})
});

//✅ 3. implement store form and store dropdown
//🛑 review in render.js: renderStoreSelectionOptions, addSelectOptionForStores
//🛑 option we have on drop-down needs to have ID so we can query for it when user selects option from dropdown
//🛑 we need the auto-generated ID from json-server

//✅ 3a. create eventListener for form
storeForm.addEventListener('submit', e => {
	e.preventDefault();
	
	const store = {
		//🛑 use debugger to explore how to get value in dev tools
		location: e.target.location.value, 
		name: e.target.name.value, 
		number: e.target.number.value
	}
	//🛑 ERR NO ID: optimistic rendering (also for testing)
	//💡 should we use optimistic or pessimistic rendering? - demo both
	//const option = addSelectOptionForStore(store)
	//✅ 3b. create POST request for new store
	fetch(`${url}/stores`, {
		method: 'POST',
		headers: {'content-type': 'application/json'},
		body: JSON.stringify(store)
	})
	.then(res => res.json())
	.then(store => addSelectOptionForStore(store)) //pessimistic rendering
	e.target.reset()
	toggleStoreForm()
})

/* fetches and renders all books */
//🛑 needs to be in index.js because we need to run this code immediately when DOM content loaded, not save it for later
//🛑 the callback is the code that gets "saved for later"
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
