'use client'

import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import '../app/globals.css';
import { useState } from 'react';
import { useRouter } from 'next/router';
import { usePathname } from 'next/navigation';
 
export default function Navigation() {
  const pathname = usePathname();
  console.log(pathname);
  const [currentLink, setCurrentLink] = useState(pathname);
  console.log(currentLink);
  const router = useRouter();

  const handleChange = (e) => {
    setCurrentLink(e.target.value);
    router.push(e.target.value);
  }
 
  return (
    <>
      <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Demo Type</InputLabel>
        <Select 
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={currentLink}
          label="Demo Type"
          onChange={handleChange} >
            <MenuItem value="/paymentelement">Payment Element</MenuItem>
            <MenuItem value="/deferredintent">Deferred Intent</MenuItem>
            <MenuItem value="/ece">Express Checkout Element</MenuItem>
          </Select>
      </FormControl>
    </>
  )
}