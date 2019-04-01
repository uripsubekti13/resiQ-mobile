import React, { Component } from "react";
import { Text, View } from "react-native";
import { fonts } from "../../assets";
import { observer } from "mobx-react";
import { detailStore } from "./detail.store";
import Timeline from "react-native-timeline-feed";

@observer
export class TimelineView extends Component {
  render() {
    
    return (
        <Timeline
          data={detailStore.timeline}
          showTime={false}
          lastCircleContainerStyle={{ paddingTop: 10 }}
          titleStyle={{ fontFamily: fonts.titillium.bold }}
          descriptionStyle={{ fontFamily: fonts.titillium.regular }}
        />
    );
  }
}
