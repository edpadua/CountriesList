import React from 'react'

import { Country, CountryList } from '../../@types/types';

import axios from 'axios';




async function getCountryByName(name: string): Promise<Country> {


      const url = "https://restcountries.com/v3.1/all";
      const response = await axios.get<Country[]>(url);
      console.log("Countries",response.data);
      return response.data.find((country: Country) => country.name.common === name)!;
  
}

async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(decodeURI(name));

  return (
    <div>
        <h1>{country.name.common}</h1>
    </div>
  )
}

export default CountryPage
