document.addEventListener('DOMContentLoaded', function() {
    const transactionForm = document.getElementById('transaction-form');
    const fetchTransactionsForm = document.getElementById('fetch-transactions-form');
    const transactionsResult = document.getElementById('transactions-result');
    const currentBalanceElem = document.getElementById('current-balance');

    if (transactionForm) {
        transactionForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const formData = new FormData(transactionForm);

            fetch('add_transaction.php', {
                method: 'POST',
                body: formData
            })
            .then(response => response.text())
            .then(data => {
                alert(data);  // Notify user about the transaction status
                transactionForm.reset();  // Reset the form
            })
            .catch(error => console.error('Error:', error));
        });
    }

    if (fetchTransactionsForm) {
        fetchTransactionsForm.addEventListener('submit', function(event) {
            event.preventDefault();

            fetch('retrive_transaction.php', {
                method: 'POST'
            })
            .then(response => response.text())
            .then(data => {
                transactionsResult.innerHTML = data;
            })
            .catch(error => console.error('Error fetching transactions:', error));
        });
    }

    // Navigation
    const navLinks = document.querySelectorAll('nav ul li a');
    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetId = event.target.getAttribute('href').substring(1);
            const targetSection = document.getElementById(targetId);

            document.querySelectorAll('main section').forEach(section => {
                section.classList.remove('active-section');
            });

            targetSection.classList.add('active-section');
        });
    });

    // Set default active section
    document.getElementById('home').classList.add('active-section');
});
