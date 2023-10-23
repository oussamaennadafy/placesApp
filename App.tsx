// In App.js in a new project

import * as React from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Places from './src/screens/Places';
import AddPlace from './src/screens/AddPlace';
import Place from './src/screens/Place';
import { COLORS } from './src/constants/colors';
import { StatusBar } from 'react-native';
import PlusButton from './src/components/places/PlusButton';
import RootStackParamList from './src/types/RootStackParamList';
import { Provider } from 'react-redux';
import store from './src/store';
import Mapbox from '@rnmapbox/maps';
import Map from './src/screens/Map';


Mapbox.setAccessToken("pk.eyJ1Ijoid2VuYXlhIiwiYSI6ImNsbzFmMmlxbzA4Z3Aya21zM2hmaGVrenQifQ.SyMyLp9JXRtcPPLIBCRqzw")

const Stack = createNativeStackNavigator<RootStackParamList>();

function Navigator()
{

  const navigation = useNavigation<any>();

  const onPress = () =>
  {
    navigation.navigate('AddPlace')
  }

  return (
    <Provider store={store}>
      <Stack.Navigator screenOptions={{
        headerStyle: {
          backgroundColor: COLORS.primary200
        },
        headerTintColor: COLORS.gray700,
        contentStyle: {
          backgroundColor: COLORS.primary800,
          paddingHorizontal: 20,
          paddingVertical: 25
        },
      }}>

        <Stack.Screen name="Places" component={Places} options={{
          title: "Your Places",
          headerRight: () => <PlusButton onPress={onPress} />,
        }} />

        <Stack.Screen name="AddPlace" component={AddPlace} options={{
          title: "add new Place"
        }} />

        <Stack.Screen name="Place" component={Place} />


        <Stack.Screen name="Map" component={Map} />

      </Stack.Navigator>
    </Provider>
  )

}

function App()
{

  return (
    <NavigationContainer>
      <StatusBar backgroundColor={COLORS.primary200} />
      <Navigator />
    </NavigationContainer>
  );
}

export default App;