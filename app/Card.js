import React from 'react';
import {
    Animated, Dimensions,
    Image, PanResponder,
    ScrollView, StyleSheet, Text, View,
} from 'react-native'

import { icons } from './constants'
const {width, height} = Dimensions.get('window')

const cardBaseHeight = height*0.55
const cardBaseWidth = width*0.7
const cardFinalHeight = 130
const topY = -(height - cardBaseHeight)+cardFinalHeight/2-30-5
    //diff between cardHeight and hegih of device minus final card height and fake header from index.js. Roughly :)

class Card extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            anim: new Animated.ValueXY(),
            pan: new Animated.ValueXY(),
            animValue: {x: 0, y: 0},
            base: true,
            first: false,
            second: false
        }
        this._handleRelease = this._handleRelease.bind(this);
        this.goToBase = this.goToBase.bind(this);
        this.goToFirst = this.goToFirst.bind(this);
        // this.goToThirdBase = this.goToThirdBase.bind(this);
    }

    componentWillMount() {
        this.state.anim.addListener(value => this.state.animValue = value);
        this.state.anim.addListener(this.props.animateMain);
        this._panResponder = PanResponder.create({
            onMoveShouldSetResponderCapture: () => true,
            onMoveShouldSetPanResponderCapture: () => true,
            onPanResponderGrant: (e, gestureState) => {
                this.state.anim.setOffset({
                    x: this.state.animValue.x, y: this.state.animValue.y
                })
                this.state.anim.setValue({x: 0, y: 0});
                this.props.animating(true)
            },
            onPanResponderMove: Animated.event([
                null, {dy: this.state.anim.y}
            ]),
            onPanResponderRelease: this._handleRelease,
            onPanResponderTerminate: this._handleRelease
        })
    }

    componentWillUnmount() {
        this.state.anim.removeAllListeners()
    }

    _handleRelease(e, gestureState) {
        this.state.anim.flattenOffset()
        const {dx, dy} = gestureState
        // DY is reseted after _handleRelease!!!!!!!!
        // console.log(dy);
        if (dy >= -25) this.goToBase() // going up from firstt base
        else {
            if (this.state.base) {
                this.goToFirst()
            }
            else if (this.state.first) {
                this.goToSecond()
            }
        //     else {
        //         this.goToThirdBase()
        //     }
        }
        this.props.animating(false)
    }

    goToBase() {
        Animated.spring(this.state.anim, {
            toValue: 0
        }).start(() => {
            this.setState({base: true, first: false})
            // this.props.animating(false)
        })
    }

    goToFirst() {
        Animated.timing(this.state.anim, {
            toValue: {x: 0, y: -100}, duration: 300
        }).start(() => {
            this.setState({first: true, second: false, base: false})
            this.props.animating(false)
        })
    }

    goToSecond() {
        Animated.timing(this.state.anim, {
            toValue: {x: 0, y: topY}, duration: 800
        }).start(() => {
            this.setState({secondBase: false, thirdBase: true})
            this.props.animating(true)
        })
    }

    render() {
        const { city } = this.props
        const { name, img, blob, rating, users, coordinates } = city
        const { y } = this.state.anim
        return (
            <View
                style={styles.wrapper}>
                <Animated.View style={[
                    styles.cardShadow, styles.animationWrap, {
                        transform: [{translateY: y}]
                    }]}
                    {...this._panResponder.panHandlers}
                    >
                    <Animated.Image source={{uri: img}}
                        style={[styles.cardBase, getBaseCardStyle(y)]}
                        >
                        <View style={styles.cardTextsWrapper}>
                            <Text style={styles.fontCardTitle}>
                                {name.toUpperCase()}
                            </Text>
                            <View style={styles.cardCoordinatesWrapper}>
                                <Text style={styles.fontCardCoordinates}>
                                    {coordinates[0]}
                                </Text>
                                <Image source={{uri: icons.locationIconFull}}
                                    style={styles.locationIconFull}
                                    />
                                <Text style={styles.fontCardCoordinates}>
                                    {coordinates[1]}
                                </Text>
                            </View>
                        </View>

                    </Animated.Image>
                </Animated.View>
                <View style={styles.cardShadow}>
                    <Animated.View style={[
                        styles.bottomCardBase, getBottomCardStyle(y)]}>
                            <Content y = {y} city = {city} />
                    </Animated.View>
                </View>
            </View>
        )
    }
}

export default Card;

const tresholds = [ topY, -125, -100, 0 ]

