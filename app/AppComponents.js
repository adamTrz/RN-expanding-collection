import React, {Component} from 'react'
import {
    Animated, Dimensions, Image, LayoutAnimation,
    ListView, View, Text, StatusBar, StyleSheet
} from 'react-native'
import {
  Asset, Components, Font
} from 'exponent';

import {icons, cities} from './constants'

const {width, height} = Dimensions.get('window')


const AppHeader = ({animatedY}) => (
    <View style={styles.sceneHeader} >
        <Image source={{uri: icons.magifyIcon}}
            style={styles.headerIcon} />
        <Animated.Text style={[styles.fontHeader, {
            opacity: animatedY.interpolate({
                inputRange: [-130 ,-100, 0],
                outputRange: [0, 1, 1]
            })
        }]}>
            TOFIND
        </Animated.Text>
        <Image source={{uri: icons.crosshairIcon}}
            style={styles.headerIcon} />
    </View>
)

const AppFooter = ({index, count, animatedY}) => (
    <Animated.View style = {[styles.sceneFooter, {
        opacity: animatedY.interpolate({
            inputRange: [-130 ,-100, 0],
            outputRange: [0, 1, 1]
            })
        }]}>
        <View style={{paddingBottom: 10}}>
            <Text style={styles.fontFooterCounter}>
                <Text style={{color: '#9297C8'}}>
                    {`${parseInt(index, 10)+1}`}
                </Text>
                <Text>
                    {` / ${count}`}
                </Text>
            </Text>
        </View>
        <View style={styles.footerIconsWrapper}>
            <Image source={{uri: icons.pinIcon}} style={styles.footerIcon}/>
            <Image source={{uri: icons.locationIcon}} style={styles.footerIcon}/>
            <Image source={{uri: icons.userIcon}} style={styles.footerIcon}/>
        </View>
    </Animated.View>
)


module.exports = {
    AppHeader, AppFooter
}

const styles = StyleSheet.create({
    scene: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
    sceneHeader: {
        position: 'absolute', top: 0,
        width: width, height: 30, backgroundColor: 'transparent',
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        paddingHorizontal: 15, paddingTop: 10
    },
    fontHeader: {
        color: 'white', textAlign: 'center', fontWeight: '600',
        flex: 6, fontFamily: 'lato'
    },
    headerIcon: {
        width: 20, height: 20,
        resizeMode: 'contain', tintColor: 'white'
    },
    sceneFooter: {
        position: 'absolute', bottom: 0, width: width,
        justifyContent: 'center', alignItems: 'center',
        paddingVertical: 10, zIndex: 1
    },
    fontFooterCounter: {
        backgroundColor: 'transparent', color: 'white', fontSize: 18, fontFamily: 'lato'
    },
    footerIconsWrapper: {
        flexDirection: 'row', justifyContent: 'space-around',
        width: width, paddingVertical: 5
    },
    footerIcon: {
        width: 22, height: 22, resizeMode: 'contain', tintColor: 'white'
    },
})
