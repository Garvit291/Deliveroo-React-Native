import { View, Text, ScrollView } from 'react-native'
import React, { useEffect, useState } from 'react'
import tw from 'twrnc';
import { ArrowRightIcon } from 'react-native-heroicons/outline';
import RestaurantCard from './RestaurantCard';
import client from '../sanity';

const FeaturedRow = ({id , title  , description , }) => {

    const [restaurants , setRestaurants] = useState([])

    useEffect(()=>{
        client.fetch(`
        *[_type=="featured" && _id==$id]{
            ...,
             restaurants[]->{
               ..., 
               dishes[]->,
               type->{
                name
               }
              
             }
                  }[0]
        `,{id}).then((data)=>{
            setRestaurants(data?.restaurants)
        })
    },[id])

   // console.log(restaurants);
  return (
    <View>
      <View style={tw`flex-row items-center justify-between px-4 mt-4`}>
        <Text style={tw`font-bold text-lg`}>
            {title}
        </Text>
        <ArrowRightIcon color={"#00cc8b"}/>
      </View>
      <Text style={tw`text-gray-500 px-4 text-xs`}>
        {description}
      </Text>
      <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal:15
      }}
      showsHorizontalScrollIndicator={false}
      style={tw`pt-4`}>
        {restaurants?.map((restaurant)=>{
            return(
            <RestaurantCard
            id = {restaurant._id}
            key = {restaurant._id}
            imgUrl ={restaurant.image}
            title = {restaurant.name}
            rating ={restaurant.rating}
            genre ={restaurant.type?.name}
            address ={restaurant.address}
            short_description ={restaurant.short_description}
            dishes ={restaurant.dishes}
            long={restaurant.long}
            lat={restaurant.lat}/>)
        })}
      </ScrollView>
    </View>
  )
}

export default FeaturedRow