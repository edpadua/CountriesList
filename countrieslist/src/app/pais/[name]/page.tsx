

import React from 'react'

import Image from "next/image";

import Link from "next/link";

import { Country, CountryList } from '../../@types/types';

import axios from 'axios';

import tw from "tailwind-styled-components"

const NameCountry = tw.h1`
    text-5xl text-center font-bold 
`;


const InfoCountry = tw.div`
     min-w-full p-10 bg-slate-100 rounded-xl
`;

const Info = tw.h2`
    text-xl text-gray-800 mt-3
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
      <InfoCountry>
        <Info>
          <b>Capital:</b> {country.capital}
        </Info>
        <Info>
          <b>Continente:</b> {country.region}
          {country.subregion && `- ${country.subregion}`}
        </Info>
        <Info>
          <b>População:</b> {formatter.format(country.population)}
        </Info>
        {country.languages && (
          <Info>
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
          </Info>
        )}
        <div className="relative h-48 my-2 w-96 shadow-md md:order-last order-first">
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            fill
            className="object-cover"
          />
        </div>
      </InfoCountry>
    </div>
  )
}

export default CountryPage
