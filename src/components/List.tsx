import { ReactElement, useState } from "react";

type ListProps = {
  initialItens: string[]
}







function List({initialItens}: ListProps) {
  const [value, setValue] = useState("");
  const [list, setList] = useState(initialItens);

  function addToList() {
    setTimeout(() => {
      setList((list) => [...list, value]);
    }, 500);
  }

  function removeFromList(item: string) {
    setTimeout(() => {
      setList((list) => list.filter((e) => e !== item));
    }, 500);
  }

  return (
    <div>
      <input
        type="text"
        onChange={(e) => setValue(e.target.value)}
        placeholder="type something"
      />
      <button onClick={addToList}>adicionar</button>
      <ul>
        {list.map((e, y) => (
          <li key={y}>
            {e} <button onClick={() => removeFromList(e)}>remove</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default List;
