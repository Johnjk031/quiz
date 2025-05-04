import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import axios from 'axios';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';


export function UserInfo() {
  const auth = getAuth();
  const [user, setUser] = useState("");
  const [userInfo, setUserInfo] = useState(null);
  const [average, setAverage] = useState(0);

  const percentage = 75;

const maxValue = 100;
  const calculateAverage = (results: number[]) => {
    if (!results || results.length === 0) return 0;
    const percentages = results.map(num => (num / 10) * 100);
    const avg = percentages.reduce((sum, p) => sum + p, 0) / percentages.length;
    return avg;
  };

  const fetchUserInfo = (username: string) => {
    axios.get(`http://localhost:5000/api/userdata/${username}`)
      .then(response => {
        setUserInfo(response.data);
        const avg = calculateAverage(response.data[0].results);
        console.log("avg: ", avg)
        setAverage(avg);
      })
      .catch(error => {
        console.error("There was an error making the request!", error);
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const username = user.email?.split('@')[0] || '';
        setUser(username);
        fetchUserInfo(username);
      } else {
        console.log("User is signed out");
      }
    });
    return () => unsubscribe();
  }, []);

  return (
    <div className="user-info" style={{ textAlign: 'center' }}>
      <p>Welcome {user}</p>
      <p>Your average score is:</p>


<div style={{ width: 200, height: 200 }}>
  <CircularProgressbar
    value={average}
    text={`${average}%`}
    styles={buildStyles({
      pathColor: '#65A1BA',
      textColor: '#333',
      trailColor: '#eee',
    })}
  />
</div>
    </div>
  );
}

export default UserInfo;
