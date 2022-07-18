import { View, Text, TouchableOpacity, Image } from 'react-native'
import React, { useState } from 'react'
import Currency from 'react-currency-formatter';
import tw from 'twrnc';
import { urlFor } from '../sanity';
import { MinusCircleIcon, PlusCircleIcon } from 'react-native-heroicons/outline';
import {useDispatch,useSelector} from 'react-redux';
import { addToBasket, removeFromBasket, selectBasketItems, selectBasketItemsById } from '../features/basketSlice';


const DishRow = ({name ,id, description,price,image}) => {

    const [isPressed , setIsPressed] = useState(false);
    const dispatch = useDispatch();
    const items = useSelector((state)=>selectBasketItemsById(state,id));

    const addItemToBasket = () => {
        dispatch(addToBasket({name ,id, description,price,image}));
    }

    const removeItemFromBasket = () =>{
        if(items.length<0) return 
        dispatch(removeFromBasket({id}));
    }
  return (
    <>
        <TouchableOpacity onPress={()=>setIsPressed(!isPressed)} style={tw`bg-white border p-4 border-gray-200 ${isPressed ? `border-b-0` : ``}`}>
            <View style ={tw`flex-row`}>
                <View style ={tw`flex-1 pr-2`}>
                    <Text style={tw`text-lg mb-1`}>
                        {name}
                    </Text>
                    <Text style={tw`text-gray-400`}>
                        {description}
                    </Text>
                    <Text style={tw`text-gray-400 mt-2`}>
                        <Currency quantity={price} currency="INR"/>
                    </Text>
                </View>
                <View>
                    <Image
                    source={{ uri:urlFor(image).url()}}
                    style={tw`h-20 w-20 bg-gray-300 p-4 border border-gray-300`}/>
                </View>
            </View>
        </TouchableOpacity>
        {isPressed ?(<View style={tw`bg-white  p-4`}>
                        <View style={tw`flex-row items-center  pb-3`}>
                            <TouchableOpacity onPress={removeItemFromBasket} disabled={!items.length}>
                                <MinusCircleIcon  size={40} 
                                color={items.length>0?"#00cc8b" :"gray"}/>
                            </TouchableOpacity>
                            <Text style={tw`ml-3`}>{items.length}</Text>
                            <TouchableOpacity onPress={addItemToBasket} style={tw`ml-3`}>
                                <PlusCircleIcon  size={40} 
                                color={items.length>0?"#00cc8b" :"gray"}/>
                            </TouchableOpacity>
                        </View>
                    </View>):(null)
        }
    </>
  )
}

export default DishRow