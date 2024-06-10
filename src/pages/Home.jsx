import React from 'react'; 
import { Link } from 'react-router-dom'; 
import homeStore from '../stores/homeStore'; 
import '../css/Home.css'; 


export default function Home() {
  const store = homeStore(); // accès données et actions dans homeStore

  React.useEffect(() => {
    // récupére données des crypto
    store.fetchCoins();
  }, []); 

  // fonction selection et recherche crypto
  return (
    <div>
      <div className="header">CryptoKing</div>
      <div className="container">
        <input
          type="text"
          className="search-input"
          placeholder="Search your favourite currency..." 
          value={store.query} // l'utilisateur tape...
          onChange={store.setQuery} // mise à jour de l'état...
        />
        {/* création d'un lien et affiche image de la cryto */}
        <div className="coin-list">
          {store.coins.map(coin => (
            <div key={coin.id} className="coin-item"> 
              <img src={coin.image} alt={coin.name} /> 
              <Link to={`/${coin.id}`}> 
                {coin.name} 
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
