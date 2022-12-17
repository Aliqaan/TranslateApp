import logo from './logo.svg';
import './App.css';
import {useState} from "react"
import translate from './APIs/Translate';

const supportedLangs = [
  {
    code: "en",
    language: "English"
  },
  {
    code: "de",
    language: "German"
  },
  {
    code: "es",
    language: "Spanish"
  },
  {
    code: "it",
    language: "Italian"
  },
  {
    code: "pt",
    language: "Portuguese"
  },
  {
    code: "fr",
    language: "French"
  }
]

function App() {

  const[text, setText] = useState("")
  const[source, setSource] = useState("en")
  const[target, setTarget] = useState("en")
  const[translation, setTranslation] = useState("")

  function handleChange(event) {
    const {value} = event.target
    setText(value)
  }

  function handleTranslate() {
    console.log(text)
    console.log(source)
    console.log(target)
    translate(text, source, target).then(res => {
      console.log(res)
      setTranslation(res.translated_text)
    })
  }

  return (
    <div className="App">
      <header className="App-header">
       <div style={{height: "300px"}}>
        <div className = "test" >
          <select value={source} onChange = { (event) => {setSource(event.target.value)}} >
            {supportedLangs.map((item) => {
             return <option value={item.code}> {item.language}</option>
            })} 
          </select>

          <textarea style={{resize: "none", width:"20%", height:"40%"}} placeholder = "Text to Translate" value={text} onChange={handleChange}> </textarea>
          <button type = "primary" onClick={handleTranslate}>Translate</button>
          <textarea style={{resize: "none", width:"20%", height:"40%"}} placeholder = "Translation" value = {translation} > </textarea>

          <select value={target} onChange = { (event) => {setTarget(event.target.value)}} >
            {supportedLangs.map((item) => {
             return <option value={item.code}> {item.language}</option>
            })} 
          </select>
        </div>


       </div>
      </header>
    </div>
  );
}

export default App;
