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
import placeholderImage from "../assets/Placeholder-1.png"

interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;
  image?: string;
}

export default function ListPage() {
  const [items, setItems] = useState<Item[]>([]); 
  const [filteredItems, setFilteredItems] = useState<Item[]>([]); 
  const [searchQuery, setSearchQuery] = useState(""); 
  const [selectedType, setSelectedType] = useState(""); 
  const [currentPage, setCurrentPage] = useState(1); 
  const itemsPerPage = 5; 


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
      return matchesSearch && matchesType;
    });
    setFilteredItems(filtered);
    setCurrentPage(1); 
  }, [searchQuery, selectedType, items]);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (event: React.ChangeEvent<unknown>, page: number) => {
    setCurrentPage(page);
  };

  const handleTypeChange = (event: SelectChangeEvent<string>) => {
    setSelectedType(event.target.value);
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