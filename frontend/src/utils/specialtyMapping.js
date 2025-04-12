export const specialtyMapping = {
  // Neurologue
  "mal de tête": "Neurologue",
  "mal de tete": "Neurologue",
  "maux de tête": "Neurologue",
  "maux de tete": "Neurologue",
  "céphalée": "Neurologue",
  "migraine": "Neurologue",
  "trouble de la tête": "Neurologue",
  "vertige": "Neurologue",
  "étourdissement": "Neurologue",
  "perte d'équilibre": "Neurologue",
  "trouble neurologique": "Neurologue",
  "douleur crânienne": "Neurologue",
  "confusion": "Neurologue",
  "trouble de la mémoire": "Neurologue",
  "engourdissement": "Neurologue",
  "picotements": "Neurologue",

  // Généraliste

  "fièvre": "Généraliste",
  "fievre": "Généraliste",
  "température élevée": "Généraliste",
  "chaleur excessive": "Généraliste",
  "inflammation": "Généraliste",
  "infection": "Généraliste",
  "fatigue": "Généraliste",
  "toux": "Généraliste",
  "rhume": "Généraliste",
  "grippe": "Généraliste",
  "mal de gorge": "Généraliste",
  "courbatures": "Généraliste",
  "vomissements": "Généraliste",
  "diarrhée": "Généraliste",
  "nausée": "Généraliste",
  "douleur générale": "Généraliste",
  "perte d'appétit": "Généraliste",
  "faiblesse": "Généraliste",
  "diabète de type 2": "Généraliste",


  // Cardiologue
  "douleur thoracique": "Cardiologue",
  "douleur au cœur": "Cardiologue",
  "difficulté respiratoire": "Cardiologue",
  "oppression thoracique": "Cardiologue",
  "palpitations": "Cardiologue",
  "essoufflement": "Cardiologue",
  "hypertension": "Cardiologue",
  "hypotension": "Cardiologue",
  "arythmie": "Cardiologue",
  "tachycardie": "Cardiologue",
  "bradycardie": "Cardiologue",
  "douleur au bras gauche": "Cardiologue",
  "vertige cardiaque": "Cardiologue",
  "œdème des jambes": "Cardiologue",

  // Dermatologue
  "éruption cutanée": "Dermatologue",
  "rash": "Dermatologue",
  "démangeaison": "Dermatologue",
  "eczéma": "Dermatologue",
  "bouton": "Dermatologue",
  "acné": "Dermatologue",
  "rougeur": "Dermatologue",
  "psoriasis": "Dermatologue",
  "urticaire": "Dermatologue",
  "allergie cutanée": "Dermatologue",
  "irritation de la peau": "Dermatologue",
  "sécheresse cutanée": "Dermatologue",
  "plaie persistante": "Dermatologue",
  "verrue": "Dermatologue",
  "mycose": "Dermatologue",

  // Pédiatre
  "toothache": "Pédiatre",
  "douleur dentaire": "Pédiatre",
  "douleur au dent": "Pédiatre",
  "carie": "Pédiatre",
  "poussée dentaire": "Pédiatre",
  "pédiatrie": "Pédiatre",
  "enfant malade": "Pédiatre",
  "soins pédiatriques": "Pédiatre",
  "maladie infantile": "Pédiatre",
  "contrôle de croissance": "Pédiatre",
  "fièvre chez l'enfant": "Pédiatre",
  "vomissements enfant": "Pédiatre",
  "diarrhée enfant": "Pédiatre",
  "érythème fessier": "Pédiatre",
  "retard de développement": "Pédiatre",

  // Gynécologue
  "L'accouchement": "Gynécologue",
  "accouchement": "Gynécologue",
  "gynécologie": "Gynécologue",
  "suivi prénatal": "Gynécologue",
  "consultation gynécologique": "Gynécologue",
  "règles douloureuses": "Gynécologue",
  "aménorrhée": "Gynécologue",
  "saignements anormaux": "Gynécologue",
  "douleur pelvienne": "Gynécologue",
  "infection urinaire": "Gynécologue",
  "ménopause": "Gynécologue",
  "contraception": "Gynécologue",
  "kyste ovarien": "Gynécologue",
  "endométriose": "Gynécologue",
  "frottis": "Gynécologue",

};


export const getSpecialtyFromReason = (reason) => {
  const lowerReason = reason.toLowerCase();
  for (const keyword in specialtyMapping) {
    if (lowerReason.includes(keyword)) {
      return specialtyMapping[keyword];
    }
  }
  return null;
};
