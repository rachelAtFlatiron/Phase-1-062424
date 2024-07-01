/* renders one book object as card*/
function renderBook(book) {

	const li = document.createElement("li");
	const titleNode = document.createElement("h3");
	const authorNode = document.createElement("p");
	const priceNode = document.createElement("p");
	const imgNode = document.createElement("img");
	const deleteBtn = document.createElement("button");
	const pInventory = document.createElement("input");

	li.id = book.id
	li.className = "card";
	titleNode.textContent = book.title;
	authorNode.textContent = book.author;
	priceNode.textContent = formatPrice(book.price);
	imgNode.src = book.imageUrl;
	pInventory.type = "number";
	pInventory.value = book.inventory;

	deleteBtn.textContent = "Delete";
	deleteBtn.addEventListener("click", (e) => {
		//✅ 2a. update the server with a delete request
		//make fetch DELETE to our server (will always return an empty object if successful)

		//include book.id so it knows WHICH book from the books resource to delete
		fetch(`${url}/books/${book.id}`, {
			method: 'DELETE' //default is GET
		})
		.then(res => {
			if(res.ok){
				return res.json()
			} else {
				throw 'could not delete book'
			}
		})
		.then(data => { //DELETE data is an empty object
			//if that fetch DELETE was successful, we can remove li from page
			li.remove()
		})
	});

	//✅ 3. update the inventory
	//'change' is for when a user makes a change to an input field
	pInventory.addEventListener('change', (e) => {
		//e.target - the inventory input field
		//e.target.value - the inventory input field value

		//PATCH
		//need book.id so fetch can know WHICH book to update
		fetch(`${url}/books/${book.id}`, {
			//PATCH doesn't need all fields in body of request for update
			//PUT needs all fields in body of request for update
			method: 'PATCH',
			headers: {'content-type': 'application/json'},
			body: JSON.stringify({
				//forms will return info as strings, need to convert into integer
				"inventory": parseInt(e.target.value)
			})
		})
		.then(res => {
			if(res.ok){
				return res.json()
			} else {
				throw "update book went wrong"
			}
		})
		.then(data => {
			//we get back the new version of the book
			console.log(data)
			//don't need to render anything
		})
		.catch(err => console.log('server is probs off'))
	})

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
	bookList.append(li);
	li.append(titleNode);
	li.append(authorNode);
	li.append(priceNode);
	li.append(imgNode);
	li.append(pInventory);
	li.append(deleteBtn);

	return li;
}

/* helper function to format the price of a book */
function formatPrice(price) {
	return "$" + Number.parseFloat(price).toFixed(2);
}

/* render list of stores to select from */
function renderStoreSelectionOptions(stores) {
	storeSelector.innerHTML = "";
	stores.forEach(addSelectOptionForStore);
	storeSelector.addEventListener("change", (e) => {
		getJSON(`${url}/stores/${e.target.value}`).then((store) => {
			renderHeader(store);
			renderFooter(store);
		});
	});
}

/* helper function to add a single store to select store dropdown */
function addSelectOptionForStore(store) {
	const option = document.createElement("option");
	option.value = store.id;
	option.textContent = store.name;
	storeSelector.append(option);
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

/* helper function to render div with error for .catch */
function renderError(error) {
	const main = document.querySelector("main");
	const errorDiv = document.createElement("div");
	errorDiv.className = "error";
	if (error.message === "Failed to fetch") {
		errorDiv.textContent =
			"Whoops! Looks like you forgot to start your JSON-server!";
	} else {
		errorDiv.textContent = error;
	}
	main.prepend(errorDiv);
	window.addEventListener("keydown", (e) => {
		if (e.key === "Escape") {
			errorDiv.remove();
		}
	});
}
