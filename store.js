// all local storage functions go here
// remember that the bookmarks is empty at the start and at evey refresh

const bookmarks = [
  {
    id: "xj9",
    title: "testTitle",
    rating: 1,
    url: "http://www.google.com",
    description: "testDesc",
  },
  {
    id: "xj8",
    title: "testTitle2",
    rating: 2,
    url: "http://www.google2.com",
    description: "testDesc2",
  },
];

let error = null;

const findById = function (id) {
  return this.bookmarks.find((currentItem) => currentItem.id === id);
};

const addItem = function (item) {
  bookmarks.push(item);
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
};
