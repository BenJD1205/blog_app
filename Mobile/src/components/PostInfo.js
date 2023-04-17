
import React from "react";
import { View, Text, StyleSheet, ScrollView } from "react-native";

const About = ({id}) => {
    return (
        <>
            <View>
                <Text>Title</Text>
            </View>
            <ScrollView style={styles.center}>
                <Text>This is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaaThis is the about screen saaaaaaaa</Text>
            </ScrollView>
        </>
        
    );
};

const styles = StyleSheet.create({
    center: {
        flex: 1,
    },
});

export default About;