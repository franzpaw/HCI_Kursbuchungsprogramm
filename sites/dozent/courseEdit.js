

// Importieren Sie die benötigten Funktionen aus den SDKs
import { createClient } from '@supabase/supabase-js';

// Supabase-Konfiguration
const supabaseUrl = 'https://awzlfprzeqzyghfcapod.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3emxmcHJ6ZXF6eWdoZmNhcG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NDkwNTMsImV4cCI6MjAyMzEyNTA1M30.tiAAd7tOv0z7YBcKvpdvQHVjRdXOT5p1XwfUyd7XWZ0";

// Initialisieren Sie den Supabase-Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

let globalCourseData = null; // Globale Variable zur Speicherung der Kursdaten

document.addEventListener('DOMContentLoaded', async () => {
    const urlParams = new URLSearchParams(window.location.search);
    const courseNumber = urlParams.get('courseNumber');
    if (courseNumber) {
        await loadCourseDetails(courseNumber);
    } else {
        console.error('Keine Kursnummer angegeben.');
    }

    // Event-Listener für den "Kurs bearbeiten"-Button
    document.getElementById('bearbeitenButton').addEventListener('click', function () {
        if (globalCourseData) {
            loadEditCourseModal(globalCourseData);
        } else {
            console.error("Keine Kursdaten zum Bearbeiten verfügbar.");
        }
    });
});

async function loadCourseDetails(courseNumber) {
    const { data, error } = await supabase
        .from('courses')
        .select('*')
        .eq('courseNumber', courseNumber)
        .single();

    if (error) {
        console.error('Fehler beim Laden der Kursdetails:', error);
        return;
    }

    globalCourseData = data; // Speichere die Kursdaten global
    updateCourseDetails(data);
}

function updateCourseDetails(course) {
    // Aktualisiere die UI mit den Kursdetails
    // Beispiel:
    const headerImgDiv = document.querySelector('.header-img');
    headerImgDiv.style.backgroundImage = `url('${course.image}')`;
    document.getElementById('current-course-name').textContent = course.title;
    // Füge weitere UI-Aktualisierungen hier hinzu
}

function loadEditCourseModal(course) {
    // Vorbereitung des Bearbeitungsmodals mit Kursdaten
    document.getElementById('edit-title').value = course.title;
    document.getElementById('edit-description').value = course.description;
    document.getElementById('edit-type').value = course.type;
    document.getElementById('edit-image').value = course.image;


    // Zeige das Bearbeitungsmodal an
    var editModal = new bootstrap.Modal(document.getElementById('editCourseModal'));
    editModal.show();
}

// Optional: Funktion zum Aktualisieren der Kursdaten
document.getElementById('editCourseForm').addEventListener('submit', async (event) => {
    event.preventDefault();

    // Sammle die bearbeiteten Daten aus dem Formular
    const editedData = {
        title: document.getElementById('edit-title').value,
        type: document.getElementById('edit-type').value,
        image: document.getElementById('edit-image').value,
        description: document.getElementById('edit-description').value
    };

    // Verwende die Kursnummer von globalCourseData für die Aktualisierung
    const { error } = await supabase.from('courses').update(editedData).match({ courseNumber: globalCourseData.courseNumber });

    if (error) {
        console.error('Fehler beim Aktualisieren des Kurses:', error);
        // Zeige eine Fehlermeldung an
    } else {
        console.log('Kurs erfolgreich aktualisiert');

        // Schließe das Modal
        const editModal = bootstrap.Modal.getInstance(document.getElementById('editCourseModal'));
        editModal.hide();

        // Optional: Seite neu laden oder UI anderweitig aktualisieren
        location.reload();
    }
});

