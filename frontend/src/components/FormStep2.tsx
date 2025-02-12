import React, { useState } from 'react';
import { TextField, Container, Button, Typography, Select, MenuItem, FormHelperText, FormControl } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface FormStep2Props {
  category: string;
  step1Data: { name: string; description: string; location: string };
}

const FormStep2: React.FC<FormStep2Props> = ({ category, step1Data }) => {
  const [area, setArea] = useState<string>('');
  const [rooms, setRooms] = useState<string>('');
  const [price, setPrice] = useState<string>('');
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [model, setModel] = useState<string>('');
  const [year, setYear] = useState<string>('');
  const [mileage, setMileage] = useState<string>('');
  const [experience, setExperience] = useState<string>('');
  const [cost, setCost] = useState<string>('');
  const [schedule, setSchedule] = useState<string>('');

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const navigate = useNavigate();

  const handleSubmit = async () => {
    const formErrors: { [key: string]: string } = {};
    if (category === 'Недвижимость') {
      if (!area) formErrors.area = 'Заполните поле';
      if (!rooms) formErrors.rooms = 'Заполните поле';
      if (!price) formErrors.price = 'Заполните поле';
    }
    if (category === 'Авто') {
      if (!model) formErrors.model = 'Заполните поле';
      if (!year) formErrors.year = 'Заполните поле';
    }
    if (category === 'Услуги') {
      if (!experience) formErrors.experience = 'Заполните поле';
      if (!cost) formErrors.cost = 'Заполните поле';
    }

    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    const dataToSend = {
      ...step1Data,
      type: category,
      ...(category === 'Недвижимость' && {
        propertyType: selectedValue,
        area: parseInt(area),
        rooms: parseInt(rooms),
        price: parseInt(price),
      }),
      ...(category === 'Авто' && {
        brand: selectedValue,
        model,
        year: parseInt(year),
        mileage: parseInt(mileage),
      }),
      ...(category === 'Услуги' && {
        serviceType: selectedValue,
        experience: parseInt(experience),
        cost: parseInt(cost),
        workSchedule: schedule,
      }),
    };

    try {
        const response = await fetch('http://localhost:3000/items', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(dataToSend),
        });
    
        if (response.ok) {
          const result = await response.json();
          console.log('Данные успешно отправлены:', result);
          navigate('/list');
        } else {
          console.error('Ошибка при отправке данных:', response.statusText);
        }
      } catch (error) {
        console.error('Ошибка:', error);
      }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant="h4">Форма для {category}</Typography>

      {category === 'Недвижимость' && (
        <>
          <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              required
            >
              <MenuItem value="Квартира">Квартира</MenuItem>
              <MenuItem value="Дом">Дом</MenuItem>
              <MenuItem value="Коттедж">Коттедж</MenuItem>
            </Select>
            {errors.selectedValue && <FormHelperText error>{errors.selectedValue}</FormHelperText>}
          </FormControl>

          <TextField
            label="Площадь"
            type="number"
            value={area}
            onChange={(e) => setArea(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '20px' }}
            error={!!errors.area}
            helperText={errors.area}
          />
          <TextField
            label="Количество комнат"
            type="number"
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '20px' }}
            error={!!errors.rooms}
            helperText={errors.rooms}
          />
          <TextField
            label="Цена"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '20px' }}
            error={!!errors.price}
            helperText={errors.price}
          />
        </>
      )}

      {category === 'Авто' && (
        <>
          <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              required
            >
              <MenuItem value="Honda">Honda</MenuItem>
              <MenuItem value="Toyota">Toyota</MenuItem>
              <MenuItem value="Audi">Audi</MenuItem>
            </Select>
            {errors.selectedValue && <FormHelperText error>{errors.selectedValue}</FormHelperText>}
          </FormControl>

          <TextField
            label="Модель"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '20px' }}
            error={!!errors.model}
            helperText={errors.model}
          />
          <TextField
            label="Год выпуска"
            type="number"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '20px' }}
            error={!!errors.year}
            helperText={errors.year}
          />
          <TextField
            label="Пробег"
            type="number"
            value={mileage}
            onChange={(e) => setMileage(e.target.value)}
            fullWidth
            sx={{ marginBottom: '20px' }}
          />
        </>
      )}

      {category === 'Услуги' && (
        <>
          <FormControl fullWidth sx={{ marginBottom: '20px' }}>
            <Select
              labelId="demo-simple-select-standard-label"
              id="demo-simple-select-standard"
              value={selectedValue}
              onChange={(e) => setSelectedValue(e.target.value)}
              required
            >
              <MenuItem value="Ремонт">Ремонт</MenuItem>
              <MenuItem value="Уборка">Уборка</MenuItem>
              <MenuItem value="Доставка">Доставка</MenuItem>
            </Select>
            {errors.selectedValue && <FormHelperText error>{errors.selectedValue}</FormHelperText>}
          </FormControl>

          <TextField
            label="Опыт работы"
            type="number"
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '20px' }}
            error={!!errors.experience}
            helperText={errors.experience}
          />
          <TextField
            label="Стоимость"
            type="number"
            value={cost}
            onChange={(e) => setCost(e.target.value)}
            required
            fullWidth
            sx={{ marginBottom: '20px' }}
            error={!!errors.cost}
            helperText={errors.cost}
          />
          <TextField
            label="График работы"
            value={schedule}
            onChange={(e) => setSchedule(e.target.value)}
            fullWidth
            sx={{ marginBottom: '20px' }}
          />
        </>
      )}

      <Button variant="contained" onClick={handleSubmit} sx={{ ml: 'auto' }}>
        Отправить
      </Button>
    </Container>
  );
};

export default FormStep2;