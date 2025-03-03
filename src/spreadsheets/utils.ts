const URL = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRsQQbC47bAIYCNVFaNmxgSxaJ9q8E2PIQan0FfG_0kGj259ZWkfD7-0pk0QtO2nRYTbgxFpHXWnaz9/pub?output=csv'

export async function mapWords () {
  try {
    const response = await fetch(URL)
    const data = await response.text() as string
    const rows = data.split('\n').map(row => row.split(',').map(cell => cell.replace(/\r/g, '').trim()))

    const headers = rows[0]
    const wordIndex = headers.map(header => header.toLowerCase()).indexOf('guaraní')
    const translationIndex = headers.map(header => header.toLowerCase()).indexOf('traducción')
    if (wordIndex === -1) {
      return []
    }
    if (translationIndex === -1) {
      return []
    }
    return rows.slice(1).flatMap(row => {
      return row[wordIndex].trim() !== '' && row[translationIndex].trim() !== ''
        ? {
            word: row[wordIndex].trim(),
            translation: row[translationIndex].trim()
          }
        : []
    })
  } catch (error) {
    console.error(error)
    alert('Error al cargar las palabras')
  }
}
