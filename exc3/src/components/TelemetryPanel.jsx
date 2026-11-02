import { useState } from 'react';
import PubgMatchTelemetry from './PubgMatchTelemetry.jsx';
import { PUBG_VN_SQUADS } from '../data/squads.js';

function TelemetryPanel() {
  const [squadId, setSquadId] = useState('te');

  return (
    <section aria-label="Bảng telemetry PUBG">
      <ul>
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