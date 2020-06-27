// all jquery handling goes here
// all HTML generator functions go here
// import jquery from 'jquery'
import store from './store.js';
import api from './api.js';
/*                                                                                                          
  ,ad8888ba,                                                                                                 
 d8"'    `"8b                                                                 ,d                             
d8'                                                                           88                             
88              ,adPPYba,  8b,dPPYba,    ,adPPYba,  8b,dPPYba,  ,adPPYYba,  MM88MMM  ,adPPYba,   8b,dPPYba,  
88      88888  a8P_____88  88P'   `"8a  a8P_____88  88P'   "Y8  ""     `Y8    88    a8"     "8a  88P'   "Y8  
Y8,        88  8PP"""""""  88       88  8PP"""""""  88          ,adPPPPP88    88    8b       d8  88          
 Y8a.    .a88  "8b,   ,aa  88       88  "8b,   ,aa  88          88,    ,88    88,   "8a,   ,a8"  88          
  `"Y88888P"    `"Ybbd8"'  88       88   `"Ybbd8"'  88          `"8bbdP"Y8    "Y888  `"YbbdP"'   88          
*/
function generateBookmarkElement(item) {
  let stars = '';
  for (let i = 0; i < item.rating; i++) {
    stars += '⭐';
  }
  return `
  <div class='box' id='js-bookmark-item' data-item-id='${item.id}'>
  <li>
  <span class='bookmark-item'>Title: ${item.title} </span>
  <span class='bookmark-item'> | URL: ${item.url} </span>
  <span class='bookmark-item'> | Rating: ${stars} </span>
  </li>
  </div>`;
}

function generateBookmarkElementExpansion(item) {
  return `
    <div class='expanded-box' data-item-id='${item.id}'>
    <span class='bookmark-item'><br>Description: ${item.desc} </span>
    <button id='js-delete-button'>Delete</button>
    </div>
    `;
}

function generateBookmarkForm() {
  return `
    <div>
    <p>Please enter your bookmark</p>
    <form id='js-bookmark-list-form'>
      <input type='text' placeholder='Title' id='js-bookmark-title-entry' required />
      <input type='url' placeholder='https://someWebsite.com' id='js-bookmark-url-entry' required />
      <input type='text' placeholder='Your description here' id='js-bookmark-description-entry' required />
      
      <select name='stars' id='js-rating-dropdown' required>
        <option value=''>Choose a rating</option>
        <option value='1'>&#x2B50</option>
        <option value='2'>&#x2B50&#x2B50</option>
        <option value='3'>&#x2B50&#x2B50&#x2B50</option>
        <option value='4'>&#x2B50&#x2B50&#x2B50&#x2B50</option>
        <option value='5'>&#x2B50&#x2B50&#x2B50&#x2B50&#x2B50</option>
        </select>
        <button type='submit'>Submit</button>
    </form>
    
    </div>
    `;
}

function generateFilter(currentFilter) {
  return `<form id='js-rating-filter-form'>
  <select name='rating' id='js-rating-filter-dropdown' required>
        <option value=''>Current filter: ${currentFilter}</option>
        <option value='1'>&#x2B50</option>
        <option value='2'>&#x2B50&#x2B50</option>
        <option value='3'>&#x2B50&#x2B50&#x2B50</option>
        <option value='4'>&#x2B50&#x2B50&#x2B50&#x2B50</option>
        <option value='5'>&#x2B50&#x2B50&#x2B50&#x2B50&#x2B50</option>
        </select>
        <button type='submit'>Filter</button>
  </form>`;
}

function generateBookmarkItemsString(bookmarkList) {
  const items = bookmarkList
    .filter((item) => item.rating >= store.filter)
    .map((mappedItem) => {
      if (mappedItem.condensed === false) {
        //if condensed is false, generate the expanded element
        return (
          generateBookmarkElement(mappedItem) +
          generateBookmarkElementExpansion(mappedItem)
        );
      } else {
        return generateBookmarkElement(mappedItem);
      }
    });
  return items.join(' ');
}

function generateError(message) {
  return `
          <section class='error-content'>
            <button id='cancel-error'>X</button>
            <p>${message}</p>
          </section>
        `;
}
/*                                                                      
88888888ba                                    88                          
88      "8b                                   88                          
88      ,8P                                   88                          
88aaaaaa8P'  ,adPPYba,  8b,dPPYba,    ,adPPYb,88   ,adPPYba,  8b,dPPYba,  
88""""88'   a8P_____88  88P'   `"8a  a8"    `Y88  a8P_____88  88P'   "Y8  
88    `8b   8PP"""""""  88       88  8b       88  8PP"""""""  88          
88     `8b  "8b,   ,aa  88       88  "8a,   ,d88  "8b,   ,aa  88          
88      `8b  `"Ybbd8"'  88       88   `"8bbdP"Y8   `"Ybbd8"'  88          
*/
function render() {
  // Filter item list if store prop is true by item.checked === false
  let bookmarks = [...store.bookmarks];

  // generate the shopping list html
  const bookmarkListItemsString = generateBookmarkItemsString(bookmarks);
  const form = generateBookmarkForm();
  const ratingFilter = generateFilter(store.filter);

  // insert that HTML into the DOM
  $('main').html(form + ratingFilter + bookmarkListItemsString);
}

