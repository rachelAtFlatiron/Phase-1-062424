/* constants */
const bookList = document.querySelector("#book-list");
const toggleBookFormButton = document.querySelector("#toggle-form");
const bookForm = document.querySelector("#book-form");
const url = "http://localhost:3000";
// edit and new store elements
const toggleStoreFormButton = document.querySelector("#toggle-store-form"); //button to toggle store form
const storeSelector = document.querySelector("#store-selector"); //selector for store dropdown
const editStoreBtn = document.querySelector("#edit-store"); //button to use store from as edit form
const storeForm = document.querySelector("#store-form"); //selector for store form
let storeEditMode = false; //boolean for whether store form is being used for edit or create
let storeFormVisible = false; //boolean for whether store form is visible or not

function fillStore(form, data) {
	for (field in data) {
		if (form[field]) {
			form[field].value = data[field];
		}
	}
}

function populateStoreEditForm(store) {
	const form = document.querySelector("#store-form");
	fillStore(form, store);
	showStoreForm();
}

toggleBookFormButton.addEventListener("click", toggleBookForm);
toggleStoreFormButton.addEventListener("click", toggleStoreForm);

/*
*
*
* NEW BUSINESS 
*
*
*/

editStoreBtn.addEventListener("click", (e) => {
	const selectedStoreId = document.querySelector("#store-selector").value;
	storeEditMode = true;
	//✅ 1a. add marker to form for PATCH request 
	getJSON(`${url}/stores/${selectedStoreId}`).then(populateStoreEditForm);
});

/* on store form submit create or update */
storeForm.addEventListener("submit", (e) => {
	e.preventDefault();
	const store = {
		name: e.target.name.value,
		number: e.target.number.value,
		location: e.target.location.value,
	};
	if (storeEditMode) {
		//✅ 1. update new store in database
		//✅ 1a. create marker for current store in editStoreButton on click event
    	//✅ 1b. update the store in the DOM - pessimistic rendering - and persist store
		

	//✅ 1c. create new store and add to database
	} else {

	}
	hideStoreForm();
	e.target.reset();
});

//✅ 2. make delete request for a book in render.js

/*
 *
 * 
 * OLD BUSINESS
 *  
 * 
 */

/* book form submit */
bookForm.addEventListener("submit", (e) => {
	e.preventDefault();
	// pull the info for the new book out of the form
	const book = {
		title: e.target.title.value,
		author: e.target.author.value,
		price: e.target.price.value,
		reviews: [],
		inventory: Number(e.target.inventory.value),
		imageUrl: e.target.imageUrl.value,
	};

	// pessimistic rendering
	postJSON("http://localhost:3000/books", book)
		.then((book) => {
			renderBook(book);
			e.target.reset();
		})
		.catch(renderError);
});

/* get requests for loading store and book data */
getJSON("http://localhost:3000/stores")
	.then((stores) => {
		renderStoreSelectionOptions(stores);
		renderHeader(stores[0]);
		renderFooter(stores[0]);
	})
	.catch((err) => {
		console.error(err);
	});
getJSON("http://localhost:3000/books")
	.then((books) => {
		books.forEach(renderBook);
	})
	.catch(renderError);