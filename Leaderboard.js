// leaderboard.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.0/firebase-app.js";
import {
  getFirestore, collection, addDoc, getDocs, query, orderBy, limit, serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.12.0/firebase-firestore.js";

// Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyA953ksEMEiGUHajmrmYuu6G85D7o3N6uQ",
  authDomain: "liderboardtetris.firebaseapp.com",
  projectId: "liderboardtetris",
  storageBucket: "liderboardtetris.firebasestorage.app",
  messagingSenderId: "1022424113358",
  appId: "1:1022424113358:web:f41edec5a8b7d7f36c709f",
  measurementId: "G-6H09EYBXHQ"
};

// Inisialisasi Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// Fungsi untuk menyimpan skor
export async function saveScore(name, score) {
  try {
    await addDoc(collection(db, "leaderboard"), {
      name,
      score,
      timestamp: serverTimestamp()
    });
    console.log("Skor berhasil disimpan");
  } catch (error) {
    console.error("Gagal menyimpan skor:", error);
  }
}

// Fungsi untuk menampilkan leaderboard
export async function loadLeaderboard(containerId) {
  const leaderboardContainer = document.getElementById(containerId);
  leaderboardContainer.innerHTML = "Loading...";

  try {
    const q = query(collection(db, "leaderboard"), orderBy("score", "desc"), limit(10));
    const snapshot = await getDocs(q);

    leaderboardContainer.innerHTML = "<h3>Top 10 Leaderboard</h3><ol>";
    snapshot.forEach((doc) => {
      const data = doc.data();
      leaderboardContainer.innerHTML += `<li>${data.name}: ${data.score}</li>`;
    });
    leaderboardContainer.innerHTML += "</ol>";
  } catch (error) {
    leaderboardContainer.innerHTML = "Gagal memuat leaderboard.";
    console.error("Error mengambil data leaderboard:", error);
  }
}