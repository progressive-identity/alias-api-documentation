# Prévenir Alias lors du déclenchement d'un ou plusieurs évènements (Travail du développeur)

## Lire et comprendre le "document des évènements"

Consultez votre boite mail, vous venez de recevoir un message de la part de votre DPO. Il a terminé de remplir les règles de durée de conservation et définit les évènements susceptibles de modifier le contexte légal qui s'applique aux données enregistrées dans vos systèmes.

```json
  {
    "items": [
      {
        "description": "Sign up d'un nouvel utilisateur sur notre site exemple.com",
        "ref": "user_created",
        "instance_creator": true
      },
      {
        "description": "Login d'un nouvel utilisateur sur notre site exemple.com",
        "ref": "login",
        "instance_creator": false
      },
      {
        "description": "Ouverture d'une newsletter du site exemple.com par un abonné à cette newsletter",
        "ref": "newsletter_opening",
        "instance_creator": false
      },
      {
        "description": "Création d'une facture suite à un achat sur le site exemple.com",
        "ref": "invoice_created",
        "instance_creator": true
      }
    ]
  }
```

La clé ```instance_creator``` signifie que vous pouvez gérer différement la notification de cet évènement à Alias en fonction de sa valeur.

Dans le cas où un évènement est "créateur d'instance", chaque occurence de cet évènement dans vos systèmes devra être notifié à Alias (ex: si plusieurs factures sont créées dans vos systèmes, Alias va devoir associer une durée de conservation à chacune des données de chacune de ces factures.). Dans le cas inverse, seule l'occurence la plus récente de l'évènement peut être notifiée à Alias (ex: si un utilisateur se connecte, cela implique une mise à jour des durées de conservation de plusieurs de ses données mais n'implique pas la création de nouvelles données personnelles à traquer par Alias).

## Informer Alias du déclenchement des évènements

Après avoir lu le document des évènements, il vous faut maintenant surveiller leur survenue dans vos systèmes afin d'en prévenir Alias.

La solution la plus simple est de mettre en place des CRON Jobs capables de repérer les évènements  référencés par le DPO et déclenchés par vos utilisateurs. Dans le cadre de la création d'un nouvel utilisateur, l'```identityRef``` correspond à un identifiant interne à vos systèmes qui vous permettra de retrouver cet utilisateur avec certitude si Alias vous en fait la demande (dans le cadre d'une demande de droit d'accès par exemple).

Cette ```identityRef``` peut être créée de toute pièce dans vos systèmes pour Alias, ou bien être, par exemple, un id d'instance d'une table "users". 

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

Réponse d'Alias: 

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

