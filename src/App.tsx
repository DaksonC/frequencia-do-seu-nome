import { useState } from 'react';
import { api } from './services/api';
import  logo  from './logo.svg';
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
 
  function handleClick(e: React.FormEvent<HTMLInputElement>){
    e.preventDefault();
    api.get(`${seuNome}`)
    .then((response) => {
      setNome(response.data);
      if(response.data.length === 0){
        alert('Ah! 😩 Seu nome não consta nesse CENSO do IBGE! 😩')
      }
    })
    .catch(err => console.log(err));
  }
  
  function handleChange(e: React.ChangeEvent<HTMLInputElement>){
    e.preventDefault();
    setSeuNme(e.target.value);
  }

  
 
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <main>
          <h1>Consultar a frequência do seu nome.</h1>
          <form className="form">
            <input 
              className="input"
              type="text"
              placeholder='Digite seu nome'
              value={seuNome}
              onChange={handleChange}
              autoFocus
            />
            <input
              className="button"
              type="submit"
              onClick={handleClick}
              value="Consultar 🔍"
            />
          </form>
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
                          <p>Na década <span>{(dataRes.periodo)}</span> a frequência de nascidos com seu nome foram <span>{(dataRes.frequencia).toLocaleString('pt-BR')}</span> pessoas.</p>
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
