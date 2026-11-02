// src/components/ScientistDirectory.jsx

import { useState } from 'react';

const SMART_PEOPLE = [
  { id: 'sp-1', name: 'Johann Goethe', age: 82, iq: 210 },
  { id: 'sp-2', name: 'Albert Einstein', age: 76, iq: 205 },
  { id: 'sp-3', name: 'Leonardo da Vinci', age: 67, iq: 180 },
  { id: 'sp-4', name: 'Isaac Newton', age: 84, iq: 190 },
  { id: 'sp-5', name: 'James Maxwell', age: 48, iq: 190 },
  { id: 'sp-6', name: 'William Sidis', age: 46, iq: 200 },
];

export default function ScientistDirectory({ initialData = SMART_PEOPLE }) {
  const [people, setPeople] = useState(initialData);

  function handleDelete(id) {
    setPeople((prev) => prev.filter((person) => person.id !== id));
  }

  function handleReset() {
    setPeople(initialData);
  }

  function handleSubmit(event) {
    event.preventDefault();
  }

  return (
    <section>
      <form role="search" onSubmit={handleSubmit}>
        <button type="button" onClick={handleReset}>
          Reset
        </button>
      </form>
      <output role="status" aria-live="polite">
        Found {people.length} pioneers
      </output>
      <ul>
        {people.map((person) => (
          <li key={person.id}>
            {person.name} - IQ: {person.iq}{' '}
            <button type="button" onClick={() => handleDelete(person.id)}>
              Delete
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}