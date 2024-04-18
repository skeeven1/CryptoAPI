import React, { PureComponent } from 'react';
import { Link, useParams } from 'react-router-dom';
import showStore from '../stores/showStore'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, AreaChart, Area } from 'recharts';

export default function Show() {
  const show = showStore();
  const { id } = useParams();

  React.useEffect(() => {
      show.fetchChartData(id);
  }, [id]);

  // Vérifiez si show.res existe avant d'y accéder

  return (
      <div>
          <div>
              {show.res && show.res.data && show.res.data.prices && (
                  <AreaChart width={600} height={600} data={show.res.data.prices.map(entry => ({
                      name: new Date(entry[0]).toLocaleString(),
                      uv: entry[1],
                  }))}>
                      <defs>
                          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
                              <stop offset="5%" stopColor="#8884d8" stopOpacity={0.8} />
                              <stop offset="95%" stopColor="#8884d8" stopOpacity={0} />
                          </linearGradient>
                      </defs>
                      <XAxis dataKey="name" />
                      <YAxis />
                      <CartesianGrid strokeDasharray="3 3" />
                      <Tooltip />
                      <Area type="monotone" dataKey="uv" stroke="#8884d8" fillOpacity={1} fill="url(#colorUv)" />
                  </AreaChart>
              )}
          </div>
      </div>
  );
}