getBaseCardStyle = y => {
    return {
        width: y.interpolate({
            inputRange: tresholds,
            outputRange: [width, cardBaseWidth, cardBaseWidth, cardBaseWidth],
            extrapolate: 'clamp'
        }),
        height: y.interpolate({
            inputRange: tresholds,
            outputRange: [cardFinalHeight, cardBaseHeight, cardBaseHeight, cardBaseHeight],
            extrapolate: 'clamp'
        }),
        borderRadius: y.interpolate({
            inputRange: tresholds,
            outputRange: [0, 8, 8, 8],
            extrapolate: 'clamp'
        })
    }
}

getBottomCardStyle = y => {
    return {
        left: y.interpolate({
            inputRange: tresholds,
            outputRange: [-width/2, -width*0.9/2, -width*0.8/2, -cardBaseWidth/2],
            extrapolate: 'clamp'
        }),
        top: y.interpolate({
            inputRange: tresholds,
            outputRange: [-cardBaseHeight, -cardBaseHeight, -cardBaseHeight, -cardBaseHeight],
            extrapolate: 'clamp'
        }),
        width: y.interpolate({
            inputRange: tresholds,
            outputRange: [width, width*0.9, width*0.8, cardBaseWidth],
            extrapolate: 'clamp'
        }),
        height: y.interpolate({
            inputRange: tresholds,
            outputRange: [height-30, height*0.75, height*0.62, cardBaseHeight],
            extrapolate: 'clamp'
        }),
        opacity: y.interpolate({
            inputRange: [-100, 0],
            outputRange: [1, 0]
        }),

    }
}

getContentStyle = y => {
    return {
    }
}


// COMPONENTS:

const Content = ({y, city}) => (
    <Animated.View style={[styles.contentBase, getContentStyle(y)]} >
        <BasicInfo city = {city} />
        <Users users = {city.users} />
    </Animated.View>
)

const BasicInfo = ({city}) => (
    <View>
        <Text style={styles.fontCityBlob}>
            {city.blob}
        </Text>
        <Stars rating = {city.rating} id = {city.id} />
    </View>
)

const Stars = ({rating, id}) => {
    return (
        <View style={{flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginTop: 2}}>
            <Text style={{color: '#333', fontSize: 12}}>
                {`NO. ${id}`}
            </Text>
            <View  style={{flexDirection: 'row'}}>
                {[1,2,3,4,5].map(item => {
                    if (item <= rating) {
                        return (
                            <Image key={'start',item}
                                source={{uri: icons.starIconFull}} style={styles.starIcon} />
                        )
                    } else {
                        return (
                            <Image key={'start',item}
                                source={{uri: icons.starIconOutline}} style={styles.starIcon} />
                        )
                    }
                })}
            </View>
        </View>
    )
}

const Users = ({users}) => (
    <View style={{flexDirection: 'row'}}>
        {users.map((user, idx) => (
                <Image key = {'avatar',idx}
                    source={{uri: user.avatar}}
                    style={[{transform: [{translateX: -6*idx}]}, styles.avatarStyle]} />
        ))}
    </View>
)

const styles = StyleSheet.create({
    cardShadow: {
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.4, shadowRadius: 8,
    },
    wrapper: {
        alignItems: 'center', justifyContent: 'center',
        paddingHorizontal: width*0.15,
        width: width
    },
    animationWrap: {
        width: width, justifyContent: 'center', alignItems: 'center',
        backgroundColor: 'transparent',
        zIndex: 10
    },
    cardBase: {
        width: width*0.7,
        height: cardBaseHeight, resizeMode: 'cover'
    },
    cardTextsWrapper: {
        paddingVertical: 20, flex: 1,justifyContent: 'space-between'
    },
    cardCoordinatesWrapper: {
        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10
    },
    locationIconFull: {
        width: 20, height: 20, resizeMode: 'contain', tintColor: 'white'
    },
    bottomCardBase: {
        position: 'absolute',
        borderRadius: 8,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        backgroundColor: 'seashell',
    },
    contentBase: {
        height: 125,
        paddingVertical: 5, paddingHorizontal: 10,
        justifyContent: 'space-around'
    },
    fontCityBlob: {
        textAlign: 'center', color: '#333', fontSize: 16,
        paddingBottom: 5
    },
    avatarStyle: {
        width: 34, height: 34, borderRadius: 17, resizeMode: 'cover',
    },
    starIcon: {
        width: 20, height: 20, resizeMode: 'contain', tintColor: '#9297C8'
    },
    fontCardTitle: {
        textAlign: 'center', color: 'white', fontSize: 22, letterSpacing: 2,
        textShadowOffset: {width: 3, height: 3}, textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowRadius: 4
    },
    fontCardCoordinates: {
        color: 'white', fontSize: 16, letterSpacing: 1,
        textShadowOffset: {width: 2, height: 2}, textShadowColor: 'rgba(0,0,0,0.6)',
        textShadowRadius: 4
    },

})
