import './App.css';
import parthenonSitting from './assets/parthenon_sitting.jpg';

function App() {
  return (
    <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh' }}>
      <img src={parthenonSitting} alt="Parthenon Sitting" style={{ maxWidth: '90vw', maxHeight: '80vh', borderRadius: '12px' }} />
    </div>
  );
}

export default App;
