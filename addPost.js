import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

export default function AddPost({route, navigation}) {
  const insets = useSafeAreaInsets();

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
  }, []);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      const storage = getStorage();
      const refValue = ref(storage, 'photos/' + uuid.v4());

      const img = await fetch(result.assets[0].uri);
      const bytes = await img.blob();

      await uploadBytes(refValue, bytes);
      navigation.navigate("Home");
    }
  }

  return (
    <View style={{flex: 1, alignItems: "center", backgroundColor: 'rgb(0,0,0)'}}>

      <View style={styles.topBar}>
        <Text style={styles.title}>Adicione um Post</Text>
        <View style={styles.whiteLine}></View>
      </View>

      <View style={styles.containerPhoto}>
        <TouchableOpacity onPress={pickImage}>
          <Image
            source={require('./assets/photos/pluswhite.png')}
            style={styles.img}
          >

          </Image>
        </TouchableOpacity>
      </View>
      
      <View style={styles.bottomBar}>
        <TouchableOpacity onPress={() => {navigation.navigate("Home")}}>
          <Image
            source={require('./assets/photos/home.png')}
            style={{
              height: 50,
              width: 50,
              marginTop: 1,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('./assets/photos/search.png')}
            style={{
              height: 50,
              width: 50,
              marginTop: 1,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('./assets/photos/plus.png')}
            style={{
              height: 50,
              width: 50,
              marginTop: 0,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity>
          <Image
            source={require('./assets/photos/chat.png')}
            style={{
              height: 50,
              width: 50,
              marginTop: 0,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => {navigation.navigate("Profile")}}>
          <Image
            source={require('./assets/photos/person.png')}
            style={{
              height: 50,
              width: 50,
              marginTop: 0,
            }}
          />
        </TouchableOpacity>

      </View>

      <StatusBar style="light"/>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0)',
    alignItems: 'center',
  },

  bottomBar: {
    width: "90%",
    height: "6%",
    backgroundColor: "rgb(0,0,0)",
    flexDirection: 'row',
    justifyContent: "space-between",
  },

  containerPhoto: {
    backgroundColor: "rgb(5,5,5)",
    flex: 1,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  img: {
    backgroundColor: 'rgba(5, 5, 5, 1)',
    height: 150,
    width: 150,
    opacity: 0.1,
  },

  topBar: {
    width: "100%",
    height: "10%",
    backgroundColor: "rgb(0,0,0)",
    alignItems: "center",
  },

  title: {
    color: "rgb(255,255,255)",
    fontWeight: "500",
    marginTop: "10%",
    fontSize: 17,
  },

  whiteLine: {
    backgroundColor: "rgb(255,255,255)",
    width: "40%",
    height: "5%",
    marginTop: "0.5%",
    borderRadius: 5,
  },
});