import React, { useState } from 'react';
import './App.css';

interface Provider {
  id: string;
  name: string;
}

interface Note {
  date: string;
  noteType: string;
  audioLink: string;
  transcriptLink: string;
  commentsLink: string;
  soapNoteLink: string;
}

const practices = [
  { id: '1', name: 'Practice 1' },
  { id: '2', name: 'Practice 2' },
  // Add more practices as needed
];

const providers: { [key: string]: Provider[] } = {
  '1': [
    { id: '1', name: 'Provider A' },
    { id: '2', name: 'Provider B' },
  ],
  '2': [
    { id: '3', name: 'Provider C' },
    { id: '4', name: 'Provider D' },
  ],
  // Add more providers as needed
};

const dummyNotes: Note[] = [
  {
    date: '2024-07-01',
    noteType: 'Eval',
    audioLink: '#',
    transcriptLink: '#',
    commentsLink: '#',
    soapNoteLink: '#',
  },
  {
    date: '2024-07-02',
    noteType: 'Daily',
    audioLink: '#',
    transcriptLink: '#',
    commentsLink: '#',
    soapNoteLink: '#',
  },
];

function App() {
  const [selectedPractice, setSelectedPractice] = useState<string>('');
  const [selectedProvider, setSelectedProvider] = useState<string>('');
  const [notes, setNotes] = useState<Note[]>([]);

  const handlePracticeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPractice(event.target.value);
    setSelectedProvider('');
  };

  const handleProviderChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedProvider(event.target.value);
  };

  const fetchNotes = () => {
    // Fetch notes from the backend service
    // For now, we use dummy data
    setNotes(dummyNotes);
  };

  return (
    <div className="app-container">
      <div className="sidebar">
        <h2>ScribePT</h2>
        <ul>
          <li className="active">Reporting Dashboard</li>
          <li>Account Details</li>
        </ul>
        <div className="user-info">
          <p>Aryan Chaudhary</p>
          <p>Developer</p>
        </div>
      </div>
      <div className="main-content">
        <h1>ScribePT QA Reporting Dashboard</h1>
        <div className="form-group">
          <label>Select Practice:</label>
          <select value={selectedPractice} onChange={handlePracticeChange}>
            <option value="">--Select Practice--</option>
            {practices.map(practice => (
              <option key={practice.id} value={practice.id}>
                {practice.name}
              </option>
            ))}
          </select>
        </div>
        {selectedPractice && (
          <div className="form-group">
            <label>Select Provider:</label>
            <select value={selectedProvider} onChange={handleProviderChange}>
              <option value="">--Select Provider--</option>
              {providers[selectedPractice]?.map(provider => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </div>
        )}
        {selectedProvider && (
          <div className="form-group">
            <button onClick={fetchNotes}>Fetch Notes</button>
          </div>
        )}
        {notes.length > 0 && (
          <div className="table-container">
            <table>
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Note Type</th>
                  <th>Audio Link</th>
                  <th>Transcript Link</th>
                  <th>Comments Link</th>
                  <th>SOAP Note Link</th>
                </tr>
              </thead>
              <tbody>
                {notes.map((note, index) => (
                  <tr key={index}>
                    <td>{note.date}</td>
                    <td>{note.noteType}</td>
                    <td><a href={note.audioLink}>Audio</a></td>
                    <td><a href={note.transcriptLink}>Transcript</a></td>
                    <td><a href={note.commentsLink}>Comments</a></td>
                    <td><a href={note.soapNoteLink}>SOAP Note</a></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
