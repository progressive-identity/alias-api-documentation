# Rendre vos anciennes données RGPD compatibles

Vos systèmes contiennent déjà très probablement de nombreuses données. Elles aussi nécessitent d'être suivies et taguées avec les règles RGPD qui s'y appliquent. 

Tout ce que vous avez à faire, c'est envoyer à Alias un objet JSON contenant, pour chaque item:

- une référence interne utilisée pour créer une identité chez Alias

- la date de la dernière fois où votre utilisateur a déclenché chaque évènement répertorié par le DPO.

Imaginons que vous avez deux utilisateurs dans votre système et que vous décidez de les références grâce à l'id d'instance de la table 'users'. Voilà comment vous devez les déclarer à Alias: 

```json
{
  "items": [
    {
      "identityRef": 1,
      "items": [
        {
          "event": "user_created",
          "date": "2020-04-22T06:00:00Z"
        },
        {
          "event": "user_connected",
          "date": "2020-05-22T06:00:00Z"
        }
      ]
    },
    {
      "identityRef": 2, 
      "items": [
        {
          "event": "user_created",
          "date": "2020-04-22T06:00:00Z"
        },
        {
          "event": "newsletter_opened",
          "date": "2021-02-22T06:00:00Z"
        }
      ]
    }
  ]
}
```

En réponse, Alias vous enverra les date de conservation calculées pour chaque instance de donnée:

```json
  {
    "items": [
      {
        "identityRef": 1,
        "items": [
          {
            "locations": [
              "db_xz42/users/first_name",
              "db_xz23/users/first_name",
              "db_xz42/users/last_name",
              "db_xz23/users/last_name"
            ],
            "nextState": "legal",
            "nextStateDate": "2025-04-22T06:00:00Z"
          },
          {
            "locations": ["https://iencli_bank_account_infos.fr"],
            "nextState": "legal",
            "nextStateDate": "2028-04-22T06:00:00Z"
          },
        ]
      },
      {
        "identityRef": 2,
        "items": [
          {
            "locations": ["users/first_name", "users/last_name"],
            "nextState": "legal",
            "nextStateDate": "now"
          },
          {
            "locations": ["https://iencli_bank_account_infos.fr"],
            "nextState": "legal",
            "nextStateDate": "now"
          },
        ]
      }
    ]
  }
```

Que signifie cet objet ?

Pour l'utilisateur référencé sous l'identité 1 chez Alias, vous aurez besoin de passer le prénom et le nom situés dans les tables users en archivage légal en 2025. Les informations concernant cet utilisateur stockées dans le bucket devront, elles, être archivées en 2028.

Pour l'utilisateur 2, toutes les données mentionnées dans l'objet doivent être passées en archivage légal dès maintenant.
