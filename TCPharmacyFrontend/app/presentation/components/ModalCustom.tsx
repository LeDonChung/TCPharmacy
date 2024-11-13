import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Image, Text } from "react-native";
import { ButtonCustom } from "./ButtonCustom";
import { Colors } from "./../styles/Colors";
import { GlobalStyles } from "./../styles/GlobalStyles";
import React from "react";

/**
 * ModalCustomProps 
 * Lưu ý những props nào không có dấu ? là bắt buộc phải truyền vào
 * @param modalVisible: boolean - Trạng thái hiển thị của modal
 * @param setModalVisible: (value: boolean) => void - Hàm xử lý khi click vào button
 * @param content: any - Nội dung của modal
 * @returns 
 */
type ModalCustomProps = {
    modalVisible: boolean;
    setModalVisible: (value: boolean) => void;
    content: any;
    style?: any;
}

export const ModalCustom = (props: ModalCustomProps) => {
    const clonedContent = React.cloneElement(props.content, {
        setModalVisible: true,
        modalVisible: props.modalVisible
    });
    const handleContentPress = (event: React.SyntheticEvent) => {
        // Prevent the background press event from triggering
        event.stopPropagation();
    }
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(false);
            }}
        >
            <Pressable style={styles.centeredView} onPress={() => props.setModalVisible(false)}>
                <View 
                    onStartShouldSetResponder={() => true} 
                    style={[styles.modalView, props.style]}>
                    {clonedContent} 
                </View>
            </Pressable >
        </Modal>
    )
}


const styles = StyleSheet.create({

    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',  // Màu nền mờ
    },
    modalView: {
        width: 300,
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
})