import { db, fb, auth,provider,fbProvider, storage } from '../../config/firebase';
import { clearUser, loginFailed, loginSuccess, logoutFxn, signupPending, signupFailed, storeUserData,storeProfileImages, markRegisteredWithSocials } from '../reducers/auth.slice';
import { v4 as uuidv4 } from 'uuid';
import { notifyErrorFxn, notifySuccessFxn } from 'src/utils/toast-fxn';
import { clearGroup } from '../reducers/main.slice';

import "firebase/auth";
import firebase from "firebase/app";


  export const signin = (user, navigate,) => async (dispatch) => {
   
    fb.auth().signInWithEmailAndPassword(user.email, user.password)
    .then((userCredential) => {
      // Signed in
     
      var user = userCredential.user;
      //console.log('Signed In user is: ', user.email);
       dispatch(fetchUserData(user.uid, "sigin", navigate));
    })
    .catch((error) => {
      //console.log( ' PROBLEM REPORT ', error.message);
      dispatch(loginFailed(error.message));
     
      var errorCode = error.code;
      var errorMessage = error.message;
      //notifyErrorFxn(errorMessage);
      
      //console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
     
    });

};








export const passwordResetEmail = (email, setForgotPassword) => async (dispatch) => {

  fb
 .auth()
 .sendPasswordResetEmail(email)
 .then(() => {
   
   notifySuccessFxn('E-mail de réinitialisation du mot de passe envoyé. Vérifiez votre boîte de réception pour obtenir des instructions.');
   setForgotPassword(false);
 })
 .catch(error => {
  setForgotPassword(false);
   notifyErrorFxn(`Erreur lors de l'envoi de l'e-mail de réinitialisation du mot de passe: ${error.message}`);
   // setMessage(`Error sending password reset email: ${error.message}`);
 });
};



export const UseFacebookDetailsToSignIn = (navigate) => async (dispatch) => {

  const provider =  new firebase.auth.FacebookAuthProvider();

 fb.auth().useDeviceLanguage();
 
  fb.auth().signInWithPopup(provider)
  .then((result)=>{
    var user = result.user;
  
        var firstName= result.user.displayName?result.user.displayName.split(" ")[0]:''
        var lastName = result.user.displayName?result.user.displayName.split(" ")[1]:''
       //console.log("FIRST AND LAST NAME FROM FACEBOOK ARE ---->",firstName,lastName)
       
    
        db.collection('users').doc(user.uid).update({
          uid: user.uid,
          email: user.email,
          firstName:firstName,
          lastName:lastName,
          fullName:firstName + " " + lastName
        
         
        })
    
    
         dispatch(fetchUserData(user.uid, "sigin", navigate));

  }).catch((error) => {
    //console.log( ' PROBLEM REPORT ', error.message);
    dispatch(loginFailed(error.message));
   
    var errorCode = error.code;
    var errorMessage = error.message;
    //notifyErrorFxn(errorMessage);
    
    //console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
   
  });

}







export const signInWithFacebook = (e,navigate) => async (dispatch) => {
  e.preventDefault()
  const provider =  new firebase.auth.FacebookAuthProvider();

 fb.auth().useDeviceLanguage();
 
  fb.auth().signInWithPopup(provider)
  .then((result)=>{
    var user = result.user;
  
    var firstName= result.user.displayName?result.user.displayName.split(" ")[0]:''
    var lastName = result.user.displayName?result.user.displayName.split(" ")[1]:''
   //console.log("FIRST AND LAST NAME FROM FACEBOOK ARE ---->",firstName,lastName)
   
    db.collection('userData').doc(user.uid).update({
      uid: user.uid,
      email: user.email,
      firstName:firstName,
      lastName:lastName,
      fullName:firstName + " " + lastName
      
    })

    db.collection('users').doc(user.uid).update({
      uid: user.uid,
      email: user.email,
      firstName:firstName,
      lastName:lastName,
      fullName:firstName + " " + lastName
    
     
    })


     dispatch(fetchUserData(user.uid, "sigin", navigate));

  }).catch((error) => {
    //console.log( ' PROBLEM REPORT ', error.message);
    dispatch(loginFailed(error.message));
   
    var errorCode = error.code;
    var errorMessage = error.message;
    //notifyErrorFxn(errorMessage);
    
    //console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
   
  });

}





