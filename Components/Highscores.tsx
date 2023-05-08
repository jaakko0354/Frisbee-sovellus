import React, { useEffect, useState } from 'react';
import { Button, ScrollView, Text, View, } from 'native-base';
import { AntDesign } from '@expo/vector-icons';
import { getDatabase, onValue, ref, remove, orderByValue, query } from 'firebase/database';
import { Address } from './Types';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from './Firebase';
import { styles } from './Styles';
import { TouchableOpacity } from 'react-native';

export default function Highscores({navigation}: {navigation: any}) {

    initializeApp(firebaseConfig);
    const database = getDatabase();
    const [addresses, setAddresses] = useState<Address[]>([]);

    useEffect(() => fetchData(), []);
    const fetchData = () => {
        try{
        const dataRef = ref(database, 'addresses/');
        onValue(dataRef, (snapshot) => {
            const data = snapshot.val();
            if (data !== null) {
            const addressList: Address[] = Object.values(data);
            setAddresses(addressList);
            } else  {
                setAddresses([]);
            }
        });
        }catch(error){
            console.log(error);
        }
    }

    const handleDeleteAddress = async (address:Address) => {
        const database = getDatabase();
        remove(ref(database, `addresses/${address.id}`));

    };
    return (
        <View style={styles.savedGamesView}>
            {addresses.length === 0 && <Text style={styles.noSavedGamesText}>Ei Tallennettuja Heittoja</Text>}
            <ScrollView style={styles.scrollView}>
            {addresses.map((address,index) => (
                <View key={index} style={styles.savedGamesAddresses}>
                        <Text style={styles.savedGameText}>{address.discName}</Text>
                        <Text style={styles.savedGameText}>Heiton pituus: {address.throwDistance.toFixed(0)} metriä</Text>
                        <Button style={styles.savedGamesButton} onPress={() => handleDeleteAddress(address)}>
                            <AntDesign name="delete" size={24} color="red" />
                        </Button>
                </View>
            ))}
            </ScrollView>
        </View>
    );
};
