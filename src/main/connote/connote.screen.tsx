import React, { Component } from "react";
import { Text, View, StyleSheet, Image, FlatList, TouchableOpacity } from "react-native";
import { tabBarIcon } from "../../shared/tabbar.icon";
import { Container } from "../../shared/container";
import { COLOR } from "../../constant/theme.constant";
import { observer, Observer } from "mobx-react";
import { observable, toJS } from "mobx";
import { Card } from "../../shared/card";
import { LoadingIndicator } from "../../shared/loading.indicator";
import { NavigationScreenProp } from "react-navigation";
import { connoteStore, Expedition } from "./connote.store";
import { Content, ListItem, Col, Icon, Item, Input, Label, Row } from "native-base";
import { fonts } from "../../assets";
import { InputSearch } from "../../shared/search";
import GridList from "react-native-grid-list";
import * as _ from "lodash";
import { ExpeditionModal } from "./expedition.modal";
import { Loading } from "../../shared/loading";
import { storage, Recent } from "../storage/storage";

interface Props {
  navigation: NavigationScreenProp<any, any>;
}
interface State {
  text: string;
  data: Expedition[];
  imageWidth: number;
  showModal: boolean;
  selectedRecentIndex: any;
}
@observer
export class Connote extends Component<Props, State> {
  @observable private isLoading: boolean = false;
  @observable private isRefreshing: boolean = false;

  static navigationOptions = {
    title: "Cek Resi",
    tabBarIcon: tabBarIcon("list-box")
  };

  constructor(props: Props) {
    super(props);
    this.state = {
      text: "",
      data: [],
      imageWidth: 100,
      showModal: false,
      selectedRecentIndex: null
    };
  }

  doShowModal = () => {
    this.setState({ showModal: true });
  };
  doCloseModal = () => {
    this.setState({ showModal: false });
  };

  async componentWillMount() {
    await storage.init();
  }

  renderItem = ({ item, index }: { item: Recent; index: number }) => {
    const expedition = toJS(connoteStore.expeditions).find(e => e.id === item.expeditionId);
    let show = index === this.state.selectedRecentIndex;
    const onPress = () => this.setState({ selectedRecentIndex: !show ? index : null });
    const onTrack = expedition
      ? () => {
          if (expedition && expedition.onSearch) expedition.onSearch(item.cnote);
        }
      : undefined;
    return (
      <Observer key={index}>
        {() => (
          <TouchableOpacity onPress={onPress}>
            <View
              style={{
                flex: 1,
                backgroundColor: "#fff",
                borderRadius: 5,

                marginVertical: 2,
                flexDirection: "row",
                justifyContent: "center",
                alignItems: "center"
              }}
            >
              <View style={{ flex: 1, alignItems: "flex-start", paddingHorizontal: 7, paddingVertical: 5 }}>
                {expedition && (
                  <Image source={expedition.logo} style={{ width: 70, height: 35 }} resizeMode={"contain"} />
                )}
              </View>
              <View style={{ flex: 2, alignItems: "flex-end", paddingHorizontal: 7 }}>
                <Text key={index} style={{ textAlign: "right", fontFamily: fonts.titillium.bold, color: "#000" }}>
                  {item.cnote}
                </Text>
              </View>
              {show && (
                <TouchableOpacity onPress={onTrack} style={{flex: 1}}>
                  <View
                    style={{
                      backgroundColor: "rgb(79, 182, 185)",
                      flex: 1,
                      height: "100%",
                      justifyContent: "center",
                      borderTopRightRadius: 5,
                      borderBottomRightRadius: 5
                    }}
                  >
                    <Text style={{ alignSelf: "center", fontFamily: fonts.titillium.bold, color: "#fff" }}>Track</Text>
                  </View>
                </TouchableOpacity>
              )}
            </View>
          </TouchableOpacity>
        )}
      </Observer>
    );
  };