export const signInWithGoogle = (navigate) => async (dispatch) => {

  fb.auth().signInWithPopup(provider)
  .then((userCredential)=>{

    
    var user = userCredential.user;
  
    var firstName= userCredential.user.displayName?userCredential.user.displayName.split(" ")[0]:''
    var lastName = userCredential.user.displayName?userCredential.user.displayName.split(" ")[1]:''
  
   //console.log("FIRST AND LAST NAME FROM GOOGLE ARE ---->",firstName,lastName)


    db.collection('userData').doc(user.uid).update({
      uid: user.uid,
      email: user.email,
      firstName:firstName,
      lastName:lastName,
      fullName:firstName + " " + lastName
      
     
    })
 
 
    db.collection('users').doc(user.uid).update({
      uid: user.uid,
      email: user.email,
      firstName:firstName,
      lastName:lastName,
      fullName:firstName + " " + lastName
    
     
    })


     dispatch(fetchUserData(user.uid, "sigin", navigate));

  }).catch((error) => {
    //console.log( ' PROBLEM REPORT ', error.message);
    dispatch(loginFailed(error.message));
   
    var errorCode = error.code;
    var errorMessage = error.message;
    //notifyErrorFxn(errorMessage);
    
    //console.log('Error Code is: ', errorCode, + ' Msg is: ', errorMessage);
   
  });

}



export const signup = (user,navigate) => async (dispatch) => {
     //console.log(user);
   dispatch(signupPending());
   //console.log("Just before the sign up happens!!!!")


   db.collection('users')
   .where('email', '==', user.email)
   .get()
   .then((snapshot) => {
     const usersWithEmail = snapshot.docs.map((doc) => ({ ...doc.data() }));
     if (usersWithEmail.length) {
        notifyErrorFxn("cet utilisateur existe déjà, veuillez vous inscrire avec une autre adresse e-mail")
        return
       }
     else {

    fb.auth().createUserWithEmailAndPassword(
      user.email,
      user.password
  ).then((res)=>{
     db.collection('userData').doc(res.user.uid).set({
      uid: res.user.uid,
      fullName: user.firstName,
      
      email: user.email,
      password: user.password,
      facebook:user.facebook,
      lessonsWatched:[],
      purchasedCourses:[],
      savedCourses:[],
      affiliate:user.affiliate,
      pvExamen:user.pvExamen,
      telephone:user.telephone,
      classOption:user.classOption,
      schoolOrigin:user.schoolOrigin,
      registeredOn:new Date(),
     
    })


    db.collection('users').doc(res.user.uid).set({
      uid: res.user.uid,
      fullName: user.firstName,
      
      email: user.email,
      password: user.password,
      facebook:user.facebook,
      affiliate:user.affiliate,
      lessonsWatched:[],
      purchasedCourses:[],
      savedCourses:[],
      pvExamen:user.pvExamen,
      telephone:user.telephone,
      classOption:user.classOption,
      schoolOrigin:user.schoolOrigin,
      registeredOn:new Date(),
     
    })
    
    fb.auth().sendPasswordResetEmail(user.email)
    dispatch(fetchUserData(res.user.uid, "registered",navigate));
  }).then(() => {
   
    navigate("/dashboard/home");
  }).catch((err) => {
    console.error("Error signing up: ", err);
    var errorMessage = err.message;
    dispatch(signupFailed({ errorMessage }));
  })

}
 }).catch((err) => {
  console.error("Error signing up: ", err);
  var errorMessage = err.message;
  dispatch(signupFailed({ errorMessage }));
})


}


