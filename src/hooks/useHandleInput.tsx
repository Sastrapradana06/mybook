import { useState } from "react";

export default function useHandleInput(intialValue: any) {
  const [value, setValue] = useState(intialValue);

  const handleChange = (e: any) => {
    const { name, value: valueInput } = e.target;
    setValue({
      ...value,
      [name]: valueInput,
    });
  };

  const resetValue = () => {
    setValue(intialValue);
  };

  const editData = (data: any) => {
    setValue(data);
  };

  return { value, handleChange, editData, resetValue };
}
