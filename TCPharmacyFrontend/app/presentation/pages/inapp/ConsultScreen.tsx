import { FlatList, Image, ScrollView, Text, TouchableOpacity, View } from "react-native"
import React, { useEffect, useState } from "react"
import { SafeAreaView } from "react-native-safe-area-context"
import { useNavigation } from "@react-navigation/native"
import { Colors } from "../../styles/Colors"
import { GlobalStyles } from "../../styles/GlobalStyles"
import IconF5 from "react-native-vector-icons/FontAwesome5"
import IconF from "react-native-vector-icons/FontAwesome"
import { TextInput } from "react-native-paper"
import { ModalCustom } from "../../components/ModalCustom"
import { ButtonCustom } from "../../components/ButtonCustom"
import IconAnd from "react-native-vector-icons/AntDesign"
import { Linking } from "react-native"
import { Alert } from "react-native"

const messageList = [{
    id: 1,
    message: "Xin chào",
    isMe: true
},
{
    id: 2,
    message: "Chào bạn",
    isMe: false
},
{
    id: 3,
    message: "Bạn cần tư vấn gì không?",
    isMe: false
},
{
    id: 4,
    message: "Bên mình có bán kẹo ngậm không đường không ạ, nếu có cho em xin giá ạ",
    isMe: true
},
{
    id: 5,
    message: "Vui lòng đợi một vài phút để ad kiểm tra giúp bạn nhé.",
    isMe: false
}]

