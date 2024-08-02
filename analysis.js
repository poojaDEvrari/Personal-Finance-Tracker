document.addEventListener('DOMContentLoaded', function() {
    // Function to fetch and render the analysis chart
    function fetchAnalysisData() {
        fetch('analysis.php')
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => {
                renderAnalysisChart(data);
            })
            .catch(error => console.error('Error fetching analysis data:', error));
    }

    // Function to render the analysis chart
    function renderAnalysisChart(data) {
        const ctx = document.getElementById('analysis-chart').getContext('2d');
        const labels = data.map(item => '${item.type}: ${item.description}');
        const amounts = data.map(item => item.total_amount);

        new Chart(ctx, {
            type: 'pie',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Income and Expense Analysis',
                    data: amounts,
                    backgroundColor: [
                        'rgba(54, 162, 235, 0.2)',
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 99, 132, 1)'
                    ],
                    borderWidth: 1
                }]
            },
                   });
    }

    // Event listeners for navigation
    document.getElementById('analysis-link').addEventListener('click', function() {
        
        fetchAnalysisData();
    });

    // Add similar event listeners for other nav links if not already present
});