import 'react-native-gesture-handler';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, useState, TouchableOpacity, SafeAreaView, ImageBackground } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

export default function SeeImage({route, navigation}) {
  const { sourceForImg, indexForImg} = route.params;
  console.log(sourceForImg);

  const insets = useSafeAreaInsets();
  return (
    <View style={{paddingTop: insets.top, flex: 1, backgroundColor: 'rgb(40,40,40)'}}>
      <View style={{alignItems: "center", flex: 0.95}}>
        <ImageBackground source={{uri: sourceForImg}}
          key={indexForImg}
          imageStyle={{ borderRadius: 20 }}
          style={{
            height: "99%",
            width: "100%",
            marginTop: 10,
            borderRadius: 20,
          }}
        >
          <TouchableOpacity
            style={styles.button}
            onPress={() => navigation.navigate("Home")}
          >
            <Image
              source={require("./assets/photos/whitearrow.png")}
              style={{
                height: 35,
                width: 35,
                marginTop: 7,
                marginLeft: 6,
              }}
            >

            </Image>
          </TouchableOpacity>
        </ImageBackground>
      </View>

      <View style={{flexDirection: "row"}}>
        <View>
          <Image source={require('./assets/photos/foto2.png')}
            style={{
              height: 60,
              width: 60,
              borderRadius: 100,
              marginTop: 25,
              marginLeft: 10,
              borderWidth: 1,
              borderColor: "rgb(0,0,0)"
            }}>
          </Image>
        </View>
        <View>
          <Text style={{color: "rgb(255,255,255)", fontWeight: "bold", fontSize: 17.5, marginTop: 30, marginLeft: 10}}>mendes_e_heloisa</Text>
          <Text style={{color: "rgb(255,255,255)", fontSize: 12.5, marginLeft: 10}}>1.3M Seguidores</Text>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'rgb(0,0,0)',
      alignItems: 'center',
    },

    containerImg: {
      alignItems: 'center',
    },

    button: {
      backgroundColor: 'rgba(52, 52, 52, 0.8)',
      margin: 5,
      width: 50,
      height: 50,
      borderRadius: 100,
    },
  });