export const ConsultScreen = () => {

    const navigation = useNavigation();
    const [message, setMessage] = useState("");
    const [messages, setMessages] = useState(messageList);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        navigation.getParent()?.setOptions({
          tabBarStyle: {
            display: "none"
          }
        });
        return () => navigation.getParent()?.setOptions({
          tabBarStyle: undefined
        });
      }, [navigation]); 

    //Ham goi dien thoai
    const handleClickCallHotline = () => {
        const phoneNumber = 'tel:18006928';
    Linking.canOpenURL(phoneNumber)
        .then((supported) => {
            if (supported) {
                Linking.openURL(phoneNumber);
            } else {
                Alert.alert("Thiết bị không hỗ trợ tính năng này");
            }
        })
        .catch((err) => console.error('Error:', err));
    }

    //send message
    const sendMessage = () => {
        if (message.trim() === "") {
            return;
        }
        const newMessage = {
            id: messages.length + 1,
            message: message,
            isMe: true
        }
        setMessages([...messages, newMessage]);
        setMessage("");
    }

    // Lấy ngày, tháng, và năm hiện tại
    const getCurrentDate = () => {
        const date = new Date();

        const day = date.getDate();
        const month = date.getMonth() + 1; // getMonth() trả về tháng từ 0 đến 11, nên cần +1
        const year = date.getFullYear();

        // Định dạng lại thành chuỗi "dd/mm/yyyy"
        return `${day}/${month}/${year}`;
    };

    const handleClickPhone = () => {
        setModalVisible(true);
    }



    return (
        <>
            <SafeAreaView style={{ flex: 1 }}>
                <View style={{ height: 70, width: '100%', backgroundColor: Colors.primary, flexDirection: 'row', alignItems: 'center', justifyContent: "space-between" }}>
                    <TouchableOpacity style={{ marginHorizontal: 15, justifyContent: "center", alignContent: "center" }} onPress={() => { navigation.goBack() }}>
                        <IconF5 name="chevron-left" size={35} style={{ color: Colors.secondary }} />
                    </TouchableOpacity>
                    <Text style={[GlobalStyles.textStyle, { fontSize: 20, fontWeight: '700', color: Colors.secondary, textAlign: 'center' }]}>
                        Dược sĩ TC Parmacy
                    </Text>
                    <TouchableOpacity style={{ marginHorizontal: 15, justifyContent: "center", alignContent: "center" }} onPress={() => { handleClickPhone() }}>
                        <IconF name="phone" size={35} style={{ color: Colors.secondary }} />
                    </TouchableOpacity>
                </View>
                <ScrollView showsVerticalScrollIndicator={false}>



                    {/* <View style={{width: "100%", height: 650}}>
                <Text style={[GlobalStyles.textStyle, { textAlign: 'center', marginVertical: 10 }]}>{getCurrentDate()}</Text>
                <FlatList
                    data={messages}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item }) => (
                        <View style={{ flexDirection: item.isMe ? 'row-reverse' : 'row', marginHorizontal: 10, marginVertical: 10 }}>
                            <View style={{ backgroundColor: item.isMe ? Colors.primary : "#fff", padding: 10, borderRadius: 10 }}>
                                <Text style={[GlobalStyles.textStyle, { color: item.isMe ? Colors.secondary : Colors.textDecription }]}>{item.message}</Text>
                            </View>
                        </View>
                    )}
                />
            </View> */}

                    <View style={{ width: "100%", height: 700, marginBottom: 200 }}>
                        <Text style={[GlobalStyles.textStyle, { textAlign: 'center', marginVertical: 10 }]}>{getCurrentDate()}</Text>
                        {messages.map((item, index) => {
                            return (

                                <View key={item.id} style={{ flexDirection: item.isMe ? 'row-reverse' : 'row', marginHorizontal: 10, marginVertical: 10 }}>
                                    <View style={{ backgroundColor: item.isMe ? Colors.primary : "#fff", padding: 10, borderRadius: 10 }}>
                                        <Text style={[GlobalStyles.textStyle, { color: item.isMe ? Colors.secondary : Colors.textDecription }]}>{item.message}</Text>
                                    </View>
                                </View>
                            )
                        })}
                    </View>

                </ScrollView>
                <View style={{
                    height: 80, width: '100%', position: "relative",
                    bottom: 0, backgroundColor: '#fff', flexDirection: 'row', alignItems: 'center',
                    justifyContent: 'space-between'
                }}>
                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}>
                        <IconF5 name="camera" size={30} style={{ color: "#000" }} />
                    </TouchableOpacity>
                    <TextInput
                        value={message}
                        onChangeText={setMessage}
                        placeholder="Gửi thắc mắc"
                        placeholderTextColor="gray"
                        style={[GlobalStyles.textStyle, { backgroundColor: '#EBF0F4', width: "70%", height: 60, flexDirection: 'row', alignItems: 'center', borderRadius: 10 }]}
                        left={<TextInput.Icon icon={() => <IconF5 name="smile" size={30} color="gray" />} />}  // Biểu tượng bên trái
                    />

                    <TouchableOpacity style={{ flexDirection: 'row', alignItems: 'center', marginHorizontal: 15 }}
                        onPress={() => {
                            sendMessage();
                        }}>
                        <IconF name="send" size={30} style={{ color: Colors.desciption }} />
                    </TouchableOpacity>

                </View>

                <ModalCustom
                    modalVisible={modalVisible}
                    setModalVisible={setModalVisible}
                    content={
                        <View style={{ width: '100%', height: 380, alignItems: 'center',  }}>
                            <View style={{ height: 50, width: "100%", borderBottomWidth: 1, borderColor: "#C4C4C4", alignItems: 'center', justifyContent: 'space-between' }}>
                                <Text style={[GlobalStyles.textStyle, { textAlign: 'center', fontSize: 20, fontWeight: '700', }]}>
                                    Tư vấn với dược sĩ
                                </Text>

                                <TouchableOpacity style={{ position: "absolute", right: 10 }} onPress={() => {setModalVisible(false)}}>
                                    <IconAnd name="close" size={30} style={{ color: "#000", }} />
                                </TouchableOpacity>

                            </View>

                            <Image source={require("./../../../../assets/imgConsultScreen/img-modal.png")} style={{width: "90%", height: 160, marginVertical: 15}} />

                            <ButtonCustom buttonStyle={{ borderRadius: 30, paddingVertical: 15, width: '95%', backgroundColor: "#ECF0FB", position: "absolute", bottom: 40 }} 
                            title="Gọi tổng đài (1800 6928)" 
                            textStyle={{color: Colors.primary}} 
                            leadingIcon={<IconF name="phone" size={20} style={{ color: Colors.primary }} />}
                            onPress={() => {
                                // setModalVisible(false);
                                handleClickCallHotline();
                            }} />
                        </View>
                    }
                />
            </SafeAreaView>

        </>
    )
}