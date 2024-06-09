import './App.css';
import React from 'react';
import FileList from './components/FileList';

function App() {
    return (
        <div className="App">
            <h1>File CRUD Application</h1>
            <FileList />
        </div>
    );
}

export default App;