  render() {
    const onTrack = connoteStore.selectedExpedition ? connoteStore.selectedExpedition.onSearch : undefined;
    return (
      <Container title={"Cek Resi"}>
        <View style={styles.container}>
          <TouchableOpacity onPress={this.doShowModal}>
            <View style={styles.expedition}>
              <View style={{ flex: 7 }}>
                <Text style={styles.expeditionText}>
                  {"Ekspedisi:   "}
                  <Text style={styles.expeditionNameText}>
                    {connoteStore.selectedExpedition ? connoteStore.selectedExpedition.name : ""}
                  </Text>
                </Text>
              </View>
              <View style={{ flex: 1, alignItems: "flex-end" }}>
                <Icon name={"arrow-dropdown-circle"} style={{ color: "grey" }} />
              </View>
            </View>
          </TouchableOpacity>
          <InputSearch
            placeholder={"No. Resi"}
            onSubmit={onTrack}
            onChangeText={text => this.setState({ text })}
            enablePaste
          />
          <LoadingIndicator isVisible={this.isLoading} />
          <View style={{ flexDirection: "row", marginTop: 7 }}>
            <View style={{ flex: 5 }} />
            <View style={{ flex: 2 }}>
              <TouchableOpacity
                onPress={() => {
                  connoteStore.selectedExpedition &&
                    connoteStore.selectedExpedition.onSearch &&
                    connoteStore.selectedExpedition.onSearch(this.state.text);
                }}
              >
                <View
                  style={{
                    padding: 7,
                    backgroundColor: "rgb(79, 182, 185)",
                    borderRadius: 5,
                    justifyContent: "center",
                    alignItems: "center"
                  }}
                >
                  <Text style={{ fontFamily: fonts.titillium.bold, color: "#fff", fontSize: 18 }}>Track</Text>
                </View>
              </TouchableOpacity>
            </View>
          </View>
          <View style={{ paddingHorizontal: 6, marginTop: 20 }}>
            <Text style={{ fontFamily: fonts.titillium.bold, color: "#fff", fontSize: 25 }}>Recents</Text>
            <FlatList
              ListFooterComponent={<View style={{ height: 100 }} />}
              data={storage.jsRecents}
              renderItem={this.renderItem}
            />
          </View>
        </View>
        <ExpeditionModal isVisible={this.state.showModal} onClosed={this.doCloseModal} />
        <Loading isVisible={connoteStore.isLoading} />
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 8,
    backgroundColor: COLOR.MAIN.BACKGROUND
  },
  icon: {
    width: 50,
    height: 50,
    borderRadius: 5
  },
  text: {
    fontFamily: fonts.titillium.regular,
    fontSize: 30
  },
  expedition: {
    paddingHorizontal: 8,
    marginLeft: 2,
    paddingVertical: 0,
    backgroundColor: "#fff",
    borderBottomWidth: 0,
    borderRadius: 6,
    height: 37,
    marginVertical: 5,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center"
  },
  expeditionText: {
    fontFamily: fonts.titillium.regular,
    fontSize: 17
  },
  expeditionNameText: {
    fontFamily: fonts.titillium.bold,
    fontSize: 17
  },
  titleWrapper: { padding: 10, paddingLeft: 10, paddingBottom: 0, marginBottom: 5 },
  title: { fontSize: 20, fontFamily: fonts.titillium.bold, color: "grey" },

  card: { padding: 0, width: 135, height: 197, borderRadius: 10 },
  itemView: { paddingVertical: 0, paddingLeft: 10, paddingRight: 0, maxWidth: 150, alignItems: "center" },
  itemImage: { width: "100%", height: "100%" },
  itemTitle: { color: "grey", fontFamily: fonts.titillium.bold },
  listItemText: { fontSize: 15, color: "grey", fontFamily: fonts.titillium.regular },
  fakeSearchView: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 6,
    padding: 5,
    height: 37,
    backgroundColor: "#fff"
  },
  fakeSearchIcon: { fontSize: 24, color: "grey", marginHorizontal: 8 },
  fakeSearchText: { fontFamily: fonts.titillium.regular, fontSize: 17 }
});
