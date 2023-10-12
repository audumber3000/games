

import WordGame from "./GameTwo/components/Gametwo";
function App() {
  const globalStyles = `
  body {
    background-color: #6A0DAD;
    margin: 0;
    padding: 0;
  }
`;
  return (
    <div className="App">
     <style>{globalStyles}</style>
<WordGame/>
    </div>
  );
}

export default App;
