// all jquery handling goes here
// all HTML generator functions go here
// import jquery from 'jquery'
import store from "./store.js";

function generateItemCreateElement() {}

function generateItemElement(item) {
  let itemTitle = `<span style="border:5px black" class="bookmark-item">${item.name}</span>`;
  return `${item.id} ${itemTitle}`;
}

function generateBookmarkItemsString(bookmarkList) {
  const items = bookmarkList.map((item) => generateItemElement(item));
  return items.join("");
}

function render() {
  //   renderError();

  // Filter item list if store prop is true by item.checked === false
  let items = [...store.items];
  if (store.hideCheckedItems) {
    items = items.filter((item) => !item.checked);
  }

  // render the shopping list in the DOM
  const bookmarkListItemsString = generatebookmarkItemsString(items);

  // insert that HTML into the DOM
  $("main").html(bookmarkListItemsString);
}

export default {
  render,
  generateBookmarkItemsString
};
