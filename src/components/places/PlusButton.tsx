import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'

export default function PlusButton({ onPress }: { onPress: () => void })
{
 return (
  <Pressable onPress={onPress} style={styles.button}>
   <Image style={styles.icon} source={require('./../../assets/plus.png')} resizeMode='cover' />
  </Pressable>
 )
}

const styles = StyleSheet.create({
 button: {
  marginRight: 5
 },
 icon: {
  width: 20,
  height: 20
 },
});