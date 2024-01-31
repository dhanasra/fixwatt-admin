import styled from "@emotion/styled";
import { TextField } from "@mui/material";
import { useEffect, useState } from "react";

const CustomInput = styled(TextField)(({ theme }) => ({
    "& .MuiInputBase-input": {
        fontSize: 20
    },
    "& .MuiOutlinedInput-root": {
      "& fieldset": {
        borderColor: "transparent", 
      },
    },
  }));

const EditableInput =({text, onChange})=>{

    const defaultName = "Untitled Card";

    const [value, setValue] = useState( text ?? defaultName)

    useEffect(() => {
        setValue(text || defaultName);
    }, [text]);

    const handleChange =(e)=>{
        setValue(e.target.value);
        onChange(e.target.value);
    }

    const handleBlur =(e)=>{
        if(e.target.value.length<=0){
            setValue(defaultName);
            onChange(defaultName);
        }
    }

    return (
        <CustomInput
            value={value}
            onChange={handleChange}
            onBlur={handleBlur}
            placeholder="Card Name"
        />
    )
}

export default EditableInput;