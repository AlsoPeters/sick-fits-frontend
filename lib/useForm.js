import { useState } from "react";

export default function useForm(initial = {}) {
  // create a state object for our inputs
  const [inputs, setInputs] = useState(initial);

  function handleChange(e) {
    setInputs({
      // copy the existing state
      ...inputs,
      [e.target.name]: e.target.value,
    });
  }
  // return the things we want to surface from this custom hook
  return {
    inputs,
    handleChange,
  };
}
