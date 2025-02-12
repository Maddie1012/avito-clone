import React, { useState } from 'react';
import FormStep1 from '../components/FormStep1';
import FormStep2 from '../components/FormStep2';
import { Container } from '@mui/material';

const FormPage: React.FC = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [category, setCategory] = useState<string>('');
  const [step1Data, setStep1Data] = useState<{ name: string; description: string; location: string }>({
    name: '',
    description: '',
    location: '',
  });

  const handleNext = (selectedCategory: string, data: { name: string; description: string; location: string }) => {
    setCategory(selectedCategory);
    setStep1Data(data);
    setCurrentStep(2);
  };

  return (
    <Container maxWidth="sm">
      {currentStep === 1 ? (
        <FormStep1 onNext={handleNext} />
      ) : (
        <FormStep2 category={category} step1Data={step1Data} />
      )}
    </Container>
  );
};

export default FormPage;