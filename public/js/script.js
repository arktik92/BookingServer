document.getElementById('resetPasswordForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const email = document.getElementById('email').value; 
    const newPassword = document.getElementById('password').value;

    console.log('Email:', email, 'Nouveau mot de passe:', newPassword);

    fetch('/auth/sendpassword', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password: newPassword })
    })
    .then(response => {
        if (response.ok) {
            // Si la réponse est 200, naviguer vers une nouvelle page
            window.location.href = '/passwordUpdated.html'; 
        } else {
            // Gérer les réponses autres que 200 ici
            return response.json({ "message": "erreur lors de la réinitialisation du mot de passe"});
        }
    })
    .then(data => {
        if (data) {
            console.log(data);
        }
    })
    .catch(error => console.error('Error:', error));
});
