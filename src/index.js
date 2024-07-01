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
let currentEditStoreId = -1;
/*
 *
 *
 * NEW BUSINESS
 *
 *
 */

//✅ 1a. add marker to form for PATCH request
editStoreBtn.addEventListener("click", (e) => {
	//gets value of ID of current selected store
	const selectedStoreId = document.querySelector("#store-selector").value;
	//turns store form from POST to PATCH
	storeEditMode = true;
	//getting information for store with store id 'x'
	//taking that information and populating the store form
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
		fetch(`${url}/stores/${currentEditStoreId}`, {
			method: "PATCH",
			body: JSON.stringify(store),
			headers: { "content-type": "application/json" },
		})
			.then((res) => {
				if (res.ok) {
					return res.json();
				} else {
					throw "error updating store";
				}
			})
			.then((data) => {
				console.log(data);
        //rendering here
			});

		//✅ 1c. create new store and add to database
	} else {
	}
	hideStoreForm();
	e.target.reset();
});

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

	fetch(`${url}/books`, {
		method: "POST",
		body: JSON.stringify(book),
		headers: {
			"content-type": "application/json",
		},
	})
		.then((res) => {
			if (res.ok) {
				//201
				return res.json();
			} else {
				throw "error in creating new book";
			}
		})
		.then((data) => {
			//pessimistic - goal is to have front end accurately display what is in your backend
			renderBook(data);
		})
		.catch((err) => console.log("server probably off"));
	//optimistic rendering DOES NOT rely on results from server
	//we can renderBook regardless of if server was successful
	//renderBook(book)
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

//fetch GET
//GET is default, so I don't have to include the second optional parameter (the body of options)
fetch(`${url}/books`)
	.then((res) => {
		//if the server was able to respond positively (i.e. we are able to reach the resource requested)
		if (res.ok) {
			return res.json();
		} else {
			//we probably got a 404, 422, 500, any sort of bad server status
			throw res.statusText;
		}
	})
	.then((data) => data.forEach(renderBook))
	.catch((err) =>
		console.log("server probably down, fetch request couldn't reach server")
	);

function fillStore(form, data) {
	for (field in data) {
		if (form[field]) {
			form[field].value = data[field];
		}
	}
}

function populateStoreEditForm(store) {
	const form = document.querySelector("#store-form");
	currentEditStoreId = store.id;
	fillStore(form, store);
	showStoreForm();
}

toggleBookFormButton.addEventListener("click", toggleBookForm);
toggleStoreFormButton.addEventListener("click", toggleStoreForm);
