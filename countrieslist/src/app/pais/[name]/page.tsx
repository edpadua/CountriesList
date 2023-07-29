

import React from 'react'

import Image from "next/image";

import Link from "next/link";

import { Country, CountryList } from '../../@types/types';

import axios from 'axios';

import tw from "tailwind-styled-components"

const NameCountry = tw.h1`
    text-5xl text-center font-bold 
`;


async function getCountryByName(name: string): Promise<Country> {


  const url = "https://restcountries.com/v3.1/all";
  const response = await axios.get<Country[]>(url);
  console.log("Countries", response.data);
  return response.data.find((country: Country) => country.name.common === name)!;

}

async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(decodeURI(name));

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <div>
      <NameCountry>{country.name.common}</NameCountry>
      <Link className="flex items-center py-2" href="/">

        Voltar
      </Link>
      <div className="min-w-full p-10 bg-slate-100 rounded-xl">
        <h2 className="text-xl text-gray-800 mt-3">
          <b>Capital:</b> {country.capital}
        </h2>
        <h2 className="text-xl text-gray-800 mt-3">
          <b>Continente:</b> {country.region}
          {country.subregion && `- ${country.subregion}`}
        </h2>
        <h2 className="text-xl text-gray-800 mt-3">
          <b>População:</b> {formatter.format(country.population)}
        </h2>
        {country.languages && (
            <h2 className="text-xl text-gray-800 mt-3">
              <b>Línguas faladas:</b>
              <br />
              {Object.values(country.languages).map((language) => (
                <span
                  key={language}
                  className="inline-block px-2 bg-indigo-700 mr-2 text-white text-sm rounded-full"
                >
                  {language}
                </span>
              ))}
            </h2>
          )}
      </div>
    </div>
  )
}

export default CountryPage
