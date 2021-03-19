# Prévenir Alias lors du déclenchement d'un ou plusieurs évènements (Travail du développeur)

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

Il vous faut maintenant intégrer ces évènements dans vos systèmes afin d'être en mesure de prévenir Alias lorsqu'ils surviennent.

La solution la plus simple est de mettre en place de simples CRON Jobs capables de repérer les utilisateurs ayant effectué une ou plusieurs des actions référencées par le DPO. Dans le cadre de la création d'un nouvel utilisateur, l'```identityRef``` correspond à un identifiant interne à vos systèmes qui vous permettra de retrouver un utilisateur avec certitude.

Cette ```identityRef``` peut être créée de toute pièce dans vos systèmes pour Alias, ou bien être un id d'instance de table (par exemple). 

```json
  {
    "items": [
      {
        "identityRef": 22,
        "events": [
          {
            "ref": "login",
            "date": "2020-04-22T06:00:00Z"
          }, // vous n'êtes pas obligé de signaler la survenue de cet évènement à chaque fois qu'il se produit. Simplement la dernière occurence connue à la date de l'envoi de cet objet à Alias.
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
            "ref": "invoice_created",
            "date": "2020-04-22T06:10:00Z"
          } // vous devez signaler la survenu de cet évènement autant de fois qu'il s'est produit
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
        "items": [
          {
            "dataTypes": ["prénom", "nom"],
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
            "nextState": "archive",
            "ArchiveAllBeforeDate": "2018-04-22T06:00:00Z"
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

