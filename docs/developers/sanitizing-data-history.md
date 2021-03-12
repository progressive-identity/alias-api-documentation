# Make your old data RGPD friendly

You probably have lots of old data in your systems that needs to be tag with the GDPR rules. 

All you need is to send, for each user, an Alias a JSON object containing: 

- an internal reference that will be used to identify this specific user in the Alias system (it can be the id of your users table instance representing a user, a reference you create...). The only requirement is that, when Alias will inform you that you need to do something about this ref, you must be able to find in your systems who is this user. 

- the last time each users had interactions with your systems (it could be a connection to one of your app, a mail opening...).

Let's say that you have only two users in your systems and you decide to use the users table instance id to reference them. Here is how you'll do it: 


```json
{
  "items": [
    {
      "identityRef": 1, 
      "lastInteractionDate": "2020-04-22T06:00:00Z"
    },
    {
      "identityRef": 2, 
      "lastInteractionDate": "2014-01-22T06:00:00Z"
    }
  ]
}
```

Alias will send you back what you need to do with this user's info : 

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

What does that mean ?

It means that for the user referenced as identity 1 in Alias, you will need to switch the first and last name in the users tables to legal archiving in 2025. For all infos concerning this user in the bucket, the archiving must be done in 2028.

For the user 2, the lack of interactions since 2014 means that you need to switch all the mentioned infos in the legal archiving now. 

Once that is done, you can activate the events /LINK VERS LA MISE EN PLACE DES EVENTS VIA CRON JOBS IN THE DEV PART/ in your system and start tracking what you need to do with your data based on the real events happening in your systems. 
