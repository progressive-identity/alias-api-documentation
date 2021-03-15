# Quatre étapes pour mettre en route Alias

Les données personnelles de vos utilisateurs sont précieuses. Pour vous et pour eux. C'est pourquoi leur utilisation est aujourd'hui encadrée par des textes légaux comme le RGPD. 

Pour vous aider à utiliser au mieux les données que vous avez récoltées tout en étant certain de respecter les lois en vigueur, Alias transcrit l'application de la loi au niveau de vos données.

Ainsi, Alias peut ainsi vous notifier la nécessité de passer telle donnée en archivage légal ou vous informer de la possibilité d'utiliser ou non telle liste d'emails dans le cadre de vos campagnes marketings.  

Pour permettre à la magie d'Alias d'opérer, les DPO(s) et les équipes IT doivent paramétrer la solution. 

Voici les quatre étapes à suivre:

1. Le DPO numérise les fiches de traitement dans l'application "Alias DPO UI". A l'issue de ce processus, Alias crée automatiquement un document listant les différents types de données (prénom, nom, numéro de téléphone, IBAN...) présentes dans vos systèmes et se rapportant à vos utilisateurs.

2. A partir du document contenant les types de données, l'équipe IT identifie leurs lieux de stockage (databases, buckets, CRMs...) et les référence dans un objet JSON qu'elle transmet à l'API d'Alias.

3. Dans l'Alias DPO UI, le DPO rédige les règles de durées de conservation s'appliquant sur chaque type de donnée (la donnée X située dans tel endroit du système doit être passée en archivage légal après Y temps) et définit le contenu des formulaires de consentement. A l'issue de ce processus, un document recensant tous les évènements à tracker est produit.

4. A partir du document des évènements, le développeur implémente des CRON Jobs qui envoient à Alias un objet JSON contenant les références des évènements s'étant produit, classés par utilisateur. 

Et... c'est tout ! Alias vous informe désormais automatiquement des actions à effectuer sur vos données en fonction des règles légales qui s'y appliquent. Vous pouvez également vérifier si vous avez légalement le droit d'effectuer une action sur telle donnée (par exemple envoyer un email marketting à un email en particulier).
