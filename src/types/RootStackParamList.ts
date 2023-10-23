import Place from './Place'

type RootStackParamList = {
 Places: undefined,
 AddPlace?: { location: { lat: number, lon: number } },
 Place: { place: Place },
 Map: undefined,
};

export default RootStackParamList;