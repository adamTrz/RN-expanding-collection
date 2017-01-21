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
const tresholds = [ topY, -125, -100, 0 ]

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
        this.goTo = this.goTo.bind(this);
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
                this.props.disableScroll(true)
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
        const {base, first, second} = this.state
        // if @base
        if (base) {
            if (dy >= -25) this.goTo('base')
            else if (dy <= -125) this.goTo('second')
            else this.goTo('first')
        }
        else if (first) {
            if (dy < 0 && dy >= -25) this.goTo('second')
            else if (dy > 0) this.goTo('base')
            else this.goTo('second')
        }
        else {
            if (dy < 0) this.goTo('second')
            else this.goTo('base')
        }
    }

    goTo = where => {
        let to = {x: 0, y: 0}
        let base = true, first = false, second = false
        let dragOff = false
        switch (where) {
            case 'first':
                to = {x: 0, y: -100}
                base = false, first = true, second = false
                dragOff = false
                break;
            case 'second':
                to = {x: 0, y: topY}
                base = false, first = false, second = true
                dragOff = true
                break;
        }
        Animated.spring(this.state.anim, {
            toValue: to, friction: 10,
        }).start(() => {
            this.setState({base, first, second})
            this.props.disableScroll(dragOff)
        })
    }

    render() {
        const { city } = this.props
        const { name, img, blob, rating, reviews, id, coordinates } = city
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
                            <BasicInfo city = {city} />
                            <Stars rating = {rating} id = {id} y={y} />
                            <Comments y={y} reviews = {reviews} />
                            <Users reviews = {reviews} y={y} />
                    </Animated.View>
                </View>
            </View>
        )
    }
}

export default Card;

getBaseCardStyle = y => ({
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
})

getBottomCardStyle = y => ({
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
    })
})

// COMPONENTS:

const BasicInfo = ({city}) => (
    <View style={styles.contentBase}>
        <Text style={styles.fontCityBlob}>
            {city.blob}
        </Text>
    </View>
)

const Stars = ({rating, id, y}) => {
    return (
        <Animated.View style={[styles.starsContainer, getStarsStyle(y)]}>
            <Text style={{color: '#333', fontSize: 12}}>
                {`NO. ${id}`}
            </Text>
            <View  style={{flexDirection: 'row'}}>
                {[1,2,3,4,5].map(item => {
                    if (item <= rating) return (
                        <Image key={'start',item}
                            source={{uri: icons.starIconFull}} style={styles.starIcon} />
                    )
                    else return (
                        <Image key={'start',item}
                            source={{uri: icons.starIconOutline}} style={styles.starIcon} />
                    )
                })}
            </View>
        </Animated.View>
    )
}

getStarsStyle = y => ({
    height: y.interpolate({
        inputRange: tresholds,
        outputRange: [0, 0, 20, 20],
        extrapolate: 'clamp'
    }),
    opacity: y.interpolate({
        inputRange: tresholds,
        outputRange: [0, 0, 1, 1],
        extrapolate: 'clamp'
    })
})

const Users = ({reviews, y}) => (
    <Animated.View style={[{
        flexDirection: 'row', paddingHorizontal: 20}, getUsersStyle(y) ]}>
        {reviews.map((review, idx) => (
                <Image key = {'avatar',idx}
                    source={{uri: review.userAvatar}}
                    style={[{transform: [{translateX: -6*idx}]}, styles.avatarStyle]} />
        ))}
    </Animated.View>
)

getUsersStyle = y => ({
    height: y.interpolate({
        inputRange: tresholds,
        outputRange: [0, 0, 30, 30],
        extrapolate: 'clamp'
    }),
    opacity: y.interpolate({
        inputRange: tresholds,
        outputRange: [0, 0, 1, 1],
        extrapolate: 'clamp'
    }),
    marginVertical: y.interpolate({
        inputRange: tresholds,
        outputRange: [0, 0, 20, 20],
        extrapolate: 'clamp'
    })
})

const Comments = ({y, reviews}) => {
    return (
        <Animated.View
            style={{
                width: width,
                height: y.interpolate({
                    inputRange: [ topY, -200, -125, -100, 0 ],
                    outputRange: [height-cardFinalHeight-50, height-cardFinalHeight-40,0, 0, 0],
                    extrapolate: 'clamp'
                }),
            }}>
            <ScrollView>
                {reviews.map((review, idx) => (
                    <View key = {'review',idx} style={{
                        borderColor: 'red', borderWidth: 1, justifyContent: 'center'
                    }}>
                        <View style={{flexDirection: 'row'}}>
                            <Image source = {{uri: review.userAvatar}}
                                style={{width: 50, height: 50, resizeMode: 'contain'}}
                                />
                            <View>
                                <Text>
                                    {review.userName}
                                </Text>
                            </View>
                        </View>
                        <Text>
                            {review.review}
                        </Text>

                    </View>
                ))}
            </ScrollView>
        </Animated.View>
    )
}

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
        width: cardBaseWidth,
        justifyContent: 'center', alignItems: 'center',
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
        height: 50, paddingTop: 10,
        paddingTop: 0, paddingHorizontal: 20,
        justifyContent: 'center'
    },
    starsContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 2, paddingHorizontal: 20,
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
