# Prévenir Alias lors du déclenchement d'un ou plusieurs évènements (Travail du développeur)

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

