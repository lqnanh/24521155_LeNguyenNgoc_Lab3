
function SkillBadge({ id, name = 'Unknown', level = 'Core' }) {
  return (
    <li>
      {name} ({level})
    </li>
  );
}

export default SkillBadge;