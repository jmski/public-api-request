
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

    // const searchInput = document.getElementById('#search-input');
    // console.log(searchInput);

    // searchInput.addEventListener('keyup', (event) => {
    //     const input = e.target.value.toLowerCase();
    //     results = [ ];
    //     for ( let i = 0; i < Element.length; i++) {

    //     }
    // })
}

// fetch API function
function fetchData(url) {
    return fetch(url)
    .then(checkStatus)
    .then(response => response.json())
    .catch(error => console.log('Looks like there was a problem', error))
}

Promise.all([
fetchData('https://randomuser.me/api/?results=12&nat=us')
])
createSearchBar();

function checkStatus(response) {
    if (response.ok) {
        return Promise.resolve(response);
    } else {
        return Promise.reject(new Error(response.statusText));
    }
} 

function createModel(data) {

}
