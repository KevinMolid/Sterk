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
      <h2 className='margin-bottom-1'>Find friends</h2>
      {users.length > 0 ? (
        <div>
          {users.map((user) => (
            <div className='find-friends--user-banner' key={user.id}>
              <div className='find-friends--user-wrapper'>
                <img className='find-friends--user-img' src={user.photoURL || '/assets/default.webp'} alt={user.displayName} />
                <div className='find-friends--user-details'>
                    <p className='white small bold'>{user.displayName || user.email}</p>
                    <p className='small'>{user.email}</p>
                </div>
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