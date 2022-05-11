// Requests using fetch
async function getData () {
    const list = document.getElementById('result-list')
    fetch('http://localhost:8080/books')
        .then(response => response.json())
        .then(data => {
            for (const book of data) {
                let li = document.createElement('li');
                li.appendChild(document.createElement('strong'))
                    .textContent = book.TITLE;
                list.appendChild(li)
            }
        })
}