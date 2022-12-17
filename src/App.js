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
  const[sentiment, setSentiment] = useState("")
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
      setSentiment(res.sentiment_analysis)
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
          <div className = "test">
          <select style={{ position:"absolute"}} value={source} onChange = { (event) => {setSource(event.target.value)}} >
            {supportedLangs.map((item) => {
             return <option value={item.code}> {item.language}</option>
            })} 
          </select>
          <textarea style={{resize: "none", width:"60%", height:"50%", marginTop:"20px"}} placeholder = "Text to Translate" value={text} onChange={handleChange}> </textarea>
          </div>
          <div style={{marginTop:"4%"}}>
          <button type = "primary" onClick={handleTranslate}>Translate</button>
          </div>
          <div className = "test">
          <select style={{ position:"absolute"}} value={target} onChange = { (event) => {setTarget(event.target.value)}} >
            {supportedLangs.map((item) => {
            return <option value={item.code}> {item.language}</option>
            })} 
          </select>

          <p style={{position : "absolute", top:"-17px", right: "300px"}}>{sentiment && "Sentiment: " + sentiment}</p>
          <textarea style={{resize: "none", width:"60%", height:"50%", marginTop: "20px"}} placeholder = "Translation" value = {translation} > </textarea>
          </div>
          
        </div>
       </div>
       <div>
        <div style={{marginTop: "100px"}}>
        <button type = "primary" onClick={handleHistory}>{showHistory ? "Hide History" : "Show History"}</button>
        {showHistory && <Table dataSource={historyItems} columns= {columns}/>}

        </div>


       </div>
      </header>
    </div>
  );
}

export default App;
