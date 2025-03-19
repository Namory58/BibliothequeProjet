var emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
var passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
var nameRegex = /^[a-zA-Z]+$/;
var prenomRegex = /^[a-zA-ZÀ-ÖØ-öø-ÿ\s]+$/;

module.exports = {
    isValidEmail : function(email){
        return emailRegex.test(email); // qui retourne un booléen (true ou false)
    },
    isValidPassword : function(password){
        return passwordRegex.test(password);
    },
    isValidName : function(name){
        return nameRegex.test(name);
    },
    isValidPrenom : function(prenom){
        return prenomRegex.test(prenom);
    }
}