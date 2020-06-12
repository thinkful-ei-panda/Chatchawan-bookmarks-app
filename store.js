// all local storage functions go here
// remember that the bookmarks is empty at the start and at evey refresh

const bookmarks = [];
let error = null;

const findById = function (id) {
  return this.bookmarks.find((currentItem) => currentItem.id === id);
};

const addItem = function (item) {
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
  error,
  findById,
  addItem,
  findAndDelete,
  findAndUpdate,
  setError,
};
