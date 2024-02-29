import { useState } from "react";



export default function InputText({onValueSubmitted}) {
  const [inputText, setInputText] = useState("");

  const onSubmit = (event) => {
    event.preventDefault();
    onValueSubmitted(inputText);
  }
    return (
      <form onSubmit={onSubmit}>
      <input value={inputText} onChange={(inputValue) => setInputText(inputValue.target.value)} />
      <button type='submit'>Search</button>
      </form>
    )
}