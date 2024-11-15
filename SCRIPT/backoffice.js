const currentYear = document.getElementById('current-year')
currentYear.innerText = new Date().getFullYear()

const tokenAut =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NzM3MjE2MDhhZDEyOTAwMTU4NzZjNzAiLCJpYXQiOjE3MzE2NjYyNzIsImV4cCI6MTczMjg3NTg3Mn0.ZpAoVM6TZ4xFqS0A4CTZt7bm6KLlQn2m1E-G5MTYYpM'

const header = {
  Authorization: `Bearer ${tokenAut}`,
  'Content-Type': 'application/json',
}

const crudazonURL = 'https://striveschool-api.herokuapp.com/api/product/'
