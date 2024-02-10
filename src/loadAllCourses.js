// Importiere die benötigten Supabase-Funktionen
import { createClient } from '@supabase/supabase-js'

// Supabase-Konfiguration
const supabaseUrl = 'https://awzlfprzeqzyghfcapod.supabase.co';
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImF3emxmcHJ6ZXF6eWdoZmNhcG9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDc1NDkwNTMsImV4cCI6MjAyMzEyNTA1M30.tiAAd7tOv0z7YBcKvpdvQHVjRdXOT5p1XwfUyd7XWZ0";

// Initialisiere Supabase Client
const supabase = createClient(supabaseUrl, supabaseAnonKey);

document.addEventListener('DOMContentLoaded', async function () {
    const courseGrid = document.getElementById('courseGrid');

    async function renderCourses(filter = '') {
        let { data: courses, error } = await supabase
            .from('courses')
            .select('*');

        courseGrid.innerHTML = ''; // Clear existing content
        if (error) {
            console.error('Fehler beim Abrufen der Kursdaten: ', error);
            return;
        }

        courses = courses.filter(course => 
            course.title.toLowerCase().includes(filter.toLowerCase()) ||
            course.type.toLowerCase().includes(filter.toLowerCase()) ||
            course.instructor.toLowerCase().includes(filter.toLowerCase()) ||
            course.courseNumber.toLowerCase().includes(filter.toLowerCase()) ||
            course.category.toLowerCase().includes(filter.toLowerCase()) // Filter nach Kategorie hinzugefügt
        );

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
            window.location.href = `../sites/student/course.html?courseNumber=${courseNumber}`;
        }
    });


    document.getElementById('searchInput').addEventListener('input', function (e) {
        renderCourses(e.target.value);
    });

    document.querySelectorAll('#filterDropdown a').forEach(item => {
        item.addEventListener('click', function (e) {
            const filter = e.target.getAttribute('data-filter');
            renderCourses(filter);
            document.querySelectorAll('#filterDropdown a').forEach(item => item.classList.remove('active-filter'));
            e.target.classList.add('active-filter');
        });
    });

    // Initial render of courses
    renderCourses();
});
