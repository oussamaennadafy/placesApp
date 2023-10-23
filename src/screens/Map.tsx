import { View, Text, Button, PermissionsAndroid } from 'react-native'
import React from 'react'
import Geolocation from 'react-native-geolocation-service'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import RootStackParamList from '../types/RootStackParamList';

type AddPlaceScreenProps = NativeStackScreenProps<RootStackParamList, 'Map'>;


export default function Map({ navigation }: AddPlaceScreenProps)
{

 const handlePress = async () =>
 {
  try {
   const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

   if (granted === PermissionsAndroid.RESULTS.GRANTED) {
    // 

    // console.log('hh');
    Geolocation.getCurrentPosition(
     (position) =>
     {
      const location = {
       latitude: position.coords.latitude,
       longitude: position.coords.longitude,
      }

      navigation.navigate<any>("AddPlace", { location })
     },
     (err) => console.log(err)
    )
    // Geolocation.getCurrentPosition((position))

   } else {
    console.log('Camera permission denied');
   }
  } catch (err) {
   console.warn(err);
  }
 }

 return (
  <View>
   <Text>Map</Text>
   <Button title='select location' onPress={handlePress} />
  </View>
 )
}