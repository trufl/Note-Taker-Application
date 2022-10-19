const router = require('express').Router();
const fs = require('fs')

router.get('/', (req, res) => {
  console.info(`${req.method} request received for notes`);

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if(err) {
      res.status(404).json(err);
    } else {
      res.status(200).json(JSON.parse(data));
    }
  });
});

router.post('/', (req, res) => {

  console.info(`${req.method} request received to save note`);

  const { title, text } = req.body;

  if (title && text) {

    const newNote = {
      title,
      text
    };

    fs.readFile('./db/db.json', 'utf8', (err, data) => {
      if(err) {
        res.status(404).json(err);
      } else {
        const savedNotes = JSON.parse(data);

        savedNotes.push(newNote);
        const notesStr = JSON.stringify(savedNotes, null, 4)

        fs.writeFile('./db/db.json', notesStr, (err) =>
          err ? console.error(err) : console.info(`\nData written to db.json`)
        );
      }
    });

    const response = {
      status: 'success',
      body: newNote,
    };

    res.status(200).json(response);
  } else {
    res.status(500).json('Error in sabing note');
  }
});

router.delete('/:title', (req, res) => {
  console.info(`${req.method} request received for notes`);

  const noteTitle = req.params;

  fs.readFile('./db/db.json', 'utf8', (err, data) => {
    if(err) {
      res.status(404).json(err);
    } else {
      const savedNotes = JSON.parse(data);
      const newSavedNotes = savedNotes.filter(note => note.title !== noteTitle.title)

      const notesStr = JSON.stringify(newSavedNotes, null, 4)

      fs.writeFile('./db/db.json', notesStr, (err) =>
        err ? console.error(err) : console.info(`\nData removed from db.json`)
      );
    }
  });

  const response = {
    status: 'success',
    body: `${noteTitle} succesfully removed`,
  };

  res.status(200).json(response);
});

module.exports = router;