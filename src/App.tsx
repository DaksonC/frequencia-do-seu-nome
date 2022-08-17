import { useState } from 'react';
import { api } from './services/api';
import logo from './logo.svg';
import './App.css';

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
    .then((response) => {
        if(response.data.erro) {
              alert('Nome não encontrado :(');
        }
        setNome(response.data);
    })
    .catch(err => console.log(err));
  }

  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    setSeuNme(e.target.value);
  }

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
            onChange={handleChange}
          />
          <button
            type="button"
            onClick={handleClick}
          >Consultar</button>
          {
            nomes?.map((dataNome, index) => {
              return (
                <div key={index}>
                  <p><strong>{dataNome.nome}</strong></p>
                  <p>{dataNome.localidade}</p>
                  {
                    dataNome.res?.map((dataRes, index) => {
                      return (
                        <div key={index}>
                          <p>Na decada <span>{(dataRes.periodo)}</span> a fequência de nascidos com seu nome foram <span>{(dataRes.frequencia).toLocaleString('pt-BR')}</span> pessoas.</p>
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
