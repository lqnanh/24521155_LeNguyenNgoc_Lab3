import { useId, useState } from 'react';

const SMART_PEOPLE = [
  { id: 'sp-1', name: 'Johann Goethe', age: 82, iq: 210 },
  { id: 'sp-2', name: 'Albert Einstein', age: 76, iq: 205 },
  { id: 'sp-3', name: 'Leonardo da Vinci', age: 67, iq: 180 },
  { id: 'sp-4', name: 'Isaac Newton', age: 84, iq: 190 },
  { id: 'sp-5', name: 'James Maxwell', age: 48, iq: 190 },
  { id: 'sp-6', name: 'William Sidis', age: 46, iq: 200 },
];

const DEFAULT_QUERY = '';
const DEFAULT_MIN_IQ = 160;
const DEFAULT_SORT_BY = 'iq';

export default function ScientistDirectory({ initialData = SMART_PEOPLE }) {
  const [people, setPeople] = useState(initialData);
  const [query, setQuery] = useState(DEFAULT_QUERY);
  const [minIq, setMinIq] = useState(DEFAULT_MIN_IQ);
  const [sortBy, setSortBy] = useState(DEFAULT_SORT_BY);

  const searchId = useId();
  const minIqId = useId();
  const sortById = useId();

  const keyword = query.trim().toLowerCase();

  const visible = people
    .filter(
      (person) =>
        person.name.toLowerCase().includes(keyword) && person.iq >= minIq
    )
    .toSorted((a, b) =>
      sortBy === 'iq' ? b.iq - a.iq : a.age - b.age
    );

  function handleDelete(id) {
    setPeople((prev) => prev.filter((person) => person.id !== id));
  }

  function handleReset() {
    setPeople(initialData);
    setQuery(DEFAULT_QUERY);
    setMinIq(DEFAULT_MIN_IQ);
    setSortBy(DEFAULT_SORT_BY);
  }

  function handleMinIqChange(event) {
    const value = event.target.valueAsNumber;
    setMinIq(Number.isNaN(value) ? 0 : value);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section aria-label="Pioneer Directory">
      <form role="search" onSubmit={handleSubmit}>
        <label htmlFor={searchId}>Search by name</label>
        <input
          id={searchId}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
        />

        <label htmlFor={minIqId}>Min IQ</label>
        <input
          id={minIqId}
          type="number"
          value={minIq}
          onChange={handleMinIqChange}
        />

        <label htmlFor={sortById}>Sort by</label>
        <select
          id={sortById}
          value={sortBy}
          onChange={(event) => setSortBy(event.target.value)}
        >
          <option value="iq">IQ (high to low)</option>
          <option value="age">Age (young to old)</option>
        </select>

        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>

      <output role="status" aria-live="polite">
        Found {visible.length} pioneers
      </output>

      {visible.length === 0 ? (
        <p>No pioneers match your filters.</p>
      ) : (
        <ul>
          {visible.map((person) => (
            <li key={person.id}>
              {person.name} - IQ: {person.iq} - Age: {person.age}
              {' '}
              <button type="button" onClick={() => handleDelete(person.id)}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}