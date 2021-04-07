import { useState } from 'react';
import Calendar from './components/calendar/Calendar';
import Display from './components/display/Display';
import './App.css';

function App() {

  const size = 400;

  const [selectedDate, setSelectedDate] = useState(null);

  const selectDate = (date) => {
    setSelectedDate(date);
  }

  return (
    <div className='o-container font-face-joystix u--red'>
     <Calendar size={size} transitionTime={0.7} selectDate={selectDate}/>
     <Display width={size} selectedDate={selectedDate} />
    </div>
  );
}

export default App;
