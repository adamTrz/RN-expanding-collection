import React from 'react';
import {
    Animated, Dimensions,
    Image, PanResponder,
    ScrollView, StyleSheet, Text, View,
} from 'react-native'

const {width, height} = Dimensions.get('window')

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
        console.log(dy);
        if (dy >= -25) this.goToBase() // going up from firstt base
        else {
            console.log('_handleRelease, inner else:');
            console.log(`base: ${this.state.base}`);
            console.log(`first: ${this.state.first}`);
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
        console.log('goToBase');
        Animated.spring(this.state.anim, {
            toValue: 0
        }).start(() => {
            this.setState({base: true, first: false})
            this.props.animating(false)
        })
    }

    goToFirst() {
        console.log('goToFirst');
        Animated.spring(this.state.anim, {
            toValue: {x: 0, y: -100}
        }).start(() => {
            this.setState({first: true, second: false, base: false})
            // this.props.animating(false)
        })
    }

    goToSecond() {
        console.log('goToSecond');
        Animated.spring(this.state.anim, {
            toValue: {x: 0, y: -350}
        }).start(() => {
            this.setState({secondBase: false, thirdBase: true})
            // this.props.animating(false)
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
                        style={[styles.cardBase]}
                        >
                        <View style={styles.cardTextsWrapper}>
                            <Text style={styles.fontCardTitle}>
                                {name.toUpperCase()}
                            </Text>
                            <View style={styles.cardCoordinatesWrapper}>
                                <Text style={styles.fontCardCoordinates}>
                                    {coordinates[0]}
                                </Text>
                                <Image source={{uri: locationIcon}}
                                    style={styles.locationIcon}
                                    />
                                <Text style={styles.fontCardCoordinates}>
                                    {coordinates[1]}
                                </Text>
                            </View>
                        </View>

                    </Animated.Image>
                </Animated.View>
                <Animated.View style={[
                    styles.bottomCardBase, getBottomCardStyle(y), styles.cardShadow, {
                        zIndex: 5, backgroundColor: 'green'
                    }
                    ]}>
                        <Content y = {y} city = {city} />
                    </Animated.View>

            </View>
        )
    }
}

export default Card;

const tresholds = [ -125, -100, -50, 0 ]
const locationIcon = 'https://cdn3.iconfinder.com/data/icons/pyconic-icons-1-2/512/location-pin-512.png'

getBottomCardStyle = y => {
    return {
        left: y.interpolate({
            inputRange: tresholds,
            outputRange: [width*0.1, width*0.1, width*0.1, width*0.15],
            extrapolate: 'clamp'
        }),
        width: y.interpolate({
            inputRange: tresholds,
            outputRange: [width*0.8, width*0.8, width*0.8, width*0.7],
            extrapolate: 'clamp'
        }),
        height: y.interpolate({
            inputRange: tresholds,
            outputRange: [height*0.65, height*0.65, height*0.65, height*0.55],
            extrapolate: 'clamp'
        }),
        opacity: y.interpolate({
            inputRange: [-50, 0],
            outputRange: [1, 0]
        }),
    }
}

getContentStyle = y => {
    return {
    }
}


const Content = ({y, city}) => (
    <Animated.View style={[styles.contentBase, getContentStyle(y)]} >
        <BasicInfo city = {city} />
        <Users users = {city.users} />
    </Animated.View>
)

const BasicInfo = ({city}) => (
    <View>
        <Text style={{textAlign: 'center', color: '#333', fontSize: 14}}>
            {city.blob}
        </Text>
        <Stars rating = {city.rating} id = {city.id} />
    </View>
)

const Stars = ({rating, id}) => (
    <View style={{flexDirection: 'row', justifyContent: 'space-between', marginTop: 2}}>
        <Text style={{textAlign: 'center', color: '#333', fontSize: 12}}>
            {`NO. ${id}`}
        </Text>
        <Text>
            {`${rating} / 5`}
        </Text>
    </View>
)

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
        borderRadius: 8,
        height: height*0.55, resizeMode: 'cover'
    },
    cardTextsWrapper: {
        paddingVertical: 20, flex: 1,justifyContent: 'space-between'
    },
    cardCoordinatesWrapper: {
        flexDirection: 'row', justifyContent: 'space-between', paddingHorizontal: 10
    },
    locationIcon: {
        width: 20, height: 20, resizeMode: 'contain', tintColor: 'white'
    },
    bottomCardBase: {
        position: 'absolute',
        bottom: 0,
        borderRadius: 8,
        justifyContent: 'flex-end',
        overflow: 'hidden',
        backgroundColor: 'white',
        shadowColor: '#000',
        shadowOffset: {width: 10, height: 10},
        shadowOpacity: 0.4, shadowRadius: 8,

    },
    contentBase: {
        height: 100,
        paddingVertical: 5, paddingHorizontal: 10,
        justifyContent: 'space-around'
    },
    avatarStyle: {
        width: 34, height: 34, borderRadius: 17, resizeMode: 'cover',
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
