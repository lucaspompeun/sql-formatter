const beautifyButton = document.getElementById('beautifyButton');
const inputSql = document.getElementById('inputSql');
const outputDiv = document.getElementById('output');
const outputSql = document.getElementById('outputSql');
const copyButton = document.getElementById('copyButton');
const errorDiv = document.getElementById('error');

beautifyButton.addEventListener('click', () => {
    const sql = inputSql.value.trim();
    if (sql === '') {
        showError('Please enter an SQL query.');
        return;
    }
    try {
        const formattedSql = sqlFormatter.format(sql, { language: 'mysql' });
        outputSql.textContent = formattedSql;
        outputDiv.style.display = 'block';
        errorDiv.style.display = 'none';
    } catch (e) {
        showError('An error occurred while formatting your SQL. Please check your query syntax.');
    }
});

copyButton.addEventListener('click', () => {
    const sql = outputSql.textContent;
    navigator.clipboard.writeText(sql).then(() => {
        copyButton.textContent = 'Copied!';
        setTimeout(() => {
            copyButton.textContent = 'Copy';
        }, 2000);
    }).catch(err => {
        showError('Failed to copy text: ' + err);
    });
});

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
    outputDiv.style.display = 'none';
}