import DrumMachine from './DrumMachine/DrumMachine.jsx';
import styles from './App.module.css';

function App() {
  return (
    <main className={styles.app}>
      <header className={styles.header}>
        <h1 className={styles.title}>Studio Drum Kit</h1>
      </header>
      <DrumMachine />
    </main>
  );
}

export default App;