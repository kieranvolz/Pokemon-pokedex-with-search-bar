
import './App.css';
import { useState } from "react";
function App() {
  const [pokemonName, setPokemonName] = useState("ditto");
  const [chosen, setChosen] = useState(false);
  const [pokemonData, setPokemonData] = useState({
    name: "",
    image: "",
    type: "",
    id: "",
    height: "",
    
    weight: ""

  });

  const searchPokemon = () => {
    const response = fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((response) => response.json())
      .then((response) => {
        console.log(response);
        setPokemonData({
          name: response.name,
          image: response.sprites['front_default'],
          type: response.types.map((type) => type.type.name).join(', '),
          id: response.id,
          height: parseFloat(response.height/3.048).toFixed(2),
          
          weight: parseFloat(response.weight*0.2205).toFixed(2)

        });
        setChosen(true);
      });
    console.log(response);
  };

  return (
    <div className="App">
      
      <input
        className=""
        type="text"
        onChange={(e) => {
          setPokemonName(e.target.value);
        }}
      />
      <br/>
      <button
        className=""
        onClick={searchPokemon}
      >
        Search Pokemon
      </button>
     
      <div>
        {!chosen ? (
          <h1>Please choose a pokemon</h1>
        ) : (
          <>
        <div className="card pokemon">
<img className="card-image"src={pokemonData.image} alt={pokemonData.name} />
            <h1 className="card-title" >#{pokemonData.id}</h1>
            <h1 className="card-title" id="PokemonName">{pokemonData.name}</h1>
            <p className="card-subtitle">Type: {pokemonData.type}</p>
            <p className="card-subtitle">Height: {pokemonData.height} ft</p>            
            <p className="card-subtitle">Weight: {pokemonData.weight} lbs</p>
          </div>
          </>
        )}
      </div>
    </div>
  );
}

export default App;