export const signUpWithGoogle = (navigate) => async (dispatch) => {

   /*SETTING UP GOOGLE TAG MANAGER--*/
  window.dataLayer = window.dataLayer || [];
  function gtag(){window.dataLayer.push(arguments);}
  gtag('js', new Date());
 
  gtag('config', 'G-EY9BN9TW8S',{ 'debug_mode': true });
 /*SETTING UP GOOGLE TAG MANAGER-- END */

  
 
  dispatch(signupPending());

  fb.auth().signInWithPopup(provider)
    
 .then((userCredential)=>{
  var user = userCredential.user;
 
  var firstName= userCredential.user.displayName?userCredential.user.displayName.split(" ")[0]:''
  var lastName = userCredential.user.displayName?userCredential.user.displayName.split(" ")[1]:''


 db.collection('users')
 .where('email', '==', user.email)
 .get()
 .then((snapshot) => {
   const usersWithEmail = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (usersWithEmail.length) {
      notifyErrorFxn("cet utilisateur existe déjà, veuillez vous inscrire avec une autre adresse e-mail")
      return
     }
   else {

  

    gtag("event", "sign-up", {
     
      fullName:firstName + " " + lastName,
      telephone:'none',
      affiliateId:'none',
      "registered-with":  "google"
   });


  db.collection('userData').doc(user.uid).set({
     uid: user.uid,
     email: user.email,
     firstName:firstName,
     lastName:lastName,
     fullName:firstName + " " + lastName,
     registeredOn:new Date(),
     lessonsWatched:[],
      purchasedCourses:[],
      savedCourses:[],
     password: '',
      facebook:'',
      affiliate:'',
      pvExamen:'',
      telephone:'',
      classOption:'6eme Annee',
      schoolOrigin:'',
      
     
    
   })


   db.collection('users').doc(user.uid).set({
     uid: user.uid,
     email: user.email,
     firstName:firstName,
     lastName:lastName,
     fullName:firstName + " " + lastName,
     registeredOn:new Date(),
     lessonsWatched:[],
      purchasedCourses:[],
      savedCourses:[],
     password: '',
      facebook:'',
      affiliate:'',
      pvExamen:'',
      telephone:'',
      classOption:'6eme Annee',
      schoolOrigin:'',
    
   })

   fb.auth().sendPasswordResetEmail(user.email)
   

   dispatch(fetchUserData(user.uid, "registered",navigate)).then(() => {
    dispatch(markRegisteredWithSocials(true))

   //if(navigate){navigate("/dashboard/profile")};

     })

 }
})

 
 }).catch((err) => {
   console.error("Error signing up: ", err);
   var errorMessage = err.message;
   dispatch(signupFailed({ errorMessage }));
 })



}


