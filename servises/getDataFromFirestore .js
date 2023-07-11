import { collection, getDocs } from 'firebase/firestore'; 

export const getDataFromFirestore = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'posts'));

      snapshot.forEach((doc) => console.log(`${doc.id} =>`, doc.data()));

            return snapshot.map((doc) => ({ id: doc.id, data: doc.data() }));
    } catch (error) {
      console.log(error);
            throw error;
    }
  };