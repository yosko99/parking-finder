import React, { useState } from 'react';

interface FormData {
  [key: string]: string | boolean | number;
}

const useFormUpdate = () => {
  const [formData, setFormData] = useState<FormData>({});

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setFormData((prevState) => {
      const isCheckBox = target.value === 'on' || target.value === 'off';
      const value = isCheckBox ? target.value === 'on' : target.value;

      return {
        ...prevState,
        [target.name]: target.type === 'number' ? Number(value) : value
      };
    });
  };

  return {
    formData,
    handleChange
  };
};

export default useFormUpdate;
