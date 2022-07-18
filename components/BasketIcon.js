import { View, Text, TouchableOpacity } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import {useSelector} from 'react-redux';
import { selectBasketItems, selectBasketTotal } from '../features/basketSlice';
import {useNavigation} from "@react-navigation/native";
import Currency from 'react-currency-formatter';



const BasketIcon = () => {

    const items = useSelector(selectBasketItems)
    const navigation = useNavigation()
    const basketTotal = useSelector(selectBasketTotal)
    if(items.length<=0) return (null)
  return (
    <View style = {tw` absolute bottom-10 w-full z-50 `}> 
      <TouchableOpacity style={tw`bg-[#00cc8b] mx-5 p-4 rounded-lg flex-row items-center `} onPress={()=>navigation.navigate("Basket")}>
        <Text style={tw`text-white font-extrabold text-lg bg-[#01a296] py-1 px-2 `}>
          {items.length}
        </Text>
        <Text style={tw`ml-1 text-white font-extrabold text-lg flex-1 text-center `}>
          View Basket
        </Text>
        <Text style={tw`text-lg ml-1 text-white font-extrabold`}> 
          <Currency quantity={basketTotal} currency="INR"/>
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default BasketIcon