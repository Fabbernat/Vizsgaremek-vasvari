import { getFirestore } from "firebase/firestore";

const localdb = {
    getOrders: function() {
        // Simulated database orders retrieval
        return [
            { id: 1, item: 'Pizza', quantity: 2 },
            { id: 2, item: 'Hamburger', quantity: 5 }
        ];
    }
};

const firedb = getFirestore(app);

export const db = localdb; // Ki lehet cserélni `firedb`-re, ha kész a Firestore 
export {app};