/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mapWords } from "@/spreadsheets/utils";
import { LANGUAGES, Language, TEXTS } from "@/utils/constants";

export default function VocabTrainer() {
  const [language, setLanguage] = useState<Language>(LANGUAGES.GUARANI);
  
  const [words, setWords] = useState<Array<{ word: string; translation: string }>>([]);
  const [currentWord, setCurrentWord] = useState<{ word: string; translation: string }>();
  const [showTranslation, setShowTranslation] = useState(false);
  const [lastUsedWords, setLastUsedWords] = useState<string[]>([]);
  
  const pickRandomWord = (wordList: Array<{ word: string; translation: string }>) => {
    if (wordList.length > 0) {
      let availableWords = [...wordList];
      let currentLastUsed = [...lastUsedWords];

      if (currentLastUsed.length >= wordList.length) {
        currentLastUsed = [];
        setLastUsedWords([]);
      }

      availableWords = availableWords.filter(word => !currentLastUsed.includes(word.word));
      
      if (availableWords.length === 0) {
        availableWords = [...wordList];
        currentLastUsed = [];
        setLastUsedWords([]);
      }

      const randomIndex = Math.floor(Math.random() * availableWords.length);
      const word = availableWords[randomIndex];
      
      setCurrentWord(word);
      setShowTranslation(false);
      setLastUsedWords([...currentLastUsed, word.word]);
    }
  };

  const changeLanguage = () => {
    setWords([]);
    setCurrentWord(undefined);
    setShowTranslation(false);
    setLastUsedWords([]);
    setLanguage(language === LANGUAGES.GUARANI ? LANGUAGES.CROATIAN : LANGUAGES.GUARANI);
  }

  useEffect(() => {
    mapWords(language).then(data => {
      if (!data || data.length === 0) {
        alert('No se encontraron palabras')
      } else {
        setWords(data);
        pickRandomWord(data);
      }
    })
  }, [language])
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex gap-2 justify-center py-6">
        <h1 className="text-xl text-center">
          {TEXTS[language].TITLE}
        </h1>
        <img src={TEXTS[language].IMAGE_URL} alt={TEXTS[language].TITLE} className="w-6" />
      </div>
      <div className="flex flex-col items-center justify-center p-4">
        <Card className="p-6 w-80 text-center h-96 flex items-center justify-center">
          <CardContent>
            <div>
              <h2 className="text-xl font-semibold">{currentWord?.word || "Cargando..."}</h2>
              <p
                className={`text-gray-600 transition-all mt-2 ${showTranslation ? 'opacity-100 ml-0' : 'opacity-0 ml-2'}`}
              >
                {currentWord?.translation}
              </p>
            </div>
          </CardContent>
        </Card>
        <div className="py-6 w-80">
          <Button className="w-full p-2 bg-[#e31b1b]" onClick={() => setShowTranslation(true)}>{TEXTS[language].BUTTON_TEXT}</Button>
          <Button className="w-full p-2 mt-2 bg-blue-600 text-white" onClick={() => pickRandomWord(words)} variant="outline">
            {TEXTS[language].NEXT_BUTTON_TEXT}
          </Button>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center">
        <a className="underline" target="_blank" href={TEXTS[language].CHECK_LIST_URL}>Revisar listado</a>
        <button
          className="underline"
          onClick={changeLanguage}
        >
          Cambiar a {language === LANGUAGES.GUARANI ? 'Croata' : 'Guaraní'}
        </button>
      </div>
    </div>
  );
}
