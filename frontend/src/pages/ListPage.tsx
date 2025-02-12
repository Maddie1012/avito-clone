import { useState, useEffect } from "react";

interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;
}

export default function ListPage() {
  const [items, setItems] = useState<Item[]>([]); // указываем тип для массива

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then(response => response.json())
      .then(data => {
        console.log("Полученные данные:", data);
        setItems(data); 
      })
      .catch((error) => console.log("Ошибка:", error));
  }, []);

  return (
    <>
      <div>
        <h1>Список объявлений</h1>
      </div>
      <div>
        <ul>
          {items.map(item => (
            <li key={item.id}>
              <h2>{item.name}</h2>
              <p>{item.description}</p>
              <p>{item.location}</p>
              <p>{item.type}</p>
              <p>2</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}
