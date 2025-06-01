const express = require('express');
const admin = require('firebase-admin');
const router = express.Router();

const serviceAccount = require("../key/classic-pong-95c33-firebase-adminsdk-fbsvc-1217aef75f.json");


if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
}

const db = admin.firestore();

router.get('/users', async (req, res) => {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


router.get('/leaderboard',async (req,res)=>{
  try {
    const leaderboardSnapshot = await db.collection('users')
      .orderBy('score', 'desc')
      .limit(10)
      .get();

    // Only include 'user' and 'score' fields
    const leaderboard = leaderboardSnapshot.docs.map(doc => {
      const data = doc.data();
      return {
      id: doc.id,
      user: data.user,
      score: data.score
      };
    });
    res.json(leaderboard);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
})

router.post('/register', async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ error: 'User and score are required' });
  }

  try {
    const userRef = db.collection('users').doc(user);
    const doc = await userRef.get();

      // Create new user
      await userRef.set({user, pwd, score:0 });
      res.json({ message: 'User registered successfully' });
    
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post('/login', async (req, res) => {
  const { user, pwd } = req.body;

  if (!user || !pwd) {
    return res.status(400).json({ error: 'User and password are required' });
  }

  try {
    const userRef = db.collection('users').doc(user);
    const doc = await userRef.get();

    if (!doc.exists || doc.data().pwd !== pwd) {
      return res.status(401).json({ error: 'Invalid username or password' });
    }

    res.json({ message: 'Login successful', user: doc.data() });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
  
});


router.post('/updateScore', async (req, res) => {
  const { user, score } = req.body;

  if (!user || score === undefined) {
    return res.status(400).json({ error: 'User and score are required' });
  }

  try {
    const userRef = db.collection('users').doc(user);
    const doc = await userRef.get();

    if (!doc.exists) {
      return res.status(404).json({ error: 'User not found' });
    }
    if(score ===null){
      return res.status(400).json({ error: 'Score cannot be null' });
    }
    // update if higherthan current score

    const currentScore = doc.data().score || 0;
    if (score <= currentScore) {
      return res.status(400).json({ error: 'New score must be higher than current score' });
    }

    
    await userRef.update({ score });
    res.json({ message: 'Score updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;