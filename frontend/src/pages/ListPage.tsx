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
  serviceType?: string;
  experience?: number;
  cost?: number;
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
  const [serviceType, setServiceType] = useState("");
  const [experience, setExperience] = useState("");
  const [cost, setCost] = useState("");

  useEffect(() => {
    const abortController = new AbortController();

    fetch("http://localhost:3000/items", { signal: abortController.signal })
      .then((response) => response.json())
      .then((data) => {
        console.log("Полученные данные:", data);
        setItems(data);
        setFilteredItems(data);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          console.log("Ошибка:", error);
        }
      });

    return () => {
      abortController.abort();
    };
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
          (!year || item.year === parseInt(year));
      } else if (selectedType === "Услуги") {
        matchesAdditionalFilters =
          (!serviceType || item.serviceType === serviceType) &&
          (!experience || item.experience === parseInt(experience)) &&
          (!cost || item.cost === parseInt(cost));
      }

      return matchesSearch && matchesType && matchesAdditionalFilters;
    });
    setFilteredItems(filtered);
    setCurrentPage(1);
  }, [
    searchQuery,
    selectedType,
    items,
    propertyType,
    area,
    rooms,
    price,
    brand,
    model,
    year,
    serviceType,
    experience,
    cost,
  ]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (_event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
    setPropertyType("");
    setArea("");
    setRooms("");
    setPrice("");
    setBrand("");
    setModel("");
    setYear("");
    setServiceType("");
    setExperience("");
    setCost("");
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
          <TextField
            label="Тип недвижимости"
            variant="outlined"
            fullWidth
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="Площадь"
            variant="outlined"
            fullWidth
            value={area}
            onChange={(e) => setArea(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="Количество комнат"
            variant="outlined"
            fullWidth
            value={rooms}
            onChange={(e) => setRooms(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="Цена"
            variant="outlined"
            fullWidth
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
        </>
      )}

      {selectedType === "Авто" && (
        <>
          <TextField
            label="Марка"
            variant="outlined"
            fullWidth
            value={brand}
            onChange={(e) => setBrand(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="Модель"
            variant="outlined"
            fullWidth
            value={model}
            onChange={(e) => setModel(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="Год выпуска"
            variant="outlined"
            fullWidth
            value={year}
            onChange={(e) => setYear(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
        </>
      )}

      {selectedType === "Услуги" && (
        <>
          <TextField
            label="Тип услуги"
            variant="outlined"
            fullWidth
            value={serviceType}
            onChange={(e) => setServiceType(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="Опыт"
            variant="outlined"
            fullWidth
            value={experience}
            onChange={(e) => setExperience(e.target.value)}
            sx={{ marginBottom: 3 }}
          />
          <TextField
            label="Стоимость"
            variant="outlined"
            fullWidth
            value={cost}
            onChange={(e) => setCost(e.target.value)}
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