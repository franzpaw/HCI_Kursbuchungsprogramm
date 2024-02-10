// Importiere die benötigten Supabase-Funktionen
import { createClient } from '@supabase/supabase-js';

// Supabase-Konfiguration
const supabaseUrl = 'https://awzlfprzeqzyghfcapod.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3emxmcHJ6ZXF6eWdoZmNhcG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NDkwNTMsImV4cCI6MjAyMzEyNTA1M30.tiAAd7tOv0z7YBcKvpdvQHVjRdXOT5p1XwfUyd7XWZ0";

// Initialisiere Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function generateUniqueCourseNumber() {
    let isUnique = false;
    let uniqueNumber;
    while (!isUnique) {
        uniqueNumber = "CS" + Math.floor(100 + Math.random() * 900); // Generiert eine Zahl zwischen 100 und 999
        const { data, error } = await supabase
            .from('courses')
            .select('courseNumber')
            .eq('courseNumber', uniqueNumber)
            .single();

        if (error && error.message === "No rows found") {
            isUnique = true; // Eindeutige Nummer gefunden
        } else if (data) {
            isUnique = false; // Nummer existiert bereits, generiere eine neue
        } else if (error) {
            console.error('Fehler beim Überprüfen der Kursnummer:', error);
            break; // Beendet die Schleife im Fehlerfall
        }
    }
    return uniqueNumber;
}





document.addEventListener('DOMContentLoaded', async function () {
    const courseGrid = document.getElementById('courseGrid');

    async function renderCourses() {
        let { data: courses, error } = await supabase
            .from('courses')
            .select('*')
            .eq('instructor', 'J. Doe'); // Filter nach Kursen, bei denen Joe Doe der Dozent ist

        courseGrid.innerHTML = ''; // Bestehenden Inhalt löschen
        if (error) {
            console.error('Fehler beim Abrufen der Kursdaten: ', error);
            return;
        }

        if (courses.length > 0) {
            courses.forEach(course => {
                courseGrid.innerHTML += `
                    <div id="course_${course.courseNumber}" class="col mb-4" style="max-width: 300px;">
                        <div class="card h-100" style="width: 300px;">
                            <img src="${course.image}" class="card-img-top darken" alt="${course.title}" style="height: 150px; width: 300px; object-fit: cover;">
                            <div class="card-body">
                                <h5 class="card-title">${course.title}</h5>
                                <p class="card-text">${course.type} - ${course.instructor}</p>
                                <p class="card-text"><small class="text-muted">${course.courseNumber}</small></p>
                            </div>
                        </div>
                    </div>
                `;
            });


            // Nachdem alle Kurse gerendert wurden
            courseGrid.innerHTML += `
                <div class="col mb-4" style="max-width: 300px;">
                    <div class="button kurs-hinzufügen h-100 d-flex justify-content-center align-items-center" style="width: 300px; height: 250px;" data-bs-toggle="modal" data-bs-target="#addCourseModal">
                        <p href="#" class="text-dark" style="font-size: 4rem;">
                            <i class="fas fa-plus"></i>
                        </p>
                    </div>
                </div>
                `;

        } else {
            courseGrid.innerHTML = '<p>Keine Kurse gefunden.</p>';
        }
    }


    // Event-Listener für Klicks im courseGrid hinzufügen
    courseGrid.addEventListener('click', function (e) {
        // Finde das nächstgelegene Element mit der Klasse 'card', das geklickt wurde
        const clickedCard = e.target.closest('.card');
        if (clickedCard) {
            // Extrahiere die courseNumber aus der ID des Elternelements der Karte
            const courseNumber = clickedCard.parentElement.id.replace('course_', '');

            // Navigiere zur Kursdetails-Seite und füge die courseNumber als URL-Parameter hinzu
            window.location.href = `course.html?courseNumber=${courseNumber}`;
        }
    });


    document.getElementById('addCourseForm').addEventListener('submit', async (event) => {
        event.preventDefault();
    
        const formData = {
            title: document.getElementById('title').value,
            type: document.getElementById('type').value,
            instructor: "J. Doe",
            image: document.getElementById('image').value,
            courseNumber: await generateUniqueCourseNumber(),
            category: "Informatik",
            description: document.getElementById('description').value,
            studentCourse: false
        };
    
        const { data, error } = await supabase.from('courses').insert([formData]);
    
        if (error) {
            console.error('Fehler beim Hinzufügen des Kurses:', error);
        } else {
            console.log('Kurs hinzugefügt:', data);
    
            // Modal schließen mit Bootstrap 5 JavaScript API
            const modal = new bootstrap.Modal(document.getElementById('addCourseModal'));
            modal.hide();
    
            // Formular zurücksetzen
            document.getElementById('addCourseForm').reset();
    
            // Seite aktualisieren, um die Änderungen anzuzeigen
            location.reload()
        }
    });
    



    renderCourses();
    
});

