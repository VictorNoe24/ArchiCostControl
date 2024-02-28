import React from 'react';
import Navigation from './src/navigation/Navigation';
import { ThemeProvider } from './src/context/ThemeContext';
import { NoteProvider } from './src/context/NoteContext';

export default function App() {
  return (
    <ThemeProvider>
      <NoteProvider>
        <Navigation/>
      </NoteProvider>
    </ThemeProvider>
  );
}
