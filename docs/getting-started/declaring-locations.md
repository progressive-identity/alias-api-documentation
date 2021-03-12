# Declaring data locations (developer work)

The DPO has finished to fill in the processing records. You can congratulate him and read the document he sent to you.

EX DE DOCUMENT OU D'OBJET JSON

This paper contains all the personal information, listed as data types, that your company stores on its users.

Your mission, Developer, should you decide to accept it, consists in finding the location of the data type referenced in the doc the DPO sent to you and associate a dataTypeRef with the location of the data in your systems.

Let's say that you store: 

- the 'prénom' of your users in the 'first_name' field of a 'users' in two PostgreSQL tables

- the 'prénom' of your clients in the 'client_list' of a CRM called 'CRM_1'

- the 'nom' of your users in the 'last_name' field of a 'users' in two PostgreSQL tables

- the 'nom' of your client as a physical paper in a real library. Yeah, even if you've decided to print some of your user infos (because why not) instead of storing it numerically, Alias is able to reference them.

- the IBAN of your client as a single image inside a S3 bucket (strange idea but no one is perfect) called 'iencli_bank_account_infos'

You can reference this data types in the Alias system by sending a simple JSON object which look like that:

```json
  {
    "items": [
      {
        "dataTypeRef": "first_name",
        "items": [
          {
            "location": "db_xz42/users/first_name", //the precision of the location is up to you
            "description": "prénom des utilisateurs du site exemple.com", 
            // optional, used to help your DPO to understand the content of the data
            "storage_type": "db_field"
          },
          {
            "location": "db_xz23/users/first_name",
            "description": "réplication du prénom des utilisateurs exemple.com", 
            "storage_type": "db_field"
          },
          {
            "location": "CRM_1/client_list_1",
            "description": "prénom des clients de la société Exemple", 
            "storage_type": "CRM"
          }
        ]
      },
      {
        "dataTypeRef": "name",
        "items": [
          {
            "location": "db_xz42/users/last_name",
            "description": "nom des utilisateurs du site exemple.com", 
            "storage_type": "db_field"
          },
          {
            "location": "db_xz23/users/last_name",
            "storage_type": "db_field"
          },
          {
            "location": "bibliotheque_1/allee22/dossier_clients",
            "description": "nom des clients de la société Exemple", 
            "storage_type": "physical_paper"
          }
        ]
      },
      {
        "dataTypeRef": "IBAN",
        "items": [
          {
            "location": "https://iencli_bank_account_infos.fr",
            "description": "PNGs contenant les informations bancaires de nos clients", 
            "storage_type": "bucket"
          }
        ]
      }
    ]
  }
```

When you are done, you can take some rest and let your DPO take the lead for the next step.

