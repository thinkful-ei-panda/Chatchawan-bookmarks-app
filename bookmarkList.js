// all jquery handling goes here
// all HTML generator functions go here
// import jquery from 'jquery'
import store from "./store.js";

/// Generator funcitons

function generateBookmarkElement(item) {
  //if not, then generate the expanded element
  if (item.condensed === true) {
    //if condensed is true, generate the condensed element
  }
  let itemTitle = `
  <li data-item-id="${item.id}">
  <div class="box">
  <span class="bookmark-item">Title: ${item.name}</span>
  <span class="bookmark-item">ID: ${item.id}</span>
  </div>
  </li>`;
  return `${itemTitle}`;
}

function generateBookmarkElementExpansion(item) {
  return `
    <div>
    <p>This is the bookmark element expansion!</p>
    </div>
    `;
}

function generateBookmarkForm() {
  return `
    <div>
    <p>This is the bookmark form!</p>
    <form id="js-bookmark-list-form">
      <input type="text" class="js-bookmark-name-entry"></input>
      <button type="submit">Test button</button>
    </form>
    </div>
    `;
}

function generateBookmarkItemsString(bookmarkList) {
  const items = bookmarkList.map((item) => generateBookmarkElement(item));
  return items.join(" ");
}

function generateError(message) {
  return `
          <section class="error-content">
            <button id="cancel-error">X</button>
            <p>${message}</p>
          </section>
        `;
}

/// Render functions

function render() {
  //   renderError();

  // Filter item list if store prop is true by item.checked === false
  let bookmarks = [...store.bookmarks];
  //   if (store.hideCheckedItems) {
  //     items = items.filter((item) => !item.checked);
  //   }

  // render the shopping list in the DOM
  const bookmarkListItemsString = generateBookmarkItemsString(bookmarks);
  const form = generateBookmarkForm();

  // insert that HTML into the DOM
  $("main").html(form + bookmarkListItemsString);
}

function renderError() {
  if (store.error) {
    const er = generateError(store.error);
    $(".error-container").html(er);
  } else {
    $(".error-container").empty();
  }
}

/// Event handler functions

function handleNewBookmarkSubmit() {
  $("#js-bookmark-list-form").submit(function (event) {
    console.log("Submit button pressed");
    event.preventDefault();
    const newBookmarkName = $(".js-bookmark-name-entry").val();
    const newBookmarkUrl = $(".js-bookmark-url-entry").val();
    const newBookmarkDescription = $(".js-bookmark-description-entry").val();
    const newBookmarkRating = $(".js-bookmark-rating-entry").val();
    $(".js-bookmark-name-entry").val("");
    $(".js-bookmark-url-entry").val("");
    $(".js-bookmark-description-entry").val("");
    $(".js-bookmark-rating-entry").val("");
    console.log("Values assigned", newBookmarkName);
    api
      .createBookmark(
        newBookmarkName,
        newBookmarkUrl,
        newBookmarkDescription,
        newBookmarkRating
      )
      .then((newItem) => {
        store.addItem(newItem);
        console.log("rendered!");
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        console.log("error!");
        renderError();
      });
  });
}

function handleBookmarkExpand() {
  // listen to the li element of the bookmark, set condensed prop to true, re-render
}

function handleBookmarkDelete() {
  // listen to the delete button of the li element of the bookmark, delete with an api call, re-render
}

function handleFilterSelect() {
  // listen to dropdown list, when a value is selected, hide all bookmark elements with fewer stars than the selection
}

function handleGoToSite() {
  // listen to Go To Site button on bookmark element, open site in new tab when pressed
}

export default {
  render,
  generateBookmarkItemsString,
};
