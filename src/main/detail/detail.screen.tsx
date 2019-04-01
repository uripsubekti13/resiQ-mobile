import React, { Component } from "react";
import { Text, View, FlatList, StyleSheet, ScrollView, TouchableOpacity } from "react-native";
import { fonts } from "../../assets";
import { observer } from "mobx-react";
import { detailStore } from "./detail.store";
import { TimelineView as Timeline } from "./timeline.screen";
import { Container } from "../../shared/container";
import * as _ from "lodash";
import { textUtil } from "../../utils/text.util";
import { Row, Col, Icon } from "native-base";
import navigationService from "../../services/navigation.service";

@observer
export class Detail extends Component {
  componentWillUnmount() {
    detailStore.result = null;
  }
  renderBack = () => (
    <TouchableOpacity onPress={() => navigationService.goBack()}>
      <Icon style={{ color: "#fff" }} name={"arrow-round-back"} />
    </TouchableOpacity>
  );
  render() {
    const { main } = detailStore;
    let keyValue = [];
    for (let key in main) {
      if (_.get(main, key)) {
        keyValue.push({ key, value: _.get(main, key) });
      }
    }
    return (
      <Container title={"Detail"} renderLeft={this.renderBack}>
        <ScrollView style={{ flex: 1 }}>
          <View style={{ padding: 15 }}>
            <FlatList
              data={keyValue}
              renderItem={({ item, index }) => {
                return (
                  <Row key={index}>
                    <Col size={1}>
                      <Text style={styles.text}>{textUtil.camelCaseToSentence(item.key)}</Text>
                    </Col>
                    <Col size={0.1}>
                      <Text>:</Text>
                    </Col>
                    <Col size={2}>
                      <Text style={styles.text}>{item.value}</Text>
                    </Col>
                  </Row>
                );
              }}
            />
          </View>
          <View style={{ flex: 1 }}>
            <Timeline />
          </View>
        </ScrollView>
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  text: { fontFamily: fonts.titillium.regular, fontSize: 14 }
});
