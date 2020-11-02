import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import Cam from './components/Cam';
import './App.css';

const APL_LIST = [
  'Lactoalbumina',
  'Lactoglobulina',
  'Fosfato de lactoalbumina',
  'Lactato',
  'Lactoferrina',
  'Lactulose',
  'Lactulona',
  'Caseína',
  'Caseína hidrolisada',
  'Caseinato de cálcio',
  'Caseinato de potássio',
  'Caseinato de amônia',
  'Caseinato de magnésio',
  'Caseinato de sódio',
  'Chantilly',
  'Creme de leite',
  'Leite',
  'Leitelho',
  'Nata',
  'Nougat',
  'Soro de leite',
  'Gordura de leite',
  'Coalhada',
  'Proteína láctea',
  'Proteína de leite hidrolisada',
  'Whey protein',
  'Fermento lácteo',
  'Gordura de manteiga',
  'óleo de manteiga',
  'éster de manteiga',
  'Composto lácteo',
  'mistura láctea'
];

function matchAPLVWords(text) {
  return APL_LIST
    .reduce((acc, next) => {
      let regx = new RegExp(`(${next})`, 'gi')
      let matchs = text.match(regx);
      acc[next] = matchs ? matchs.length : 0;
      return acc;
    }, {});
}

function App() {
  const worker = createWorker({
    logger: m => console.log(m),
  });

  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('por');
    await worker.initialize('por');
    const { data: { text } } = await worker.recognize('./rotulo.png');
    console.table(matchAPLVWords(text));
    setOcr(text);
  };

  const [ocr, setOcr] = useState('Processando imagem...');
  // useEffect(() => {
  //   doOCR();
  // }, []);

  return (
    <div className="App">
     <div className="video-container">
       <Cam className="player" />
     </div>
    </div>
  );
}

export default App;
