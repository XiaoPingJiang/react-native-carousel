/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 */
'use strict';
import React, {
  AppRegistry,
  Component,
  StyleSheet,
  Text,
  View,
  Image
} from 'react-native';

var Carousel = require('react-native-carousel');
var Dimensions = require('Dimensions');
var width = Dimensions.get('window').width;
var height = 200;

class myapp extends Component {

  render() {
    return (
        <Carousel style={{width:width, height:height}} delay={2500} indicatorOffset={160} indicatorAtBottom={false} inactiveIndicatorColor={'#fff'} indicatorSize={25} hideIndicators={false}>
        <View style={styles.container}>
          <Image source={{uri:'http://www.harborhousehome.com/UploadFile/CategoryFile/%E5%8F%B0%E7%81%AF.jpg'}} style={{width:width, height:height}}></Image>
            </View>
            <View style={styles.container}>
          <Image source={{uri:'http://www.harborhousehome.com/UploadFile/CategoryFile/%E8%8A%B1%E8%8A%B1%E7%93%B6.jpg'}} style={{width:width, height:height}}></Image>
            </View>
            <View style={styles.container}>
          <Image source={{uri:'http://www.harborhousehome.com/UploadFile/CategoryFile/%E5%84%BF%E7%AB%A5%E5%AE%B6%E5%85%B7.jpg'}} style={{width:width, height:height}}></Image>
      </View>
    </Carousel>
  );
  }
}

var styles = StyleSheet.create({
  container: {
    width:width,
    height:height,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'gray',
  },
});

AppRegistry.registerComponent('test', () => myapp);
