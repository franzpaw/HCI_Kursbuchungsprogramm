// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase, ref, set, remove, get } from "firebase/database";






// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyDuE5JbvDVCIIzbUWFuGQGOn8hMGKisQEI",
    authDomain: "hci-e72f8.firebaseapp.com",
    databaseURL: "https://hci-e72f8-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "hci-e72f8",
    storageBucket: "hci-e72f8.appspot.com",
    messagingSenderId: "722786980670",
    appId: "1:722786980670:web:3588bf0704c98e26ecd26f",
    measurementId: "G-9J3RCDNEGS"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Database
const database = getDatabase(app);

// Event Listener when the DOM Content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseId = urlParams.get('courseId'); // get the courseId from the URL
    const anmeldeButton = document.getElementById('anmeldeButton'); // Button element

    // Ensure the button exists before proceeding
    if (!anmeldeButton) {
        console.error('AnmeldeButton was not found in the DOM.');
        return;
    }

    // Fetch course details from Firebase
    const courseRef = ref(database, 'Kurse/' + courseId);
    get(courseRef).then((snapshot) => {
        if (snapshot.exists()) {
            const course = snapshot.val();
            // Assuming updateCourseDetails is a function that updates the course details on the page
            updateCourseDetails(course); 
        } else {
            document.querySelector('.content').innerHTML = '<p>Course not found.</p>';
        }
    }).catch((error) => {
        console.error("Error fetching course details: ", error);
    });

    // Check the enrollment status, asynchronously
    const dbRef = ref(database, 'angemeldeteKurse/' + courseId);
    get(dbRef).then((snapshot) => {
        if (snapshot.exists() && snapshot.val() === true) {
            anmeldeButton.textContent = 'Abmelden';
            anmeldeButton.classList.remove('btn-outline-primary');
            anmeldeButton.classList.add('btn-danger');
        } else {
            anmeldeButton.textContent = 'Anmelden';
            anmeldeButton.classList.remove('btn-danger');
            anmeldeButton.classList.add('btn-outline-primary');
        }
    }).catch((error) => {
        console.error("Error fetching enrollment status: ", error);
    });

    // Event Listener for the enrollment button
    anmeldeButton.addEventListener('click', () => {
        // Toggle the course enrollment status
        if (anmeldeButton.textContent.includes('Anmelden')) {
            // Add course and save in Firebase
            set(dbRef, true)
                .then(() => console.log("Course enrolled."))
                .catch((error) => console.error("Error enrolling: ", error));

            anmeldeButton.textContent = 'Abmelden';
            anmeldeButton.classList.remove('btn-outline-primary');
            anmeldeButton.classList.add('btn-danger');
        } else {
            // Remove course from Firebase
            remove(dbRef)
                .then(() => console.log("Course unenrolled."))
                .catch((error) => console.error("Error unenrolling: ", error));

            anmeldeButton.textContent = 'Anmelden';
            anmeldeButton.classList.remove('btn-danger');
            anmeldeButton.classList.add('btn-outline-primary');
        }
    });
});  


function updateCourseDetails(course) {
    // ... Aktualisieren Sie den Code hier, um die Daten aus dem Firebase-Objekt zu verwenden ...
    const headerImgDiv = document.querySelector('.header-img');
    headerImgDiv.style.backgroundImage = `url('${course.Image}')`;

    document.getElementById('current-course-name').textContent = course.Titel;

    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = `
        <div class="course-content d-flex flex-column justify-content-start"> 
            <div class="d-flex justify-content-center w-100 mb-3">  
                <h2>${course.Titel}</h2>
            </div>
            <div class="d-flex justify-content-start">  
                <div class="border-right">  
                    <p><strong>Kategorie:</strong> ${course.Beschreibung}</p> 
                    <p><strong>Dozent/in:</strong> ${course.Lehrperson}</p>
                </div>
                <div class="">  
                    <p><strong>Kursnummer:</strong> ${courseId}</p>
                    <p><strong>Kategorie:</strong> ${course.Kategorie}</p>
                    <p><strong>Typ:</strong> ${course.Typ}</p>
                </div>
            </div>
        </div>
    `;
}


// Anmeldebutton Logik
const anmeldeButton = document.getElementById('anmeldeButton');
const urlParams = new URLSearchParams(window.location.search);
const courseId = urlParams.get('courseId');

// Überprüfe, ob der Kurs bereits angemeldet ist
if (angemeldeteKurse.includes(courseId)) {
    // Ändere den Button zu "Abmelden" und die Farbe zu Rot
    anmeldeButton.textContent = 'Abmelden';
    anmeldeButton.classList.remove('btn-outline-primary');
    anmeldeButton.classList.add('btn-danger');
}

// Event Listener für den Anmeldebutton





anmeldeButton.addEventListener('click', () => {
    // Verwende die spezifische Kurs-ID in der Datenbankreferenz
    const dbRef = ref(database, 'angemeldeteKurse/' + courseId); // Pfad zum spezifischen Kurs
    if (anmeldeButton.textContent.includes('Anmelden')) {
        // Kurs hinzufügen und in Firebase speichern
        // Verwende set() mit dem Kurs-Objekt, hier speichern wir nur true als Platzhalter
        set(dbRef, true)
            .then(() => console.log("Kurs angemeldet."))
            .catch((error) => console.error("Fehler beim Anmelden: ", error));

        anmeldeButton.textContent = 'Abmelden';
        anmeldeButton.classList.remove('btn-outline-primary');
        anmeldeButton.classList.add('btn-danger');
    } else {
        // Kurs aus Firebase entfernen
        remove(dbRef)
            .then(() => console.log("Kurs abgemeldet."))
            .catch((error) => console.error("Fehler beim Abmelden: ", error));

        anmeldeButton.textContent = 'Anmelden';
        anmeldeButton.classList.remove('btn-danger');
        anmeldeButton.classList.add('btn-outline-primary');
    }
});








