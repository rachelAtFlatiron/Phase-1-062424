/* function to return a promise for GET request */
//this returns a promise
function getJSON(url) {
  return fetch(url).then(response => response.json())
}

/* function to return a promise for a POST request */
function postJSON(url, data) {
  return fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw response;
    })
}

/* function to return a promise for a PATCH request */
function patchJSON(url, data) {
  return fetch(url, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
    .then(response => {
      if (response.ok) {
        return response.json()
      }
      throw response;
    })
}

/* function to return a promise for a DELETE request */
function deleteJSON(url) {
  return fetch(url, { method: "DELETE" })
    .then(res => {
      if (res.ok) {
        return "Record deleted successfully";
      } else {
        throw "Failed to delete record";
      }
    })
}