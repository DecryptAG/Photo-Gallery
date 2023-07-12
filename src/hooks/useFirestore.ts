import { collection, onSnapshot, orderBy, query, } from "firebase/firestore"
import { useEffect, useState } from "react"
import { db } from "../firebase/config"

type Image = {
    createdAt: Date,
    userEmail: string,
    imageURL: string,
}
export default function useFirestore(collectionName:string) {
    const [docs, setDocs] = useState<Image[]>([])
    const [isLoading, setIsLoading] = useState<boolean>(true)

    useEffect(()=>{
        let unsubscribe: () => void
        const getData = ()=>{
            try{
                const q = query(collection(db, collectionName));
                unsubscribe  = onSnapshot(q, (querySnapshot) => {
                const images: Image[] = [];
                querySnapshot.forEach((doc) => {
                    const imageURL = doc.data().imageURL;
                    const createdAt = doc.data().createdAt.toDate();
                    const userEmail = doc.data().userEmail;
                    images.push({imageURL,createdAt,userEmail})
                });
                setDocs(images);
                setIsLoading(false);
                });

            }catch(error){
                console.log(error)
                setIsLoading(false)
            }
        }
        getData();
        return ()=> unsubscribe && unsubscribe();
    },[collectionName])

  return {docs, isLoading
  };
}
