import React from 'react'
import { Country, CountryList } from '../../@types/types';
import axios from 'axios';
import CountryCard from '../CountryCard/index';

import tw from "tailwind-styled-components"

const List = tw.div`
grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4  w-full container gap-2 mt-16 
`;

async function getCountries(): Promise<Country[]> {

    try {
        const url = "https://restcountries.com/v3.1/all";
        const response = await axios.get<Country[]>(url);
        console.log("Countries",response.data);
        return response.data;
    } catch (err) {
        console.log(err);
        return [];
    }
}


async function CountriesList() {
    const countries = await getCountries();

    return (
        <List >
            {countries?countries.map((country:Country, index) => (
                <CountryCard key={index} {...country} />
               
            )):(
                <p>Não encontrados</p>
            )}
        </List>
    )
}

export default CountriesList
