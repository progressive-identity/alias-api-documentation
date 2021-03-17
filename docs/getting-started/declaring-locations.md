# Déclarer les localisations des types de données (travail du développeur)

Développeurs (de tous les pays, unissez-vous !), votre travail commence lorsque votre DPO a terminé de remplir ses fiches de traitement, cliqué sur "Générer les types de données" et vous a envoyé l'objet JSON créé par cette commande. 

Cet objet contient toutes les données personelles, listées par type de données, que votre entreprise conserve sur les utilisateurs qui consomment ses services et dont le DPO a connaissance.

```json
  {
    "items": [
      {
        "dataType": "prénom",
        "dataTypeRef": "prenom-1",
        "dataCategories": [
          "Données d'identité",
          "Données de permis de conduire",
          "Données de facture"
        ]
      },
      {
        "dataType": "nom",
        "dataTypeRef": "nom-1",
        "dataCategories": [
          "Données d'identité",
          "Données de permis de conduire",
          "Données de facture"
        ]
      },
      {
        "dataType": "IBAN",
        "dataTypeRef": "IBAN-1",
        "dataCategories": [
          "Données d'identité bancaire"
        ]
      }
    ]
  }
```

Votre mission, si vous l'acceptez, consiste à trouver toutes les localisations dans vos systèmes pour chaque type de données et de renvoyer à Alias un objet JSON décrivant ces lieux de stockage.

Imaginons que, pour les types de données au-dessus, vous enregistriez : 

- le prénom de vos utilisateurs dans le champs ```first_name```d'une table ```users``` dans une base de donnée de type PostgreSQL.

- le prénom de vos clients dans une liste appelée ```client_list``` dans le CRM appelée ```random_crm_1```.

- le nom de vos utilisateurs dans le champs ```last_name```d'une table ```users``` dans une base de donnée de type PostgreSQL.

- le nom de vos clients sur une feuille de papier (parce que pourquoi pas) rangée dans un dossier appelé "dossier clients", allée 22 de la "bibliothèque 1" de votre entreprise.

- l'IBAN de vos clients sous forme d'image dans un bucket S3 (personne n'est parfait) appelé ```iencli_bank_account_infos```.

Voici à quoi devrait ressembler l'objet JSON permettant de déclarer à Alias les localisations de vos types de données.

```json
  {
    "items": [
      {
        "dataTypeRef": "prenom-1",
        "items": [
          {
            "location": "db_xz42/users/first_name", //the precision of the location is up to you
            "description": "prénom des utilisateurs du site exemple.com", 
            // optional, used to help your DPO to understand the content of the data
            "storageType": "db_field",
            "replications": ["db_xz23"]
          },
          {
            "location": "CRM_1/client_list_1",
            "description": "prénom des clients inscrits dans la base du CRM de la société Exemple", 
            "storageType": "CRM"
          }
        ]
      },
      {
        "dataTypeRef": "nom-1",
        "items": [
          {
            "location": "db_xz42/users/last_name",
            "description": "nom des utilisateurs du site exemple.com", 
            "storageType": "db_field",
            "replications": ["db_xz23"]
          },
          {
            "location": "bibliotheque_1/allee22/dossier_clients",
            "description": "nom des clients de la société Exemple", 
            "storageType": "physical_paper"
          }
        ]
      },
      {
        "dataTypeRef": "IBAN",
        "items": [
          {
            "location": "https://iencli_bank_account_infos.fr",
            "description": "PNGs contenant les informations bancaires de nos clients", 
            "storageType": "bucket"
          }
        ]
      }
    ]
  }
```

Une fois cet objet envoyé à Alias, vous pouvez vous féliciter, prendre un peu de repos et laisser votre DPO reprendre la main pour la prochaine étape.

