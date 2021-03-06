// appi call
const searchBook = () => {
    const searchField = document.getElementById('search-field');
    const searchText = searchField.value;
    // console.log(searchText);
    //clring after each search
    searchField.value = '';
    //url api load
    const url = `https://openlibrary.org/search.json?q=${searchText}`;
    // console.log(url);


    //fetch
    fetch(url)
        .then(res => res.json())
        .then(data => displaySearchResult(data.docs, data.numFound));
}
// function for book result
const displaySearchResult = (books, numList) => {
    const searchResult = document.getElementById('search-result');
    // Condition for if get result
    // if not found return massange no found
    if (numList === 0) {
        const numBooks = document.getElementById('book-foundlist');
        numBooks.innerHTML = `
        <h1>Search is<span class="text-danger"> not </span>Found</h1>`;
        searchResult.textContent = '';
    }
    else {
        const numBooks = document.getElementById('book-foundlist');
        // serch-result total 
        numBooks.innerHTML = ` <h1>Search Result: ${numList}</h1>`;
        searchResult.textContent = '';
        // foeach start
        books.forEach(book => {
            // console.log(book);
            const div = document.createElement('div');
            div.classList.add('col');
            // images +writtings in inner html
            div.innerHTML = `
            <div class="card h-100">
                <img src="https://covers.openlibrary.org/b/id/${book.cover_i}-M.jpg" class="card-img-top h-75" alt="...">
                <div class="card-body">
                        <h5 class="card-title">Book Name: <span class="fw-bold">${book.title}</span></h5>
                        <br>
    
                        <p class="card-text">
                        First Published year:<span class="fw-bold">${book.first_publish_year}</span> 
                        <br>
                        Author Name:<span class="fw-bold">${book.author_name}</span>
                        <br>
                        Publisher Name:<span class="fw-bold">${book.publisher.slice(0, 20)}</span>
                        </p>
                       
                </div>
            </div>`;
            // result 
            searchResult.appendChild(div);

        });
    }
}
