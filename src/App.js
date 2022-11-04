import React, {useState} from 'react';
import { Popconfirm } from 'antd';
import "./app.css"

function App() {
  const [result, setResult] = useState("waiting");
  return (
    <div style={{ textAlign: 'center' }}>
      <div>
        <Popconfirm title="Confirm First" onConfirm={() => setResult("Wrong!")}>
          <a href="#">First</a>
        </Popconfirm>
      </div>
      <div>
        <Popconfirm title="Confirm Second" onConfirm={() => setResult("Right!")}>
          <a href="#">Second</a>
        </Popconfirm>
      </div>
      <span>{result}</span>
    </div>
  );
}

export default App;
