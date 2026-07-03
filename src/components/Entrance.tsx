import React, { useEffect, useRef } from 'react';
import { Animated, Easing, ViewStyle, StyleProp } from 'react-native';

type EntranceProps = {
  active: boolean;
  delay?: number;
  distance?: number;
  style?: StyleProp<ViewStyle>;
  children?: React.ReactNode;
};

/**
 * Fades + slides its children up the first time `active` becomes true.
 * Used to stagger the title / subtitle / cards / button on each slide.
 */
export function Entrance({
  active,
  delay = 0,
  distance = 18,
  style,
  children,
}: EntranceProps) {
  const progress = useRef(new Animated.Value(0)).current;
  const started = useRef(false);

  useEffect(() => {
    if (active && !started.current) {
      started.current = true;
      Animated.timing(progress, {
        toValue: 1,
        duration: 520,
        delay,
        easing: Easing.out(Easing.cubic),
        useNativeDriver: true,
      }).start();
    }
  }, [active, delay, progress]);

  return (
    <Animated.View
      style={[
        {
          opacity: progress,
          transform: [
            {
              translateY: progress.interpolate({
                inputRange: [0, 1],
                outputRange: [distance, 0],
              }),
            },
          ],
        },
        style,
      ]}
    >
      {children}
    </Animated.View>
  );
}
