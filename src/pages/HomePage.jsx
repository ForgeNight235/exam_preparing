import React, { useEffect, useState } from 'react';
import {NavLink} from "react-router-dom";
// import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';

import { styled } from '@mui/material/styles';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import ButtonBase from '@mui/material/ButtonBase';

import {priceFormatter} from "../components/priceFormatter.js";
import {truncateText} from "../components/truncateText.js";
import {Container} from "@mui/material";
import "../App.scss";


const HomePage = () => {
  // Стейт массива услуг
  const [items, setItems] = useState([]);

  const [initialItems, setInitialItems] = useState([]);

  // Стейт запроса для поиска по имени услуги
  const [query, setQuery] = useState("");

  // новый массив услуг, по которому будет идти поиск
  const foundItems = items.filter((item) =>
    item.name.toLowerCase().includes(query.toLowerCase())
  );


  // Функция записывает в запрос то, что вводится в инпут поиска
  const onChangeQuery = (e) => {
    setQuery(e.target.value);
  };


  const sortByPriceIncrease = () => {
    // Копируем массив товаров
    const sortedItems = [...items];
    // Сортируем товары по возрастанию цены
    sortedItems.sort((a, b) => a.price > b.price ? 1 : -1);
    // Обновляем состояние, чтобы перерендерить компонент со вновь отсортированными товарами
    setItems(sortedItems);
  };

  const sortByPriceDecrease = () => {
    // Копируем массив товаров
    const sortedItems = [...items];
    // Сортируем товары по возрастанию цены
    sortedItems.sort((a, b) => a.price < b.price ? 1 : -1);
    // Обновляем состояние, чтобы перерендерить компонент со вновь отсортированными товарами
    setItems(sortedItems);
  };

  const resetSort = () => {
    setItems(initialItems);
  }

  // Хранение данных в форме
  // По умолчанию пустые строки и первая услуга
  const [form, setForm] = useState({
    email: "",
    fullname: "",
    message: "",
    service_id: 1, // must take id from onChangeSelect fn
  });

  // Обработчик формы
  const onChangeForm = (event) => {
    setForm((prevState) => {
      // Создание копии массива данных из формы
      prevState = { ...prevState };

      // Ссылается на поле (input) и записываем новое значение
      prevState[event.target.name] = event.target.value.trim();

      // Возвращает новый данные в объект
      return prevState;
    });
  };

  // Выборка из категории (select)
  const onChangeSelect = (event) => {
    setForm((prevState) => {
      // Создание копии массива данных из формы
      prevState = { ...prevState };

      // Ссылается на поле (input) и записываем новое значение из массива select
      prevState[event.target.name] =
        event.target.options[event.target.selectedIndex].value;

      // Возвращает новый данные в объект
      return prevState;
    });
  };

  // Отправка заявки (POST)
  const send = (event) => {
    // Отмена перезагрузки страницы после отправки
    event.preventDefault();

    fetch("https://exam.avavion.ru/api/requests/create", {
      method: "POST",
      body: JSON.stringify(form),
      headers: {
        "Content-Type": "application/json", // Отправление в формате json
        Accept: "application/json", // Получение в json
      },
    })
      .then((r) => r.json())
      .then((data) => console.log(data));
  };


  const Img = styled('img')({
    margin: 'auto',
    display: 'block',
    maxWidth: '100%',
    maxHeight: '100%',
  });

  // Получение предметов с API через fetch (GET)
  useEffect(() => {
    fetch("https://exam.avavion.ru/api/services")
        .then((response) => response.json()) // преобразование в json формат для чтения
        .then((data) => {
          setItems(data.data) // запись в основной массив
          setInitialItems(data.data) // запись в копию массива для сброса
        }); // запись в массив всех предметов
  }, []);

  return (
    <Container maxWidth="sm">
      <div>
        <form>
          <input
            onChange={(e) => onChangeForm(e)}
            type="email"
            name="email"
            placeholder="E-mail"
          />
          <input
            onChange={(e) => onChangeForm(e)}
            type="text"
            name="full_name"
            placeholder="Your fullname"
          />
          <textarea
            onChange={(e) => onChangeForm(e)}
            name="message"
            placeholder="enter a message"
          ></textarea>

          <select 
            onChange={onChangeSelect.bind(this)}
            name="service_id"
          >
            {items.map((item) => {
              return (
                <option key={item.id} value={item.id}>
                  {item.name}
                </option>
              );
            })}
            
          </select>

          <button onClick={(e) => send(e)}>Send</button>
        </form>
      </div>

      <input
        type="text"
        placeholder="search"
        value={query}
        // если в инпут вводится запрос, идет поиск
        onChange={onChangeQuery.bind(this)}
      />

      {/*<button onClick={sortByPriceIncrease}>По возрастанию</button>*/}
      {/*<button onClick={sortByPriceDecrease}>По возрастанию</button>*/}
      {/*<button onClick={resetSort}>По возрастанию</button>*/}

      {/*ИСпользован Select с Material UI*/}
      <Box sx={{ minWidth: 120 }}>
        <FormControl fullWidth>
          <InputLabel id="demo-simple-select-label"
            sx={{
              color: '#B2B7BC'
          }}>
            Сортировка по цене
          </InputLabel>
          <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              label="Сортировка"
              onChange={onChangeSelect.bind(this)}
          >
            <MenuItem onClick={sortByPriceIncrease}>По возрастанию</MenuItem>
            <MenuItem onClick={sortByPriceDecrease}>По убыванию</MenuItem>
            <MenuItem onClick={resetSort}>Сбросить</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {/* Вывод предметов из useState массива */}
      {/* Перебор через метод map */}
      {/* Итерируем по одному item */}







      <div className="items">
        {/* Если по запросу находится услуга, то выводится она */}
        {foundItems.length ? foundItems.map((item) => {
          return (

              <Paper

                  sx={{
                    p: 2,
                    margin: 'auto',
                    maxWidth: 500,
                    flexGrow: 1,
                    backgroundColor: (theme) =>
                        theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
                  }}
                  key={item.id}
              >
                <Grid container spacing={2} >
                  <Grid  >
                    <ButtonBase sx={{ width: 128, height: 128 }}>
                      <Img
                          src={item.image_url}
                          alt={item.name}
                          title={item.name}
                      />
                    </ButtonBase>
                  </Grid>
                  <Grid

                      className="service_card"
                      item xs={12}
                      sm container>
                    <Grid item xs container direction="column" spacing={2}>
                      <Grid item xs>
                        <Typography gutterBottom variant="subtitle1" component="div">
                          {item.name}
                        </Typography>
                        <Typography variant="body2" gutterBottom>
                          {truncateText(item.content)}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          ID: {item.id}
                        </Typography>
                      </Grid>

                      <Grid item>
                        <Typography sx={{ cursor: 'pointer' }} variant="body2">
                          <NavLink to={`/articles/${item.id}`}>Перейти</NavLink>
                        </Typography>
                      </Grid>
                    </Grid>

                    <Grid item>
                      <Typography variant="subtitle1" component="div" sx={{display: 'grid' }}>
                        {item.dicsount_percent > 0 ? (
                            <span className="price">
                              <span style={{ textDecoration: 'line-through' }}>
                                {priceFormatter(item.price)}
                              </span>{' '}
                                {priceFormatter(
                                    item.price - (item.price * item.dicsount_percent) / 100
                                )}
                            </span>
                        ) : (
                            priceFormatter(item.price)
                        )}
                      </Typography>
                    </Grid>

                  </Grid>
                </Grid>
              </Paper>

              // <div key={item.id} className="item">
              //   <img src={item.image_url} alt={item.name} />
              //   <h2>{item.name}</h2>
              //   <p>{item.content}</p>
              //   <span>Цена {priceFormatter(item.price)}</span>
              //   <NavLink to={`/articles/${item.id}`}>Перейти</NavLink>
              // </div>
          ); // если не найдена, вывод сообщения
        }) : <h3>По запросу "{query}" ничего не найдено</h3>}
      </div>
    </Container>
  );
};

export default HomePage;


