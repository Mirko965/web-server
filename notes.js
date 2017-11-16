const fs = require('fs');

const fetchNote = () => {
  try {
    let fileName = 'notes-data.json'
    let notesString = fs.readFileSync(fileName);
    return JSON.parse(notesString)
  } catch (err){
    return [];
  }
}

const saveNote = (notes) => {
  fs.writeFileSync('notes-data.json', JSON.stringify(notes))
}

const addNote = (title,body) => {
  let notes = fetchNote();
  let note = {
    title: title,
    body: body
  }
  let duplicatTitle = notes.filter((note) => note.title === title);

  if (duplicatTitle.length === 0){
    notes.push(note)
    saveNote(notes)
    return note;
  }
};

const getAll = () => {
 return fetchNote()
}

const getNote = (title) => {
  let notes = fetchNote();
  let oneNote = notes.filter((note) => note.title === title)
  return oneNote[0]
}

const removeNote = (title) => {
  let notes = fetchNote();
  let removeTitle = notes.filter((note) => note.title !== title)
  saveNote(removeTitle);
  return notes.length !== removeTitle.length
}
const logMessage = (note) => {
  debugger
  console.log("---")
  console.log(`Title: ${note.title}`)
  console.log(`Body: ${note.body}`)
}

module.exports = {
  addNote,
  getAll,
  getNote,
  removeNote,
  logMessage
}

