// Fetching Data

// AXIOS console.log Data
axios.get('https://jsonplaceholder.typicode.com/users').then((res) => {
  console.log(res);
});

// Fetch console.log Data
fetch('https://jsonplaceholder.typicode.com/users')
  .then((res) => res.json())
  .then((res) => {
    console.log(res);
  });

// Fetching Data to table by fetch
let xmlContent = '';
let tableBooks = document.getElementById('books');

fetch('books.xml').then((response) => {
  response.text().then((xml) => {
    xmlContent = xml;
    let parser = new DOMParser();
    let xmlDOM = parser.parseFromString(xmlContent, 'application/xml');
    let books = xmlDOM.querySelectorAll('book');

    books.forEach((bookXmlNode) => {
      let row = document.createElement('tr');

      // Author
      let td = document.createElement('td');
      td.innerText = bookXmlNode.children[0].innerHTML;
      row.appendChild(td);

      // Title
      td = document.createElement('td');
      td.innerText = bookXmlNode.children[1].innerHTML;
      row.appendChild(td);

      // Price
      td = document.createElement('td');
      td.innerText = '$ ' + bookXmlNode.children[3].innerHTML;
      row.appendChild(td);

      // Description
      td = document.createElement('td');
      td.innerText = bookXmlNode.children[5].innerHTML;
      row.appendChild(td);

      tableBooks.children[1].appendChild(row);
    });
  });
});

// Fetch by XMLHttpRequest console.log
function loadDoc() {
  const xhr = new XMLHttpRequest();
  xhr.onreadystatechange = (e) => {
    if (xhr.readyState === 4 && xhr.status === 200) {
      showData(xhr);
    }
  };
  xhr.open('GET', 'books.xml', true);
  xhr.send();
}

function showData(text) {
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(text.response, 'text/xml');
  const books = xmlDoc.querySelectorAll('book');
  books.forEach((book) => {
    const title = book.querySelector('title').firstChild.nodeValue;
    const author = book.querySelector('author').firstChild.nodeValue;
    const genre = book.querySelector('genre').firstChild.nodeValue;
    const price = Number(book.querySelector('price').firstChild.nodeValue);
    const publish_date =
      book.querySelector('publish_date').firstChild.nodeValue;
    console.log(`
            tytuł: ${title},
            autor: ${author},
            rodzaj: ${genre},
            cena: ${price},
            Data Wydania: ${publish_date}
        `);
  });
}

loadDoc();
