import { useState } from 'react';
import PubgMatchTelemetry from './PubgMatchTelemetry.jsx';
import { PUBG_VN_SQUADS } from '../data/squads.js';
import styles from './TelemetryPanel.module.css';

function TelemetryPanel() {
  const [squadId, setSquadId] = useState('te');

  return (
    <section aria-label="Bảng telemetry PUBG">
      <ul className={styles.squadList}>
        {PUBG_VN_SQUADS.map((squad) => (
          <li key={squad.id}>
            <button
              type="button"
              aria-pressed={squadId === squad.id}
              onClick={() => setSquadId(squad.id)}
            >
              {squad.name}
            </button>
          </li>
        ))}
      </ul>

      <PubgMatchTelemetry squadId={squadId} />
    </section>
  );
}

export default TelemetryPanel;