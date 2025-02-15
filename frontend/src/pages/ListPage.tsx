import { useState, useEffect } from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  Grid,
  Pagination,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  SelectChangeEvent,
} from "@mui/material";
import { Link } from 'react-router-dom';
import placeholderImage from "../assets/Placeholder-1.png";

interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;
  image?: string;
  propertyType?: string;
  area?: number;
  rooms?: number;
  price?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  serviceType?: string;
  experience?: number;
  cost?: number;
  schedule?: string;
}

export default function ListPage() {
  const [items, setItems] = useState<Item[]>([]);
  const [filteredItems, setFilteredItems] = useState<Item[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const [propertyType, setPropertyType] = useState("");
  const [area, setArea] = useState("");
  const [rooms, setRooms] = useState("");
  const [price, setPrice] = useState("");

  const [brand, setBrand] = useState("");
  const [model, setModel] = useState("");
  const [year, setYear] = useState("");
  const [mileage, setMileage] = useState("");

  const [serviceType, setServiceType] = useState("");
  const [experience, setExperience] = useState("");
  const [cost, setCost] = useState("");
  const [schedule, setSchedule] = useState("");

  useEffect(() => {
    fetch("http://localhost:3000/items")
      .then((response) => response.json())
      .then((data) => {
        console.log("Полученные данные:", data);
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => console.log("Ошибка:", error));
  }, []);

  useEffect(() => {
    const filtered = items.filter((item) => {
      const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesType = selectedType ? item.type === selectedType : true;

      let matchesAdditionalFilters = true;

      if (selectedType === "Недвижимость") {
        matchesAdditionalFilters =
          (!propertyType || item.propertyType === propertyType) &&
          (!area || item.area === parseInt(area)) &&
          (!rooms || item.rooms === parseInt(rooms)) &&
          (!price || item.price === parseInt(price));
      } else if (selectedType === "Авто") {
        matchesAdditionalFilters =
          (!brand || item.brand === brand) &&
          (!model || item.model === model) &&
          (!year || item.year === parseInt(year)) &&
          (!mileage || item.mileage === parseInt(mileage));
      } else if (selectedType === "Услуги") {
        matchesAdditionalFilters =
          (!serviceType || item.serviceType === serviceType) &&
          (!experience || item.experience === parseInt(experience)) &&
          (!cost || item.cost === parseInt(cost)) &&
          (!schedule || item.schedule === schedule);
      }

      return matchesSearch && matchesType && matchesAdditionalFilters;
    });

    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedType,
    propertyType,
    area,
    rooms,
    price,
    brand,
    model,
    year,
    mileage,
    serviceType,
    experience,
    cost,
    schedule,
    items,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
  };

  const handlePropertyTypeChange = (event: SelectChangeEvent<string>) => {
    setPropertyType(event.target.value);
  };

  const handleAreaChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setArea(event.target.value);
  };

  const handleRoomsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setRooms(event.target.value);
  };

  const handlePriceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(event.target.value);
  };

  const handleBrandChange = (event: SelectChangeEvent<string>) => {
    setBrand(event.target.value);
  };

  const handleModelChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setModel(event.target.value);
  };

  const handleYearChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setYear(event.target.value);
  };

  const handleMileageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMileage(event.target.value);
  };

  const handleServiceTypeChange = (event: SelectChangeEvent<string>) => {
    setServiceType(event.target.value);
  };

  const handleExperienceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setExperience(event.target.value);
  };

  const handleCostChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setCost(event.target.value);
  };

  const handleScheduleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSchedule(event.target.value);
  };

  const uniqueTypes = Array.from(new Set(items.map((item) => item.type)));

  return (
    <Container maxWidth="sm">
      <Typography variant="h4" gutterBottom>
        Список объявлений
      </Typography>
      <Button
        component={Link}
        to="/form"
        variant="contained"
        color="primary"
        sx={{ marginTop: 3, marginBottom: 3 }}
      >
        Разместить объявление
      </Button>
      <TextField
        label="Поиск по названию"
        variant="outlined"
        fullWidth
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        sx={{ marginBottom: 3 }}
      />

      <FormControl fullWidth sx={{ marginBottom: 3 }}>
        <InputLabel id="type-select-label">Категория</InputLabel>
        <Select
          labelId="type-select-label"
          id="type-select"
          value={selectedType}
          label="Категория"
          onChange={handleTypeChange}
        >
          <MenuItem value="">Все категории</MenuItem>
          {uniqueTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {selectedType === "Недвижимость" && (
        <>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel id="property-type-label">Тип недвижимости</InputLabel>
            <Select
              labelId="property-type-label"
              id="property-type"
              value={propertyType}
              label="Тип недвижимости"
              onChange={handlePropertyTypeChange}
            >
              <MenuItem value="Квартира">Квартира</MenuItem>
              <MenuItem value="Дом">Дом</MenuItem>
              <MenuItem value="Коттедж">Коттедж</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Площадь (кв. м)"
            type="number"
            fullWidth
            value={area}
            onChange={handleAreaChange}
            sx={{ marginBottom: 3 }}
          />

          <TextField
            label="Количество комнат"
            type="number"
            fullWidth
            value={rooms}
            onChange={handleRoomsChange}
            sx={{ marginBottom: 3 }}
          />

          <TextField
            label="Цена"
            type="number"
            fullWidth
            value={price}
            onChange={handlePriceChange}
            sx={{ marginBottom: 3 }}
          />
        </>
      )}

      {selectedType === "Авто" && (
        <>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel id="brand-label">Марка</InputLabel>
            <Select
              labelId="brand-label"
              id="brand"
              value={brand}
              label="Марка"
              onChange={handleBrandChange}
            >
              <MenuItem value="Honda">Honda</MenuItem>
              <MenuItem value="Toyota">Toyota</MenuItem>
              <MenuItem value="Audi">Audi</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Модель"
            fullWidth
            value={model}
            onChange={handleModelChange}
            sx={{ marginBottom: 3 }}
          />

          <TextField
            label="Год выпуска"
            type="number"
            fullWidth
            value={year}
            onChange={handleYearChange}
            sx={{ marginBottom: 3 }}
          />

          <TextField
            label="Пробег (км)"
            type="number"
            fullWidth
            value={mileage}
            onChange={handleMileageChange}
            sx={{ marginBottom: 3 }}
          />
        </>
      )}

      {selectedType === "Услуги" && (
        <>
          <FormControl fullWidth sx={{ marginBottom: 3 }}>
            <InputLabel id="service-type-label">Тип услуги</InputLabel>
            <Select
              labelId="service-type-label"
              id="service-type"
              value={serviceType}
              label="Тип услуги"
              onChange={handleServiceTypeChange}
            >
              <MenuItem value="Ремонт">Ремонт</MenuItem>
              <MenuItem value="Уборка">Уборка</MenuItem>
              <MenuItem value="Доставка">Доставка</MenuItem>
            </Select>
          </FormControl>

          <TextField
            label="Опыт работы (лет)"
            type="number"
            fullWidth
            value={experience}
            onChange={handleExperienceChange}
            sx={{ marginBottom: 3 }}
          />

          <TextField
            label="Стоимость"
            type="number"
            fullWidth
            value={cost}
            onChange={handleCostChange}
            sx={{ marginBottom: 3 }}
          />

          <TextField
            label="График работы"
            fullWidth
            value={schedule}
            onChange={handleScheduleChange}
            sx={{ marginBottom: 3 }}
          />
        </>
      )}

      <Grid container spacing={3}>
        {currentItems.map((item) => (
          <Grid item key={item.id} xs={12}>
            <Card>
              <CardMedia
                component="img"
                height="140"
                image={item.image || placeholderImage}
                alt={item.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {item.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {item.description}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Локация:</strong> {item.location}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  <strong>Категория:</strong> {item.type}
                </Typography>
              </CardContent>
              <Button
                size="small"
                href={`/item/${item.id}`}
              >
                Открыть
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Pagination
        count={Math.ceil(filteredItems.length / itemsPerPage)}
        page={currentPage}
        onChange={handlePageChange}
        sx={{ marginTop: 3, display: "flex", justifyContent: "center" }}
      />
    </Container>
  );
}