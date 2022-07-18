import { View, Text } from 'react-native'
import React from 'react'
import tw from 'twrnc';
import * as Animatable from 'react-native-animatable';
import * as Progress from 'react-native-progress';
import {useNavigation} from "@react-navigation/native";
import { useEffect } from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';



const PreparingOrderScreen = () => {

  const navigation = useNavigation();

  useEffect(()=>{
      setTimeout(()=>{
        navigation.navigate("Delivery")
      },4000)
  },[])

  return (
    <SafeAreaView style={tw`bg-[#00ccbb] flex-1 justify-center items-center `}>
      <Animatable.Image
      source={require('../assets/preparing.gif')}
      animation="slideInUp"
      iterationCount={1}
      style={tw`w-96 h-96`}/>
      <Animatable.Text  animation="slideInUp"
      iterationCount={1}
      style={tw`text-lg my-10 text-white text-center font-bold`}>
          Waiting for restaurant to accept your order
      </Animatable.Text>
      <Progress.Circle
        color="white" size={60} indeterminate={true} fill="none"/>
    </SafeAreaView>
  )
}

export default PreparingOrderScreen