import 'react-native-gesture-handler';
import React, {useEffect, useState, useRef} from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, TouchableOpacity, SafeAreaView, ImageBackground, Animated } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getStorage, ref, uploadBytes } from "firebase/storage";
import * as ImagePicker from 'expo-image-picker';
import uuid from 'react-native-uuid';

export default function AddPost({route, navigation}) {
  const insets = useSafeAreaInsets();

  const progress = useRef(new Animated.Value(1)).current

  useEffect(() => {
    console.log("animation started")
    Animated.loop(
      Animated.sequence([
        Animated.timing(progress, {
          toValue: 3,
          duration: 800,
          useNativeDriver: false,
        }),
        Animated.timing(progress, {
          toValue: 1,
          duration: 800,
          useNativeDriver: false,
        }),
      ]),
    ).start();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: 'rgb(0,0,0)'}}>

      <View style={styles.containerHeader}>
        <Animated.Image source={require('./assets/photos/foto2.png')}
          style={{
            height: 100,
            width: 100,
            borderRadius: 100,
            borderWidth: progress,
            borderColor: "rgb(255,255,255)"
          }}>
        </Animated.Image>
        <View style={{alignItems: "center"}}>
          <Text style={{color: "rgb(255,255,255)", fontWeight: "bold", fontSize: 17.5, marginTop: 10}}>@mendes_e_heloisa</Text>
          <Text style={{color: "rgb(255,255,255)", fontSize: 12.5, marginTop: 5}}>1.3M Seguidores</Text>
        </View>
      </View>

      <View style={styles.containerBio}>
        <Text style={{color: "rgb(255,255,255)", fontSize: 15, fontWeight: "bold", margin: 15}}>Início do namoro: 30/07/2022</Text>
        <Text style={{color: "rgb(255,255,255)", fontSize: 15, fontWeight: "bold", margin: 15}}>Amor na relação: Infinito ao quadrado</Text>

        <View style={{backgroundColor: "rgb(25,25,25)", flex: 1, borderRadius: 15, margin: 15}}>
          <Text style={{color: "rgb(255,255,255)", fontSize: 15, fontWeight: "bold", margin: 15}}>
            Aqui está um presente para nós meu amor, desta forma conseguimos partilhar nossas fotos e todos os momentos bons que experienciamos.
          </Text>
          <Text style={{color: "rgb(255,255,255)", fontSize: 15, fontWeight: "bold", margin: 15}}>
            Amo-te fofinha❤️.
          </Text>
          <Text style={{color: "rgb(255,255,255)", fontSize: 15, fontWeight: "bold", margin: 15}}>
            Assinado: amor da tua vida❤️
          </Text>
        </View>
        
      </View>
      
      <View style={{alignItems: "center"}}>
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

          <TouchableOpacity onPress={() => {navigation.navigate("AddPost")}}>
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

          <TouchableOpacity>
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

  containerHeader: {
    backgroundColor: "rgb(25,25,25)",
    flex: 0.4,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },

  containerBio: {
    backgroundColor: "rgb(50,50,50)",
    flex: 0.6,
    width: "100%",
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