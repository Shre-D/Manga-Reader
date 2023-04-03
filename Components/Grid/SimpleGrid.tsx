import { SimpleGrid } from '@mantine/core';
import SearchCard from '../Cards/SearchCard';
import Image from 'next/image';
import { Card } from '@mantine/core';


export default function Simplegrid({data}:any) {
  console.log(data);  
  return (
    <div>
    <SimpleGrid cols={4} px={20} 
    breakpoints={[
      { maxWidth: '62rem', cols: 3, spacing: 'md' },
      { maxWidth: '48rem', cols: 2, spacing: 'sm' },
      { maxWidth: '36rem', cols: 1, spacing: 'sm' },
    ]}
    >{
      data.map((manga:any,key:any)=>{
        return(
          <div>
          <SearchCard manga={manga}/>
          </div>
        )
      })
    }
      
    </SimpleGrid>
    </div>
  )
}