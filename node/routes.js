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

module.exports = router;
