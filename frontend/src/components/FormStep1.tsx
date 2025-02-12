  import React, { useState } from 'react';
  import { TextField, Button, Container, Typography, Input, Select, MenuItem, InputLabel, SelectChangeEvent } from "@mui/material";

  interface FormStep1Props {
    onNext: (category: string) => void;
  }

  const FormStep1: React.FC<FormStep1Props> = ({onNext}) => {
    const [selectedValue, setSelectedValue] = useState<string>('');

    //событие изменения значения категории в value
    const handleChange = (event: SelectChangeEvent<string>) => {
      setSelectedValue(event.target.value);
    }

    const handleNext = () => {
      onNext(selectedValue);
    }

    return (
      <Container maxWidth="sm">
        <Typography 
          variant='h4' 
          gutterBottom>
            Размещение объявления
        </Typography>
        <TextField 
          label="Название" 
          fullWidth
          required 
          sx={{ marginBottom: '20px' }} />
        <TextField 
          label="Описание" 
          multiline 
          fullWidth
          required 
          rows={4} 
          sx={{ marginBottom: '20px' }} />
        <TextField 
          label="Локация" 
          fullWidth
          required 
          rows={4} 
          sx={{ marginBottom: '20px' }} />
        <Input 
          type='file' 
          fullWidth 
          sx={{ marginBottom: '20px' }} />
        <InputLabel>Выберите категорию</InputLabel>

        <Container 
          maxWidth="sm" 
          sx={{
            display: 'flex', 
            justifyContent: 'space-between', 
            paddingLeft: '0 !important', 
            paddingRight: '0 !important'}}>
          <Select 
            labelId="demo-simple-select-standard-label" 
            id="demo-simple-select-standard" 
            onChange={handleChange} 
            value={selectedValue}
            required
            sx={{width: '200px'}}>
            <MenuItem value="Недвижимость">Недвижимость</MenuItem>
            <MenuItem value="Авто">Авто</MenuItem>
            <MenuItem value="Услуги">Услуги</MenuItem>
          </Select>
          <Button 
            variant='contained' 
            // disabled
            onClick={handleNext}
            sx={{ml: 'auto'}}>
            Далее
          </Button>
        </Container>
      </Container>
    );
  };

  export default FormStep1;
