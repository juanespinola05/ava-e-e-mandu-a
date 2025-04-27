export const WORDS_FILE_URL = {
  GUARANI: import.meta.env.VITE_GUARANI_WORDS_FILE_URL ?? '',
  CROATIAN: import.meta.env.VITE_CROATIAN_WORDS_FILE_URL ?? ''
}

export const LANGUAGES = {
  GUARANI: 'GUARANI',
  CROATIAN: 'CROATIAN'
} as const

export type Language = typeof LANGUAGES[keyof typeof LANGUAGES]

export const TEXTS = {
  GUARANI: {
    HTML_TITLE: 'Avañe\'e Mandu\'a',
    TITLE: 'Avañe\'e Mandu\'a',
    IMAGE_URL: 'https://i.imgur.com/YwAodoO.png',
    BUTTON_TEXT: 'Revelar',
    NEXT_BUTTON_TEXT: 'Siguiente',
    CHECK_LIST_URL: WORDS_FILE_URL.GUARANI
  },
  CROATIAN: {
    HTML_TITLE: 'Hrvatski napamet',
    TITLE: 'Hrvatski napamet',
    IMAGE_URL: 'https://i.imgur.com/aK8CKET.png',
    BUTTON_TEXT: 'Revelar',
    NEXT_BUTTON_TEXT: 'Siguiente',
    CHECK_LIST_URL: WORDS_FILE_URL.CROATIAN
  }
}