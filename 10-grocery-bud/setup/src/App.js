import React, { useState, useEffect } from "react";
import List from "./List";
import Alert from "./Alert";

const getLocalStorage = () => {
  // ユーザーの使っているブラウザにデータを保存する仕組み。ローカルで扱えるデータベースみたいなイメージ。keyとvalueのペアで保存される
  let list = localStorage.getItem("list");
  if (list) {
    return JSON.parse(localStorage.getItem("list"));
  } else {
    return [];
  }
};

function App() {
  const [name, setName] = useState("");
  const [list, setList] = useState(getLocalStorage());
  const [isEditing, setIsEditing] = useState(false);
  const [editID, setEditID] = useState(null);
  const [alert, setAlert] = useState({
    show: false,
    msg: "",
    type: "",
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name) {
      // もしnameが空だったら
      // display alert
      // setAlert({ show: true, msg: "please enter value", type: "danger" });
      showAlert(true, "danger", "please enter value");
    } else if (name && isEditing) {
      // deal with edit
      setList(
        list.map((item) => {
          if (item.id === editID) {
            // 編集中のオブジェクトであればタイトルを現在のnameのStateに変更する
            return { ...item, title: name };
          }
          return item;
        })
      );
      setName("");
      setEditID(null);
      setIsEditing(false);
      setAlert(true, "success", "value changed");
    } else {
      // show alert
      showAlert(true, "success", "item added to the list");
      const newItem = { id: new Date().getTime().toString(), title: name };
      setList([...list, newItem]);
      setName("");
    }
  };

  const showAlert = (show = false, type = "", msg = "") => {
    // ( )内はデフォルトの値であり、引数に何も渡されない場合、このデフォルトの値をsetAlertの引数にする
    setAlert({ show, type, msg });
  };

  const clearList = () => {
    showAlert(true, "danger", "empty list");
    setList([]);
  };

  const removeItem = (id) => {
    showAlert(true, "danger", "item removed");
    setList(list.filter((item) => item.id !== id)); // 配列「list」に入っている一つ一つの値がitemでその一つ一つのitem.idと引数として渡されたidが一致しなかった場合(listに存在していなかった場合)setListメソッドで配列「list」に追加する
  };

  const editItem = (id) => {
    const specificItem = list.find((item) => item.id === id);
    setIsEditing(true);
    setEditID(id);
    setName(specificItem.title);
  };

  useEffect(() => {
    localStorage.setItem("list", JSON.stringify(list)); // submitでitemが追加された状態のlistの中身をStringとして取得してくる。そしてそれを「list」というkeyにつけて保存する
  }, [list]);

  return (
    <section className="section-center">
      <div className="grocery-container">
        <form className="grocery-form" onSubmit={handleSubmit}>
          {alert.show && (
            <Alert {...alert} removeAlert={showAlert} list={list} />
          )}
          <h3>grocery bud</h3>
          <div className="form-control">
            <input
              type="text"
              className="grocery"
              placeholder="e.g. eggs"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
            <button className="submit-btn" type="submit">
              {isEditing ? "edit" : "submit"}
            </button>
          </div>
        </form>
        {list.length > 0 && (
          <div className="gorcery-container">
            <List items={list} removeItem={removeItem} editItem={editItem} />
            <button className="clear-btn" onClick={clearList}>
              clear items
            </button>
          </div>
        )}
      </div>
    </section>
  );
}

export default App;
