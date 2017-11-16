const fs = require('fs');
const os = require('os');
const notes = require('./notes')
const yargs = require('yargs');

/*let user = os.userInfo();
console.log(user)
fs.appendFile('greetings.txt',` Hello ${user.username}`,(err) => {
  if (err) throw err;
  console.log('The "data to append" was appended to file!')
})
notes.add(3,8)*/

let titleOption = {
  describe: 'Title of note',
  demand:true,
  alias: 't'};
const bodyOption = {
  describe: 'Body of note',
  demand: true,
  alias: 'b'
}

const argv = yargs
  .command('add','Add new Note',{
    title: titleOption,
    body: bodyOption
})
  .command('list','Read all notes')
  .command('read','Read Note',{ titleOption })
  .command('remove', 'Remove Note', { titleOption })
  .help()
  .argv
const command = argv._[0]

if (command === 'add') {

  let note = notes.addNote(argv.title, argv.body);
  if (note){
    console.log("Note_created")
      notes.logMessage(note)
  } else {
    console.log("Title already exist!!")
  }

} else if (command === 'list') {

  let allNotes = notes.getAll();
  console.log(`Printing ${allNotes.length} note(s)`)
  allNotes.forEach((note) => notes.logMessage(note))

} else if (command === 'read' ) {

  let oneNote = notes.getNote(argv.title)
  if (oneNote){
    notes.logMessage(oneNote)
  } else {
    console.log("Note not found")
  }

} else if (command === 'remove') {

  let removeNote = notes.removeNote(argv.title)
  debugger
  let message = removeNote ? "Note removed" : "Note not found";
  debugger
  console.log(message)

}else {
  console.log('Command not recognized')
}
