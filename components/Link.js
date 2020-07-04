import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { useNavigation } from '@react-navigation/native';

function Link(props) {
    const { screen, text } = props;
    const navigation = useNavigation();

    return (
        <TouchableOpacity style={styles.container} onPress={() => navigation.navigate(screen)}>
            <Text style={styles.link}>{text}</Text>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        margin: 16
    },
    link: {
       color: 'blue',
       fontSize: 18,
    }
});

export default Link;