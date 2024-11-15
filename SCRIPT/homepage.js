const tokenAut =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjE2MDhhZDEyOTAwMTU4NzZjNzAiLCJpYXQiOjE3MzE2NjYyNzIsImV4cCI6MTczMjg3NTg3Mn0.ZpAoVM6TZ4xFqS0A4CTZt7bm6KLlQn2m1E-G5MTYYpM'

const header = {
  Authorization: `Bearer ${tokenAut}`,
  'Content-Type': 'application/json',
}

const currentYear = document.getElementById('current-year')
currentYear.innerText = new Date().getFullYear()

const crudazonURL = 'https://striveschool-api.herokuapp.com/api/product/'

const genProdCards = function (product) {
  const prodList = document.getElementById('product-row')
  prodList.innerHTML = ''
  product.forEach((products) => {
    const cardHTML = `
          <div class="col-md-4">
            <div class="card mb-4">
              <a href="dettaglio.html?id=${products._id}">
                <img src="${products.imageUrl}" class="card-img-top" alt="${products.name}">
              </a>
              <div class="card-body">
                <h5 class="card-title">${products.name}</h5>
                <p class="card-text">${products.description}</p>
                <p class="card-text"><strong>€${products.price}</strong></p>
                <button onclick="editProduct('${products._id}')" class="btn">Modifica</button>
              </div>
            </div>
          </div>
        `
    prodList.innerHTML += cardHTML
  })
}

fetch(`${crudazonURL}`, {
  headers: header,
  method: 'GET',
})
  .then((response) => {
    console.log('RESPONSE', response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero della risposta dal server')
    }
  })
  .then((products) => {
    genProdCards(products)
    console.log(genProdCards)
  })

  .catch((error) => {
    console.log('ERROR', error)
  })

 const editProd = function (productId) {
    window.location.href = `back-office.html?id=${productId}`;
  }
  
  window.onload = fetchProducts;