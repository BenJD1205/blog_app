import { useRef, useState } from "react";
import {
    TextInput,
    SafeAreaView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
    Button, 
    Image,
    ScrollView
} from "react-native";
import * as ImagePicker from 'expo-image-picker';

import {
    actions,
    RichEditor,
    RichToolbar,
} from "react-native-pell-rich-editor";

const Post = () => {
    const richText = useRef();
    const [descHTML, setDescHTML] = useState("");
    const [title, setTitle] = useState("");
    const [showDescError, setShowDescError] = useState(false);
    const [image, setImage] = useState(null);


    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
          mediaTypes: ImagePicker.MediaTypeOptions.All,
          allowsEditing: true,
          aspect: [4, 3],
          quality: 1,
        });
    
        console.log(result);
    
        if (!result.canceled) {
          setImage(result.assets[0].uri);
        }
      };

    const richTextHandle = (descriptionText) => {
        if (descriptionText) {
            setShowDescError(false);
            setDescHTML(descriptionText);
        } else {
            setShowDescError(true);
            setDescHTML("");
        }
    };

    const submitContentHandle = () => {
        const replaceHTML = descHTML.replace(/<(.|\n)*?>/g, "").trim();
        const replaceWhiteSpace = replaceHTML.replace(/&nbsp;/g, "").trim();

        if (replaceWhiteSpace.length <= 0) {
            setShowDescError(true);
        } else {
            // send data to your server!
        }
    };

    return (
        <SafeAreaView edges={["bottom", "left", "right"]} style={{ flex: 1 }}>
            <ScrollView>
            <View style={styles.container}>
            <View><Text>Tiêu đề</Text></View>
            <View style={styles.viewTitle}>
                <TextInput
                style={styles.inputTitle}
                placeholder="Title"
                placeholderTextColor="#848b8e"
                value={title}
                onChangeText={setTitle}
                />
            </View>
                <View><Text>Nội dung</Text></View>

                {/* <Pressable onPress={() => richText.current?.dismissKeyboard()}>
                    <Text style={styles.headerStyle}>Your awesome Content</Text>
                    <View style={styles.htmlBoxStyle}>
                        <Text>{descHTML}</Text>
                    </View>
                </Pressable> */}
                <View style={styles.richTextContainer}>
                    <RichEditor
                        ref={richText}
                        onChange={richTextHandle}
                        placeholder="Write your cool content here :)"
                        androidHardwareAccelerationDisabled={true}
                        style={styles.richTextEditorStyle}
                        initialHeight={250}
                    />
                    <RichToolbar
                        editor={richText}
                        selectedIconTint="#0063a5"
                        iconTint="white"
                        actions={[
                            actions.insertImage,
                            actions.setBold,
                            actions.setItalic,
                            actions.insertBulletsList,
                            actions.insertOrderedList,
                            actions.insertLink,
                            actions.setStrikethrough,
                            actions.setUnderline,
                        ]}
                        style={styles.richTextToolbarStyle}
                    />
                </View>
                {showDescError && (
                    <Text style={styles.errorTextStyle}>
                        Vui lòng nhập nội dung bài viết
                    </Text>
                )}

                
                <Button title="Pick an image from camera roll" onPress={pickImage} />
                {/* {image && <Image source={{ uri: image }} style={{ width: 200, height: 200 }} />} */}

                <TouchableOpacity
                    style={styles.saveButtonStyle}
                    onPress={submitContentHandle}>
                    <Text style={styles.textButtonStyle}>Save</Text>
                </TouchableOpacity>
            </View>
            </ScrollView>
            
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        height: "100%",
        backgroundColor: "white",
        padding: 20,
        alignItems: "center",
    },
    viewTitle:{
        width: "100%",
        marginVertical: 10,
    },
    inputTitle:{
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#9bc5f9",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        fontSize: 18,
    },
    headerStyle: {
        fontSize: 20,
        fontWeight: "600",
        color: "#312921",
        marginBottom: 10,
    },

    htmlBoxStyle: {
        height: 200,
        width: 330,
        backgroundColor: "#fff",
        borderRadius: 10,
        padding: 20,
        marginBottom: 10,
    },

    richTextContainer: {
        display: "flex",
        flexDirection: "column-reverse",
        width: "100%",
        marginBottom: 10,
    },

    richTextEditorStyle: {
        borderBottomLeftRadius: 10,
        borderBottomRightRadius: 10,
        borderWidth: 1,
        borderColor: "#9bc5f9",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        fontSize: 20,
    },

    richTextToolbarStyle: {
        backgroundColor: "#9bc5f9",
        borderColor: "#9bc5f9",
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        borderWidth: 1,
    },

    errorTextStyle: {
        color: "#FF0000",
        marginBottom: 10,
    },
    saveButtonStyle: {
        backgroundColor: "#0063a5",
        borderWidth: 1,
        borderColor: "#0063a5",
        borderRadius: 10,
        padding: 10,
        width: "25%",
        alignItems: "center",
        justifyContent: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.23,
        shadowRadius: 2.62,
        elevation: 4,
        fontSize: 20,
    },

    textButtonStyle: {
        fontSize: 18,
        fontWeight: "600",
        color: "white",
    },
});
export default Post;