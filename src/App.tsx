import { useState } from 'react';
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
  const [notes, setNotes] = useState<Note[]>(dummyNotes);

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
    <main>
      <h1>PT Notes Reporting Tool</h1>
      <div>
        <label>
          Select Practice:
          <select value={selectedPractice} onChange={handlePracticeChange}>
            <option value="">--Select Practice--</option>
            {practices.map(practice => (
              <option key={practice.id} value={practice.id}>
                {practice.name}
              </option>
            ))}
          </select>
        </label>
      </div>
      {selectedPractice && (
        <div>
          <label>
            Select Provider:
            <select value={selectedProvider} onChange={handleProviderChange}>
              <option value="">--Select Provider--</option>
              {providers[selectedPractice]?.map((provider: Provider) => (
                <option key={provider.id} value={provider.id}>
                  {provider.name}
                </option>
              ))}
            </select>
          </label>
        </div>
      )}
      {selectedProvider && (
        <div>
          <button onClick={fetchNotes}>Fetch Notes</button>
        </div>
      )}
      {notes.length > 0 && (
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
      )}
    </main>
  );
}

export default App;
