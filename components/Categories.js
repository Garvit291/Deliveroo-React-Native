import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import CategoryCard from './CategoryCard';
import client, { urlFor } from '../sanity';



export default function Categories() {
  const [categories , setCategories] = useState([]);
  useEffect(()=>{
    client.fetch(`
     *[_type=="category"]
    `).then((data)=>setCategories(data));
  },[])
  return (
    <ScrollView horizontal 
    showsHorizontalScrollIndicator={false}
    contentContainerStyle={{paddingHorizontal :15, paddingTop:10}}>
        {categories?.map((category)=>{
            return (
            <CategoryCard 
              key={category._id}
              imgUrl = {urlFor(category.image).width(200).url()} 
              title = {category.name}/>)
        })}
    </ScrollView>
  )
}