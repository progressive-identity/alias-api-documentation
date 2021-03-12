# Setup events (dev work)

CRON JOBS dans un premier temps pour pas toucher à la prod.

Envoi d'un objet tous les soirs de ce type :

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
        "eventsRef": ["new_user"]
      }
    ]
  }
```


réponse avec les nextStateDate et les nextState pour chaque tryptique [dataType, location] pour chaque user
En gros, l'objet doit dire "Pour l'identité 22, le datatype prénom situé dans la table users/first_name devra passer en archivage légal le {date de passage en archivage légal}
