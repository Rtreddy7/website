// firebase-init.js

// 🔥 Import Firebase (CDN - modular)
import { initializeApp } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.9.0/firebase-firestore.js";

// 🔑 Your Firebase config (already from your screenshot)
const firebaseConfig = {
  apiKey: "AIzaSyDTpb_tPnRD-NdULiwvAvDVbw60uwaJZYI",
  authDomain: "break-management-system-9495d.firebaseapp.com",
  projectId: "break-management-system-9495d",
  storageBucket: "break-management-system-9495d.firebasestorage.app",
  messagingSenderId: "227373844213",
  appId: "1:227373844213:web:7782d3aa15a5b0e7ba67bc"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);

// 🔐 Initialize services
const auth = getAuth(app);
const db = getFirestore(app);

// ✅ Export so other files can use
export { auth, db };

// 🔍 Check in console
console.log("Firebase connected successfully ✅");
