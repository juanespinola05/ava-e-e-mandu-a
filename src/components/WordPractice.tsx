/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { mapWords } from "@/spreadsheets/utils";

export default function VocabTrainer() {
  const [words, setWords] = useState<Array<{ word: string; translation: string }>>([]);
  const [currentWord, setCurrentWord] = useState<{ word: string; translation: string }>();
  const [showTranslation, setShowTranslation] = useState(false);
  const [lastUsedWords, setLastUsedWords] = useState<string[]>([]);
  
  
  const pickRandomWord = (wordList: Array<{ word: string; translation: string }>) => {
    if (wordList.length > 0) {
      if (lastUsedWords.length === wordList.length) {
        setLastUsedWords([]);
      }
      const randomIndex = Math.floor(Math.random() * wordList.length);
      const word = wordList[randomIndex];
      if (lastUsedWords.includes(word.word)) {
        pickRandomWord(wordList);
      } else {
        setCurrentWord(word);
        setShowTranslation(false);
        setLastUsedWords([...lastUsedWords, word.word]);
      }
    }
  };

  useEffect(() => {
    mapWords().then(data => {
      if (!data || data.length === 0) {
        alert('No se encontraron palabras')
      } else {
        setWords(data);
        pickRandomWord(data);
      }
    })
  }, [])
  
  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="flex gap-2 justify-center py-6">
        <h1 className="text-xl text-center">Avañe'e Mandu'a</h1>
        <img src="https://i.imgur.com/YwAodoO.png" alt="Avañe e Mandu a" className="w-6" />
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
          <Button className="w-full p-2 bg-[#e31b1b]" onClick={() => setShowTranslation(true)}>Revelar</Button>
          <Button className="w-full p-2 mt-2 bg-blue-600 text-white" onClick={() => pickRandomWord(words)} variant="outline">
            Siguiente
          </Button>
        </div>
      </div>
      <div>
        <a className="underline" target="_blank" href='https://docs.google.com/spreadsheets/d/1juFn3CCdxG9MeNhg6Ale8t6SIxByVQoRCnuEjzKccGM/edit?gid=0#gid=0'>Revisar listado</a>
      </div>
    </div>
  );
}
