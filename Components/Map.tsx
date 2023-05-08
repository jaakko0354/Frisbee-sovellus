import React, {useCallback, useState, useEffect } from 'react'
import MapView, { Marker } from 'react-native-maps';
import { ScrollView, Text, View, Button, Image, Switch} from 'native-base'
import { styles } from './Styles';
import { Input, } from 'native-base';
import { getDatabase, push, ref, onValue, set } from 'firebase/database';
import { initializeApp } from 'firebase/app';
import { AntDesign } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons'; 
import { Address, SearchInput, Store } from './Types';
import { firebaseConfig } from './Firebase';
import { Linking ,} from 'react-native';


export default function Map({navigation}: {navigation: any}) {
    initializeApp(firebaseConfig);
    const database = getDatabase();
    
    const mapRef = React.useRef<MapView>(null);
    const [Selected,setSelected] = useState<Address | null>(null);
    const [SelectedStore,setSelectedStore] = useState<Store | null>(null);
    const [showInfo, setShowInfo] = useState<boolean>(false);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [searchResult, setSearchResult] = useState<SearchInput>({
        name: "",
    });
    const [input, setInput] = useState('');
    const [stores, setStores] = useState<Store[]>([]);
    const [openFilter,setOpenFilter] = useState<boolean>(false);
    const [showThrows, setShowThrows] = useState<boolean>(true);

    useEffect(() => fetchData(), []);
    const fetchData = () => {
        try{
        const dataRef = ref(database, 'addresses/');
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if(data !== null){
            const addressList: Address[] = Object.values(data);
            setAddresses(addressList);
            } else {
                setAddresses([]);
            }
        });
        }catch(error){
            console.log(error);
        }
    }
    useEffect(() => fetchStore(), [!showThrows]);
    
    const fetchStore = () => {
        try{
        const storeRef = ref(database, 'stores/');
        onValue(storeRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
            const storeList: Store[] = Object.values(data);
            setStores(storeList);
            } else  {
                setStores([]);
            }
        });
        } catch(error){
            console.log(error);
        }
    };
    const markers = () => {
        if (addresses.length > 0) {
        return addresses.map((address, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={{latitude: address.latitude, longitude: address.longitude}}
                    onPress={(e) => {
                        handleMarkerPress(address);
                        e.stopPropagation();
                    }}
                />
            );
        });
        } else {
            return null;
        }
    };
    const storeMarkers = () => {
        return stores.map((store, index) => {
            return (
                <Marker
                    key={index}
                    coordinate={{latitude: store.latitude, longitude: store.longitude}}
                    onPress={(e) => {
                        handleStorePress(store);
                        e.stopPropagation();
                    }}
                />
            );
        });
    };
    const checkSearch = (input: string, filter: (store:Store) => boolean) => {
        const result: Store[] = stores.filter((store) => filter(store));
        let filterResult:boolean =false;
        if (result.length > 0) {
            if (result.length === 1) {
                setSelectedStore(result[0]);
                setShowInfo(true);
                setOpenFilter(false);
                setInput("");
                mapRef.current?.animateToRegion({
                    latitude: result[0].latitude,
                    longitude: result[0].longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.01,
                });
                filterResult = true;
            } else {
                setOpenFilter(true);
                setSearchResult({name: input});
                filterResult = true;
            }
        }
        return filterResult;
    };
    const handleSearch = async (searchInput:string) => {
        if (searchInput.length >= 3) {
            if (checkSearch(searchInput, (store) => store.name.toLowerCase().includes(searchInput.toLowerCase()))) {
                return
            } else if (checkSearch(searchInput, (store) => store.town.toLowerCase().includes(searchInput.toLowerCase()))) {
                return
            } else {
                alert('Osoitetta ei löytynyt')
            }
            
        } else {
            alert('Anna tarkempi osoite')
        }
    };
    
    const handleMapPress = () => {
        setSelected(null);
        setSelectedStore(null);
        setShowInfo(false);
        
    };
    const handleMarkerPress = async (address: Address) => {
        setSelected(address);
        setShowInfo(true);
        mapRef.current?.animateToRegion({
            latitude: address.latitude,
            longitude: address.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
        })
    }
    const handleStorePress = async (store: Store) => {
        setSelectedStore(store);
        setShowInfo(true);
        mapRef.current?.animateToRegion({
            latitude: store.latitude,
            longitude: store.longitude,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002
        })
    }
    
    const zoomOut = () => {
        mapRef.current?.animateToRegion({
            latitude: 65.1699,
            longitude: 25.9384,
            latitudeDelta: 14,
            longitudeDelta: 14,
        });
    };

    const handleDirectionUrl = () => {
        Linking.openURL(`https://www.google.com/maps/dir/?api=1&destination=${SelectedStore?.latitude},${SelectedStore?.longitude}+&travelmode=driving`);
    };
    
    return(
        <View style={styles.container}>
            <MapView style={styles.map} ref={mapRef} showsCompass={false} showsUserLocation={true} onPress={() => handleMapPress()}>
                {showThrows ? (
                    markers()
                    ) : (
                        storeMarkers()
                        )}
            </MapView>
            {!showThrows && (
                <View style={styles.mapSearch} >
                <Input
                    style={styles.mapSearchInput}
                    placeholder='Etsi Kauppaa...'
                    value={input}
                    onChangeText={(text) => setInput(text)}
                />
                <Button style={styles.mapSearchButton} onPress={() => handleSearch(input)}>
                    <AntDesign name="search1" size={24} color="black" />
                </Button>
            </View>
            )}
            {searchResult.name !== '' && openFilter &&(
                    <View style={styles.searchResultContainer}>
                        <Text style={styles.searchResultText}>Haulla löytyi useampi osoite:</Text>
                        <ScrollView style={{ width: '100%',height:'100%' }}>
                            {stores.filter((store) =>
                                store.town.toLowerCase().includes(searchResult.name.toLowerCase()) ||
                                store.name.toLowerCase().includes(searchResult.name.toLowerCase())
                            ).map((store, index) => (
                                <View style={{ width: '100%' }} key={index}>
                                    <Button
                                        _pressed={{ opacity: 0.5 }}
                                        style={styles.searchResultButton}
                                        onPress={() => {
                                            setSelectedStore(store);
                                            setShowInfo(true);
                                            setOpenFilter(false);
                                            setInput("");
                                            setSearchResult({
                                                name: '',
                                            });
                                            mapRef.current?.animateToRegion({
                                                latitude: store.latitude,
                                                longitude: store.longitude,
                                                latitudeDelta: 0.02,
                                                longitudeDelta: 0.02,
                                            })
                                        }}><Text>{store.name}</Text>
                                    </Button>
                                    <View style={{ height: 1 }}></View>
                                </View>

                            ))}</ScrollView>
                    </View>
            )}
            <View style={styles.switchView}>
                    {showThrows ? (
                        <Button style={styles.switchButton} onPress={() => {setShowThrows(false); zoomOut()}}> 
                            <FontAwesome5 name="store" size={24} color="black"/>
                        </Button>
                    ) : (
                        <Button style={styles.switchButton} onPress={() => {setShowThrows(true); zoomOut()}}>
                            <Text style={styles.switchText}>Näytä heitot</Text>
                        </Button>
                    )}

            </View>
            {showInfo && Selected && (
                    <View style={styles.informationContainer}>
                        <View style={styles.informationContainerHeader}>
                            <Text style={styles.informationTextHeader}>{Selected.discName}</Text>
                        </View>
                        <View style={styles.informationContainerBody}>
                            <Text style={styles.informationText}>Heitetty pituus: {Selected?.throwDistance} metriä</Text>
                        </View>
                    </View>
            )}
            {showInfo && SelectedStore && (
                    <View style={styles.informationContainer}>
                        <View style={styles.informationContainerHeader}>
                            <Text style={styles.informationTextHeader}>{SelectedStore.name}</Text>
                        </View>
                        <View style={styles.informationContainerBody}>
                            <Text style={styles.informationText}>{SelectedStore.town} </Text>
                            <View style={styles.directionButtonContainer}>
                                <Text style={styles.informationText}>Ajo-ohjeet: </Text>
                                <Button style={styles.directionButton} onPress={() => handleDirectionUrl()}><AntDesign name='car' size={24} color='white' /></Button>
                            </View>
                        </View>
                    </View>
            )}
                {!showInfo && showThrows &&(
                    <Button onPress={() => navigation.navigate('Mittaa Heitto')} style={styles.newGameButton}><Text style={{fontSize:18, fontWeight:'bold'}}>Mittaa Heitto</Text></Button>
                )}
        </View>
    );
}