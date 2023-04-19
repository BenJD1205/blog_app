import React, {useState} from 'react'
import {Alert, Modal, StyleSheet, Text,Pressable, View} from 'react-native'
const Popup = ({title, des, handle}) => {
    const [modalVisible, setModalVisible] = useState(false);
    return (
    <View style={styles.centeredView}>
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
            setModalVisible(!modalVisible);
            }}>
            <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <Text style={styles.modalText}>{des || ''}</Text>
                <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>Đồng ý</Text>
                </Pressable>
            </View>
            </View>
        </Modal>
    </View>
  )
}
const styles = StyleSheet.create({
    centeredView:{
        position: 'absolute', 
        top: 0, 
        left: 0, 
        right: 0, 
        bottom: 0, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    modalView:{
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalText:{
        marginBottom: 15,
        textAlign: 'center',
    },
    button:{
        borderRadius: 20,
        padding: 10,
        elevation: 2,   
    },
    buttonClose:{
        backgroundColor: '#2196F3',
    },
    textStyle:{
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
})
export default Popup;