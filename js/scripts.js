const gallery = document.getElementById('gallery');


// fetch API function
function fetchData(url) {
    return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    // .then(data => console.log(data)) // view data
    .then(data => {
        const employees = data.results;
        employees.forEach((employee) => {
            createGallery(employee);
            createModalWindow(employee);
        })
        createSearchBar();
    })
}

Promise.all([
fetchData('https://randomuser.me/api/?results=12&nat=us')
])

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
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
    searchDiv.insertAdjacentHTML('beforeend', searchHTML);
}

// creates the gallery 
function createGallery(data) {
    const galleryHTML = `               
        <div class="card">
            <div class="card-img-container">
                <img class="card-img" src="${data.picture.large}" alt="profile picture">
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
    const modalDiv = document.createElement('div');
    gallery.appendChild(modalDiv);
    const modalHTML = `
    <div class="modal-container">
        <div class="modal">
            <button type="button" id="modal-close-btn" class="modal-close-btn"><strong>X</strong></button>
            <div class="modal-info-container">
                <img class="modal-img" src="${data.picture.large}" alt="profile picture">
                <h3 id="name" class="modal-name cap">${data.name.first} ${data.name.last}</h3>
                <p class="modal-text">${data.email}</p>
                <p class="modal-text cap">${data.location.city}</p>
                <hr>
                <p class="modal-text">${data.phone}</p>
                <p class="modal-text">${data.location.street.name}, ${data.location.state}, ${data.location.postcode}</p>
                <p class="modal-text">Birthday: ${data.dob.date}</p>
        </div>
    </div>`;
    modalDiv.insertAdjacentHTML('beforeend', modalHTML);
    modalDiv.style.display = 'none';
}

const card = document.querySelector('card');
// for (let i = 0; i < card.length; i++) {
//     card[i].addEventListener('click', () => card[i].style.display = ' ');
//     };

    console.log(card);