import { useId } from 'react';
import CrateDropList from '../../components/CrateDropList';
import SquadLeaderboard from '../../components/SquadLeaderboard';
import { crates, squads } from '../../data/pubgVnData';

export default function KraftonPubgVnArena({ title = 'PUBG Vietnam Arena' }) {
  const cratesHeadingId = useId();
  const leaderboardHeadingId = useId();

  return (
    <>
      <header className="arena-header">
        <p className="arena-header__eyebrow">Krafton × PUBG Việt Nam</p>
        <h1 className="arena-header__title">{title}</h1>
        <p className="arena-header__desc">
          Chờ giờ thả hàng, nhận vé và thùng đồ, theo dõi bảng xếp hạng các đội.
        </p>
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
          <SquadLeaderboard squads={squads} />
        </section>
      </main>
    </>
  );
}