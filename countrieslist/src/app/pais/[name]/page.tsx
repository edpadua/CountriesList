

import React from 'react'

import Image from "next/image";

import Link from "next/link";

import { Country } from '../../@types/types';

import CountryCard from "../../Components/CountryCard/index"

import axios from 'axios';

import tw from "tailwind-styled-components";

const NameCountry = tw.h1`
    text-5xl text-center font-bold 
`;


const InfoCountry = tw.div`
     w-full p-10 bg-slate-100 rounded-xl
`;

const Info = tw.h2`
    text-xl text-gray-800 mt-3
`;


const BorderTitle = tw.h3`
      mt-12 text-2xl font-bold text-gray-800"
`;

const InfoContainerImg = tw.div`
relative my-2 lg:w-1/2 h-80 min-h-full  md:order-last order-first
`;


const LanguageItem = tw.span`
inline-block px-2 bg-blue-800 mr-2 text-white text-sm
`;


const PaisContainer = tw.div`
flex flex-col container
`;


const BorderList = tw.div`
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full container gap-2 mt-16 
`;


async function getCountryByName(name: string): Promise<Country> {


  const url = "https://restcountries.com/v3.1/all";
  const response = await axios.get<Country[]>(url);
  console.log("Countries", response.data);
  return response.data.find((country: Country) => country.name.common === name)!;

}


async function getBorderCountries(name: string) {


  const url = "https://restcountries.com/v3.1/all";
  const response = await axios.get<Country[]>(url);
  console.log("Countries", response.data);
  const country = response.data.find((country: Country) => country.name.common === name)!;

  return country.borders?.map((border) => {
    const borderCountry = response.data.find((country) => country.cca3 === border)!;
    return {
      borderCountry
    };
  });

}

async function CountryPage({
  params: { name },
}: {
  params: { name: string };
}) {
  const country = await getCountryByName(decodeURI(name));
  const borderCountries = await getBorderCountries(decodeURI(name));

  const formatter = Intl.NumberFormat("en", { notation: "compact" });

  return (
    <PaisContainer>
      <NameCountry>{country.name.common}</NameCountry>
      <Link className="flex items-center py-4" href="/">

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
              <LanguageItem
                key={language}
              >
                {language}
              </LanguageItem>
            ))}
          </Info>
        )}
        <InfoContainerImg>
          <Image
            src={country.flags.svg}
            alt={country.flags.alt}
            fill
            className="object-cover"
          />
        </InfoContainerImg>
      </InfoCountry>
      <div>
        <BorderTitle>
          Faz fonteira com:
        </BorderTitle>
        <BorderList>

          {borderCountries?.map((border, index) => (

            <CountryCard key={index} {...border.borderCountry} />
          ))}
        </BorderList>
      </div>
    </PaisContainer>
  )
}

export default CountryPage
