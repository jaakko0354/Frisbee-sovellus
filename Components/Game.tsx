import React, {useState,useEffect} from 'react';
import { Button, Input, Text, View } from 'native-base';
import MapView, { Marker, Polyline} from 'react-native-maps';
import * as Location from 'expo-location';
import * as geolib from 'geolib';
import { styles } from './Styles';
import { firebaseConfig } from './Firebase';
import { Address } from './Types';
import { getDatabase, push, ref, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';

export default function Game({navigation}: {navigation: any}) {
    initializeApp(firebaseConfig);
    const database = getDatabase();
    const [location, setLocation] = useState(null);
    const [startingpoint, setStartingpoint] = useState(null);
    const [throwDistance, setThrowDistance] = useState(null);
    const [polylineCoordinates, setPolylineCoordinates] = useState([]);
    const [playerScore, setPlayerScore] = useState(0);
    const [gameStarted, setGameStarted] = useState(false);
    const [gameEnded, setGameEnded] = useState(false);
    const mapRef = React.useRef<MapView>(null);
    const [coords, setCoords] = useState({
        latitude: 0,
        longitude: 0,
    });
    const [discName, setDiscName] = useState('');

    useEffect(() => {
        //Pohjautuu https://docs.expo.io/versions/latest/sdk/location/
        const getLocation = async () => {
            try {
                const { status } = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }
                const location = await Location.getCurrentPositionAsync({});
                updateLocation(location);
                if (!startingpoint) {
                    setStartingpoint(location.coords);
                    setPolylineCoordinates([{latitude: location.coords.latitude, longitude: location.coords.longitude}])
                } else {
                    //Pohjautuen  https://www.npmjs.com/package/geolib
                    const distance = startingpoint && geolib.getDistance(
                      {latitude: startingpoint.latitude, longitude: startingpoint.longitude},
                      {latitude: location.coords.latitude, longitude: location.coords.longitude}
                    );
                    //Polyline coordinates are used to draw a line on the map 
                    setThrowDistance(distance);
                    setPolylineCoordinates([...polylineCoordinates, {latitude: location.coords.latitude, longitude: location.coords.longitude}])
                }
            } catch (error) {
                    console.log(error);
            }
        };
        if(gameStarted){
            getLocation();
        }
    }, [gameStarted]);

        
    useEffect(() => {
        let initialLocation: any = null;
        const startWatching = async () => {
            try {
                const {status} = await Location.requestForegroundPermissionsAsync();
                if (status !== 'granted') {
                    console.log('Permission to access location was denied');
                    return;
                }
                initialLocation = await Location.watchPositionAsync(
                    {accuracy: Location.Accuracy.BestForNavigation, distanceInterval:1},
                    (location) => updateLocation(location),
                );
                
            } catch(error) {
                console.log(error);
            }
        };
                startWatching();

            return () => {
                if(initialLocation) {
                    initialLocation.remove();
                }
            }
    },[gameStarted]);

    const updateLocation = (location) => {
        if(!startingpoint) {
            setStartingpoint(location.coords);
            setPolylineCoordinates([{latitude: location.coords.latitude, longitude: location.coords.longitude}])
        } else {
            const newPolylineCoordinates = [{latitude: startingpoint.latitude, longitude: startingpoint.longitude}, {latitude: location.coords.latitude, longitude: location.coords.longitude}    ];
            setPolylineCoordinates(newPolylineCoordinates);
            const distance =  startingpoint && geolib.getDistance(
                {latitude: startingpoint.latitude, longitude: startingpoint.longitude},
                {latitude: location.coords.latitude, longitude: location.coords.longitude}
            );
            setThrowDistance(distance);
            }
          setLocation(location);
    };
    

    useEffect(() => {
        if (location && mapRef.current) {
            const lastCoords = polylineCoordinates[polylineCoordinates.length - 1];
            const distance = startingpoint && geolib.getDistance(
                {latitude: lastCoords.latitude, longitude: lastCoords.longitude},
                {latitude: location.coords.latitude, longitude: location.coords.longitude}
            );
            if (distance > 5) {
            mapRef.current.animateToRegion({
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            });
            }
        }
    }, [location]);

    const Region =  location ? {
        latitude: location.coords.latitude,
        longitude: location.coords.longitude,
        latitudeDelta: 0.002,
        longitudeDelta: 0.002
    } : null;

    const saveData = (address:Address) => {
        const dataRef = ref(database, 'addresses/');
        const newAddressRef = push(dataRef)
        const addressId = newAddressRef.key;
        set(newAddressRef, {
            id: newAddressRef.key,
            discName: address.discName,
            throwDistance: address.throwDistance,
            latitude: address.latitude,
            longitude: address.longitude,
        });
    }
    

    return(
        <View style={styles.container}>
            {location && (
                <MapView style={styles.map} 
                region={Region}
                showsUserLocation={true}
                followsUserLocation={false}
                ref={mapRef}
                >
                {startingpoint && 
                    <Marker 
                    coordinate={{latitude: startingpoint.latitude, longitude: startingpoint.longitude}}
                    title="Starting point"
                    />
                }
                {polylineCoordinates.length > 0 && (
                    <Polyline
                    coordinates={[...polylineCoordinates]}
                    strokeColor='black'
                    strokeWidth={2} 
                    lineDashPattern={[5, 5]}/>
                )}
                </MapView>
            )}
            {!gameStarted && (
                <View style={styles.startGameView}>
                    <Text style={styles.startGameText}>Heitä heitto ja ala mittaamaan heiton pituutta painamalla aloita mittaus.</Text>
                    <Button style={styles.startGameButton}  onPress={() => {
                        setGameStarted(true);
                    }}><Text style={{fontSize:18, fontWeight:'bold'}}>ALOITA MITTAUS</Text></Button>
                </View>
            )}
            {gameStarted && !gameEnded &&(
                <View style={styles.gameView}>
                    <Text style={styles.gameStatHeader}>Kävele kiekolle</Text>
                    <Text style={styles.gameStat}> Heiton pituus: {throwDistance} m</Text>
                    <Button style={styles.buttonViewSave} onPress={() => {
                    setPlayerScore(throwDistance)
                    setGameEnded(true);
                    }}><Text style={{fontSize:20,fontWeight:'bold'}}>Aseta pituus</Text></Button>
                </View>
            )}
             
             {gameEnded && (
                <View style={styles.score}>
                            <Text style={styles.scoreText}>Tarkastele heittoa:</Text>
                            <View style={{width:'80%'}}>
                            <Input style={styles.scoreInput} placeholder="Syötä kiekon nimi" onChangeText={(text) => setDiscName(text)}></Input>
                            </View>
                            <Text style={{height:1,backgroundColor:'black', width:'80%', marginVertical:13}}></Text>
                            <Text style={styles.scoreText}>Heiton pituus: {playerScore} metriä</Text>
                    <Button style={styles.saveGameButton} onPress={() => {
                        setCoords({latitude: location.coords.latitude, longitude: location.coords.longitude});
                        saveData({discName: discName, throwDistance: playerScore, latitude: location.coords.latitude, longitude: location.coords.longitude, id: ''});
                        navigation.navigate('Kartta');
                    }}><Text style={{color:'black', fontSize:18, fontWeight:'bold'}}>Tallenna Peli</Text></Button>
                </View>
             )}
        </View>
    );
}