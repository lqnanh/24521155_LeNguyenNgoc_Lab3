import { useEffect, useState } from 'react';
import { fetchKraftonPubgTelemetry } from '../api/fetchTelemetry.js';

function PubgMatchTelemetry({ squadId = 'te' }) {
  const [view, setView] = useState({ status: 'IDLE', data: null, error: null });

  useEffect(() => {
    setView({ status: 'LOADING', data: null, error: null });

    fetchKraftonPubgTelemetry(squadId)
      .then((data) => {
        setView({ status: 'SUCCESS', data, error: null });
      })
      .catch((error) => {
        setView({ status: 'ERROR', data: null, error });
      });
  }, [squadId]);

  if (view.status === 'LOADING') {
    return <section>Đang đồng bộ...</section>;
  }

  if (view.status === 'ERROR') {
    return <section role="alert">{view.error.message}</section>;
  }

  if (view.status === 'SUCCESS') {
    return (
      <article>
        <h2>{view.data.name}</h2>
        <span>Kills: {view.data.kills}</span>
      </article>
    );
  }

  return null;
}

export default PubgMatchTelemetry;