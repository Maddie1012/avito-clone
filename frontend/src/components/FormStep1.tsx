import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Input, InputLabel, Select, MenuItem, SelectChangeEvent } from "@mui/material";

interface FormStep1Props {
  onNext: (category: string, data: { name: string; description: string; location: string; image?: string }) => void;
}

const FormStep1: React.FC<FormStep1Props> = ({ onNext }) => {
  const [selectedValue, setSelectedValue] = useState<string>('');
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [location, setLocation] = useState<string>('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  const handleChange = (event: SelectChangeEvent<string>) => setSelectedValue(event.target.value);

  const handleNext = () => {
    if (!name || !description || !location || !selectedValue) {
      setError('Все поля обязательны');
      return;
    }
    setError('');


    const imageBase64 = image ? URL.createObjectURL(image) : undefined;
    onNext(selectedValue, { name, description, location, image: imageBase64 });
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setImage(event.target.files[0]);
    }
  };

  return (
    <Container maxWidth="sm">
      <Typography variant='h4' gutterBottom>Размещение объявления</Typography>
      <TextField
        label="Название"
        fullWidth
        required
        value={name}
        onChange={(e) => setName(e.target.value)}
        sx={{ marginBottom: '20px' }}
        error={!!error}
      />
      <TextField
        label="Описание"
        multiline
        fullWidth
        required
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        sx={{ marginBottom: '20px' }}
        error={!!error}
      />
      <TextField
        label="Локация"
        fullWidth
        required
        value={location}
        onChange={(e) => setLocation(e.target.value)}
        sx={{ marginBottom: '20px' }}
        error={!!error}
      />
      <Input
        type='file'
        fullWidth
        sx={{ marginBottom: '20px' }}
        onChange={handleImageChange}
        inputProps={{ accept: 'image/*' }}
      />
      <InputLabel>Выберите категорию</InputLabel>
      <Select
        value={selectedValue}
        onChange={handleChange}
        fullWidth
        sx={{ marginBottom: '20px' }}
        error={!!error}
      >
        <MenuItem value="Недвижимость">Недвижимость</MenuItem>
        <MenuItem value="Авто">Авто</MenuItem>
        <MenuItem value="Услуги">Услуги</MenuItem>
      </Select>
      {error && <Typography color="error" sx={{ marginBottom: '20px' }}>{error}</Typography>}
      <Button variant='contained' onClick={handleNext}>Далее</Button>
    </Container>
  );
};

export default FormStep1;