// global variables
const gallery = document.getElementById('gallery');
const card = document.getElementsByClassName('card');

// fetch data from api and convert to json
fetch("https://randomuser.me/api/?results=12&nat=us")
  .then(response => response.json())
  .then(data => {
    const employees = data.results
    // console.log (data.results); // view data
    employees.forEach((employee) => {
      createGallery(employee);
      createModalWindow(employee);
    });
    eventListener();
    createSearchBar();
});

// creates the gallery of 12 people with their picture and info
function createGallery(data) {
    const galleryHTML = `               
        <div id="${data.name.first} ${data.name.last}" class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
            </div>
            <div class="card-info-container">
                <h3 id="name" class="card-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="card-text">${data.email}</p>
                <p class="card-text cap">${data.location.city}, ${data.location.state}</p>
            </div>
        </div>`;
    gallery.insertAdjacentHTML('beforeend', galleryHTML);
}

// creates the modal window
function createModalWindow(data) {

    // formats the date for birth
    const formatDob = (data.dob.date)
        .replace( /\T(.*)$/, ' ')
        .replace(/^(\d{4})-(\d{2})-(\d{2})*/, '$2/$3/$1');

    const modalDiv = document.createElement('div');
    modalDiv.className = 'modal-container';
    gallery.appendChild(modalDiv);
    const modalHTML = `
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="${data.name.first} ${data.name.last}">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.phone}</p>
                <p class="modal-text">${data.location.street.name}, ${data.location.state} ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${formatDob}</p>
            </div>
            <div class="modal-btn-container">
                <button type="button" id="modal-prev" class="modal-prev btn">Prev</button>
                <button type="button" id="modal-next" class="modal-next btn">Next</button>
            </div>
        </div>`;
    modalDiv.insertAdjacentHTML('beforeend', modalHTML);
   modalDiv.style.display = 'none';
}

// this function opens/ closes the modal window on click and navigate through the cards
function eventListener() {
    const modalDiv = document.getElementsByClassName('modal-container');
    const closeBtn = document.getElementsByClassName('modal-close-btn');
    const buttons = document.getElementsByClassName('modal-btn-container');
    const prevBtn = document.getElementsByClassName('modal-prev btn');
    const nextBtn = document.getElementsByClassName('modal-next btn');
    for (let i = 0; i < card.length; i++) {
        prevBtn[0].style.display = 'none'; //hides the prev btn on first card
        nextBtn[nextBtn.length -1].style.display = 'none'; //hide next btn on last card

        // displays modal window on click
        card[i].addEventListener('click', () => {
        modalDiv[i].style.display = 'block';
        });

        // closes modal window
        closeBtn[i].addEventListener('click', (event) => {
            modalDiv[i].style.display = 'none';
        });

        // prev and next button
        buttons[i].addEventListener('click', (event) => {
             // if prev button is clicked it will go to the previous modal
            if (event.target.className === 'modal-prev btn') {
                modalDiv[i].style.display = 'none';
                modalDiv[i-1].style.display = '';
            // if next button is clicked it will go the next modal
            } else if (event.target.className === 'modal-next btn') {
                modalDiv[i].style.display = 'none';
                modalDiv[i+1].style.display = '';
            }
        });
    }
}

// this function creates the search bar
function createSearchBar() {
    const searchHTML = `
      <form action="#" method="get">
          <input type="search" id="search-input" class="search-input" placeholder="Search...">
          <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
      </form>`;
    const searchDiv = document.querySelector('.search-container');
    searchDiv.insertAdjacentHTML('beforeEnd', searchHTML);
  
    const searchInput = document.getElementById('search-input');
  
    // search functionality
    searchDiv.addEventListener('keyup', (event) => {
      event.preventDefault();
      const input = searchInput.value.toLowerCase();
  
      for(let i = 0; i < card.length; i++) {
        const employeeName = card[i].id.toLowerCase(); // checks card id - used as filter
        if(employeeName.includes(input)) {
          card[i].style.display = '';
        } else if (employeeName.includes(input) === false) {
          card[i].style.display = 'none';
        } else {
          card[i].style.display = '';
        }
      }
    })
  }