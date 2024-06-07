import React from 'react';
import { Link } from 'react-router-dom';
import homeStore from '../stores/homeStore';
import '../css/Home.css';

export default function Home() {
  const store = homeStore();

  React.useEffect(() => {
    
    store.fetchCoins();
  }, []); 

  // This page is for selecting / searching a crypto
  return (
    <div>
      <div className="header">CryptoKing</div>
      <div className="container">
        <input
          type="text"
          className="search-input"
          placeholder="Search your favourite currency..."
          value={store.query}
          onChange={store.setQuery} 
        />
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
