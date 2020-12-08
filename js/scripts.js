const gallery = document.getElementById('gallery');



// fetch API function
function fetchData(url) {
    return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    // .then(data => console.log(data))
    .then(data => {
        const employees = data.results;
        employees.forEach((employee) => {
            createGallery(employee);
        })
    })
}


createSearchBar();


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


// this function creates the search bar
function createSearchBar() {
    const results = [ ];
    const searchHTML = `
        <form action="#" method="get">
        <input type="search" id="search-input" class="search-input" placeholder="Search...">
        <input type="submit" value="&#x1F50D;" id="search-submit" class="search-submit">
        </form>`;
    const searchDiv = document.querySelector('.search-container');
    searchDiv.insertAdjacentHTML('beforeend', searchHTML);

}