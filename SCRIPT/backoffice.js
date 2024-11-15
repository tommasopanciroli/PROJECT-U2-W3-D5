const currentYear = document.getElementById('current-year')
currentYear.innerText = new Date().getFullYear()

const tokenAut =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjE2MDhhZDEyOTAwMTU4NzZjNzAiLCJpYXQiOjE3MzE2NjYyNzIsImV4cCI6MTczMjg3NTg3Mn0.ZpAoVM6TZ4xFqS0A4CTZt7bm6KLlQn2m1E-G5MTYYpM'

const header = {
  Authorization: `Bearer ${tokenAut}`,
  'Content-Type': 'application/json',
}

const crudazonURL = 'https://striveschool-api.herokuapp.com/api/product/'

class Product {
  constructor(_name, _description, _price, _imageUrl) {
    this.name = _name
    this.description = _description
    this.price = _price
    this.imageUrl = _imageUrl
  }
}

const addressBarContent = new URLSearchParams(window.location.search)
const productId = addressBarContent.get('productId')

if (productId) {
  fetch(crudazonURL + '/' + productId)
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nel recupero dettagli')
      }
    })
    .then((singleProduct) => {
      document.getElementById('name').value = singleProduct.name
      document.getElementById('description').value = singleProduct.description
      document.getElementById('price').value = singleProduct.price
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
} else {
}

const form = document.getElementById('product-form')
form.addEventListener('submit', (e) => {
  e.preventDefault()
  const nameInput = document.getElementById('name')
  const descriptionInput = document.getElementById('description')
  const priceInput = document.getElementById('price')
  const createdProduct = new Product(
    nameInput.value,
    descriptionInput.value,
    priceInput.value
  )
  console.log('PRODOTTO CREATO', createdProduct)

  let methodToUse
  let UrlToUse

  if (productId) {
    methodToUse = 'PUT' // modifica
  } else {
    methodToUse = 'POST' // creazione
  }

  if (productId) {
    UrlToUse = crudazonURL + '/' + productId
  } else {
    UrlToUse = crudazonURL
  }
  fetch(UrlToUse, {
    method: methodToUse, // inserisco POST per CREARE una nuova risorsa
    body: JSON.stringify(createdProduct), // allego il nuovo concerto come stringa
    headers: header,
  })
    .then((response) => {
      if (response.ok) {
        alert('PRODOTTO SALVATO!')

        nameInput.value = ''
        descriptionInput.value = ''
        priceInput.value = ''
      } else {
        // molto probabilmente qualcosa non va bene nel tuo oggetto
        throw new Error('Errore nel salvataggio del prodotto')
      }
    })
    .catch((error) => {
      console.log('ERROR', error)
    })
})

function loadProducts() {
  fetch(crudazonURL, { headers: header })
    .then((response) => response.json())
    .then((products) => {
      const productsRow = document.getElementById('product-row')
      productsRow.innerHTML = '' // Resetta l'elenco

      products.forEach((product) => {
        const productCol = document.createElement('div')
        productCol.className = 'col'
        productCol.innerHTML = `
            <div class="card">
              <img src="https://www.azzurrasport.eu/pub/media/catalog/product/cache/0b8817121aedd409f092350af4c5165e/1/1/11966-ea7-scarpe-uomo-pelle-tinta-unita-aquila-00001_0.jpg" class="card-img-top" alt="${product.name}">
              <div class="card-body">
                <h5 class="card-title">${product.name}</h5>
                <p class="card-text">${product.description}</p>
                <p class="card-text">${product.price} €</p>
              </div>
            </div>
          `
        productsRow.appendChild(productCol)
      })
    })
    .catch((error) =>
      console.error('Errore nel caricamento dei prodotti:', error)
    )
}
