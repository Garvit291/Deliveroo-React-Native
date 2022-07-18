import { View, Text, TouchableOpacity, Image, Platform } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

import React from 'react'
import tw from 'twrnc';
import {useNavigation} from "@react-navigation/native";

import { selectRestaurant } from '../features/restaurantSlice';

import { XIcon } from 'react-native-heroicons/outline';
import * as Progress from 'react-native-progress';
import MapView , {Marker} from 'react-native-maps';
import {useDispatch,useSelector} from 'react-redux';

import { resetBasket } from '../features/basketSlice';




const DeliveryScreen = () => {
    const dispatch = useDispatch();

    const goToHome = () =>{
        dispatch(resetBasket());
        navigation.navigate("Home")
    }

    const Maps=()=>{
        if( (Platform.OS == 'android'  ) || (Platform.OS == 'ios')  ){
            return (
                <MapView
            initialRegion={{
                latitude: restaurant.lat,
                longitude: restaurant.long,
                latitudeDelta: 0.005,
                longitudeDelta: 0.005,
              }}

              style={tw`-mt-10 z-0 flex-1`}
              mapType="mutedStandard"
          
        >

            <Marker
                coordinate={{
                    latitude:restaurant.lat,
                    longitude:restaurant.long
                }}
                title={restaurant.title}
                description={restaurant.short_description}
                identifier="origin"
                pinColor='#00ccbb'

                />
        </MapView>
              );
          } else  {
        return (
                <Text style={tw`flex-1 mt-10 z-0`}>
                    Maps are not supported on Web
                </Text>

              );
      }
    }
  const navigation = useNavigation();
  const restaurant = useSelector(selectRestaurant);

  return (
    <View style={tw`flex-1 bg-[#00ccbb]`}>
        <SafeAreaView style={tw`z-50`}>
                <View style={tw`flex-row justify-between items-center p-5`}>
                    <TouchableOpacity  onPress={()=>goToHome()}>
                        <XIcon color={"white"} size={30}/>
                    </TouchableOpacity>
                    <Text style={tw`font-light text-white text-lg`}>
                        Order Help
                    </Text>
                </View>
                <View style={tw`bg-white mx-5 my-2 rounded-md p-6 z-50 shadow-md`}>
                <View style={tw`flex-row justify-between`}>
                    <View style={tw``}>
                        <Text style={tw`text-lg text-gray-400`}>
                            Estimated Arrival
                        </Text>
                        <Text style={tw`text-4xl font-bold`}>
                            45-55 minutes
                        </Text>
                    </View>
                    <Image
                    source={{uri:"https://links.papareact.com/fls"}}
                    style={tw`h-16 w-16`}/>
                </View>     
                <Progress.Bar indeterminate={true} size={30} color={"#00ccbb"} />
                <Text style={tw`mt-3 text-gray-500`}>
                    Your order at {restaurant.title} is being prepared 
                </Text>   
            </View>
        </SafeAreaView>
        {Maps()}
        <SafeAreaView style={tw`bg-white flex-row items-center  h-28`}>
            <Image
            source={{uri:"https://links.papareact.com/wru"}}
            style={tw`h-12 w-12 bg-gray-300 p-4 rounded-full ml-5`}/>
            <View style={tw`flex-1 ml-5`}>
                <Text style={tw`text-lg `}>
                    Your Rider
                </Text>
                <Text style={tw`text-gray-400`}>
                    Kartikay 
                </Text>
            </View>
            <Text style={tw`text-[#00ccbb] text-lg mr-5 font-bold `}>
                    Call
            </Text>
        </SafeAreaView>
    </View>
  )
}

export default DeliveryScreen