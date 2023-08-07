import React, { useState } from 'react';

const useFormUpdate = <T>(defaultObj?: T) => {
  const [data, setData] = useState<T>(defaultObj || ({} as T));

  const handleChange = (e: React.FormEvent<HTMLFormElement>) => {
    const target = e.target as HTMLInputElement;

    setData((prevState) => {
      const isCheckBox = target.value === 'on' || target.value === 'off';
      let value: string | boolean;

      if (isCheckBox) {
        value = target.value === 'on';
      } else {
        value = target.value;
      }

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
