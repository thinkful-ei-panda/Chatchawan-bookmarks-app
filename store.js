// all local storage functions go here
// remember that the bookmarks is empty at the start and at evey refresh

let bookmarks = [];

let error = null;

let filter = 0;

const findById = function (id) {
  return this.bookmarks.find((currentItem) => currentItem.id === id);
};

const addItem = function (item) {
  item.condensed = true;
  this.bookmarks.push(item);
};

const findAndDelete = function (id) {
  this.bookmarks = this.bookmarks.filter(
    (currentItem) => currentItem.id !== id
  );
};

const findAndUpdate = function (id, newData) {
  const currentItem = this.findById(id);
  Object.assign(currentItem, newData);
};

const setError = function (error) {
  this.error = error;
};

export default {
  bookmarks,
  error,
  findById,
  addItem,
  findAndDelete,
  findAndUpdate,
  setError,
  filter
};
