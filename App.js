// Importing necessary modules from 'react' and 'react-native'
import { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity, TextInput, Button } from 'react-native';

// Define color constants
const topBackground = '#4BA59D';
const topText = '#F5E359';
const bottomBackground = '#F5E359';
const bottomText = '#111';

// Main component function
export default function App() {
  // State variables for timers, current player, and pause status
  const [timer, setTimer] = useState(100000);
  const [timerTop, setTimerTop] = useState(10000);
  const [timerBottom, setTimerBottom] = useState(10000);
  const [currentPlayer, setCurrentPlayer] = useState('');
  const [paused, setPaused] = useState(true);

  // useEffect hook to handle timer updates
  useEffect(() => {
    let interval;

    // Function to update the timers
    const updateClock = () => {
      if (!paused) {
        if (currentPlayer === 'top' && timerTop > 0) {
          setTimerTop(prevTime => prevTime - 1000);
        } else if (currentPlayer === 'bottom' && timerBottom > 0) {
          setTimerBottom(prevTime => prevTime - 1000);
        }
      }
    };

    // Set up interval for timer updates
    interval = setInterval(updateClock, 1000);

    // Clean up the interval when the component is unmounted or dependencies change
    return () => {
      clearInterval(interval);
    };
  }, [paused, timerTop, timerBottom]);

  // Function to handle button press, updating the current player and unpausing the timer
  const pressPad = (player) => {
    setPaused(false);
    setCurrentPlayer(player);
  };

  // Function to reset the game, setting timers to the initial value and pausing
  const resetGame = () => {
    setTimerTop(timer);
    setTimerBottom(timer);
    setPaused(true);
  };

  // Function to format time in minutes and seconds
  function formatTime(milliseconds) {
    const minutes = Math.floor(milliseconds / 60000);
    const formattedSeconds = String(Math.floor((milliseconds % 60000) / 1000)).padStart(2, '0');
    return `${minutes}:${formattedSeconds}`;
  }

  // Function to update the main timer
  const updateTime = (num) => {
    setTimer(parseInt(num, 10));
  };

  // JSX structure for the component
  return (
    <View style={styles.container}>
      {/* Touchable area for the top player */}
      <TouchableOpacity style={[styles.pads, { backgroundColor: topBackground }]} onPress={() => pressPad('bottom')}>
        <Text style={[styles.clockText, { color: topText }]}>
          {formatTime(timerTop)}
        </Text>
      </TouchableOpacity>
      
      {/* Middle section containing input, pause button, and reset button */}
      <View style={styles.middle}>
        <TextInput style={styles.input} value={timer.toString()} onChangeText={num => updateTime(num)} />
        <Button title="Pause" onPress={() => setPaused(old => !old)} />
        <Button title="Reset" onPress={resetGame} />
      </View>
      
      {/* Touchable area for the bottom player */}
      <TouchableOpacity style={[styles.pads, { backgroundColor: bottomBackground }]} onPress={() => pressPad('top')}>
        <Text style={[styles.clockText, { color: bottomText }]}>
          {formatTime(timerBottom)}
        </Text>
      </TouchableOpacity>
    </View>
  );
}

// Styles for the component
const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  pads: {
    flex: 5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  middle: {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20
  },
  clockText: {
    fontSize: 48,
    fontWeight: '700'
  },
  input: {
    borderWidth: 1,
    padding: 10,
    fontSize: 18,
    width: 100,
    borderRadius: 10
  }
});
