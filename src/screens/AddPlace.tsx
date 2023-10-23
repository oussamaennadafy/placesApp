import { View, Text, StyleSheet, TextInput, Pressable, KeyboardAvoidingView, PermissionsAndroid, Image, ImageSourcePropType } from 'react-native'
import React, { useEffect, useState } from 'react'
import RootStackParamList from '../types/RootStackParamList'
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { COLORS } from '../constants/colors';
import MainButton from '../components/shared/MainButton';
import { launchCamera, launchImageLibrary, Asset } from 'react-native-image-picker';
import Geolocation from 'react-native-geolocation-service';

import Mapbox from '@rnmapbox/maps';
import { useNavigation, useIsFocused } from '@react-navigation/native';
import { useDispatch } from 'react-redux';
import { placesAction } from '../store/slices/places-slice';

type AddPlaceScreenProps = NativeStackScreenProps<RootStackParamList, 'AddPlace'>;

export default function AddPlace({ route, navigation }: AddPlaceScreenProps)
{
  const [title, setTitle] = useState<string>("");
  const [image, setImage] = useState<string>("");
  const [location, setLocation] = useState<{ lat: number, lon: number }>();
  const isFocused = useIsFocused()
  const dispatch = useDispatch()

  const handleImage = async (sourceOfImage: "fromCamera" | "fromGallery") =>
  {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.CAMERA);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {

        if (sourceOfImage === "fromCamera") {
          launchCamera({ mediaType: 'photo' }, function (response)
          {
            if (response.didCancel) return;
            // set the image
            setImage(response.assets?.[0].uri)
          })
        } else if (sourceOfImage === "fromGallery") {
          launchImageLibrary({ mediaType: 'photo' }, function (response)
          {
            if (response.didCancel) return;
            // set the image
            setImage(response.assets?.[0].uri)
          })
        }
      } else {
        console.log('Camera permission denied');
      }
    } catch (err) {
      console.warn(err);
    }
  }

  const chooseCurrentLocation = async () =>
  {
    try {
      const granted = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION);

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        // 

        // console.log('hh');
        Geolocation.getCurrentPosition(
          (position) =>
          {
            setLocation({ lat: position.coords.latitude, lon: position.coords.longitude })
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

  const pickLocation = () =>
  {
    navigation.navigate("Map");
  }

  useEffect(() =>
  {
    setLocation(route.params?.location)
  }, [isFocused])

  const handleAddPlace = () =>
  {
    const place = {
      id: Math.random() * 100_000,
      title,
      image,
      location,
    }

    dispatch(placesAction.addPlace(place))
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior="height"
      keyboardVerticalOffset={100} // Adjust as needed
    >
      <View style={styles.container}>
        <Text style={styles.text}>Title</Text>
        <TextInput
          style={styles.input}
          value={title}
          onChangeText={setTitle}
          placeholder='title of place'
        />
        <View style={styles.imagePreviewContainer}>
          {
            image ? <Image style={{ flex: 1 }} source={{ uri: image }} resizeMode='contain' /> :
              <View style={styles.imagePreviewBox}>
                <Text style={styles.textBlack}>no image selected</Text>
              </View>
          }
        </View>
        <View style={styles.buttonsConatiner}>
          <MainButton icon={require('./../assets/camera.png')} label='Take image' onPress={() => handleImage("fromCamera")} />
          <MainButton icon={require('./../assets/gallery.png')} label='select image' onPress={() => handleImage("fromGallery")} />
        </View>
        <View style={styles.imagePreviewContainer}>
          {
            location ? (
              <Mapbox.MapView style={styles.map} />
            )
              : (
                <View style={styles.imagePreviewBox}>
                  <Text style={styles.textBlack}>no locations picked</Text>
                </View>
              )
          }

        </View>
        <View style={styles.buttonsConatiner}>
          <MainButton icon={require('./../assets/location.png')} label='choose current location' onPress={chooseCurrentLocation} />
          <MainButton icon={require('./../assets/maps.png')} label='pick location' onPress={pickLocation} />
        </View>
        <Pressable onPress={handleAddPlace} style={styles.submitButton}>
          <Text style={styles.submitButtonText}>Add Place</Text>
        </Pressable>
      </View>
    </KeyboardAvoidingView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 15,
  },
  text: {
    color: COLORS.primary100,
    fontSize: 16
  },
  input: {
    flex: 1,
    backgroundColor: COLORS.primary100,
    minHeight: 40,
    maxHeight: 40,
    paddingHorizontal: 10
  },
  imagePreviewContainer: {
    minHeight: 200,
    borderRadius: 4,
    overflow: "hidden",
  },
  imagePreviewBox: {
    flex: 1,
    backgroundColor: COLORS.primary200,
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    flex: 1,
  },
  textBlack: {
    color: "black"
  },
  buttonsConatiner: {
    flexDirection: "row",
    gap: 10
  },
  submitButton: {
    // flex: 1,
    paddingHorizontal: 8,
    paddingVertical: 12,
    marginTop: 5,
    backgroundColor: COLORS.primary500,
    alignItems: "center",
    justifyContent: "center",
  },
  submitButtonText: {
    color: COLORS.primary100,
    fontSize: 16
  }
});