// main js function
import api from './api.js';
import store from './store.js';
import bookmarkList from './bookmarkList.js';

//get server data and merge it with local data
//call all event handlers
//call render function


function main() {
  api.getBookmarks().then((items) => {
    items.forEach((item) => store.addItem(item));
    bookmarkList.render();
  });

  bookmarkList.bindEventListeners();
  bookmarkList.render();
}

main();
