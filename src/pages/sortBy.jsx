import React, { useState, useEffect } from 'react';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import Paper from '@mui/material/Paper';

const API_URL = 'https://fakestoreapi.com/products';

const App = () => {
    const [items, setItems] = useState([]);
    const [percentages, setPercentages] = useState([]);
    const [selectedPercentages, setSelectedPercentages] = useState([]);

    useEffect(() => {
        fetch(API_URL)
            .then(response => response.json())
            .then(data => {
                // Получаем список уникальных процентов
                const uniquePercentages = [...new Set(data.map(item => item.rating.rate))];
                setPercentages(uniquePercentages);
                setItems(data);
            })
            .catch(error => console.error(error))
    }, []);

    // Обработка выбора процентов
    const handlePercentageChange = (event) => {
        const selectedPercentage = event.target.value;
        if (selectedPercentages.includes(selectedPercentage)) {
            setSelectedPercentages(selectedPercentages.filter(percentage => percentage !== selectedPercentage));
        } else {
            setSelectedPercentages([...selectedPercentages, selectedPercentage]);
        }
    }

    // Фильтрация товаров по выбранным процентам
    const filteredItems = items.filter(item => selectedPercentages.includes(item.rating.rate));

    return (
        <div>
            <h2>Выберите проценты:</h2>
            <Select
                multiple
                value={selectedPercentages}
                onChange={handlePercentageChange}
            >
                {percentages.map(percentage => (
                    <MenuItem key={percentage} value={percentage}>
                        {percentage}%
                    </MenuItem>
                ))}
            </Select>
            <h2>Список товаров:</h2>
            {filteredItems.length ?
                filteredItems.map(item => (
                    <Paper key={item.id} sx={{ p: 2, my: 1 }}>
                        <h3>{item.title}</h3>
                        <p>{item.description}</p>
                    </Paper>
                ))
                :
                <p>Товары не найдены</p>
            }
        </div>
    );
}


export default App;