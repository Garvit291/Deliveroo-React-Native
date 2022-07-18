import { View, Text, ScrollView, Image, TouchableOpacity } from 'react-native'
import React, { useLayoutEffect } from 'react'
import {useDispatch,useSelector} from 'react-redux';

import tw from 'twrnc';
import {useRoute} from '@react-navigation/native';
import { urlFor } from '../sanity';
import {useNavigation} from "@react-navigation/native";
import { ArrowLeftIcon, ChevronRightIcon, LocationMarkerIcon, QuestionMarkCircleIcon} from 'react-native-heroicons/outline';
import { StarIcon } from 'react-native-heroicons/solid';
import DishRow from '../components/DishRow';
import BasketIcon from '../components/BasketIcon';
import { useEffect } from 'react';
import { setRestaurant } from '../features/restaurantSlice';
import {resetBasket} from '../features/basketSlice';


const RestaurantScreen = () => {

    const navigation = useNavigation();
    const dispatch = useDispatch();
    const {params :{
        id,
    imgUrl,
    title,
    rating,
    genre,
    address,
    short_description,
    dishes,
    long,
    lat,
    }} = useRoute();

    useEffect(()=>{
        dispatch(setRestaurant({
            id,
            imgUrl,
            title,
            rating,
            genre,
            address,
            short_description,
            dishes,
            long,
            lat,}))
    },[dispatch])

    console.log(id);
    useLayoutEffect(()=>{
        navigation.setOptions({
            headerShown:false
        })
    })

    const goBackToHome = () =>{
        dispatch(resetBasket());
        navigation.navigate("Home")
    }

  return (
    <>
    <BasketIcon/>
    <ScrollView>
        <View style={tw`relative`}>
            <Image
            source={{
                uri:urlFor(imgUrl).url()
            }}
            style={tw`w-full h-56 `}/>
            <TouchableOpacity onPress={()=>goBackToHome()} style={tw`absolute top-14 left-5 rounded-full p-2 bg-gray-100`}>
                <ArrowLeftIcon size={20} color={"#00cc8b"}/>
            </TouchableOpacity>
        </View>
        <View style={tw`bg-white`}>
            <View style={tw`px-4 pt-4`}>
                <Text style ={tw`font-bold text-3xl`}>
                    {title}
                </Text>
                <View style={tw`flex-row  my-1`}>
                    <View style={tw`flex-row items-center `}>
                        <StarIcon color="green" opacity={0.5} size={22}/>
                        <Text style={tw` ml-1 text-xs text-gray-500`}>
                            <Text style={tw`text-green-500`}>{rating}</Text>· {genre}
                        </Text>
                    </View>
                    <View style={tw`flex-row ml-2 items-center `}>
                        <LocationMarkerIcon color="gray" opacity={0.5} size={22}/>
                        <Text style={tw` ml-1 text-xs text-gray-500`}>
                            Nearby · {address}
                        </Text>
                    </View>
                </View>
                <Text style={tw`text-gray-500 mt-2 pb-2`}>
                    {short_description}
                </Text>
            </View>
            <TouchableOpacity style={tw`flex-row items-center p-4 border border-gray-300`}>
                <QuestionMarkCircleIcon size={20} color="gray" opacity={0.6}/>
                <Text style={tw` ml-2 pl-2 text-lg font-bold flex-1`}>
                    Have a Food Allergy
                </Text>
                <ChevronRightIcon style={tw`ml-2`} color="#00cc8b"/>
            </TouchableOpacity>
        </View>
        <View style={tw`pb-16`}>
            <Text style={tw`px-4 pt-6 mb-3 font-bold text-xl`}>
                Menu
            </Text>
            {dishes?.map((dish)=>{
                return (
                    <DishRow
                    key={dish._id}
                    id={dish._id}
                    name= {dish.name}
                    description = {dish.short_description}
                    price = {dish.price}
                    image = {dish.image}/>
                )
            })}
        </View>
    </ScrollView>
    </>
  )
}

export default RestaurantScreen