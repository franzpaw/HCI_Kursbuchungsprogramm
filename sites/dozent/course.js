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
    if (courseNumber) {
        loadCourseDetails(courseNumber);
    } else {
        console.error('Keine Kursnummer angegeben.');
        // Behandle den Fall, wenn keine Kursnummer vorhanden ist
    }



   

    async function loadCourseDetails(courseNumber) {
        const { data, error } = await supabase
            .from('courses')
            .select('*')
            .eq('courseNumber', courseNumber)
            .single();

        if (error) {
            console.error('Fehler beim Laden der Kursdetails:', error);
        } else if (data) {
            updateCourseDetails(data); // Aktualisiere die Seite mit den Kursdetails
            toggleDeleteButton(data.instructor); // Entscheide, ob der Löschen-Button angezeigt werden soll
            showEditButton(data.instructor); // Zeige den Bearbeiten-Button basierend auf dem Dozenten
        }
    }


    function toggleDeleteButton(instructor) {
        const deleteButton = document.getElementById('löschenButton');
        const bearbeitenButton = document.getElementById('bearbeitenButton');
        if (instructor === 'J. Doe') {
            deleteButton.style.display = ''; // Zeige den Button, wenn der Dozent J. Doe ist
            bearbeitenButton.style.display = ''; 
        } else {
            deleteButton.style.display = 'none'; // Verstecke den Button sonst
            bearbeitenButton.style.display = 'none'; // Verstecke den Button sonst

        }
    }








    


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
            

            loadEditCourseModal(courseData);

        } else {
            document.querySelector('.content').innerHTML = '<p>Kurs nicht gefunden.</p>';
        }
    } catch (err) {
        console.error('Unbehandelter Fehler:', err.message);
    }


    const löschenButton = document.getElementById('löschenButton');
    if (!löschenButton) {
        console.error('LöschenButton wurde nicht im DOM gefunden.');
        return;
    }

    löschenButton.addEventListener('click', async () => {
        try {
            const { error } = await supabase
                .from('courses')
                .delete()
                .match({ courseNumber: courseNumber });

            if (error) {
                console.error('Fehler beim Löschen des Kurses:', error.message);
                showAlert('Fehler beim Löschen des Kurses.', 'danger');
                return;
            }


            window.location.href = 'myCourses.html'; // Umleitung nach erfolgreichem Löschen
        } catch (err) {
            console.error('Unbehandelter Fehler beim Löschen des Kurses:', err.message);
            showAlert('Ein unbehandelter Fehler ist aufgetreten.', 'danger');
        }
    });















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



    // Gehe zurück zur vorherigen Seite
    function goBack() {
        window.history.back();
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


