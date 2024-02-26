/* function to return a promise for GET request */
function getJSON(url) {
	return fetch(url).then((response) => {
		if (response.ok) {
			return response.json();
		} else {
			throw response.statusText; //built int response object - check MDN docs
		}
	});
}

/* function to return a promise for a POST request */
function postJSON(url, data) {
	return fetch(`${url}`, {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	})
	.then(res => {
		if(res.ok) { //runs if response came back with error (404, 500)
			return res.json()
		} else {
			alert("res not ok")
		}
	})
	.catch(err => alert(err)) //runs if fetch never went through (server was dead)
}
