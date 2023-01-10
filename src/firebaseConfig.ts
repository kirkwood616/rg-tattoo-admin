import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";

const api_key = process.env.REACT_APP_API_KEY || "";
const auth_domain = process.env.REACT_APP_AUTH_DOMAIN || "";
const project_id = process.env.REACT_APP_PROJECT_ID || "";
const storage_bucket = process.env.REACT_APP_STORAGE_BUCKET || "";
const messaging_sender_id = process.env.REACT_APP_MESSAGING_SENDER_ID || "";
const app_id = process.env.REACT_APP_APP_ID || "";
const measurement_id = process.env.REACT_APP_MEASUREMENT_ID || "";

const firebaseConfig = {
  apiKey: api_key,
  authDomain: auth_domain,
  projectId: project_id,
  storageBucket: storage_bucket,
  messagingSenderId: messaging_sender_id,
  appId: app_id,
  measurementId: measurement_id,
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const storage = getStorage(app);

export { auth, storage, app };
