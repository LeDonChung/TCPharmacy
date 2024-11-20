import { Modal, Pressable, StyleSheet, View, ScrollView } from "react-native";
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
    const clonedContent = props.content;

    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.modalVisible}
            onRequestClose={() => {
                props.setModalVisible(false);
            }}
        >
            {/* Nền mờ nhấn để đóng modal */}
            <View style={styles.centeredView}>
                <Pressable style={styles.overlay} onPress={() => props.setModalVisible(false)} />
                <View style={[styles.modalContainer, props.style]}>
                    <ScrollView
                        contentContainerStyle={{ flexGrow: 1, paddingBottom: 20 }}
                        showsVerticalScrollIndicator={true}
                    >
                        <View style={styles.modalView}>
                            {clonedContent}
                        </View>
                    </ScrollView>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0, 0, 0, 0.5)', // Nền mờ
    },
    overlay: {
        ...StyleSheet.absoluteFillObject, // Bao phủ toàn bộ màn hình để có thể nhấn vào bất kỳ đâu và đóng modal
    },
    modalContainer: {
        maxHeight: '80%',
        width: '90%',
        backgroundColor: 'white',
        borderRadius: 10,
        padding: 10,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
    },
    modalView: {
        alignItems: 'center',
    },
    modalText: {
        marginBottom: 15,
        textAlign: 'center',
        fontSize: 18,
    },
});
