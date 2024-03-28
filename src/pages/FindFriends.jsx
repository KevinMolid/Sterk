import React, { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config.jsx'; // Ensure this points to your Firestore config

function FindFriends() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const querySnapshot = await getDocs(collection(db, "users"));
      const usersList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setUsers(usersList);
    };

    fetchUsers();
  }, []);

  return (
    <main>
      <h2>Find friends</h2>
      {users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div className='find-friends--user-wrapper' key={user.id} style={{ marginBottom: '20px' }}>
              <div className='find-friends--user-info'>
                <img className='find-friends--user-img' src={user.photoURL || '/path/to/default/avatar.png'} alt={user.displayName} />
                <p>{user.displayName}</p>
              </div>
              <button className='btn-follow'>Follow</button>
            </div>
          ))}
        </div>
      ) : (
        <p>There are no friends here... Booo!</p>
      )}
    </main>
  );
}

export default FindFriends;