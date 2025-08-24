module.exports = {
    videSpce(req, listeEntity) {
        let valueVide = [];
            for (const [key, value] of Object.entries(req.body)) {
                if (!listeEntity.includes(key)) {
                    return {
                        error: true,
                        message: "Le champ " + key + " n'est pas autorisé."
                    };
                }
                if (value === null || value === undefined || value.trim() === "") {
                    valueVide.push(key);
                }
            }
            if (valueVide.length > 0) {
                return {
                    error: true,
                    message: valueVide.length > 1
                        ? "Les champs " + valueVide.join(", ") + " sont obligatoires."
                        : "Le champ " + valueVide.join(", ") + " est obligatoire."
                };
            }
        return null;
    }
}