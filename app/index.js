import React, {Component} from 'react'
import {
    Animated, ListView, StatusBar, StyleSheet, Image
} from 'react-native'
import {
  Asset, Components, Font
} from 'exponent';

import Card from './Card'
import {cities} from './constants'
import {AppHeader, AppFooter} from './AppComponents'


const cacheImages = images => {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    } else {
      return Asset.fromModule(image).downloadAsync();
    }
  })
}

const cacheFonts = fonts => {
  return fonts.map(font => Font.loadAsync(font));
}


class App extends Component {
    constructor(props) {
        super(props);
        const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2})
        this.state = {
            loaded: false,
            dataSource: ds.cloneWithRows(cities),
            count: cities.length,
            animatedY: new Animated.Value(0)
        }
        this.handleCardAnimation = this.handleCardAnimation.bind(this)
    }

    componentWillMount() {
        StatusBar.setHidden(true)
        this.loadAssetsAsync()
    }

    async loadAssetsAsync() {
        const imageAssets = cacheImages(
            cities.map(city => city.img)
        )
        const fontAssets = cacheFonts([
            {'lato': require('./assets/LatoRegular.ttf')},
            {'lato_light': require('./assets/LatoLight.ttf')},
            {'lato_italic': require('./assets/LatoLightItalic.ttf')}
        ])
        await Promise.all([
            ...imageAssets,
            ...fontAssets,
        ]);
        this.setState({loaded: true})
    }

    render() {
        const {dataSource, count, currentIndex, disableScroll, animatedY, loaded} = this.state
        if (!loaded) return <Components.AppLoading />
        return (
            <Components.LinearGradient
                colors = {['lightslategrey', 'lightsteelblue']}
                style = {[styles.scene]}>
                <ListView horizontal pagingEnabled
                    scrollEnabled={!disableScroll}
                    onChangeVisibleRows = {this.computeVisible.bind(this)}
                    contentContainerStyle = {{
                        justifyContent: 'center', alignItems: 'center',
                    }}
                    showsHorizontalScrollIndicator = {false}
                    dataSource = {dataSource}
                    renderRow = {this.renderRow}
                    />
                <AppHeader animatedY = {animatedY} />
                <AppFooter index={currentIndex} count = {count}
                    animatedY = {animatedY}
                    />
            </Components.LinearGradient>
        )
    }

    renderRow = (rowData: string, sectionID: number, rowID: number) => {
        return  (
            <Card city = {rowData}
                disableScroll = {this.disableScroll.bind(this)}
                animateMain = {this.handleCardAnimation}
                scrollTo = {this.scrollTo}
                />
            )
    }

    disableScroll = (bool) => {
        this.setState({disableScroll: bool})
    }

    handleCardAnimation = (animated) => {
        const {x, y} = animated
        this.state.animatedY.setValue(y)
    }

    scrollTo = (x) => {
        console.log('scroll to: ',x);
    }

    computeVisible = (visibleRows, changedRows) => {
        // TODO: computeVisible is fired twice per swipe with diff data, use only second one...
        let currentIndex = 0
        const visibleIndexes = Object.keys(visibleRows.s1)
        if (visibleIndexes.length === 1) currentIndex = visibleIndexes[0]
        else if (visibleIndexes.length === 2 && visibleIndexes[0] == 0) currentIndex = visibleIndexes[0]
        else currentIndex = visibleIndexes[1]
        this.setState({currentIndex})
    }

}

export default App;

const styles = StyleSheet.create({
    scene: {
        flex: 1, alignItems: 'center', justifyContent: 'center'
    },
})
