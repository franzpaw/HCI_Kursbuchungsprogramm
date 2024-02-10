// Importieren Sie die benötigten Funktionen aus den SDKs
import { createClient } from '@supabase/supabase-js';

// Supabase-Konfiguration
const supabaseUrl = 'https://awzlfprzeqzyghfcapod.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3emxmcHJ6ZXF6eWdoZmNhcG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NDkwNTMsImV4cCI6MjAyMzEyNTA1M30.tiAAd7tOv0z7YBcKvpdvQHVjRdXOT5p1XwfUyd7XWZ0";

// Initialisieren Sie den Supabase-Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Event Listener wenn der DOM-Inhalt vollständig geladen ist
document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseNumber = urlParams.get('courseNumber');

    const anmeldeButton = document.getElementById('anmeldeButton');
    if (!anmeldeButton) {
        console.error('AnmeldeButton wurde nicht im DOM gefunden.');
        return;
    }

    // Fügt den Event Listener für den Anmeldebutton hier hinzu
    // Dies stellt sicher, dass der Listener aktiv ist, sobald der Button verfügbar ist.
    anmeldeButton.addEventListener('click', async () => {
        // Zustand basierend auf dem aktuellen Text des Buttons ermitteln
        const isAnmelden = anmeldeButton.textContent.includes('Anmelden');
    
        try {
            // Den studentCourse-Status in der Datenbank aktualisieren
            const { error } = await supabase
                .from('courses')
                .update({ studentCourse: isAnmelden }) // Status umschalten
                .eq('courseNumber', courseNumber);
    
            if (error) {
                console.error('Fehler beim Aktualisieren des Anmeldestatus:', error.message);
                return;
            }
    
            // Button-Text und Stil basierend auf dem neuen Status aktualisieren
            if (isAnmelden) {
                anmeldeButton.textContent = 'Abmelden';
                anmeldeButton.classList.remove('btn-outline-primary');
                anmeldeButton.classList.add('btn-danger');
                // Zeige eine Erfolgsmeldung an
                showAlert('Erfolgreich angemeldet.', 'success');
            } else {
                anmeldeButton.textContent = 'Anmelden';
                anmeldeButton.classList.add('btn-outline-primary');
                anmeldeButton.classList.remove('btn-danger');
                // Zeige eine Info-Meldung an
                showAlert('Erfolgreich abgemeldet.', 'info');
            }
        } catch (err) {
            console.error('Fehler beim Umschalten des Anmeldestatus:', err.message);
        }
    });
    
    // Kursdetails und Anmeldestatus abrufen
    try {
        const { data: courseData, error: courseError } = await supabase
            .from('courses')
            .select('*') // Alle Felder auswählen
            .eq('courseNumber', courseNumber)
            .single();

        if (courseError) {
            console.error('Fehler beim Abrufen der Kursdetails:', courseError.message);
            return;
        }

        if (courseData) {
            updateCourseDetails(courseData); // Kursdetails im DOM aktualisieren
            // Button basierend auf dem Anmeldestatus initialisieren
            anmeldeButton.textContent = courseData.studentCourse ? 'Abmelden' : 'Anmelden';
            anmeldeButton.classList.toggle('btn-outline-primary', !courseData.studentCourse);
            anmeldeButton.classList.toggle('btn-danger', courseData.studentCourse);
        } else {
            document.querySelector('.content').innerHTML = '<p>Kurs nicht gefunden.</p>';
        }
    } catch (err) {
        console.error('Unbehandelter Fehler:', err.message);
    }






    // Funktion, um eine Alert-Nachricht anzuzeigen
    function showAlert(message, type) {
        const alertContainer = document.getElementById('alert-container');
        const alertMessage = `
    <div class="alert alert-${type} alert-dismissible fade show" role="alert">
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
`;
        alertContainer.innerHTML = alertMessage;
    }

    // Funktion für die Anmeldung
    function onSignIn() {
        // Hier könnte deine Anmelde-Logik stehen. Zum Beispiel eine Anfrage an einen Server.

        // Zeige eine Erfolgsmeldung an
        showAlert('Erfolgreich angemeldet.', 'success');
    }

    // Funktion für die Abmeldung
    function onSignOut() {
        // Hier könnte deine Abmelde-Logik stehen. Zum Beispiel das Löschen von Benutzerdaten im Browser.

        // Zeige eine Info-Meldung an
        showAlert('Erfolgreich abgemeldet.', 'info');
    }

    // Gehe zurück zur vorherigen Seite
    function goBack() {
        window.history.back();
    }

    // Füge Event-Listener hinzu
    const signInButton = document.getElementById('anmeldeButton');
    if (signInButton) {
        signInButton.addEventListener('click', onSignIn);
    }

    const signOutButton = document.querySelector('.fas.fa-sign-out-alt').parentNode; // Nimmt an, dass dies der Abmelde-Button ist
    if (signOutButton) {
        signOutButton.addEventListener('click', function (event) {
            event.preventDefault(); // Verhindert die Standardaktion des Links
            onSignOut();
        });
    }

    // Event-Listener für den Zurück-Button
    const backButton = document.querySelector('.back-button');
    if (backButton) {
        backButton.addEventListener('click', goBack);
    }
    



});

function updateCourseDetails(course) {
    // Aktualisieren Sie den Code hier, um die Daten aus dem Supabase-Objekt zu verwenden
    const headerImgDiv = document.querySelector('.header-img');
    headerImgDiv.style.backgroundImage = `url('${course.image}')`;

    document.getElementById('current-course-name').textContent = course.title;

    const contentDiv = document.querySelector('.content');
    contentDiv.innerHTML = `
            <div class="course-content d-flex flex-column justify-content-start"> 
            <div class="d-flex justify-content-center w-100 mb-3">  
                <h2>${course.title}</h2>
            </div>
            <div class="d-flex justify-content-start">  
                <div class="border-right pe-3 me-3 minWidth">  
                    <p><strong>Kursbeschreibung:</strong> ${course.description}</p> 
                    <p><strong>Dozent/in:</strong> ${course.instructor}</p>
                    <p><strong>Zeitraum:</strong><br>23.03.23- 07.07.23</p>

                </div>
                <div class="">  
                    <p><strong>Kursnummer:</strong> ${course.courseNumber}</p>
                    <p><strong>Kategorie:</strong> ${course.category}</p>
                    <p><strong>Typ:</strong> ${course.type}</p>
                </div>
            </div>
        </div>
    `;
}




