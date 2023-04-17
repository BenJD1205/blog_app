
import React, { useEffect, useState } from "react";
import {Text } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Login from "../components/Login";
import MyProfile from "../components/MyProfile";

const Profile = ({ navigation }) => {
    const [token, setToken] = useState(null)

    const getToken = async () => {
        try {
            const value = await AsyncStorage.getItem("authToken");
            setToken(value)
        } catch (e) {
            console.log(e)
        }
    }
    useEffect(() => {
        getToken()
    }, [token])

    return (
        <>
         {token ? <MyProfile updateToken={getToken} token={token} /> : <Login updateToken={getToken} navigation={navigation}/>}
        </>
    );
}

export default Profile;