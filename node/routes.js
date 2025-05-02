const express = require('express');
const { db } = require('./firebase-admin');

const router = express.Router(); 

router.get('/userdata', async (req, res) => {
  try {
    const snapshot = await db.collection('results').get();
    const users = snapshot.docs.map(doc => doc.data());
    res.status(200).json(users);
  } catch (error) {
    console.error("Error: ", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
