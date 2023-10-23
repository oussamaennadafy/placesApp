import { View, Text, FlatList, StyleSheet } from 'react-native'
import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../types/RootStackParamList';
import { RootState } from '../store';
import PlaceCard from '../components/places/PlaceCard';
import { COLORS } from '../constants/colors';
import axios from 'axios';
import SERVER from '../constants/serverData';

type AddPlaceScreenProps = NativeStackScreenProps<RootStackParamList, 'Places'>;

export default function Places({ }: AddPlaceScreenProps)
{
 const places = useSelector((state: RootState) => state.places.places);


 if (places.length === 0) {
  return (
   <View style={styles.container}>
    <Text style={styles.text}>No places added yet!</Text>
   </View>
  )
 }

 return (
  <View>
   <FlatList
    data={places}
    renderItem={({ item }) => <PlaceCard item={item} />}
   />
  </View>
 )
}

const styles = StyleSheet.create({
 container: {
  flex: 1,
  alignItems: "center",
  justifyContent: "center"
 },
 text: {
  color: COLORS.primary100
 }
});