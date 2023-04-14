import React from "react";
import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

const SinglePage = () => {

  // Получение полей одного предмета 
  const params = useParams();
  console.log(params);

  const [item, setItem] = useState({});

  // Получение данных одного предмета с API через fetch (GET)
  useEffect(() => {
    fetch(`https://exam.avavion.ru/api/services/${params.id}`)
      .then((response) => response.json()) // преобразование в json формат для чтения
      .then((data) => setItem(data.data)); // запись в массив всех предметов
  }, []);

  return (
    <>
      <div className="item">
        <img src={item.image_url} alt={item.name} />
        <h2>{item.name}</h2>
        <p>{item.content}</p>
        <NavLink to={`/`}>Назад</NavLink>
      </div>
    </>
  );
};

export default SinglePage;
