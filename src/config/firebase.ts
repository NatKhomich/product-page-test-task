import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
    apiKey: "AIzaSyCz48qe4QnTuC2mzQIwt7gicRA7qpG580U",
    authDomain: "product-page-test-task.firebaseapp.com",
    projectId: "product-page-test-task",
    storageBucket: "product-page-test-task.appspot.com",
    messagingSenderId: "384698951490",
    appId: "1:384698951490:web:9e1d23749c32a7db438adb",
    measurementId: "G-381K8ZJLL8" //measurementId is optional
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); //is optional