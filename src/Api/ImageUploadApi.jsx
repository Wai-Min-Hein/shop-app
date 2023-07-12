import { ref, getDownloadURL, uploadBytesResumable } from "firebase/storage";
import { storage } from "../../firebase.Config";



export const uploadImage = (image, setUrlImage, setProgressPercent) => {
   

    const storageRef = ref(storage, `files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
        setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((response) => {
            setUrlImage(response)
        });
      }
    );
  }

  
export const uploadProfileImage = (image, setProfileUrl, setProgressPercent) => {
   

  const storageRef = ref(storage, `profileImage/${image.name}`);
  const uploadTask = uploadBytesResumable(storageRef, image);

  uploadTask.on("state_changed",
    (snapshot) => {
      const progress =
        Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      setProgressPercent(progress);
    },
    (error) => {
      alert(error);
    },
    () => {
      getDownloadURL(uploadTask.snapshot.ref).then((response) => {
          setProfileUrl(response)
      });
    }
  );
}

export const uploadRelatedImage = (images,setRelatedImages,setProgressPercent) => {
  for(let i =0; i < images.length; i++){
    const image = images[i]




  const storageRef = ref(storage, `files/${image.name}`);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on("state_changed",
      (snapshot) => {
        const progress =
          Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
          setProgressPercent(progress);
      },
      (error) => {
        alert(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setRelatedImages(prev => [...prev, downloadURL])
        });})
  }


}