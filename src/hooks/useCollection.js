import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, orderBy } from "firebase/firestore";
import { db } from "../firebase/firebaseConfig";

export const useCollection = (collectionName, whereOptions = [], orderOptions = []) => {
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        // Validate and build the query
        try {
            let q = collection(db, collectionName);

            if (whereOptions.length > 0) {
                q = query(q, where(...whereOptions));
            }

            if (orderOptions.length > 0) {
                q = query(q, orderBy(...orderOptions));
            }

            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const documents = [];
                querySnapshot.forEach((doc) => {
                    documents.push({ id: doc.id, ...doc.data() });
                });
                setData(documents);
                setError(null);
            }, (error) => {
                console.error("Error fetching collection:", error);
                setError("Failed to fetch data.");
            });

            return () => unsubscribe();

        } catch (error) {
            console.error("Error building query:", error);
            setError("Failed to build query.");
        }
    }, [collectionName, JSON.stringify(whereOptions), JSON.stringify(orderOptions)]);

    return { data, error };
};
