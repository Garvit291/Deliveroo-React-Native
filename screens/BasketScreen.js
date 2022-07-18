import { View, Text,  TouchableOpacity, Image, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import {useNavigation} from "@react-navigation/native";
import tw from 'twrnc';
import {useDispatch,useSelector} from 'react-redux';
import { selectRestaurant } from '../features/restaurantSlice';
import { removeFromBasket, selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import { useState  } from 'react';
import { useMemo } from 'react';
import { XCircleIcon } from 'react-native-heroicons/outline';
import { urlFor } from '../sanity';
import Currency from 'react-currency-formatter';
import { SafeAreaView } from 'react-native-safe-area-context';





const BasketScreen = () => {
    const navigation = useNavigation();
    const restaurant = useSelector(selectRestaurant);
    const items  = useSelector(selectBasketItems);
    const basketTotal = useSelector(selectBasketTotal)
    
    const dispatch = useDispatch();
    const [groupedItemsInBasket , setGroupedItemsInBasket] = useState([]);

    useEffect(()=>{
       const groupedItems = items.reduce((results , item)=>{
        // console.log(item);
        (results[item.id] = results[item.id] || []).push(item);
        return results;
       },{});

        setGroupedItemsInBasket(groupedItems);
    },[items])

    // console.log(items);
    //  console.log(groupedItemsInBasket);

  return (
    <SafeAreaView style={tw`flex-1 bg-white`}>
      <View style={tw`flex-1 bg-gray-100`} >
        <View style={tw`p-5 border-b border-[#00cc8b] bg-white shadow-xl`}>
            <View>
                <Text style={tw`text-lg font-bold text-center`}>
                    Basket
                </Text>
                <Text style={tw`text-center text-gray-400`}>
                    {restaurant.title}
                </Text>
            </View>
            <TouchableOpacity
                onPress={navigation.goBack}
                style={tw`rounded-full bg-gray-100 absolute top-3 right-3`}>
                <XCircleIcon color={"#00cc8b"} height={40} width={40} />
            </TouchableOpacity>
        </View>

        <View style={tw`flex-row items-center  px-4 py-3 bg-white my-5`}>
            <Image source={{
                uri:"https://links.papareact.com/wru"
            }} 
            style={tw`h-7 w-7 bg-gray-300 p-4 rounded-full`}/>
            <Text style={tw`flex-1 ml-4`}>
                Deliver in 45-55 min
            </Text>
            <TouchableOpacity style={tw`ml-4`}>
                <Text style={tw`text-[#00cc8b]`}>
                    Change
                </Text>
            </TouchableOpacity>
        </View>
        <ScrollView  style={tw``}>
            {Object.entries(groupedItemsInBasket).map(([key,items])=>{
                return(
                <View key={key} style={tw`flex-row items-center py-2 bg-white  px-5 `}>
                    <Text style={tw`text-[#00cc8b]`}>
                        {items.length} x
                    </Text>
                    <Image source={{uri:urlFor(items[0].image).url()}}
                        style={tw`h-12 w-12 ml-2 rounded-full`}/>
                    <Text style={tw`flex-1 ml-2`}>
                        {items[0].name}
                    </Text>
                    <Text style={tw`text-gray-600 ml-2`}>
                        <Currency quantity={items[0].price} currency="INR" />
                    </Text>
                    <TouchableOpacity style={tw`ml-2`}>
                        <Text style={tw`text-[#00cc8b] text-xs `}
                            onPress={()=>dispatch(removeFromBasket({id:key}))}>
                            Remove 
                        </Text>
                    </TouchableOpacity>
                </View>
                )
            })}
        </ScrollView>
        <View  style={tw`p-5 bg-white  `}>
            <View style={tw`flex-row justify-between `}>
                <Text  style={tw`text-gray-400 `} >
                    Subtotal
                </Text>
                <Text style={tw`text-gray-400 `}>
                        <Currency quantity={basketTotal} currency="INR" />
                </Text>
            </View>
            <View style={tw`flex-row justify-between mt-4 `}>
                <Text  style={tw`text-gray-400 `} >
                    Delivery Fee
                </Text>
                <Text style={tw`text-gray-400 `}>
                        <Currency quantity={50} currency="INR" />
                </Text>
            </View>
            <View style={tw`flex-row justify-between mt-4 `}>
                <Text  style={tw` `} >
                    Order Total
                </Text>
                <Text style={tw`font-extrabold`}>
                        <Currency quantity={basketTotal+50} currency="INR" />
                </Text>
            </View>
            <TouchableOpacity style={tw`rounded-lg bg-[#00ccbb] p-3 mt-4`} onPress={()=>navigation.navigate('Preparing')}>
                <Text style={tw` text-center text-white text-xl font-bold `} >
                    Place Order
                </Text>
            </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  )
}

export default BasketScreen