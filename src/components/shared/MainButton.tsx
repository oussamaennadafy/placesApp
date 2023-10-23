import { View, Text, Pressable, Image, StyleSheet } from 'react-native'
import React from 'react'
import { COLORS } from '../../constants/colors';

export default function MainButton({ icon, label, onPress }: { icon: number, label: string, onPress: () => void })
{
 return (
  <Pressable style={styles.button} onPress={onPress}>
   <Image style={styles.icon} source={icon} resizeMode='contain' />
   <Text style={styles.label}>{label}</Text>
  </Pressable>
 )
}

const styles = StyleSheet.create({
 button: {
  flex: 1,
  borderWidth: 1,
  borderColor: COLORS.primary100,
  alignItems: "center",
  // justifyContent: "",
  flexDirection: "row",
  paddingVertical: 10,
  paddingHorizontal: 13,
  gap: 8
 },
 icon: {
  height: 22,
  width: 30
 },
 label: {
  color: COLORS.primary100,
 },
});