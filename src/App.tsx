import { useState } from 'react';
import logo from './logo.svg';
import './App.css';
import { api } from './services/api';

interface IRes{
  periodo: string;
  frequencia: number;
}
interface IBGEres {
  nome: string;
  localidade: string;
  res: IRes[];
}


function App() {
  const [nomes, setNome] = useState<IBGEres[]>([]);
  const [seuNome, setSeuNme] = useState<string>('');

  function handleClick(){
    api.get(`${seuNome}`)
    .then((res) => {
      if(res.data.erro) {
            alert('Nome não encontrado');
          }
      setNome(res.data);
    })
    .catch(err => console.log(err));
  }
  // console.log(nomes);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <main>
          <h1>Consultar a frequência do seu nome.</h1>
          <input 
            type="text"
            placeholder='Digite seu nome'
            value={seuNome}
            onChange={(e) => setSeuNme(e.target.value)}
          />
          <button
            type="button"
            onClick={handleClick}
          >Consultar</button>
          {nomes.map((dataNome, index) => {
            return (
              <div key={index}>
                <p><strong>{dataNome.nome}</strong></p>
                <p>{dataNome.localidade}</p>
          {dataNome.res.map((dataRes, index) => {
            return (
              <div key={index}>
                <p>{dataRes.periodo}</p>
                <p>{dataRes.frequencia}</p>
              </div>
            )
          })}
              </div>
            )
          })}
          
        </main>
      </header>
    </div>
  );
}

export default App;
