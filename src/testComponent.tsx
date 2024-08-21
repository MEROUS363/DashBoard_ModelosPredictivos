import React, { useEffect } from 'react';
import useConsumoTarjetasDebito from './hooks/fetchConsumoTarjetasHook';


const TestComponent = () => {
  const { data, error, loading, fetchScoresForDay } = useConsumoTarjetasDebito();

  useEffect(() => {
    console.log("TestComponent rendered");
  }, []);

  const handleFetchClick = () => {
    const today = new Date();
    const formattedDate = today.toLocaleDateString('en-GB').split('/').reverse().join('/');
    fetchScoresForDay(formattedDate);  // Manually trigger the fetch with today's date in dd/MM/yyyy format
  };

  return (
    <div>
      <h1>Scores by Hour</h1>
      <button onClick={handleFetchClick}>Fetch Scores</button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {Object.entries(data).map(([hour, score]) => (
          <li key={hour}>
            {hour}: {score}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TestComponent;
