import { useId, useState } from 'react';
import AirdropPhaseBadge from '../../components/AirdropPhaseBadge';
import Countdown from '../../components/Countdown';
import CrateDropList from '../../components/CrateDropList';
import LeaderboardControls from '../../components/LeaderboardControls';
import SquadLeaderboard from '../../components/SquadLeaderboard';
import { crates as initialCrates, squads } from '../../data/pubgVnData';
import { useCrateClaim } from '../../hooks/useCrateClaim';
import {
  AIRDROP_LIVE_DURATION_MS,
  usePubgAirdropTimer,
} from '../../hooks/usePubgAirdropTimer';
import { getVisibleSquads } from '../../utils/sortSquads';

// TẠM: giờ thả hàng giả, 90 giây sau khi mở trang
const DEMO_AIRDROP_AT = Date.now() + 90 * 1000;

export default function KraftonPubgVnArena({
  title = 'PUBG Vietnam Arena',
  airdropAt = DEMO_AIRDROP_AT,
  airdropDurationMs = AIRDROP_LIVE_DURATION_MS,
}) {
  const cratesHeadingId = useId();
  const leaderboardHeadingId = useId();

  const [query, setQuery] = useState('');
  const [sortBy, setSortBy] = useState('rankPoints');

  const { remainingMs, closesInMs, isOpen, isExpired, phase } = usePubgAirdropTimer(
    airdropAt,
    airdropDurationMs,
  );

  const { crates, pendingIds, claim } = useCrateClaim(initialCrates);

  const canClaim = phase === 'AIRDROP_LIVE';
  const closedLabel = phase === 'WARMUP' ? 'Chưa mở' : 'Đã đóng';

  // Tính ngay trong lúc render từ dữ liệu gốc, không lưu state riêng
  const visibleSquads = getVisibleSquads(squads, query, sortBy);

  return (
    <>
      <header className="arena-header">
        <p className="arena-header__eyebrow">Krafton × PUBG Việt Nam</p>
        <h1 className="arena-header__title">{title}</h1>
        <p className="arena-header__desc">
          Chờ giờ thả hàng, nhận vé và thùng đồ, theo dõi bảng xếp hạng các đội.
        </p>

        <AirdropPhaseBadge phase={phase} />
        <Countdown
          targetTime={airdropAt}
          remainingMs={remainingMs}
          closesInMs={closesInMs}
          isOpen={isOpen}
          isExpired={isExpired}
        />
      </header>

      <main className="arena">
        <section
          className="arena-section arena-section--crates"
          aria-labelledby={cratesHeadingId}
        >
          <h2 id={cratesHeadingId} className="arena-section__title">
            Vé và thùng đồ
          </h2>
          <CrateDropList
            crates={crates}
            pendingIds={pendingIds}
            canClaim={canClaim}
            closedLabel={closedLabel}
            onClaim={claim}
          />
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
          <SquadLeaderboard squads={visibleSquads} totalCount={squads.length} query={query} />
        </section>
      </main>
    </>
  );
}