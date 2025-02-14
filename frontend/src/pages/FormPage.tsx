import React, { useState } from 'react';
import FormStep1 from '../components/FormStep1';
import FormStep2 from '../components/FormStep2';
import { Container, Typography } from '@mui/material'; 
import { useLocation } from 'react-router-dom';
import { Item } from '../types/types'; 

const FormPage: React.FC = () => {
  const location = useLocation();
  const { item } = (location.state || {}) as { item?: Item }; 

  const [currentStep, setCurrentStep] = useState(1);
  const [category, setCategory] = useState<string>(item?.type || '');
  const [step1Data, setStep1Data] = useState<{ 
    name: string; 
    description: string; 
    location: string; 
    image?: string 
  }>({
    name: item?.name || '',
    description: item?.description || '',
    location: item?.location || '',
    image: item?.image || ''
  });

  const handleNext = (
    selectedCategory: string, 
    data: { name: string; description: string; location: string; image?: string }
  ) => {
    setCategory(selectedCategory);
    setStep1Data(data);
    setCurrentStep(2);
  };

  const handleBack = () => {
    setCurrentStep(1);
  };

  return (
    <Container maxWidth="sm">
      {item && (
        <Typography 
          variant="h5" 
          gutterBottom
          sx={{paddingLeft: "24px"}}>
          Редактирование: {item.name}
        </Typography>
      )}
      
      {currentStep === 1 ? (
        <FormStep1 
          onNext={handleNext} 
          initialData={step1Data} 
          initialCategory={category} 
        />
      ) : (
        <FormStep2 
          category={category} 
          step1Data={step1Data} 
          initialData={item} 
          onBack={handleBack} 
        />
      )}
    </Container>
  );
};

export default FormPage;