import React, { Component } from 'react';
import { StyleSheet, View, Text, Dimensions } from 'react-native';

export default function Movie() {
    return (
        <View style={[styles.movieBox, {width: Dimensions.get('window').width/2-24, height: '50%', minHeight:210}]} >
            
        </View>
    )
}

const styles = StyleSheet.create ({
    movieBox: {
        backgroundColor: '#ddd',
        marginLeft: 16,
        marginTop: 16,
        borderRadius: 8,
        elevation: 8,
        shadowOffset: {width: 16, height: 32},
        shadowOpacity: 1.0,
        shadowColor: '#ddd'
    }
})