import './App.css';
import {useState} from "react";
import translate from './APIs/Translate';
import history from './APIs/History';
import {Table} from 'antd';

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

const columns = [
  {
    title: "Source",
    dataIndex:"source",
    key: "source"
  },
  {
    title: "Translation",
    dataIndex:"translation",
    key: "translation"
  },
  {
    title: "Sentiment",
    dataIndex:"sentiment",
    key: "sentiment"
  }
]


function App() {

  const[text, setText] = useState("")
  const[source, setSource] = useState("en")
  const[target, setTarget] = useState("en")
  const[translation, setTranslation] = useState("")
  const[showHistory, setShowHistory] = useState(false)
  const[historyItems, setHistoryItems] = useState([])

  function handleChange(event) {
    const {value} = event.target
    setText(value)
  }

  function handleTranslate() {
    translate(text, source, target).then(res => {
      console.log(res)
      setTranslation(res.translated_text)
    })
  }

  function handleHistory() {
    if (showHistory) {
      setShowHistory(false)
    } else {
      setShowHistory(true)
      history().then(res => {
        console.log(res.Items)
        setHistoryItems(res.Items)
      })
    }
    
  }

  return (
    <div className="App">
      <header className="App-header">
       <div style={{height: "350px"}}>
        <div className = "translate-boxes" >
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
       <div>
       <button type = "primary" onClick={handleHistory}>{showHistory ? "Hide History" : "Show History"}</button>

       {showHistory && <Table dataSource={historyItems} columns= {columns}/>}
       

       </div>
      </header>
    </div>
  );
}

export default App;
