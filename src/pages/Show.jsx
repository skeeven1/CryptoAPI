import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom'; 
import axios from 'axios';
import showStore from '../stores/showStore';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function Show() {
  const { id } = useParams();
  const [crypto1, setCrypto1] = useState(id);
  const [crypto2, setCrypto2] = useState('');
  const [data1, setData1] = useState([]);
  const [data2, setData2] = useState([]);
  const [trendingCryptos, setTrendingCryptos] = useState([]);
  const [error, setError] = useState(''); // This state is related to errors

  useEffect(() => {
    fetchData(crypto1, setData1);
    fetchTrendingCryptos();
  }, [crypto1]);

  const fetchData = async (crypto, setData) => {
    try {
      const res = await axios.get(`https://api.coingecko.com/api/v3/coins/${crypto}/market_chart?vs_currency=usd&days=100&interval=daily`);
      const formattedData = res.data.prices.map(entry => ({
        date: new Date(entry[0]).toLocaleDateString(),
        price: entry[1],
      }));
      setData(formattedData);
      setError(''); // Reset error if succeed
    } catch (err) {
      setError(`Crypto "${crypto}" introuvable !`);
    }
  };

  const fetchTrendingCryptos = async () => {
    const res = await axios.get('https://api.coingecko.com/api/v3/search/trending');
    const cryptos = res.data.coins.map(coin => ({
      id: coin.item.id,
      name: coin.item.name,
    }));
    setTrendingCryptos(cryptos);
  };

  const handleCompare = () => {
    fetchData(crypto2, setData2);
  };

  // This allows to display the selected crypto + possibility to compare to another crypto by selecting from the trending list or manually selecting it
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100vh' }}>
      <div style={{ marginBottom: '20px' }}>
        <select value={crypto2} onChange={(e) => setCrypto2(e.target.value)}>
          <option value="">Select a crypto to compare</option>
          {trendingCryptos.map(crypto => (
            <option key={crypto.id} value={crypto.id}>{crypto.name}</option>
          ))}
        </select>
        <input
          type="text"
          placeholder="Or enter crypto id"
          value={crypto2}
          onChange={(e) => setCrypto2(e.target.value)}
          style={{ marginLeft: '10px' }}
        />
        <button onClick={handleCompare} style={{ marginLeft: '10px' }}>Comparer</button>
        {error && <div style={{ color: 'red', marginLeft: '10px' }}>{error}</div>}
      </div>
      <ResponsiveContainer width="80%" height={600}>
        <AreaChart>
          <defs>
            <linearGradient id="colorPrice1" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorPrice2" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#82ca9d" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#82ca9d" stopOpacity={0} />
            </linearGradient>
          </defs>
          <XAxis dataKey="date" />
          <YAxis />
          <CartesianGrid strokeDasharray="3 3" />
          <Tooltip />
          {data1.length > 0 && (
            <Area type="monotone" dataKey="price" data={data1} stroke="#8884d8" fillOpacity={1} fill="url(#colorPrice1)" />
          )}
          {data2.length > 0 && (
            <Area type="monotone" dataKey="price" data={data2} stroke="#82ca9d" fillOpacity={1} fill="url(#colorPrice2)" />
          )}
        </AreaChart>
      </ResponsiveContainer>
      <Link to="/" style={{ marginTop: '20px', textDecoration: 'none' }}>
        <button>Retour à l'accueil</button> 
      </Link>
    </div>
  );
}