export const signUpWithFacebook = (navigate) => async (dispatch) => {


    /*SETTING UP GOOGLE TAG MANAGER--*/
    window.dataLayer = window.dataLayer || [];
    function gtag(){window.dataLayer.push(arguments);}
    gtag('js', new Date());
   
    gtag('config', 'G-EY9BN9TW8S',{ 'debug_mode': true });
   /*SETTING UP GOOGLE TAG MANAGER-- END */



  const provider =  new firebase.auth.FacebookAuthProvider();
  fb.auth().useDeviceLanguage();
 
  dispatch(signupPending());
 
  fb.auth().signInWithPopup(provider)
    
 .then((userCredential)=>{
  var user = userCredential.user;
 
 
 //SIGN UP WITH FACEBOOK HAS NOT BEEN ACTIVATED YET - AS AT JUNE 26 2024,
 // SO FIRST NAME, LAST NAME AND GTAG BELOW, MAY GIVE YOU PROBLEMS
 
 var firstName= userCredential.user.displayName?userCredential.user.displayName.split(" ")[0]:''
  var lastName = userCredential.user.displayName?userCredential.user.displayName.split(" ")[1]:''

 

 gtag("event", "sign-up", {
  // This purchase event uses a different transaction ID
  // from the previous purchase event so Analytics
  // doesn't deduplicate the events.
  // TO Learn more: https://support.google.com/analytics/answer/12313109
  fullName:firstName + " " + lastName,
  telephone:'none',
  affiliateId:'none',
  "registered-with":  "facebook"
});

 db.collection('users')
 .where('email', '==', user.email)
 .get()
 .then((snapshot) => {
   const usersWithEmail = snapshot.docs.map((doc) => ({ ...doc.data() }));
   if (usersWithEmail.length) {
      notifyErrorFxn("cet utilisateur existe déjà, veuillez vous inscrire avec une autre adresse e-mail")
      return
     }
   else {
  
  db.collection('userData').doc(user.uid).set({
     uid: user.uid,
     email: user.email,
     firstName:firstName,
     lastName:lastName,
     fullName:firstName + " " + lastName,
     registeredOn:new Date(),
     lessonsWatched:[],
      purchasedCourses:[],
      savedCourses:[],
     password: '',
      facebook:'',
      affiliate:'',
      pvExamen:'',
      telephone:'',
      classOption:'6eme Annee',
      schoolOrigin:'',
      
     
    
   })


   db.collection('users').doc(user.uid).set({
     uid: user.uid,
     email: user.email,
     firstName:firstName,
     lastName:lastName,
     fullName:firstName + " " + lastName,
     registeredOn:new Date(),
     lessonsWatched:[],
      purchasedCourses:[],
      savedCourses:[],
     password: '',
      facebook:'',
      affiliate:'',
      pvExamen:'',
      telephone:'',
      classOption:'6eme Annee',
      schoolOrigin:'',
    
   })

   fb.auth().sendPasswordResetEmail(user.email)
   

   dispatch(fetchUserData(user.uid, "registered",navigate)).then(() => {
    dispatch(markRegisteredWithSocials(true))

  // if(navigate){navigate("/dashboard/profile")};


   })
   
  }
  });

 }).catch((err) => {
   console.error("Error signing up: ", err);
   var errorMessage = err.message;
   dispatch(signupFailed({ errorMessage }));
 })



}





export const uploadImage = (user, file, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  //console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      //console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          //console.log('Image URL: ', url);
          dispatch(signup(user, file, navigate, setLoading, url));
        });
    }
  );
}


export const fetchUserData = (id, type, navigate) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
    // //console.log("User Data:", doc.data());
    dispatch(storeUserData(doc.data()));
    if(type === "sigin"){
     
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/6e', { replace: true });
    }
    if(type === "registered"){
     
      notifySuccessFxn("Logged In😊");
      navigate('/dashboard/profile', { replace: true });
    }
  } else {
     
      notifyErrorFxn("Unauthorized❌")
      //console.log("No such document, so we are throwing unauthorized!");
  }
}).catch((error) => {
  //console.log("Error getting document:", error);
});
return user;
};


export const addToLessonsWatched = (id,lessonId,) => async (dispatch) => {
  var user = db.collection("users").doc(id);
  user.get().then((doc) => {
  if (doc.exists) {
   
    
const checkIfLessonsWatched =  doc.data().lessonsWatched?doc.data().lessonsWatched:[]

 user.update({

   lessonsWatched:[...checkIfLessonsWatched,{takenOn:new Date(),lessonId:lessonId} ]
   
 }).then((doc) => {
  var updatedUser = db.collection("users").doc(id);

  updatedUser.get().then((doc) => {
    if (doc.exists) {
    dispatch(storeUserData(doc.data()));
    }
  })

 })  
 
  } else {
     
      //console.log("the user doesnt exist or we can't fetch it for some reason!");
  }
}).catch((error) => {
  //console.log("Error updating user's lessons watched:", error);
});
return user;
};


