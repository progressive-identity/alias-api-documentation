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

Votre mission, si vous l'acceptez, consiste à trouver toutes les localisations dans vos systèmes pour chaque type de données.

Cette mission s'accomplit en deux étapes.

1. Déclarer vos espaces de stockage grâce à un objet JSON ou via note interface UI:

```json
  {
    "items": [
      {
        "dataSupport": "db_xz42",
        "storageType": "db",
        "replications": ["db_xz23"]
      },
      {
        "dataSupport": "https://iencli_bank_account_infos.fr",
        "storageType": "bucket",
        "replications": null
      },
      {
        "dataSupport": "random_crm_1",
        "storageType": "CRM",
        "replications": null
      },
      {
        "dataSupport": "bibliotheque_1",
        "storageType": "library",
        "replications": null
      }
    ]
  }
```

2. Déclarer pour le type de donnée associé à chaque adresse dans chaque support de donnée.

Imaginons que vous enregistriez le prénom de vos utilisateurs dans le champs ```first_name```d'une table ```users``` dans vos base de donnée ```db_xz42``` et ```db_xz23```.

<!-- - le prénom de vos clients dans une liste appelée ```client_list``` dans le CRM appelée ```random_crm_1```. -->

- le nom de vos utilisateurs dans le champs ```last_name```d'une table ```users``` dans la base de donnée ```db_xz42``` et ```db_xz23```.

<!-- - le nom de vos clients sur une feuille de papier (parce que pourquoi pas) rangée dans un dossier appelé "dossier clients", allée 22 de la "bibliothèque 1" de votre entreprise.

- l'IBAN de vos clients sous forme d'image dans un bucket S3 (personne n'est parfait) appelé ```iencli_bank_account_infos```. -->

Voici à quoi devrait ressembler l'objet JSON permettant de déclarer à Alias les localisations de votre type de donnée "prénom" dans le support de donnée ```db_xz42```. Automatiquement, Alias reliera les types de données ci-dessous aux mêmes addresses dans la base de donnée répliquée ```db_xz23```.

Path : /data-support/db_xz42/data-types
POST

```json
  {
    "items": [
      {
        "address": {
          "name": "users/first_name",
          "description": "prénom des utilisateurs du site exemple.com"
        },
        "dataTypeRef": "prénom-1"
      },
      {
        "address": {
          "name": "users/last_name",
          "description": "nom des utilisateurs du site exemple.com"
        },
        "dataTypeRef": "nom-1"
      }
    ]
  }
```

Une fois ces objets envoyés à Alias, vous pouvez vous féliciter, prendre un peu de repos et laisser votre DPO reprendre la main pour la prochaine étape.

