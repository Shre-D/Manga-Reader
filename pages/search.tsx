import Simplegrid from "@/Components/Grid/SimpleGrid";
import { HeaderSearch } from "@/Components/Header";
import { Text } from "@mantine/core";
import { useRouter } from "next/router";

export async function getServerSideProps({query}:any) {
    // Fetch data from external API
    const {keyword}=query     
    const data = await (await fetch(`https://api.consumet.org/meta/anilist-manga/${keyword}`)).json();
    // Pass data to the page via props
    return { props: { data,keyword} }
  }

function Search({data,keyword}:any) {
    
    const searchResults=data.results;
    console.log(keyword);
    
    
  return (
    <div className="">
        <HeaderSearch/>
        <Text size={24} 
        variant="gradient"
        gradient={{from:'yellow',to:'teal',deg:0}}
        pb={"sm"}
        pl={"lg"}
        weight={50}
        >
          Search Results for "{keyword}"
        </Text>
        <Simplegrid data={searchResults}/>
    </div>
  )
}

export default Search