export const getUserProfilePic = (idArray) => async (dispatch) => {
  //var user = db.collection("users").doc(id);
   //console.log("idArray at this given moment is:",idArray)
const watchListItem =  db.collection('users').where('uid', 'in', idArray);
  
  watchListItem.get().then((snapshot) => {
    const imageLinks = snapshot.docs.map((doc) => (doc.data().profileImage));
    const identifier = snapshot.docs.map((doc) => (doc.data().uid));
    const profileImages = []
    
  //push the profile image where the document in watching matches the id in idArray
    idArray.forEach((item)=>{
      
      profileImages.push(imageLinks[identifier.indexOf(item)])

    })


 
    if (profileImages.length){
     //console.log(" 145 auth action- the submitted images array is",profileImages)
  dispatch(storeProfileImages(profileImages));  
 
      
  } else {
     
      //notifyErrorFxn("Unauthorized❌")
      //console.log("No users imagse!");
  }
 }
 
  ) 
  .catch((error) => {
  //console.log("Error getting document:", error);
});

};


export const uploadProfileImage = (profileData, file, userID, navigate, setLoading) => async (dispatch) => {
  const imageName = uuidv4() + '.' + file?.name?.split('.')?.pop();
  //console.log('File Name: ', imageName);
  const uploadTask = storage.ref(`profile_images/${imageName}`).put(file);
  uploadTask.on(
    "state_changed",
    snapshot => {
      const progress = Math.round(
        (snapshot.bytesTransferred / snapshot.totalBytes) * 100
      );
      // setProgress(progress);
    },
    error => {
      //console.log(error);
    },
    () => {
      storage
        .ref("profile_images")
        .child(imageName)
        .getDownloadURL()
        .then(url => {
          //console.log('Image URL: ', url);
          dispatch(updateProfile(profileData, userID, file, navigate, setLoading, url));
        });
    }
  );
}


export const updateProfile = (profileData, userID, file, navigate, setLoading, url) => async (dispatch) => {
    //console.log("PROFILE IS UPDATED NOW--->")
  db.collection('users').doc(userID).update({
    telephone: profileData.telephone,
    pvExamen: profileData.pvExamen,
    classOption: profileData.classes,
    schoolOrigin: profileData.school,
    fullName: profileData.fullName,
   
    facebook: profileData.facebook,
    affiliate: profileData.affiliate,
    imageUrl: url,
    surveyAnswer:profileData.surveyAnswer
  }).then((res)=>{
       if(profileData?.password){
        //update password start
        const user = auth.currentUser;
        user.updatePassword(profileData.password)
          .then(() => {
            setLoading(false);
           
            //navigate('/dashboard/home', { replace: true });
          }).then(()=>{

            var user = db.collection("users").doc(userID);
            user.get().then((doc) => {
            if (doc.exists) {
             
              dispatch(storeUserData(doc.data()));
             
              notifySuccessFxn("mise à jour réussie!");
              
            } else {
               
                notifyErrorFxn("problème de mise à jour du profil utilisateur, veuillez réessayer")
                //console.log("No such document!");
            }
          })

          })
          .catch((error) => {
            setLoading(false);
            console.error("Error updating password: ", error);
            notifyErrorFxn(error.message);
          });
       //update password end
       }else{

        var user = db.collection("users").doc(userID);
        user.get().then((doc) => {
        if (doc.exists) {
          // //console.log("User Data:", doc.data());
          dispatch(storeUserData(doc.data()));
          
        } else {
           
            notifyErrorFxn("problème de mise à jour de ce profil, veuillez réessayer")
            //console.log("No such document!");
        }
      })



        setLoading(false);
        //console.log("No Password to update - so we didn't call auth.currentUser");
        notifySuccessFxn("mise à jour réussie!");
        //navigate('/dashboard/home', { replace: true });
       }
     
  }).catch((err) => {
    setLoading(false);
    //console.log("ERR-: ", err);
  })
}


export const logout = (navigate) => async (dispatch) => {
  fb.auth().signOut().then(() => {
    dispatch(logoutFxn());
    dispatch(clearUser());
    dispatch(clearGroup());
    navigate('/external-login', { replace: true });
    //console.log('logout successful!');
  }).catch((error) => {
    // An error happened.
    //console.log('logout failed response: ', error.message);
  });
  
}