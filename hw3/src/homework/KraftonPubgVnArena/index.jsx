import { useId, useState } from 'react';
import AirdropPhaseBadge from '../../components/AirdropPhaseBadge';
import CrateDropList from '../../components/CrateDropList';
import LeaderboardControls from '../../components/LeaderboardControls';
import SquadLeaderboard from '../../components/SquadLeaderboard';
import { crates, squads } from '../../data/pubgVnData';

// TẠM: danh sách trạng thái cho các nút đổi bằng tay, xóa khi có đồng hồ thật
const DEBUG_PHASES = ['WARMUP', 'AIRDROP_LIVE', 'LOOTED_OUT', 'EXPIRED'];

export default function KraftonPubgVnArena({ title = 'PUBG Vietnam Arena' }) {
  const cratesHeadingId = useId();
  const leaderboardHeadingId = useId();

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('rankPoints');

  // TẠM: trạng thái đổi bằng tay, bước (7) sẽ tính từ đồng hồ
  const [phase, setPhase] = useState('WARMUP');

  return (
    <>
      <header className="arena-header">
        <p className="arena-header__eyebrow">Krafton × PUBG Việt Nam</p>
        <h1 className="arena-header__title">{title}</h1>
        <p className="arena-header__desc">
          Chờ giờ thả hàng, nhận vé và thùng đồ, theo dõi bảng xếp hạng các đội.
        </p>

        <AirdropPhaseBadge phase={phase} />

        {/* TẠM: nút đổi trạng thái bằng tay để xem giao diện */}
        <fieldset className="phase-debug">
          <legend className="phase-debug__legend">Đổi trạng thái (tạm thời, để thử)</legend>
          <ul className="phase-debug__list">
            {DEBUG_PHASES.map((item) => (
              <li key={item}>
                <button
                  type="button"
                  className="phase-debug__button"
                  aria-pressed={item === phase}
                  onClick={() => setPhase(item)}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </fieldset>
      </header>

      <main className="arena">
        <section
          className="arena-section arena-section--crates"
          aria-labelledby={cratesHeadingId}
        >
          <h2 id={cratesHeadingId} className="arena-section__title">
            Vé và thùng đồ
          </h2>
          <CrateDropList crates={crates} />
        </section>

        <section
          className="arena-section arena-section--leaderboard"
          aria-labelledby={leaderboardHeadingId}
        >
          <h2 id={leaderboardHeadingId} className="arena-section__title">
            Bảng xếp hạng đội
          </h2>
          <LeaderboardControls
            query={query}
            sortBy={sortBy}
            onQueryChange={setQuery}
            onSortByChange={setSortBy}
          />
          <SquadLeaderboard squads={squads} />
        </section>
      </main>
    </>
  );
}