import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import { firestore } from "../../firebase.Config";

let userRef = collection(firestore, "users");
let addPostRef = collection(firestore, "addPosts");
let allProductForRendering = collection(firestore, "allProducts");
let favRef = collection(firestore, "favourites");
let addToCartRef = collection(firestore, "carts");
let commentsRef = collection(firestore, "comments");
let notiRef = collection(firestore, "notifications");


export const postUserData = (object) => {
  addDoc(userRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getAllUserData = (getAllUser) => {
  onSnapshot(userRef, (response) => {
    getAllUser(
      response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};




export const updateUserData = (documentId, updatedData) => {
  const userDocRef = doc(userRef, documentId);

  updateDoc(userDocRef, updatedData)
    .then(() => {
    })
    .catch((err) => {
      console.log('Error updating data:', err);
    });
};

export const postAddProduct = (object) => {
  addDoc(addPostRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const postAllProduct = (object) => {
  addDoc(allProductForRendering, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getPostAllProduct = (setAllProductFirebase) => {
  onSnapshot(allProductForRendering, (response) => {
    setAllProductFirebase(
      response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const deletePost = (id, nav) => {
  let docToDelete = doc(allProductForRendering, id);
  try {
    deleteDoc(docToDelete);
    nav("/allproduct");
  } catch (err) {
    console.log(err);
  }
};

export const getAllAddedProduct = (setAllAddedProduct) => {
  onSnapshot(addPostRef, (response) => {
    setAllAddedProduct(
      response.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const getCurrentUser = (setCurrentUser, email) => {
  const singleQueryUser = query(userRef, where("email", "==", email));
  onSnapshot(singleQueryUser, (res) => {
    setCurrentUser(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })[0]
    );
  });
};

export const favProduct = (userId, postId, product) => {
  try {
    let docToFav = doc(favRef, `${userId}_${postId}`);
    // if (isFavourited) {
    //   deleteDoc(docToFav);
    // } else {
    setDoc(docToFav, { userId, ...product });
    // }
  } catch (err) {
    console.log(err);
  }
};

export const allFavDel = (productId) => {
  let docToDelete = doc(favRef, productId);

  try {
    deleteDoc(docToDelete);
  } catch (err) {
    console.log(err);
  }
}




export const deleteFavProduct = (id) => {
  let docToDelete = doc(favRef, id);
  try {
    deleteDoc(docToDelete);
  } catch (err) {
    console.log(err);
  }
};

export const getAllFavProductByUser = (setFavProducts, userId) => {
  const allFavProducts = query(favRef, where("userId", "==", userId));
  onSnapshot(allFavProducts, (res) => {
    setFavProducts(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const cartProduct = (userId, postId, product) => {
  try {
    let docToCart = doc(addToCartRef, `${userId}_${postId}`);
   


    setDoc(docToCart, { ...product, userId });

  } catch (err) {
    console.log(err);
  }
};

export const allCartDel = (productId) => {
  let docToDelete = doc(addToCartRef, productId);

  try {
    deleteDoc(docToDelete);
  } catch (err) {
    console.log(err);
  }
}




export const cartProductForQauntity = (userId, postId, product, cartProducts) => {
  try {
    let docToCart = doc(addToCartRef, `${userId}_${postId}`);
    let currentId = `${userId}_${postId}`;
    let toUpdate = cartProducts?.find((item) => item.id === currentId)
    let docToDel = doc(addToCartRef, toUpdate?.id);


    if (toUpdate) {
      deleteDoc(docToDel);
      setDoc(docToCart, { ...product, userId });
    }



  } catch (err) {
    console.log(err);
  }
};

export const getAllCartProductByUser = (setCartProducts, userId) => {
  const allCartProducts = query(addToCartRef, where("userId", "==", userId));
  
  onSnapshot(allCartProducts, (res) => {
    setCartProducts(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const getCartProductByUser = ( setProductForQuantity, description) => {
  const allCartProducts = query(addToCartRef, where("description", "==", description));
  onSnapshot(allCartProducts, (res) => {
    setProductForQuantity(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};





export const deleteCartProduct = (id) => {
  let docToDelete = doc(addToCartRef, id);
  try {
    deleteDoc(docToDelete);
  } catch (err) {
    console.log(err);
  }
};

export const postComment = (object) => {
  try {
    addDoc(commentsRef, object);
  } catch (err) {
    console.log(err);
  }
};

export const getAllCommentByPost = (setAllComment, postId) => {
  const allComment = query(commentsRef, where("postId", "==", postId));
  
  onSnapshot(allComment, (res) => {
    setAllComment(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const getAllComment = (setAllComment) => {
  
  onSnapshot(commentsRef, (res) => {
    setAllComment(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};

export const deleteComment = (id) => {
  let docToDelete = doc(commentsRef, id);
  try {
    deleteDoc(docToDelete);
  } catch (err) {
    console.log(err);
  }
};

export const updateComment = (commentId, updatedData) => {
  const commentDocRef = doc(commentsRef, commentId);


  updateDoc(commentDocRef, updatedData)
    .then(() => {
    })
    .catch((err) => {
      console.log('Error updating data:', err);
    });
};


export const postNotiData = (object) => {
  addDoc(notiRef, object)
    .then(() => {})
    .catch((err) => {
      console.log(err);
    });
};

export const getAllNoti = (setAllNoti) => {
  
  onSnapshot(notiRef, (res) => {
    setAllNoti(
      res.docs.map((doc) => {
        return { ...doc.data(), id: doc.id };
      })
    );
  });
};


export const updateNoti = (notiId, updatedData) => {
  const notificationRef = doc(notiRef, notiId);



  updateDoc(notificationRef, updatedData)
    .then(() => {
    })
    .catch((err) => {
      console.log('Error updating data:', err);
    });
};


