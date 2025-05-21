const express = require('express');
const { db } = require('./firebase-admin');

const router = express.Router(); 

router.get('/userdata/:user', async (req, res) => {
  const { user } = req.params;

  try {
    const snapshot = await db.collection('results').where('user', '==', user).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'User not found' });
    }

    const users = snapshot.docs.map(doc => doc.data());
    res.status(200).json(users);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

router.post('/userdata/:user/add-result', async (req, res) => {
  const { user } = req.params;
  const { score } = req.body;

  if (typeof score !== 'number') {
    return res.status(400).json({ message: 'Score must be a number' });
  }

  try {
    const snapshot = await db.collection('results').where('user', '==', user).get();

    if (snapshot.empty) {
      return res.status(404).json({ message: 'User not found' });
    }

    const docRef = snapshot.docs[0].ref; // Get reference to the matching doc
    const currentData = snapshot.docs[0].data();

    const updatedResults = [...(currentData.results || []), score];

    await docRef.update({ results: updatedResults });

    res.status(200).json({ message: 'Result added successfully' });
  } catch (error) {
    console.error('Error adding result:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});



module.exports = router;
