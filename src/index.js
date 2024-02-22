/* constants */
const bookList = document.querySelector("#book-list");

/**
 * 
 * Renders a book card to DOM given a book object
 */



function renderBook(book) {
	const li = document.createElement("li");
	li.className = "card";
	const titleNode = document.createElement("h3");
	const authorNode = document.createElement("p");
	const priceNode = document.createElement("p");
	const imgNode = document.createElement("img");
	const deleteBtn = document.createElement("button");
	titleNode.textContent = book.title;
	authorNode.textContent = book.author;
	priceNode.textContent = formatPrice(book.price);
	imgNode.src = book.imageUrl;
	deleteBtn.textContent = "Delete";

  const handleClick = (e) => {
    console.log(e)
    li.remove()
  }
	//✅ 1. on delete button click, remove card from DOM
	//✅ 1a. attach eventListener
	//✅ 1b. include callback function to remove card instance
  deleteBtn.addEventListener('click', handleClick)
	//✅ 1c. define cb outside of renderBook

	bookList.append(li);
	li.append(titleNode);
	li.append(authorNode);
	li.append(priceNode);
	li.append(imgNode);
	li.append(deleteBtn);
}

//Display (see browser) -> Behavior (submit form) -> Updates (adding a new book) -> Display (see browser)

//✅ 2. add a submit event listener to the form
//2 key event listeners: submit, change
//✅ 2a. save the form node as a const
const bookForm = document.getElementById('book-form')
//✅ 2b. write a testing function to fill in the values of the form
const fillIn = (form, data) => {
  form.title.value = data.title 
  form.author.value = data.author 
  form.price.value = data.price 
  form.imageUrl.value = data.imageUrl
}
//✅ 2c. invoke the fill in function
fillIn(bookForm, bookStore.inventory[2])
//✅ 2d. create the event listener 
//e is the event object
bookForm.addEventListener('submit', (e) => {
  e.preventDefault()
  console.log(e)
  //✅ 2e. create the new book and add to DOM
  const newBook = {
    title: bookForm.title.value,
    author: bookForm.author.value,
    price: bookForm.price.value,
    reviews: [],
    inventory: 1,
    imageUrl: bookForm.imageUrl.value
  }
  renderBook(newBook)
})


//Display (see browser) -> Behavior (on click) -> Updates (classNames, button text) -> Display (see browser)

//✅  3. recap - show the form when you click on the "add new book" button
//form is saved as bookForm
const toggleBtn = document.getElementById('toggleForm')
//✅ 3a. save the button in a variable
//✅ 3b. add the event listener
toggleBtn.addEventListener('click', () => {
  //collapsed 
  //✅ 3c. hide/show the form
	//✅ 3d. update the button text
  //remove or add class 'collapsed' to form to hide and show
  //check if bookForm's classList contains 'collapsed'
  if(bookForm.classList.contains('collapsed')){
    bookForm.classList = ''
    //Hide Form
    toggleBtn.textContent = 'Hide Form'
  } else {
    bookForm.className = 'collapsed'
    //Show Form
    toggleBtn.textContent = 'Show Form'
  }
})
	


/*
*
* 
OLD BUISINESS
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
	document.querySelector("#store").textContent = bookStore.location;
	document.querySelector("#number").textContent = bookStore.number;
	document.querySelector("#address").textContent = bookStore.address;
}

/* invoke functions on DOM content loaded */
renderHeader(bookStore);
renderFooter(bookStore);
bookStore.inventory.forEach(book => renderBook(book));
