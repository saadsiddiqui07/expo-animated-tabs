import { StatusBar } from "expo-status-bar";
import {
  Dimensions,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Entypo, Feather } from "@expo/vector-icons";
import { useEffect, useRef, useState } from "react";
import * as Animatable from "react-native-animatable";

const { width } = Dimensions.get("window");

const DATA = [
  { id: 1, name: "Home" },
  { id: 2, name: "Profile" },
  { id: 3, name: "Explore" },
  { id: 4, name: "Notifications" },
  { id: 5, name: "Messages" },
  { id: 6, name: "Settings" },
  { id: 7, name: "Friends" },
  { id: 8, name: "Groups" },
  { id: 9, name: "Photos" },
  { id: 10, name: "Videos" },
];

const SPACING = 10;

const _colors = {
  active: `royalblue`,
  inactive: `black`,
};

const AnimatedComponent =
  Animatable.createAnimatableComponent(TouchableOpacity);

export default function App() {
  const ref = useRef<FlatList>(null);
  const [index, setIndex] = useState<number>(0);
  const [viewPosition, setViewPosition] = useState(0.5);

  useEffect(() => {
    ref?.current?.scrollToIndex({
      index,
      animated: true,
      viewOffset: viewPosition === 0.5 || viewPosition === 1 ? 0 : SPACING,
      viewPosition,
    });
  }, [index, viewPosition]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      <FlatList
        ref={ref}
        initialScrollIndex={0}
        data={DATA}
        style={{ flexGrow: 0 }}
        keyExtractor={(item) => `${item.id}`}
        contentContainerStyle={{ paddingLeft: SPACING }}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index: itemIndex }) => {
          const isActive = index === itemIndex;
          return (
            <AnimatedComponent
              onPress={() => setIndex(itemIndex)}
              duration={500}
            >
              <View
                style={{
                  marginRight: SPACING,
                  padding: SPACING,
                  borderWidth: 2,
                  borderColor: _colors.active,
                  borderRadius: 12,
                  backgroundColor: isActive ? _colors.active : _colors.inactive,
                  opacity: isActive ? 1 : 0.6,
                }}
              >
                <Text
                  style={{
                    color: "white",
                    fontWeight: "700",
                    textAlign: "center",
                  }}
                >
                  {item.name}
                </Text>
              </View>
            </AnimatedComponent>
          );
        }}
        horizontal
      />
      <View
        style={{
          alignItems: "center",
          flexDirection: "row",
          marginTop: SPACING * 10,
        }}
      >
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              marginBottom: SPACING,
            }}
          >
            Scroll position
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: width / 2,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                setViewPosition(0);
              }}
            >
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: "royalblue",
                  borderRadius: SPACING,
                  marginRight: SPACING,
                }}
              >
                <Entypo
                  name="align-left"
                  size={24}
                  color={viewPosition === 0 ? "yellow" : "white"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewPosition(0.5);
              }}
            >
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: "royalblue",
                  borderRadius: SPACING,
                  marginRight: SPACING,
                }}
              >
                <Entypo
                  name="align-horizontal-middle"
                  size={24}
                  color={viewPosition === 0.5 ? "yellow" : "white"}
                />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                setViewPosition(1);
              }}
            >
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: "royalblue",
                  borderRadius: SPACING,
                }}
              >
                <Entypo
                  name="align-right"
                  size={24}
                  color={viewPosition === 1 ? "yellow" : "white"}
                />
              </View>
            </TouchableOpacity>
          </View>
        </View>
        <View style={{ alignItems: "center" }}>
          <Text
            style={{
              color: "#fff",
              fontWeight: "700",
              marginBottom: 10,
            }}
          >
            Navigation
          </Text>
          <View
            style={{
              flexDirection: "row",
              width: width / 2,
              justifyContent: "center",
            }}
          >
            <TouchableOpacity
              onPress={() => {
                if (index === 0) {
                  return;
                }
                setIndex(index - 1);
              }}
            >
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: "royalblue",
                  borderRadius: SPACING,
                  marginRight: SPACING,
                }}
              >
                <Feather name="arrow-left" size={24} color="white" />
              </View>
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => {
                if (index === DATA.length - 1) {
                  return;
                }
                setIndex(index + 1);
              }}
            >
              <View
                style={{
                  padding: SPACING,
                  backgroundColor: "royalblue",
                  borderRadius: SPACING,
                }}
              >
                <Feather name="arrow-right" size={24} color="white" />
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#020617",
    alignItems: "center",
    justifyContent: "center",
  },
});
