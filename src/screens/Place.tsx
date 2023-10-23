import { View, Text } from 'react-native'
import React from 'react'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../types/RootStackParamList';

type AddPlaceScreenProps = NativeStackScreenProps<RootStackParamList, 'Place'>;


export default function Place({ }: AddPlaceScreenProps)
{
 return (
  <View>
   <Text>Place</Text>
  </View>
 )
}