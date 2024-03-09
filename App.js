import React from 'react';
import Navigation from './src/navigation/Navigation';
import { ThemeProvider } from './src/context/ThemeContext';
import { NoteProvider } from './src/context/NoteContext';
import { AlertNotificationRoot } from 'react-native-alert-notification';

export default function App() {
  return (
    <ThemeProvider>
      <NoteProvider>
        <AlertNotificationRoot>
          <Navigation/>
        </AlertNotificationRoot>
      </NoteProvider>
    </ThemeProvider>
  );
}
