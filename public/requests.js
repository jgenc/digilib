// Function which creates a container for book search results
function createTableHTML(title, author, genre, price) {
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

// Test function
// async function getAllBooks () {
//     const ul = document.createElement('ul');
//     ul.style = "text-align: center";
//     ul.className = "result-list";
//
//     fetch('http://localhost:8080/books/all')
//         .then(response => response.json())
//         .then(data => {
//             for (const book of data) {
//                 let div = document.createElement('div');
//                 div.className = 'book-result'
//
//                 div.appendChild(createTableHTML(book.TITLE, book.AUTHOR, book.GENRE, book.PRICE))
//
//                 let ul = document.createElement('li');
//                 li.style = 'list-style: none;'
//                 li.appendChild(div)
//
//                 ul.appendChild(li)
//             }
//         })
//
//     document.body.appendChild(ul)
// }

async function getSearchBooks () {
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

    document.getElementById('site-title').innerText += location.search.slice(3)
    const list = document.getElementById('result-list');
    // location.search returns q?=<>
    fetch('http://localhost:8080/books/search' + location.search)
        .then(response => response.json())
        .then(data => {
            let title = document.getElementById('site-title');
            title.innerText;

            for (const book of data) {
                let div = document.createElement('div');
                div.className = 'book-result'

                div.appendChild(createTableHTML(book.TITLE, book.AUTHOR, book.GENRE, book.PRICE))

                let li = document.createElement('li');
                li.style = 'list-style: none;'
                li.appendChild(div)

                list.appendChild(li)
            }
        })
}