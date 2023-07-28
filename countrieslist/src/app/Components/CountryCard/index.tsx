import Image from "next/image";
import Link from "next/link";

import React from 'react'
import { Country } from '../../@types/types';


import tw from "tailwind-styled-components"

const Card = tw.div`
h-64 min-w-full p-2 bg-white border-2 rounded-xl  transition-all hover:scale-105
`;

const CardFlagImgCont = tw.div`
relative w-full h-40 p-2 overflow-hidden 
`;

function CountryCard({
  name,
  capital,
  flags,
  population,
  region,
  languages,
}: Country) {
  return (
    <Link href={`/pais/${name.common}`}>
      <Card>
        <p>Name: {name.common}</p>
        <CardFlagImgCont>
          <Image src={flags.svg} alt={flags.alt} fill className="object-cover" />
        </CardFlagImgCont>
      </Card>
    </Link>
  )
}

export default CountryCard
