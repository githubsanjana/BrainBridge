document.addEventListener('DOMContentLoaded', function() {
    // Child selector functionality
    const childSelect = document.getElementById('childSelect');
    
    childSelect.addEventListener('change', function() {
        // In a real app, this would load data for the selected child
        showAlert(`Now viewing data for ${this.value}`, 'info');
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
    const sampleData = {
        children: [
            {
                name: "Rahul Sharma",
                grade: "Grade 8",
                performance: {
                    math: 62,
                    science: 88,
                    english: 75,
                    history: 54
                }
            },
            {
                name: "Priya Sharma",
                grade: "Grade 5",
                performance: {
                    math: 78,
                    science: 92,
                    english: 85,
                    history: 67
                }
            }
        ]
    };
    
    // Initialize with first child's data
    updateDashboard(sampleData.children[0]);
    
    function updateDashboard(childData) {
        // In a real app, this would update all dashboard elements
        console.log(`Loading data for ${childData.name}`);
    }
});