import React, { useState } from "react";
import data from "./data";
function App() {
  const [count, setCount] = useState(0);
  const [text, setText] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();
    let amount = parseInt(count) // type="number"はStringで帰ってくるため、parseIntが必要
    if (count <= 0) {
      amount = 1
    }
    if (count > 8) {
      amount = 8
    }
    setText(data.slice(0, amount)); // startは抽出に含む、endは含まない
  };

  return (
    <section className="section-center">
      <h3>tired of boring lerem ipsum</h3>
      <form action="" onSubmit={handleSubmit} className="lorem-form">
        <label htmlFor="amount">paragraphs:</label>
        <input
          type="number"
          name="amount"
          id="amount"
          value={count}
          onChange={(e) => setCount(e.target.value)}
        />
        <button className="btn" type="submit">
          generate
        </button>
      </form>
      <article className="lorem-text">
      {text.map((item, index)=> {
        return <p key={index}>{item}</p>
      })}
      </article>
    </section>
  );
}

export default App;
