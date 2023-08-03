import React, { useState } from 'react';

const useFormUpdate = (defaultObj?: any) => {
  const [data, setData] = useState<any>(defaultObj || {});

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setData((prevState: object) => {
      const isCheckBox = target.value === 'on' || target.value === 'off';
      const value = isCheckBox ? target.value === 'on' : target.value;

      return {
        ...prevState,
        [target.name]: target.type === 'number' ? Number(value) : value
      };
    });
  };

  return {
    formData: data,
    handleChange
  };
};

export default useFormUpdate;
