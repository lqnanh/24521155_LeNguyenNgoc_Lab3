import { Fragment, useId } from 'react';
//import styles from './DeveloperCard.module.css';
import SkillBadge from './SkillBadge';

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

  return (
    <article aria-labelledby={titleId}>
      <header>
        <img
          src={avatarUrl}
          alt={`Ảnh đại diện của ${fullName}`}
          width="64"
          height="64"
        />
        <hgroup>
          <h2 id={titleId}>{fullName}</h2>
          <p>{role}</p>
        </hgroup>
      </header>

      <dl>
        {Object.entries(metrics).map(([label, value]) => (
          <Fragment key={label}>
            <dt>{label}</dt>
            <dd>{value}</dd>
          </Fragment>
        ))}
      </dl>

      <ul aria-label="Engineered Skills">
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