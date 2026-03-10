// stílusok
import './App.css'
import { MainContent } from './MainContent'

function App() {
  return (
    <>
    <h1>Üdvözöljük a Royal Delivery admin felületén!</h1>
    <h2>Válassza ki, hogy mit szeretne tenni</h2>
      <ul>
        <li><button> onClick={show} adatbázis adatainak megtekintése, kezelése </button></li>
            <MainContent />
      </ul>
    </>
  )
}

export default App
