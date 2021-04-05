import Calendar from './components/calendar/Calendar'
import './App.css';

function App() {
  return (
    <div>
     <Calendar height={400} width={600} transitionTime={0.5}/>
    </div>
  );
}

export default App;
