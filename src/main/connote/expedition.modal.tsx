import React, { Component } from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { tabBarIcon } from "../../shared/tabbar.icon";
import { observer, Observer } from "mobx-react";
import { observable, toJS } from "mobx";
import { connoteStore, Expedition } from "./connote.store";
import { fonts } from "../../assets";
import GridList from "react-native-grid-list";
import * as _ from "lodash";
import Modal from "react-native-modal";

interface Props {
  isVisible: boolean;
  onClosed: () => void;
}
interface State {
  data: Expedition[];
}
@observer
export class ExpeditionModal extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      data: []
    };
  }

  async componentWillMount() {
    await connoteStore.getExpeditions();
    const data: Expedition[] = toJS(connoteStore.expeditions);
    const leftOver = data.length % 3;
    _.range(leftOver).map(() =>
      data.push({
        id: null,
        onSearch: undefined
      })
    );
    this.setState({ data });
  }

  doClose = () => {
    this.props.onClosed();
  };

  onSelectItem = (item: Expedition) => {
      connoteStore.selectedExpedition = item;
      this.doClose()
  }

  renderItem = ({ item, index }: { item: Expedition; index: number }) => (
    <Observer>
      {() => {
        const selected = connoteStore.selectedExpedition;
        const active = selected && selected.id && selected.id === item.id;
        const onPress = () => this.onSelectItem(item);
        if (item.id)
          return (
            <TouchableOpacity onPress={onPress}>
              <View key={index} style={active ? styles.active : {}}>
                <View>
                  {item.logo && (
                    <Image
                      source={item.logo}
                      resizeMode={"contain"}
                      style={[styles.logo, { height: 30 }]}
                    />
                  )}
                </View>
                {/* <View style={styles.nameWrapper}>
                  <Text style={styles.name}>{item.name}</Text>
                </View> */}
              </View>
            </TouchableOpacity>
          );
        return <View />;
      }}
    </Observer>
  );

  render() {
    return (
      <Modal
        isVisible={this.props.isVisible}
        onBackdropPress={this.doClose}
        onBackButtonPress={this.doClose}
        onDismiss={this.doClose}
        style={styles.modal}
        animationIn={'slideInDown'}
        animationOut={'slideOutUp'}
      >
        <View style={styles.modalContent}>
          <ScrollView>
            <GridList
              data={this.state.data}
              showSeparator={true}
              separatorBorderWidth={7}
              separatorBorderColor={"transparent"}
              numColumns={3}
              renderItem={this.renderItem}
            />
          </ScrollView>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  modal: { flex: 1, alignItems: "center", justifyContent: "center" },
  modalContent: { backgroundColor: "#fff", width: 300, padding: 10, borderRadius: 5 },
  logo: { width: "100%", borderRadius: 3 },
  nameWrapper: { justifyContent: "center", alignItems: "center" },
  name: { fontFamily: fonts.titillium.regular, color: "#000" },
  active: { borderRadius: 4, borderWidth: 1.5, borderColor: "#999" }
});