function renderError() {
  if (store.error) {
    const er = generateError(store.error);
    $('.error-container').html(er);
  } else {
    $('.error-container').empty();
  }
}
/*                                                                               
88888888888                                                                     
88                                              ,d                              
88                                              88                              
88aaaaa  8b       d8   ,adPPYba,  8b,dPPYba,  MM88MMM                           
88"""""  `8b     d8'  a8P_____88  88P'   `"8a   88                              
88        `8b   d8'   8PP"""""""  88       88   88                              
88         `8b,d8'    "8b,   ,aa  88       88   88,                             
88888888888  "8"       `"Ybbd8"'  88       88   "Y888  

88        88                                    88  88                          
88        88                                    88  88                          
88        88                                    88  88                          
88aaaaaaaa88  ,adPPYYba,  8b,dPPYba,    ,adPPYb,88  88   ,adPPYba,  8b,dPPYba,  
88""""""""88  ""     `Y8  88P'   `"8a  a8"    `Y88  88  a8P_____88  88P'   "Y8  
88        88  ,adPPPPP88  88       88  8b       88  88  8PP"""""""  88          
88        88  88,    ,88  88       88  "8a,   ,d88  88  "8b,   ,aa  88          
88        88  `"8bbdP"Y8  88       88   `"8bbdP"Y8  88   `"Ybbd8"'  88          
*/
function stringifiedObject(title, url, desc, rating) {
  const object = { title: title, url: url, desc: desc, rating: rating };
  return JSON.stringify(object);
}

function handleNewBookmarkSubmit() {
  $('main').on('submit', '#js-bookmark-list-form', function (event) {
    event.preventDefault();
    event.stopPropagation();

    // grab all the values from the form and assign them to variables
    const bookmarkTitle = $('#js-bookmark-title-entry').val();
    const bookmarkUrl = $('#js-bookmark-url-entry').val();
    const bookmarkDescription = $('#js-bookmark-description-entry').val();
    const bookmarkRating = $('#js-rating-dropdown').val();
    $('#js-bookmark-title-entry').val('');
    $('#js-bookmark-url-entry').val('');
    $('#js-bookmark-description-entry').val('');
    $('#js-bookmark-rating-entry').val('');

    const newItem = stringifiedObject(
      bookmarkTitle,
      bookmarkUrl,
      bookmarkDescription,
      bookmarkRating
    );

    api
      .createBookmark(newItem)
      .then((newItem) => {
        store.addItem(newItem);
        render();
      })
      .catch((error) => {
        store.setError(error.message);
        renderError();
      });
  });
}

function handleBookmarkExpand() {
  // listen to the li element of the bookmark, set condensed prop to true, re-render
  $('main').on('click', '#js-bookmark-item', function (event) {
    event.preventDefault();
    event.stopPropagation();
    let source = {};
    if (
      store.findById($(event.currentTarget).attr('data-item-id')).condensed ===
      true
    ) {
      source = { condensed: false };
    } else {
      source = { condensed: true };
    }
    const id = $(event.currentTarget).attr('data-item-id');
    store.findAndUpdate(id, source);
    render();
  });
}

function handleBookmarkDelete() {
  // listen to the delete button of the li element of the bookmark, delete with an api call, re-render
  $('main').on('click', '#js-delete-button', function (event) {
    event.preventDefault();
    event.stopPropagation();
    const bookmarkId = $(event.currentTarget)
      .closest('div')
      .attr('data-item-id');
    api.deleteBookmark(bookmarkId).then(() => {
      store.findAndDelete(bookmarkId);
      render();
    });
  });
}

function handleFilterSelect() {
  // listen to dropdown list, when a value is selected, hide all bookmark elements with fewer stars than the selection
  $('main').on('submit', '#js-rating-filter-form', function (event) {
    event.preventDefault();
    event.stopPropagation();
    store.filter = $('#js-rating-filter-dropdown').val();
    render();
  });
}

function handleGoToSite() {
  // listen to Go To Site button on bookmark element, open site in new tab when pressed
}

function bindEventListeners() {
  // bind all event listeners at the start
  handleGoToSite();
  handleFilterSelect();
  handleBookmarkDelete();
  handleBookmarkExpand();
  handleNewBookmarkSubmit();
}
/*                                                                         
88888888888                                                              
88                                                                ,d     
88                                                                88     
88aaaaa      8b,     ,d8  8b,dPPYba,    ,adPPYba,   8b,dPPYba,  MM88MMM  
88"""""       `Y8, ,8P'   88P'    "8a  a8"     "8a  88P'   "Y8    88     
88              )888(     88       d8  8b       d8  88            88     
88            ,d8" "8b,   88b,   ,a8"  "8a,   ,a8"  88            88,    
88888888888  8P'     `Y8  88`YbbdP"'    `"YbbdP"'   88            "Y888  
                          88                                             
                          88
*/

export default {
  render,
  generateBookmarkItemsString,
  bindEventListeners,
};
