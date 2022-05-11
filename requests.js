// Requests using fetch
function createTable(title, author, genre, price) {
    let table = document.createElement('table')
    const data = [title, author, genre, price]
    const label_names = ['Title', 'Author', 'Genre', 'Price']

    for (let i = 0; i < data.length; i++) {
        let td_label = document.createElement('td')
        let label = document.createElement('label')
        label.textContent = label_names[i]
        td_label.appendChild(label)

        let td_data_text = document.createElement('td')
        td_data_text.textContent = data[i]

        let tr = document.createElement('tr')
        tr.appendChild(td_label)
        tr.appendChild(td_data_text)

        table.appendChild(tr)
    }
    return table
}

async function getData () {
    const list = document.getElementById('result-list')
    fetch('http://localhost:8080/books/search')
        .then(response => response.json())
        .then(data => {
            for (const book of data) {
                let div = document.createElement('div');
                div.className = 'book-result'

                div.appendChild(createTable(book.TITLE, book.AUTHOR, book.GENRE, book.PRICE))
                // div.appendChild(document.createElement('strong'))
                //     .textContent = book.TITLE;
                // div.appendChild(document.createElement('strong'))
                //     .textContent = book.AUTHOR;
                // div.appendChild(document.createElement('strong'))
                //     .textContent = book.GENRE;
                // div.appendChild(document.createElement('strong'))
                //     .textContent = book.PRICE;

                let li = document.createElement('li');
                li.style = 'list-style: none;'
                li.appendChild(div)

                list.appendChild(li)
            }
        })
}