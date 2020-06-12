// all api functions go here
const username = "chatchawan";
const BASE_URL = `https://thinkful-list-api.herokuapp.com/${username}`;

function getBookmarks() {
  console.log(listApiFetch(`${BASE_URL}/items`))
}

let bodyContent = JSON.stringify({ name : 'testBody', url : "https:/google.com", desc : "testDesc", rating : "5"});


//make a new bookmark item on the server
function createBookmark() {
  return listApiFetch(`${BASE_URL}/items`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
    },
    body: bodyContent,
  })
}

//find  and delete a server item
function deleteBookmark(id) {
  return listApiFetch(BASE_URL + "/items/" + id, {
    method: "DELETE",
  })
}


function showData(data) {
  console.log(data);
}

//straight up stole this function from the previous day's work
function listApiFetch(...args) {
  // setup var in scope outside of promise chain
  let error;
  return fetch(...args)
    .then((res) => {
      if (!res.ok) {
        // if response is not 2xx, start building error object
        error = { code: res.status };

        // if response is not JSON type, place statusText in error object and
        // immediately reject promise
        if (!res.headers.get("content-type").includes("json")) {
          error.message = res.statusText;
          return Promise.reject(error);
        }
      }

      // otherwise, return parsed JSON
      return res.json();
    })
    .then((data) => {
      // if error exists, place the JSON message into the error object and
      // reject the Promise with your error object so it lands in the next
      // catch.  IMPORTANT: Check how the API sends errors -- not all APIs
      // will respond with a JSON object containing message key
      if (error) {
        error.message = data.message;
        return Promise.reject(error);
      }

      // otherwise, return the json as normal resolved Promise
      return data;
    });
};

export default {
  getBookmarks,
  createBookmark,
  deleteBookmark,
};
