import React from 'react';
import { View, StyleSheet, TouchableOpacity } from 'react-native';

// components
import { MaterialIcons } from '@expo/vector-icons';

function TabBar({ state, descriptors, navigation }) {
  const focusedOptions = descriptors[state.routes[state.index].key].options;

  if (focusedOptions.tabBarVisible === false) {
    return null;
  }
  return (
    <View style={styles.root}>
      {/* all tabs */}
      <View style={styles.routes}>
        {state.routes.map((route, index) => {
          const { options } = descriptors[route.key];
          {
            /* const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
              ? options.title
              : route.name; */
          }

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          // tab
          return (
            <View key={index} style={styles.container}>
              <TouchableOpacity
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                onLongPress={onLongPress}
                style={styles.route}>
                <View style={styles.icon}>
                  <MaterialIcons
                    size={isFocused ? 35 : 30}
                    name={route.name === 'Home' ? 'home' : 'favorite'}
                    color={isFocused ? '#3BB7DB' : 'grey'}
                  />
                </View>
              </TouchableOpacity>
            </View>
          );
        })}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  root: {
    ...StyleSheet.absoluteFill,
    top: '85%',
    margin: 10,
    borderRadius: 10,
    backgroundColor: '#fff',
    height: '10%',
    flexDirection: 'row',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 12,
    },
    shadowOpacity: 0.18,
    shadowRadius: 16.0,

    elevation: 24,
  },
  routes: {
    width: '60%',
    height: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  route: {
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  icon: {},
  text: {
    fontSize: 12,
    marginTop: 5,
  },
  container: {
    height: '100%',
  },
});

export default TabBar;
