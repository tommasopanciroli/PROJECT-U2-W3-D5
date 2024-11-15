const tokenAut =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjE2MDhhZDEyOTAwMTU4NzZjNzAiLCJpYXQiOjE3MzE2NjYyNzIsImV4cCI6MTczMjg3NTg3Mn0.ZpAoVM6TZ4xFqS0A4CTZt7bm6KLlQn2m1E-G5MTYYpM'

const header = {
  Authorization: `Bearer ${tokenAut}`,
  'Content-Type': 'application/json',
}
console.log(header)

const currentYear = document.getElementById('current-year')
currentYear.innerText = new Date().getFullYear()

const crudazonURL = 'https://striveschool-api.herokuapp.com/api/product/'

fetch(crudazonURL, {
  method: 'GET',
  headers: header,
})
  .then((response) => {
    console.log('RESPONSE', response)
    if (response.ok) {
      return response.json()
    } else {
      throw new Error('Errore nel recupero della risposta dal server')
    }
  })
  .then((arrayOfProducts) => {
    console.log('arrayOfProducts', arrayOfProducts)

    const row = document.getElementById('products-row')
    arrayOfProducts.forEach((product) => {
      const newCol = document.createElement('div')
      newCol.classList.add('col', 'col-12', 'col-md-6', 'col-lg-4')
      newCol.innerHTML = `
            <div class="card">
                <img src="https://www.azzurrasport.eu/pub/media/catalog/product/cache/0b8817121aedd409f092350af4c5165e/1/1/11966-ea7-scarpe-uomo-pelle-tinta-unita-aquila-00001_0.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${product.name}</h5>
                    <p class="card-text">${product.description}</p>
                    <p class="card-text">${product.price}€ </p>
                    <a href="./details.html?concertId=${product._id}" class="btn btn-primary">Vai ai dettagli!</a>
                </div>
            </div>
        `
      row.appendChild(newCol)
    })
  })
  .catch((error) => {
    console.log('ERROR', error)
  })
