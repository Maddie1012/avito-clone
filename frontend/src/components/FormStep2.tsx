import React from 'react';
import { TextField, Container, Button, Typography, Select, MenuItem } from '@mui/material';

interface FormStep2Props {
    category: string;
}

const FormStep2: React.FC<FormStep2Props> = ({category}) => {
  return(
    <Container maxWidth="sm">
        <Typography variant='h4'>Форма для {category}</Typography>
        {category === 'Недвижимость' && (
            <>
                <Select 
                    labelId="demo-simple-select-standard-label" 
                    id="demo-simple-select-standard"
                    required
                    sx={{marginBottom: '20px', width: '100%'}} >
                    
                    <MenuItem value="Квартира">Квартира</MenuItem>
                    <MenuItem value="Дом">Дом</MenuItem>
                    <MenuItem value="Коттедж">Коттедж</MenuItem>
                </Select>
                <TextField label="Площадь" type='number' required fullWidth sx={{marginBottom: '20px'}}/>
                <TextField label="Количество комнат" type='number' required fullWidth sx={{marginBottom: '20px'}}/>
                <TextField label="Цена" type='number' required fullWidth sx={{marginBottom: '20px'}}/>
            </>
        )}
        {category === 'Авто' && (
            <>
                <Select 
                    labelId="demo-simple-select-standard-label" 
                    id="demo-simple-select-standard"
                    required
                    sx={{marginBottom: '20px', width: '100%'}} >
                    
                    <MenuItem value="Honda">Honda</MenuItem>
                    <MenuItem value="Toyota">Toyota</MenuItem>
                    <MenuItem value="Audi">Audi</MenuItem>
                </Select>
                <TextField label="Модель" required fullWidth sx={{marginBottom: '20px'}}/>
                <TextField label="Год выпуска" type='number' required fullWidth sx={{marginBottom: '20px'}}/>
                <TextField label="Пробег" type='number' fullWidth sx={{marginBottom: '20px'}}/>
            </>
        )}
        {category === 'Услуги' && (
            <>
                <Select 
                    labelId="demo-simple-select-standard-label" 
                    id="demo-simple-select-standard"
                    required
                    sx={{marginBottom: '20px', width: '100%'}} >
                    
                    <MenuItem value="Ремонт">Ремонт</MenuItem>
                    <MenuItem value="Уборка">Уборка</MenuItem>
                    <MenuItem value="Доставка">Доставка</MenuItem>
                </Select>
                <TextField label="Опыт работы" type='number' required fullWidth sx={{marginBottom: '20px'}}/>
                <TextField label="Стоимость" type='number' required fullWidth sx={{marginBottom: '20px'}}/>
                <TextField label="График работы" fullWidth sx={{marginBottom: '20px'}}/>
            </>
        )}
        <Button variant='contained' sx={{ml: '78%'}}>
            Отправить
        </Button>
    </Container>
  )
};

export default FormStep2;
