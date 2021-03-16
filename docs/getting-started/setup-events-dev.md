# Prévenir Alias lors du déclenchement d'un ou plusieurs évènements (Travail du développeur)

Consultez votre boite mail, vous venez de recevoir un message de la part de votre DPO. Il a terminé de remplir les règles de durée de conservation et définit les évènements susceptibles de modifier le contexte légal qui s'applique aux données enregistrées dans vos systèmes.

```json
  {
    "items": [
      {
        "description": "Sign up d'un nouvel utilisateur sur notre site exemple.com",
        "ref": "user_created"
      },
      {
        "description": "Login d'un nouvel utilisateur sur notre site exemple.com",
        "ref": "login"
      },
      {
        "description": "Ouverture d'une newsletter du site exemple.com par un abonné à cette newsletter",
        "ref": "newsletter_opening"
      },
      {
        "description": "Création d'une facture suite à un achat sur le site exemple.com",
        "ref": "invoice_created"
      }
    ]
  }
```

Il vous faut maintenant intégrer ces évènements dans vos systèmes afin d'être en mesure de prévenir Alias lorsqu'ils surviennent.

La solution la plus simple est de mettre en place de simples CRON Jobs capables de repérer les utilisateurs ayant effectué une ou plusieurs des actions référencées par le DPO. Dans le cadre de la création d'un nouvel utilisateur, l'```identityRef``` correspond à un identifiant interne à vos systèmes qui vous permettra de retrouver un utilisateur avec certitude.

Cette ```identityRef``` peut être créée de toute pièce dans vos systèmes pour Alias, ou bien être un id d'instance de table (par exemple). 

```json
  {
    "items": [
      {
        "identityRef": 22,
        "eventsRef": ["login", "newsletter_opening"]
      },
      {
        "identityRef": 12,
        "eventsRef": ["invoice_created"]
      },
      {
        "identityRef": 24,
        "eventsRef": ["user_created"]
      }
    ]
  }
```

Réponse d'Alias: 

```json
  {
    "items": [
      {
        "identityRef": 22,
        "items": [
          {
            "locations": ["db_xz42/users/first_name", "db_xz42/users/last_name"],
            "nextState": "archive",
            "nextStateDate": "2022-04-22T06:00:00Z"
          }
        ]
      },
      {
        "identityRef": 12,
        "items": [
          {
            "dataTypes": ["prénom", "nom"],
            "locations": ["https://facture-bucket.com"],
            "triggerEventDates": ["2018-04-22T06:00:00Z", "2018-04-22T06:00:00Z"]
          }
        ]
      },
      {
        "identityRef": 24,
        "items": [
          {
            "locations": ["db_xz42/users/first_name", "db_xz42/users/last_name"],
            "nextState": "archive",
            "nextStateDate": "2026-04-22T06:00:00Z"
          }
        ]
      }
    ]
  }
```

