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
		fetch(`${url}/books/${book.id}`, {
			method: 'DELETE'
		})
		.then(res => {
			if (res.ok){
				return res.json()
			} else {
				alert('something went wrong')
			}
		})
		.then(data => {
			//remove the book from the page
			li.remove()
		})
		.catch(err => alert('server is down probably'))

	});

	//✅ 3. update the inventory
	//✅ 3a. add an onChange event handler

	//✅ 4. generate CSS using chatGPT in chatgpt_style.css

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
