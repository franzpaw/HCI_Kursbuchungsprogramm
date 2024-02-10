const courses = [
    { 
        title: "Berechenbarkeit", 
        type: "Vorlesung", 
        instructor: "Dr. A. Straus", 
        image: "https://images.unsplash.com/photo-1572435555646-7ad9a149ad91?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        courseNumber: "CS101", 
        category: "Informatik",
        description: "Die Vorlesung über Berechenbarkeit unter der Leitung von Dr. A. Straus bietet eine eingehende Untersuchung der theoretischen Grundlagen der Informatik. Die Schüler werden sich mit Konzepten wie Turing-Maschinen, Entscheidbarkeit und Komplexitätstheorie befassen. Durch eine Kombination aus theoretischen Konzepten und praktischen Anwendungen werden die Studierenden ein tiefes Verständnis für die Grenzen und Möglichkeiten der Berechnung erlangen."
    },
    { 
        title: "Einführung in die Astrophysik", 
        type: "Vorlesung", 
        instructor: "Prof. B. Müller", 
        image: "https://images.unsplash.com/photo-1627922922091-2cf376e27776?q=80&w=1938&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        courseNumber: "PHY201", 
        category: "Astrophysik",
        description: "Die Vorlesung \"Einführung in die Astrophysik\" unter der Leitung von Prof. B. Müller bietet eine faszinierende Reise durch die Grundlagen der Astrophysik. Die Studierenden werden die Entwicklung von Sternen und Galaxien untersuchen, die Geheimnisse der Dunklen Materie erforschen und die Grundlagen der kosmischen Evolution verstehen. Diese Vorlesung ist für alle geeignet, die sich für die Schönheit und Komplexität des Universums begeistern."
    },
    { 
        title: "Datenstrukturen", 
        type: "Übung", 
        instructor: "Dr. C. Neumann", 
        image: "https://plus.unsplash.com/premium_photo-1680404114169-e254afa55a16?q=80&w=1964&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        courseNumber: "CS102", 
        category: "Informatik",
        description: "Die Übung zu Datenstrukturen unter der Leitung von Dr. C. Neumann vertieft das Verständnis für die grundlegenden Datenstrukturen in der Informatik. Die Studierenden werden Algorithmen zur Verwaltung und Manipulation von Daten kennenlernen und praktische Problemlösungen implementieren. Diese Übung ist ein wesentlicher Bestandteil der Ausbildung angehender Softwareentwickler."
    },
    { 
        title: "Quantenmechanik", 
        type: "Vorlesung", 
        instructor: "Prof. D. Schröder", 
        image: "https://images.unsplash.com/photo-1609705025038-60908171cf5e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        courseNumber: "PHY301", 
        category: "Astrophysik",
        description: "Die Vorlesung über Quantenmechanik unter der Leitung von Prof. D. Schröder führt die Studierenden in die faszinierende Welt der Quantenphysik ein. Die Studierenden werden die grundlegenden Prinzipien der Quantenmechanik verstehen und ihre Anwendungen in Bereichen wie der Quanteninformatik und der Quantenkryptografie erkunden."
    },
    { 
        title: "Softwareentwicklung", 
        type: "Praktikum", 
        instructor: "M. E. Developer", 
        image: "https://images.unsplash.com/photo-1579403124614-197f69d8187b?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8N3x8c29mdHdhcmV8ZW58MHx8MHx8fDA%3D", 
        courseNumber: "CS103", 
        category: "Informatik",
        description: "Das Praktikum Softwareentwicklung unter der Leitung von M. E. Developer bietet den Studierenden die Möglichkeit, ihre Programmierfähigkeiten in der Praxis anzuwenden. Die Teilnehmer werden an realen Projekten arbeiten, Softwarelösungen entwerfen und implementieren sowie Best Practices für die Softwareentwicklung kennenlernen."
    },
    { 
        title: "Raumfahrttechnik", 
        type: "Vorlesung", 
        instructor: "Dr. F. Stern", 
        image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?q=80&w=2072&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        courseNumber: "ENG401", 
        category: "Raumfahrttechnik",
        description: "Die Vorlesung über Raumfahrttechnik unter der Leitung von Dr. F. Stern bietet einen umfassenden Überblick über die Grundlagen und aktuellen Entwicklungen in der Raumfahrt. Die Studierenden werden die Technologien für Raketenantriebe, Satelliten und Raumsonden kennenlernen sowie Einblicke in die Planung und Durchführung von Raumfahrtmissionen erhalten."
    },
    { 
        title: "Künstliche Intelligenz", 
        type: "Übung", 
        instructor: "Prof. G. Watson", 
        image: "https://images.unsplash.com/photo-1495055154266-57bbdeada43e?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        courseNumber: "CS104", 
        category: "Informatik",
        description: "Die Übung zu Künstlicher Intelligenz unter der Leitung von Prof. G. Watson bietet den Studierenden die Möglichkeit, sich mit modernen Techniken und Algorithmen im Bereich der KI vertraut zu machen. Die Teilnehmer werden praktische Aufgaben lösen, Machine-Learning-Modelle trainieren und Anwendungen entwickeln, die auf maschinellem Lernen basieren."
    },
    { 
        title: "Thermodynamik", 
        type: "Vorlesung", 
        instructor: "H. Clausius", 
        image: "https://images.unsplash.com/photo-1651499910684-b6b82c2da504?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        courseNumber: "PHY202", 
        category: "Astrophysik",
        description: "Die Vorlesung über Thermodynamik unter der Leitung von H. Clausius bietet eine gründliche Einführung in die Grundlagen der Wärme- und Energieübertragung. Die Studierenden werden die Gesetze der Thermodynamik verstehen, Wärmekraftmaschinen analysieren und die Anwendungen der Thermodynamik in Bereichen wie der Astrophysik und der Ingenieurwissenschaften erkunden."
    },
    { 
        title: "Robotik", 
        type: "Praktikum", 
        instructor: "I. Asimov", 
        image: "https://images.unsplash.com/photo-1516192518150-0d8fee5425e3?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mnx8cm9ib3R8ZW58MHx8MHx8fDA%3D", 
        courseNumber: "ENG402", 
        category: "Raumfahrttechnik",
        description: "Das Praktikum Robotik unter der Leitung von I. Asimov bietet den Studierenden die Möglichkeit, sich mit den Grundlagen und fortgeschrittenen Konzepten der Robotik vertraut zu machen. Die Teilnehmer werden Roboter entwerfen, bauen und programmieren sowie deren Anwendungen in Bereichen wie der industriellen Automation und der Raumfahrttechnik untersuchen."
    },
    { 
        title: "Webentwicklung", 
        type: "Übung", 
        instructor: "J. Doe", 
        image: "https://images.unsplash.com/photo-1647696732185-b6151c637d09?q=80&w=1935&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D", 
        courseNumber: "CS105", 
        category: "Informatik",
        description: "Die Übung zur Webentwicklung unter der Leitung von J. Doe bietet den Studierenden praktische Erfahrungen in der Gestaltung und Entwicklung von Webanwendungen. Die Teilnehmer werden moderne Webtechnologien wie HTML, CSS, JavaScript und Frameworks kennenlernen und an Projekten arbeiten, um ihre Fähigkeiten im Bereich der Webentwicklung zu verbessern."
    }
];

export { courses };



