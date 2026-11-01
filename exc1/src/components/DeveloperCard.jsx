import { Fragment, useId, useState } from 'react';
import styles from './DeveloperCard.module.css';
import SkillBadge from './SkillBadge';

function getInitials(fullName) {
  const words = fullName.trim().split(/\s+/).filter(Boolean);
  if (words.length === 0) return '';
  const first = words[0][0];
  const last = words.length > 1 ? words[words.length - 1][0] : '';
  return (first + last).toUpperCase();
}

function DeveloperCard({
  fullName = 'Le Nguyen Ngoc',
  role = 'Sinh viên UIT ',
  avatarUrl = 'https://http.cat/images/200.jpg',
  metrics = { projects: 5, commits: 120, labs: 3 },
  skills = [
    { id: 'sk-1', name: 'React', level: 'Core' },
    { id: 'sk-2', name: 'CSS', level: 'Core' },
  ],
}) {
  const titleId = useId();
  const [imgFailed, setImgFailed] = useState(false);

  return (
    <article className={styles.card} aria-labelledby={titleId}>
      <header className={styles.header}>
        {imgFailed ? (
          <span className={styles.initials} aria-hidden="true">
            {getInitials(fullName)}
          </span>
        ) : (
          <img
            src={avatarUrl}
            alt={`Ảnh đại diện của ${fullName}`}
            width="64"
            height="64"
            onError={() => setImgFailed(true)}
          />
        )}
        <hgroup>
          <h2 id={titleId}>{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <dl className={styles.metrics}>
        {Object.entries(metrics).map(([label, value]) => (
          <Fragment key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
      </dl>

      <ul className={styles.skills} aria-label="Engineered Skills">
        {skills.map((skill) => (
          <SkillBadge
            key={skill.id}
            id={skill.id}
            name={skill.name}
            level={skill.level}
          />
        ))}
      </ul>
    </article>
  );
}

export default DeveloperCard;