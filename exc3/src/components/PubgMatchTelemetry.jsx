import { useEffect, useState } from 'react';
import { fetchKraftonPubgTelemetry } from '../api/fetchTelemetry.js';
import styles from './PubgMatchTelemetry.module.css';

function PubgMatchTelemetry({ squadId = 'te' }) {
  const [view, setView] = useState({ status: 'IDLE', data: null, error: null });

  useEffect(() => {
    const controller = new AbortController();

    setView({ status: 'LOADING', data: null, error: null });

    fetchKraftonPubgTelemetry(squadId, { signal: controller.signal })
      .then((data) => {
        setView({ status: 'SUCCESS', data, error: null });
      })
      .catch((error) => {
        if (error.name === 'AbortError') {
          return;
        }
        setView({ status: 'ERROR', data: null, error });
      });

    return () => {
      controller.abort();
    };
  }, [squadId]);

  if (view.status === 'LOADING') {
    return (
      <section
        className={styles.skeleton}
        aria-busy="true"
        aria-label="Đang đồng bộ"
      />
    );
  }

  if (view.status === 'ERROR') {
    return <section role="alert">{view.error.message}</section>;
  }

  if (view.status === 'SUCCESS') {
    return (
      <article className={styles.card}>
        <h2 className={styles.title}>{view.data.name}</h2>
        <span>Kills: {view.data.kills}</span>
      </article>
    );
  }

  return null;
}

export default PubgMatchTelemetry;