import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import { ref, set, getDatabase,push } from '@firebase/database';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Firebase';
import { NumberInput } from 'native-base';
import { Address } from 'react-native-maps';

type Store = {
  latitude: number;
  longitude: number;
  name: string;
  town: string;
};

function StoreAdder({navigation}: {navigation: any}) {
  const [store, setStore] = useState<Store>({
    latitude: 0,
    longitude: 0,
    name: '',
    town: '',
  });
  const [latitude, setLatitude] = useState<number>(0);
  const [longitude, setLongitude] = useState<number>(0);
  const [name, setName] = useState<string>('');
  const [town, setTown] = useState<string>('');
  const [latitudeText, setLatitudeText] = useState<string>('');
  const [longitudeText, setLongitudeText] = useState<string>('');
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [showInfo, setShowInfo] = useState<boolean>(false);
  
  initializeApp(firebaseConfig);
  const database = getDatabase();

  const addStore = async (newstore:Store) => {
    const storesRef = ref(database, 'stores/');
    try {
      push(storesRef, {
        latitude: newstore.latitude,
        longitude: newstore.longitude,
        name: newstore.name,
        town: newstore.town,
    });
      setStore({
        latitude: 0,
        longitude: 0,
        name: '',
        town: '',
      });
    } catch (error) {
      console.log(error);
    }
  };
  const handleGamePress = (address: Address) => {
    setSelectedAddress(address);
    setShowInfo(true);
  };

  return (
    <View>
      <TextInput
        placeholder="Name"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <TextInput
        placeholder="Town"
        value={town}
        onChangeText={(text) => setTown(text)}
      />
       <TextInput
            placeholder="Latitude"
            value={latitudeText}
            onChangeText={(text) => setLatitudeText(text)}
        />
        <TextInput
            placeholder="Longitude"
            value={longitudeText}
            onChangeText={(text) => setLongitudeText(text)}
        />
        <Button
        title="Add Store"
        onPress={() => {
            const latitudet = parseFloat(latitudeText);
            const longitudet = parseFloat(longitudeText);
            const newStore: Store = {
            latitude: latitudet,
            longitude: longitudet,
            name: name,
            town: town,
            };
            addStore(newStore);
  }}
/>
    </View>
  );
};

export default StoreAdder;