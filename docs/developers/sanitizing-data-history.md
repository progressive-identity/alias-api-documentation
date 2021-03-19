# Rendre vos anciennes données RGPD compatibles

Vos systèmes contiennent déjà très probablement de nombreuses données. Elles aussi nécessitent d'être suivies et taguées avec les règles RGPD qui s'y appliquent. 

Tout ce que vous avez à faire, c'est envoyer à Alias un objet JSON contenant, pour chaque utilisateur:

- une référence interne utilisée pour créer une identité chez Alias

- pour chaque évènement "non créateur d'instance", la date de la dernière fois qu'il a été déclenché

- pour chaque évènement "créateur d'instance", toutes les fois où cet évènement a été déclenché dans vos systèmes

Exemple: 

```json
  {
    "items": [
      {
        "identityRef": 22,
        "events": [
          {
            "ref": "login", // cet évènement n'est pas "créateur d'instance", vous n'êtes donc pas obligé de signaler sa survenue à chaque fois qu'il se produit. Simplement la dernière occurence.
            "date": "2020-04-22T06:00:00Z" //date de déclenchement de cet évènement
          }, 
          {
            "ref": "newsletter_opening",
            "date": "2020-04-22T06:00:00Z"
          }
        ]
      },
      {
        "identityRef": 12,
        "events": [
          {
            "ref": "invoice_created",
            "date": "2020-04-22T06:00:00Z"
          },
          {
            "ref": "invoice_created", // cet évènement est "créateur d'instance", vous devez le signaler à Alias autant de fois qu'il s'est produit
            "date": "2020-04-22T06:10:00Z"
          }
        ]
      },
      {
        "identityRef": 24,
        "events": [
          {
            "ref": "user_created",
            "date": "2020-04-22T06:00:00Z"
          }
        ]
      }
    ]
  }
```

En réponse, Alias vous enverra les durées de conservation calculées pour chaque instance de donnée:

```json
  {
    "items": [
      { 
        "identityRef": 22,
        "durations": [
          {
            "nextState": "archive",
            "nextStateDate": "2022-04-22T06:00:00Z",
            "locations": [
              {
                "name": "db_xz42/users/first_name",
                "replications": ["db_xz23"],
                "dataTypeRef": "prénom-1",
                "eventDate": "2020-04-22T06:00:00Z"
              },
              {
                "name": "db_xz42/users/last_name",
                "replications": ["db_xz23"],
                "dataTypeRef": "nom-1",
                "eventDate": "2020-04-22T06:00:00Z"
              }
            ]
          }
        ]
      },
      { 
        "identityRef": 12,
        "durations": [
          {
            "nextState": "archive",
            "nextStateDate": "2022-04-22T06:00:00Z",
            "locations": [
              {
                "name": "https://facture-bucket.com",
                "dataTypeRef": "prénom-facture",
                "replications": null,
                "eventDate": "2020-04-22T06:00:00Z"
              },
              {
                "name": "https://facture-bucket.com",
                "dataTypeRef": "nom-facture",
                "replications": null,
                "eventDate": "2020-04-22T06:00:00Z"
              }
            ]
          },
          {
            "nextState": "archive",
            "nextStateDate": "2022-04-22T06:10:00Z",
            "locations": [
              {
                "name": "https://facture-bucket.com",
                "dataTypeRef": "prénom-facture",
                "replications": null,
                "eventDate": "2020-04-22T06:10:00Z"
              },
              {
                "name": "https://facture-bucket.com",
                "dataTypeRef": "nom-facture",
                "replications": null,
                "eventDate": "2020-04-22T06:10:00Z"
              }
            ]
          }
        ]  
      },
      { 
        "identityRef": 22,
        "durations": [
          {
            "nextState": "archive",
            "nextStateDate": "2022-04-22T06:00:00Z",
            "locations": [
              {
                "name": "db_xz42/users/first_name",
                "replications": ["db_xz23"],
                "dataTypeRefs": "prénom-1",
                "eventDate": "2020-04-22T06:00:00Z"
              },
              {
                "name": "db_xz42/users/last_name",
                "replications": ["db_xz23"],
                "dataTypeRef": "nom-1",
                "eventDate": "2020-04-22T06:00:00Z"
              }
            ]
          }
        ]
      },
    ]
  }
```
