
import CountriesList from './Components/CountriesList'

import tw from "tailwind-styled-components"

const Container = tw.div`
     w-full 
     px-16 
     py-10
`;



export default function Home() {
  return (
    <>
      
      
        <CountriesList />
      
      
    </>
  )
}
