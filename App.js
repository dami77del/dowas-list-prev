import React, { useState } from "react";
import {
  StyleSheet,
  TextInput,
  View,
  TouchableOpacity,
  Text,
  ImageBackground,
  FlatList,
  Modal as NewModal,
} from "react-native";

export default function App() {
  const backgroundColorLocal = require("./src/img/img-bk.jpg");
  const [textFilial, setTextFilial] = useState("");
  const [list, setList] = useState([]);
  const [filialSelected, setFilialSelected] = useState("");
  const [modalVisble, setModalVisble] = useState(false);

  const onHandleChangeFilial = (text) => {
    setTextFilial(text);
  };
  const addFilial = () => {
    setList((prevState) => [...prevState, textFilial]);
    setTextFilial("");
  };
  const handleModal = (item) => {
    setFilialSelected(item);
    setModalVisble(true);
  }
  const onHandleDelete = (item) => {
    setList((prevState) => prevState.filter((element) => element !== item));
    setModalVisble(!modalVisble);
  };
  const renderFilial = ({ item }) => {
    return (
      <View style={styles.renderFilialStyle}>
        <Text style={styles.txtBtnList}>{item}</Text>
        <TouchableOpacity
          style={styles.btnList}
          onPress={() => handleModal(item)}
        >
          <Text style={styles.btnTxtList}>Ändern</Text>
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <ImageBackground source={backgroundColorLocal} style={styles.container}>
      <Text style={styles.textFilial}> Filialliste</Text>
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.InputText}
          placeholder="Geben Sie die Tochtergesellschaft ein"
          onChangeText={onHandleChangeFilial}
          value={textFilial}
        />
        <TouchableOpacity style={styles.btn} onPress={addFilial}>
          <Text style={styles.txtBtn}>Beigeben</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.listContainer}>
        <FlatList
          data={list}
          renderItem={renderFilial}
          keyExtractor={(item) => item.id}
        />
      </View>
      <NewModal animationType="fade" transparent={true} visible={modalVisble}>
        <View style={styles.modalContainer}>
          <View style={styles.modalStyle}>
            <Text style={styles.modalText}>{filialSelected}</Text>
            <TouchableOpacity
              style={styles.btnModal}
              onPress={() => onHandleDelete(filialSelected)}
            >
              <Text style={styles.txtBtn}>Entfernen</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.btnModal}
              onPress={() => setModalVisble(false)}
            >
              <Text style={styles.txtBtn}>überspringen</Text>
            </TouchableOpacity>
          </View>
        </View>
      </NewModal>
    </ImageBackground>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "#ABABAB",
    flex: 1,
    paddingTop: 80,
    padding: 50,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  InputText: {
    backgroundColor: "#ffff",
    borderRadius: 15,
    padding: 5,
    width: "80%",
    height: 45,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    elevation: 3,
  },
  textFilial: {
    marginBottom: 30,
    fontSize: 30,
    fontWeight: "500",
    color: "#544B4B",
  },
  btn: {
    backgroundColor: "grey",
    borderRadius: 10,
    alignSelf: "center",
    paddingVertical: 15,
    width: 90,
    marginLeft: 15,
    fontSize: 30,
  },
  txtBtn: {
    color: "white",
    textAlign: "center",
  },
  listContainer: {
    flex: 2,
    marginHorizontal: 30,
    marginTop: 40,
    padding: 3,
    width: "100%",
  },
  renderFilialStyle: {
    height: 50,
    flexDirection: "row",
    marginBottom: 25,
    backgroundColor: "white",
    borderRadius: 10,
    padding: 10,
    justifyContent: "center",
    alignItems: "left",
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 1 },
    shadowRadius: 2,
    elevation: 3,
  },
  btnList: {
    backgroundColor: "grey",
    borderRadius: 10,
    width: 80,
    marginLeft: 5,
    height: 30,
    textAlign: "center",
  },
  btnTxtList: {
    color: "white",
    textAlign: "center",
    paddingTop: 4,
  },
  txtBtnList: {
    color: "grey",
    textAlign: "center",
    fontSize: 22,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    textAlign: "center",
  },
  modalStyle: {
    margin: 20,
    borderRadius: 20,
    padding: 35,
    backgroundColor: "white",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    textAlign: "center",
    fontSize: 25,
    marginBottom: 5,
  },
  btnModal: {
    backgroundColor: "black",
    borderRadius: 10,
    alignSelf: "center",
    paddingVertical: 15,
    width: 90,
    marginLeft: 15,
    marginBottom: 10,
  },
});
