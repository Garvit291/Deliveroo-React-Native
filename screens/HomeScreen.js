import { View, Text, Image, TextInput, ScrollView } from 'react-native'
import React, { useEffect, useLayoutEffect, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context';

import tw from 'twrnc';
import {
UserIcon,
ChevronDownIcon,
SearchIcon,
AdjustmentsIcon
} from "react-native-heroicons/outline";


import {useNavigation} from "@react-navigation/native";
import GlobalStyle from '../GlobalStyle';
import Categories from '../components/Categories';
import FeaturedRow from '../components/FeaturedRow';
import client  from '../sanity';
import category from '../sanity/schemas/category';

const HomeScreen = () => {
    const navigation = useNavigation();
    const [featuredCategories , setFeaturedCategories] = useState([]);

    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    })

    useEffect(()=>{
        client.fetch(`*[_type=="featured"]{
            ...,
             restaurants[]->{
               ..., 
               dishes[]->
              
             }
                  }`).then(data=>setFeaturedCategories(data))
    },[])
    //console.log(featuredCategories);
  return (
    <SafeAreaView  style={tw`pt-3 pb-4 bg-white`}>
      <View style={tw`flex-row pb-3 items-center mx-4 `}>
        <Image 
        source={{
            uri:"https://links.papareact.com/wru"
        }}
        style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}/>
        <View style={tw`ml-4 flex-1`}>
            <Text style={tw`font-bold text-gray-300 text-lg`}>Deliver Now </Text>
            <Text style={tw`font-bold text-xl`}>Current Location
                <ChevronDownIcon size={20} color={"#00cc8b"}  />
            </Text>
        </View>
        <UserIcon size={35}  color={"#00cc8b"} />
      </View>
      <View style={tw` flex-row  items-center pb-2 mx-4 `}>
        <View style={tw`flex-row flex-1   bg-gray-200 p-3`}>
            <SearchIcon color="gray" size={20} />
            <TextInput
            style={tw`ml-4`} 
            placeholder=' Restaurants and Cuisines'
            keyboardType='default'/>
        </View>
        <AdjustmentsIcon   color={"#00cc8b"} />
      </View>
      <ScrollView style={tw`bg-gray-100`}
        contentContainerStyle={{
            paddingBottom:100
        }}>
        <Categories/>
        {featuredCategories?.map((category)=>{
            return(
                <FeaturedRow
                    key={category._id}
                    title ={category.name}
                    description = {category.short_description}
                    id={category._id}/>
            );
        })}   
      </ScrollView>
    </SafeAreaView>
  )
}

export default HomeScreen