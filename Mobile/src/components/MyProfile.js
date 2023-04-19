
import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet, Image,TouchableOpacity } from "react-native";
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from "axios";
import Loading from "./Loading";

const Profile = ({ token, updateToken }) => {
    const [dataU, setDataU] = useState({})
    const [loading,setLoading] = useState(false)
    const editDate = (createdAt) => {
        const monthNames = ["January", "February", "March", "April", "May", "June",
            "July", "August", "September", "October", "November", "December"
        ];
        const d = new Date(createdAt);
        var datestring = d.getDate() + " " + monthNames[d.getMonth()] + " , " + d.getFullYear()
        return datestring
    }

    const handleLogout = async () => {
        AsyncStorage.clear()
        updateToken()
    }

    useEffect(() => {
        setLoading(true)
        setTimeout(() => {

                const controlAuth = async () => {
                    try {
                        const URI = 'http://localhost:5000'
                        const { data } = await axios.get(`${URI}/auth/private`, {
                            headers: {
                                "Content-Type": "application/json",
                                "Authorization": `Bearer ${token}`,
                            }
                        });
                        setDataU(data.user)
                        setLoading(false)

                        AsyncStorage.setItem("dataUser", JSON.stringify(data.user))
                    }
                    catch (error) {
                        setLoading(false)
                        AsyncStorage.clear()
                        updateToken()
                    }
                };
                controlAuth()
            }
       , 1000)
    }, [])

    return (
        <>
            {loading ?
            <Loading /> :
            <>
                <View style={{ alignSelf: "center", marginTop: 20 }}>
                    <View style={styles.profileImage}>
                        <Image source={{ uri: 'https://picsum.photos/700' }} style={styles.image} resizeMode="center"></Image>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    <Text style={[styles.text, { fontWeight: "600", color: "#22577a", fontSize: 36 }]}>{dataU.username}</Text>
                </View>


                <Text style={[styles.subText, styles.recent]}>Thông tin</Text>
                <View style={{ alignItems: "center" }}>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Ngày tham gia: <Text style={{ fontWeight: "400" }}>{editDate(dataU.createdAt)}</Text>
                            </Text>
                        </View>
                    </View>
                    <View style={styles.recentItem}>
                        <View style={styles.activityIndicator}></View>
                        <View style={{ width: 250 }}>
                            <Text style={[styles.text, { color: "#41444B", fontWeight: "300" }]}>
                                Email: <Text style={{ fontWeight: "400" }}>{dataU.email}</Text>
                            </Text>
                        </View>
                    </View>
                </View>
                <View style={styles.infoContainer}>
                        <TouchableOpacity  style={styles.btnLogout} onPress={handleLogout}>
                            <Text style={styles.textLogout}>Đăng xuất</Text>
                        </TouchableOpacity>
                </View>
            </> 
            }
        </>

    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#FFF"
    },
    text: {
        color: "#52575D"
    },
    image: {
        flex: 1,
    },
    titleBar: {
        flexDirection: "row",
        justifyContent: "space-between",
        marginTop: 24,
        marginHorizontal: 16
    },
    subText: {
        fontSize: 12,
        color: "#AEB5BC",
        textTransform: "uppercase",
        fontWeight: "500"
    },
    profileImage: {
        width: 200,
        height: 200,
        borderRadius: 100,
        overflow: "hidden"
    },
    dm: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: 20,
        width: 40,
        height: 40,
        borderRadius: 20,
        alignItems: "center",
        justifyContent: "center"
    },
    active: {
        backgroundColor: "#34FFB9",
        position: "absolute",
        bottom: 28,
        left: 10,
        padding: 4,
        height: 20,
        width: 20,
        borderRadius: 10
    },
    add: {
        backgroundColor: "#41444B",
        position: "absolute",
        bottom: 0,
        right: 0,
        width: 60,
        height: 60,
        borderRadius: 30,
        alignItems: "center",
        justifyContent: "center"
    },
    infoContainer: {
        alignSelf: "center",
        alignItems: "center",
        marginTop: 16
    },
    statsContainer: {
        flexDirection: "row",
        alignSelf: "center",
        marginTop: 32
    },
    statsBox: {
        alignItems: "center",
        flex: 1
    },
    mediaImageContainer: {
        width: 180,
        height: 200,
        borderRadius: 12,
        overflow: "hidden",
        marginHorizontal: 10
    },
    mediaCount: {
        backgroundColor: "#41444B",
        position: "absolute",
        top: "50%",
        marginTop: -50,
        marginLeft: 30,
        width: 100,
        height: 100,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 12,
        shadowColor: "rgba(0, 0, 0, 0.38)",
        shadowOffset: { width: 0, height: 10 },
        shadowRadius: 20,
        shadowOpacity: 1
    },
    recent: {
        marginLeft: 78,
        marginTop: 32,
        marginBottom: 6,
        fontSize: 10
    },
    recentItem: {
        flexDirection: "row",
        alignItems: "flex-start",
        marginBottom: 16
    },
    activityIndicator: {
        backgroundColor: "#0063a5",
        padding: 4,
        height: 12,
        width: 12,
        borderRadius: 6,
        marginTop: 3,
        marginRight: 20
    },
    btnLogout:{
        minWidth:100,
        backgroundColor:"#0063a5",
        borderRadius:25,
        alignItems:"center",
        justifyContent:"center",
        marginTop:40,
        fontWeight: "600",
        marginBottom:10,
        paddingHorizontal:40,
        paddingVertical:10,
        color:"white"
    },
    textLogout: {
        color: "white",
        fontWeight: "600",
    }
});

export default Profile;