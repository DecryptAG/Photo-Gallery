/* eslint-disable @typescript-eslint/no-misused-promises */
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";
import { useState } from "react";
import { db, storage } from "../firebase/config";
import {v4 as uuidv4} from "uuid";
import { addDoc, collection } from "firebase/firestore";
import { useAuth } from "./useAuth";


const useStorage = ()=>{
  const [progress,setProgress] = useState<number>(0);
  const [error,setError] = useState<Error | null>(null);
  const [url,setUrl] = useState<string | null>(null);
  const {user} = useAuth();
  const startUpload = (file:File)=>{
    if(!file)
    {
      return;
    }

    const fileId = uuidv4();
    const formatFile = file.type.split('/')[1];
    console.log(file)
    const storageRef = ref(storage, `images/${fileId}.${formatFile}`);
    const uploadTask = uploadBytesResumable(storageRef, file);

    uploadTask.on('state_changed', (snapshot) => {
      const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      setProgress(progress)
      console.log("Upload is " + progress + "% done");
    },   
    (error) => {
      setError(error)
    },async () => { 
      const downloadURL  = await getDownloadURL(uploadTask.snapshot.ref);
      setUrl(downloadURL)
      setProgress(progress);

      // store data in db
      await addDoc(collection(db, "images"), {
        imageURL: downloadURL,
        createdAt: new Date(),
        userEmail: user?.email
      });
      console.log(downloadURL)
      
    });
    }
    return{
      progress, error, url, startUpload
    };

  }
    

export default useStorage;