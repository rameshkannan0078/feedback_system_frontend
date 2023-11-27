
export const validateForm = (formData) => {
    for (const key in formData) {
      if (formData[key] === '' || (typeof formData[key] === 'number' && formData[key] === 0)) {
        return `Please enter your ${key}`;
      }
    }
    return '';
  };
  