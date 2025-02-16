import React, { useState, useEffect } from 'react';
import FormStep1 from '../components/FormStep1';
import FormStep2 from '../components/FormStep2';
import { Container, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';

const FormPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [category, setCategory] = useState<string>('');
  const [step1Data, setStep1Data] = useState<{ 
    name: string; 
    description: string; 
    location: string; 
    image?: string; 
    category?: string; 
    id?: string; 
  }>({
    name: '',
    description: '',
    location: '',
    image: undefined,
    category: '',
  });
  const [step2Data, setStep2Data] = useState<any>({});
  const [isEditMode, setIsEditMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const searchParams = new URLSearchParams(location.search);
    const editId = searchParams.get('edit');
  
    if (editId) {
      setIsEditMode(true);
      setLoading(true);
      fetch(`http://localhost:3000/items/${editId}`)
        .then((response) => response.json())
        .then((data) => {
          console.log('Данные, полученные от API:', data); 
          setCategory(data.type);
          setStep1Data({
            name: data.name,
            description: data.description,
            location: data.location,
            image: data.image,
            category: data.type,
            id: data.id, 
          });
          console.log('step1Data после установки:', {
            name: data.name,
            description: data.description,
            location: data.location,
            image: data.image,
            category: data.type,
            id: data.id,
          });

          if (data.type === 'Недвижимость') {
            setStep2Data({
              propertyType: data.propertyType,
              area: data.area,
              rooms: data.rooms,
              price: data.price,
            });
          } else if (data.type === 'Авто') {
            setStep2Data({
              brand: data.brand,
              model: data.model,
              year: data.year,
              mileage: data.mileage,
            });
          } else if (data.type === 'Услуги') {
            setStep2Data({
              serviceType: data.propertyType,
              experience: data.experience,
              cost: data.cost,
              workSchedule: data.workSchedule,
            });
          }
  
          setLoading(false);
        })
        .catch((error) => {
          console.error('Ошибка при загрузке данных:', error);
          setLoading(false);
        });
    }
  }, [location.search]);

  const handleNext = (selectedCategory: string, data: { name: string; description: string; location: string; image?: string }) => {
    setCategory(selectedCategory);
    setStep1Data((prevData) => ({
      ...prevData,
      ...data, 
      category: selectedCategory, 
    }));
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  if (loading) {
    return <div>Загрузка...</div>;
  }

  return (
    <Container maxWidth="sm">
      {isEditMode && <Typography variant="h4">Редактирование объявления</Typography>}
      {currentStep === 1 ? (
        <FormStep1 onNext={handleNext} initialData={step1Data} />
      ) : (
        <FormStep2
          category={category}
          step1Data={step1Data}
          step2Data={step2Data}
          onBack={handleBack}
          isEditMode={isEditMode}
        />
      )}
    </Container>
  );
};

export default FormPage;