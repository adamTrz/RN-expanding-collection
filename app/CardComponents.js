import React, {Component} from 'react'
import {
    Animated, Dimensions, Image,
    View, Text, ScrollView, StyleSheet, TouchableOpacity
} from 'react-native'
import {
  Asset, Components
} from 'exponent';

import {icons} from './constants'

const {width, height} = Dimensions.get('window')
const cardBaseHeight = height*0.55
const cardBaseWidth = width*0.7
const cardFinalHeight = 130
const topY = -(height - cardBaseHeight)+cardFinalHeight/2-30-5
const tresholds = [ topY, -125, -100, 0 ]


const BasicInfo = ({city, y}) => (
    <Animated.View style={styles.contentBase}>
        <Text style={styles.fontCityBlob}>
            &bdquo;{city.blob}&rdquo;
        </Text>
    </Animated.View>
)

const Stars = ({rating, id, y}) => {
    const getStarsStyle = y => ({
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


const Users = ({reviews, y}) => {
    const getUsersStyle = y => ({
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
    return (
        <Animated.View style={[{
            flexDirection: 'row', paddingHorizontal: 20}, getUsersStyle(y) ]}>
            {reviews.map((review, idx) => (
                    <Image key = {'avatar',idx}
                        source={{uri: review.userAvatar}}
                        style={[{transform: [{translateX: -6*idx}]}, styles.avatarStyle]} />
            ))}
        </Animated.View>
    )
}

const Reviews = ({y, reviews}) => {
    const getReviewsStyle = y => ({
        width: y.interpolate({
            inputRange: tresholds,
            outputRange: [width, width*0.9, width*0.8, cardBaseWidth],
            extrapolate: 'clamp'
        }),
        height: y.interpolate({
            inputRange: [ topY, -125, -100, 0 ],
            outputRange: [height-cardFinalHeight-140, height-height*0.62-140, 0, 0],
            extrapolate: 'clamp'
        }),
        opacity: y.interpolate({
            inputRange: tresholds,
            outputRange: [1,1,0,0],
            extrapolate: 'clamp'
        })
    })
    return (
        <Animated.View
            style={getReviewsStyle(y)}>
            <ScrollView showsVerticalScrollIndicator={false} >
                {reviews.map((review, idx) => (
                    <Review key={'review',idx} review={review} />
                ))}
            </ScrollView>
        </Animated.View>
    )
}

const Review = ({review}) => (
    <View style={styles.reviewWrapper}>
        <View style={styles.reviewHeaderWrapper}>
            <View style={styles.reviewAvatarWrapper}>
                <Image source = {{uri: review.userAvatar}}
                    style={styles.reviewAvatar} />
            </View>
            <View style={styles.reviewHeaderTextsWrapper}>
                <Text style={styles.fontReviewTextName}>
                    {review.userName}
                </Text>
                <Text style={styles.fontReviewTextDate}>
                    {review.date}
                </Text>
            </View>
            <TouchableOpacity>
                <Image source={{uri: icons.thumbUpIcon}} style={styles.likeIcon} />
            </TouchableOpacity>
        </View>
        <Text style={styles.fontReviewText} numberOfLines={5} >
            {review.review}
        </Text>
    </View>
)

const ReviewsHeader = ({y, coordinates}) => {
    const getHeaderStyle = y => ({
        height: y.interpolate({
            inputRange: tresholds,
            outputRange: [100, 0 ,0, 0],
            extrapolate: 'clamp'
        }),
        width: y.interpolate({
            inputRange: tresholds,
            outputRange: [width, width*0.9, width*0.8, cardBaseWidth],
            extrapolate: 'clamp'
        })
    })
    return (
        <Animated.View style={getHeaderStyle(y)}>
            <Components.MapView.Animated
                style={styles.map}
                initialRegion={{
                    latitude: parseFloat(coordinates[0], 10),
                    longitude: parseFloat(coordinates[2], 10),
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                }}
            />
        </Animated.View>
    )
}

module.exports = {
    BasicInfo, Stars, Users, Reviews, Review, ReviewsHeader
}

const styles = StyleSheet.create({
    avatarStyle: {
        width: 34, height: 34, borderRadius: 17, resizeMode: 'cover',
    },
    contentBase: {
        height: 40, paddingTop: 7,
        paddingTop: 0, paddingHorizontal: 20,
        justifyContent: 'center'
    },
    fontCityBlob: {
        textAlign: 'center', color: 'darkslategrey', fontSize: 16,
        paddingBottom: 5, fontFamily: 'lato_italic'
    },
    starsContainer: {
        flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
        marginTop: 2, paddingHorizontal: 20,
    },
    starIcon: {
        width: 20, height: 20, resizeMode: 'contain', tintColor: '#9297C8'
    },
    reviewWrapper: {
        borderBottomColor: 'silver', borderBottomWidth: 1,
        justifyContent: 'center',
        paddingHorizontal: 20, paddingVertical: 15,
    },
    reviewHeaderWrapper: {
        flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
        paddingBottom: 5,
    },
    reviewAvatarWrapper: {
        shadowColor: '#000', shadowOffset: {width: 2, height: 2},
        shadowOpacity: 0.4, shadowRadius: 2, borderRadius: 25
    },
    reviewAvatar: {
        width: 50, height: 50, resizeMode: 'contain', borderRadius: 25
    },
    reviewHeaderTextsWrapper: {
        flex: 1, flexDirection: 'row', justifyContent: 'space-between',
        alignItems: 'flex-end', marginHorizontal: 20
    },
    fontReviewTextName: {
        fontSize: 18, color: 'grey', fontFamily: 'lato'
    },
    fontReviewTextDate: {
        fontSize: 14, color: 'grey', fontFamily: 'lato_light'
    },
    fontReviewText: {
        fontSize: 16, color: 'darkslategrey',
        fontFamily: 'lato_light'
    },
    likeIcon: {
        width: 20, height: 20, resizeMode: 'contain', tintColor: 'grey'
    },
    map: {
        ...StyleSheet.absoluteFillObject
    }
})
