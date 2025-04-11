document.addEventListener('DOMContentLoaded', function() {
    // Initialize modals
    const addLessonModal = new bootstrap.Modal(document.getElementById('addLessonModal'));
    const enterMarksModal = new bootstrap.Modal(document.getElementById('enterMarksModal'));
    
    // Button event listeners
    document.getElementById('addLessonBtn').addEventListener('click', function() {
        addLessonModal.show();
    });
    
    document.getElementById('quickAddLessonBtn').addEventListener('click', function() {
        addLessonModal.show();
    });
    
    document.getElementById('enterMarksBtn').addEventListener('click', function() {
        enterMarksModal.show();
    });
    
    document.getElementById('viewInterventionBtn').addEventListener('click', function() {
        document.getElementById('interventionPlanCard').scrollIntoView({
            behavior: 'smooth'
        });
    });
    
    // Save lesson handler
    document.getElementById('saveLessonBtn').addEventListener('click', function() {
        const topic = document.getElementById('lessonTopic').value;
        if (topic) {
            showAlert('Lesson added successfully!', 'success');
            addLessonModal.hide();
            document.getElementById('lessonForm').reset();
        } else {
            showAlert('Please enter a topic', 'danger');
        }
    });
    
    // Save marks handler
    document.getElementById('saveMarksBtn').addEventListener('click', function() {
        const testName = document.getElementById('testName').value;
        if (testName) {
            showAlert('Marks saved successfully!', 'success');
            enterMarksModal.hide();
            
            // In a real app, you would update the student performance table here
        } else {
            showAlert('Please enter a test name', 'danger');
        }
    });
    
    // Sample alert function
    function showAlert(message, type) {
        const alert = document.createElement('div');
        alert.className = `alert alert-${type} alert-dismissible fade show position-fixed`;
        alert.style.top = '70px';
        alert.style.right = '20px';
        alert.style.zIndex = '1100';
        alert.role = 'alert';
        alert.innerHTML = `
            ${message}
            <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        `;
        
        document.body.appendChild(alert);
        
        setTimeout(() => {
            alert.classList.remove('show');
            setTimeout(() => alert.remove(), 150);
        }, 3000);
    }
    
    // Sample data for demonstration
    const sampleStudents = [
        { name: "Rahul Sharma", marks: 48, average: 52, improvement: -5, attendance: 88, status: "danger" },
        { name: "Priya Mehta", marks: 62, average: 65, improvement: 3, attendance: 92, status: "warning" },
        { name: "Arjun Kumar", marks: 75, average: 78, improvement: 5, attendance: 96, status: "info" },
        { name: "Ananya Patel", marks: 92, average: 89, improvement: 7, attendance: 100, status: "success" }
    ];
    
    // In a real app, you would load and process student data here
});