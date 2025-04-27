import { WORDS_FILE_URL } from "@/utils/constants"

export async function mapWords (language: 'GUARANI' | 'CROATIAN') {
  try {
    const response = await fetch(WORDS_FILE_URL[language])
    const data = await response.text() as string
    const rows = data.split('\n').map(row => row.split(',').map(cell => cell.replace(/\r/g, '').trim()))

    const headers = rows[0]
    const wordIndex = headers.map(header => header.toLowerCase()).indexOf('idioma')
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
