import React, { useState } from 'react';
// import { useForm, FormProvider } from 'react-hook-form';
import FormStep1 from '../components/FormStep1';
import FormStep2 from '../components/FormStep2';
import { Container } from '@mui/material';


const FormPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [category, setCategory] = useState<string>('');

  const handleNext = (selectedCategory: string) => {
    setCategory(selectedCategory);  
    setCurrentStep(2);  
  };

  return(
    <Container maxWidth="sm">
      {currentStep === 1 ? (
        <FormStep1 onNext={handleNext} />  // переход ко второму шагу
      ) : (
        <FormStep2 category={category} />  // передача категории во вторую форму
      )}
    </Container>
  )
};

export default FormPage;
