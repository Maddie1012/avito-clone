import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import placeholderImage from "../assets/Placeholder-1.png";

interface Item {
  id: number;
  name: string;
  description: string;
  location: string;
  type: string;
  image?: string;
  propertyType?: string;
  serviceType?: string;
  area?: number;
  rooms?: number;
  price?: number;
  brand?: string;
  model?: string;
  year?: number;
  mileage?: number;
  experience?: number;
  cost?: number;
  workSchedule?: string;
}

export default function ItemPage() {
  const { id } = useParams<{ id: string }>();
  const [item, setItem] = useState<Item | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (!id) return;

    const abortController = new AbortController();

    fetch(`http://localhost:3000/items/${id}`, { signal: abortController.signal })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Объявление не найдено");
        }
        return response.json();
      })
      .then((data) => {
        setItem(data);
        setLoading(false);
      })
      .catch((error) => {
        if (error.name !== 'AbortError') {
          setError(error.message);
          setLoading(false);
        }
      });

    return () => {
      abortController.abort();
    };
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="sm" sx={{ display: "flex", justifyContent: "center", marginTop: 5 }}>
        <CircularProgress />
      </Container>
    );
  }

  if (error) {
    return (
      <Container maxWidth="sm" sx={{ marginTop: 5 }}>
        <Typography variant="h6" color="error">
          {error}
        </Typography>
      </Container>
    );
  }

  if (!item) {
    return (
      <Container maxWidth="sm" sx={{ marginTop: 5 }}>
        <Typography variant="h6">Объявление не найдено</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm" sx={{ marginTop: 5 }}>
      <Card>
        <CardMedia
          component="img"
          height="300"
          image={item.image || placeholderImage}
          alt={item.name}
        />
        <CardContent>
          <Typography gutterBottom variant="h4" component="div">
            {item.name}
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ marginBottom: 2 }}>
            {item.description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Локация:</strong> {item.location}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            <strong>Категория:</strong> {item.type}
          </Typography>

          {item.type === "Недвижимость" && (
            <>
              <Typography variant="body2" color="text.secondary">
                <strong>Тип недвижимости:</strong> {item.propertyType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Площадь:</strong> {item.area} м²
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Количество комнат:</strong> {item.rooms}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Цена:</strong> {item.price} ₽
              </Typography>
            </>
          )}

          {item.type === "Авто" && (
            <>
              <Typography variant="body2" color="text.secondary">
                <strong>Марка:</strong> {item.brand}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Модель:</strong> {item.model}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Год выпуска:</strong> {item.year}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Пробег:</strong> {item.mileage} км
              </Typography>
            </>
          )}

          {item.type === "Услуги" && (
            <>
              <Typography variant="body2" color="text.secondary">
                <strong>Тип услуги:</strong> {item.serviceType}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Опыт работы:</strong> {item.experience} лет
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>Стоимость:</strong> {item.cost} ₽
              </Typography>
              <Typography variant="body2" color="text.secondary">
                <strong>График работы:</strong> {item.workSchedule}
              </Typography>
            </>
          )}
        </CardContent>
        <Button
          size="small"
          onClick={() => navigate(`/form?edit=${id}`)}
          sx={{ margin: 2 }}
        >
          Редактировать
        </Button>
        <Button
          size="small"
          href="/list"
          sx={{ margin: 2 }}
        >
          Назад к списку
        </Button>
      </Card>
    </Container>
  );
}