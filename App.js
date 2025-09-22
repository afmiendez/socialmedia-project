import 'react-native-gesture-handler';
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, FlatList, Image, useState, TouchableOpacity, RefreshControl, useCallback, useEffect } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { getFirestore, collection, getDocs, getDoc } from "firebase/firestore";
import { getStorage, ref, getDownloadURL, listAll, list } from "firebase/storage";
import storage from '@react-native-firebase/storage';
import { Dimensions } from 'react-native';

import SeeImage from './SeeImage';
import AddPost from './addPost';
import Profile from './Profile';
import db from './firebase';

const Stack = createStackNavigator();

export default function App() {

  const rightToLeftAnimation = {
    cardStyleInterpolator: ({ current, layouts }) => {
      return {
        cardStyle: {
          transform: [
            {
              translateX: current.progress.interpolate({
                inputRange: [0, 1],
                outputRange: [layouts.screen.width, 0],
              }),
            },
          ],
        },
      };
    },
  };

  return (

    <NavigationContainer theme={DarkTheme}>

      <Stack.Navigator screenOptions={{headerShown: false}} >

        <Stack.Screen name="Home" component={HomeScreen}/>
        <Stack.Screen name="SeeImage" component={SeeImage} options={rightToLeftAnimation}/>
        <Stack.Screen name="AddPost" component={AddPost}/>
        <Stack.Screen name="Profile" component={Profile}/>
        
      </Stack.Navigator>

    </NavigationContainer>

  );
}

function HomeScreen({ navigation }) {

  const winWidth = Dimensions.get('window').width;
  const winHeight = Dimensions.get('window').height;
  const ratioH = winHeight/200;
  const ratioW = winWidth/160;

  const [urlList, setUrlList] = React.useState([]);

  React.useEffect(() => {
    var testLista = [];
    const func = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'photos/');

      listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            //console.log(itemRef)
          });
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((x) => {
              testLista.push(x);
            })
          });
        }).catch((error) => {
          console.log("Error: ", error);
        });
    }

    func();

    setUrlList(testLista);
  }, []);

  const images = [

  ];

  const getItemLayout = (data, index) => (
    {length: 200, offset: 200 * index, index}
  );

  const onPressFunction = (item, index) => {
    console.log(item);
    navigation.navigate("SeeImage", {
      sourceForImg: item,
      indexForImg: index,
    });
  }

  const [praiseList, setPraiseList] = React.useState(images);

  const [refreshing, setRefreshing] = React.useState(false);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    console.log("started");

    var testLista = [];
    const func = async () => {
      const storage = getStorage();
      const listRef = ref(storage, 'test/');

      listAll(listRef)
        .then((res) => {
          res.prefixes.forEach((folderRef) => {
            //console.log(itemRef)
          });
          res.items.forEach((itemRef) => {
            getDownloadURL(itemRef).then((x) => {
              testLista.push(x);
            })
          });
        }).catch((error) => {
          console.log("Error: ", error);
        });
    }

    func();
    setUrlList(testLista);

    setTimeout(() => {
      setRefreshing(false);
      console.log("ended");
    }, 500);
  }, []);

  const navigateFunction = (props) => {
    navigation.navigate(props);
  }
  
  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <Text style={styles.title}>Tudo</Text>
        <View style={styles.whiteLine}></View>
      </View>

      <View style={styles.containerPhoto}>

        <FlatList
          key={'#'}
          numColumns={2}
          data={urlList}
          extraData={urlList}
          initialNumToRender={1}
          maxToRenderPerBatch={1}
          resizeMethod="resize"
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
          renderItem={ ({ item, index }) => (
            <TouchableOpacity onPress={() => onPressFunction(item, index)} >
              <Image source={{uri: item}}
                key={index} 
                style={{
                  height: 72 * ratioH,
                  width: 72 * ratioW,
                  borderRadius: 20,
                  margin: 10,
                }}
              />
            </TouchableOpacity>
          )}
        />

      </View>

      <View style={styles.bottomBar}>
        <TouchableOpacity>
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
              height: 25,
              width: 25,
              marginTop: 1,
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigateFunction("AddPost")}>
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

        <TouchableOpacity onPress={() => navigateFunction("Profile")}>
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
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgb(0,0,0)',
    alignItems: 'center',
  },

  item: {
    flex: 0.2,
    alignItems: "center",
    zIndex: 1,
  },

  topBar: {
    width: "100%",
    height: "10%",
    backgroundColor: "rgb(0,0,0)",
    alignItems: "center",
  },

  bottomBar: {
    width: "90%",
    height: "6%",
    backgroundColor: "rgb(0,0,0)",
    flexDirection: 'row',
    justifyContent: "space-between",
  },

  title: {
    color: "rgb(255,255,255)",
    fontWeight: "500",
    marginTop: "10%",
    fontSize: 17,
  },

  whiteLine: {
    backgroundColor: "rgb(255,255,255)",
    width: "12%",
    height: "5%",
    marginTop: "0.5%",
    borderRadius: 5,
  },

  containerPhoto: {
    backgroundColor: "rgb(0,0,0)",
    flex: 1,
    width: "100%",
  },
});