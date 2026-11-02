import { Fragment, useEffect, useState } from 'react';
import { fetchKraftonPubgTelemetry } from '../api/fetchTelemetry.js';
import styles from './PubgMatchTelemetry.module.css';

const INFO_LABELS = {
  map: 'Map',
  phase: 'Phase',
  alive: 'Alive',
  kills: 'Kills',
  wwcdProb: 'WWCD Probability',
  status: 'Status',
};

function PubgMatchTelemetry({ squadId = 'te' }) {
  const [view, setView] = useState({ status: 'IDLE', data: null, error: null });
  const [retryTick, setRetryTick] = useState(0);

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
  }, [squadId, retryTick]);

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
    return (
      <section className={styles.alert} role="alert">
        <span>Blue-Zone Link Lost: {view.error.message}</span>
        <button
          type="button"
          onClick={() => setRetryTick((prev) => prev + 1)}
        >
          Reconnect Satellite
        </button>
      </section>
    );
  }

  if (view.status === 'SUCCESS') {
    const { name, map, phase, alive, kills, wwcdProb, status } = view.data;
    const info = { map, phase, alive, kills, wwcdProb, status };

    return (
      <article className={styles.card} aria-live="polite">
        <h3 className={styles.title}>{name}</h3>
        <dl className={styles.infoList}>
          {Object.entries(info).map(([key, value]) => (
            <Fragment key={key}>
              <dt className={styles.term}>{INFO_LABELS[key]}</dt>
              <dd className={styles.value}>{value}</dd>
            </Fragment>
          ))}
        </dl>
      </article>
    );
  }

  return null;
}

export default PubgMatchTelemetry;