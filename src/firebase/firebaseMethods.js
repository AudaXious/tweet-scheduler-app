import {
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  sendEmailVerification,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";
import { auth } from "./config";

export async function googleSignin() {
  try {
    const provider = new GoogleAuthProvider();
    const userCredential = await signInWithPopup(auth, provider);
    const user = userCredential.user;

    localStorage.setItem("user", JSON.stringify(user));
    console.log(user);
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    const email = error.email || "";
    const credential = GoogleAuthProvider.credentialFromError(error);
    console.error(errorCode, errorMessage, email, credential);
  }
}

export async function createUserWithEmail(email, password) {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    const user = userCredential.user;
    console.log(user);

    if (user) {
      await sendEmailVerification(auth.currentUser);
      console.log("Email verification sent");
    }
  } catch (error) {
    console.error(error.message);
  }
}

// export function createUserWithEmail(email, password) {
//   createUserWithEmailAndPassword(auth, email, password)
//     .then((userCredential) => {
//       const user = userCredential.user;
//       console.log(user);
//       if (user) {
//         sendEmailVerification(auth.currentUser)
//           .then(() => {
//             console.log(" Email verification sent");
//           })
//           .catch((error) => {
//             console.error(error.message);
//           });
//       }

//       // ...
//     })
//     .catch((error) => {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.email || "";
//       console.error(errorCode, errorMessage, email);
//     });
// }

export async function signinUserWithEmail(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
    // Signed in
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify(user));
    console.log(user);

    return user;
  } catch (error) {
    const errorCode = error.code;
    const errorMessage = error.message;
    console.error(errorCode, errorMessage);
    return null; // or throw an error if needed
  }
}

export function signoutUser() {
  signOut(auth)
    .then(() => {
      localStorage.removeItem("user");
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.error(errorCode, errorMessage);
    });
}

export const checkEmailVerificationStatus = () => {
  return new Promise((resolve, reject) => {
    const user = auth.currentUser;

    if (user) {
      console.log(user);

      user
        .getIdTokenResult()
        .then((idTokenResult) => {
          const emailVerified = idTokenResult.claims.email_verified;
          resolve(emailVerified);
          console.log(emailVerified);
        })
        .catch((error) => {
          console.log(error);

          reject(error);
        });
    } else {
      // No user is signed in
      resolve(false);
    }
  });
};

// export const checkEmailVerificationStatus = () => {
//     return new Promise((resolve, reject) => {
//       const user = auth.currentUser;

//       if (user) {
//         console.log(user);

//         user
//           .getIdTokenResult()
//           .then((idTokenResult) => {
//             const emailVerified = idTokenResult.claims.email_verified;
//             resolve(emailVerified);
//             console.log(emailVerified);
//           })
//           .catch((error) => {
//             console.log(error);

//             reject(error);
//           });
//       } else {
//         // No user is signed in
//         resolve(false);
//       }
//     });
//   };
