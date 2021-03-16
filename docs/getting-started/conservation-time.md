# Paramétrer les durées de conservation (Travail du DPO)

Chaque type de donnée est désormais relié à une ou plusieurs localisations. 

Votre mission, en tant que DPO, est de rédiger des règles de durée de conservation. Pas de panique, l'incroyable Alias DPO UI est là pour vous ! 

1. Sélectionner une fiche de traitement, cliquer ensuite sur "Données", puis sur une des catégories de données et enfin sur un type de donnée.

Dans le cas où vous avez sélectionné le type de données "nom" dans la catégorie de donnée "données d'identité" (que vous avez dans la première étape associé à la finalité "gérer la relation client" sur le fondement "l'intérêt légitime à entretenir des relations commerciales") dans la fiche de traitement 1, le texte ci dessous apparait :

"Dans le cadre de la ```fiche de traitement 1``` afin de ```gérer la relation client```, toute instance du type de donnée ```nom-1``` appartenant à la catégorie ```données d'identité``` et stockée dans les localisations ```sélectionner une ou plusieurs localisations``` sur le fondement de ```l'intérêt légitime à entretenir des relations commerciales``` pourra être stocké à compter de ```ajouter ou sélectionner un évènement``` jusqu'à ```ajouter ou sélectionner un évènement de fin``` sauf s'il se produit ```ajouter ou sélectionner un évènement de début de freeze``` auquel cas la conservation ne pourra reprendre dans les mêmes conditions que s'il se produit ```ajouter ou sélectionner un évènement de fin de freeze```."

2. Cliquer sur "sélectionner une ou plusieurs localisations". Les différentes localisations du type de données sélectionné, renseignées par les développeurs à l'étape précédente, apparaissent. 

3. Cliquer sur "ajouter ou sélectionner une action". Une popup vous invite à renseigner ou sélectionner dans une liste le nom de l'évenement marquant le début d'une durée de conservation. Par exemple "user_created".

4. Cliquer sur "ajouter ou sélectionner un évènement de fin". Ces évènement de fin sont définies soit par un compte à rebours (ex: 2 ans), soit par un autre évènement (ex: user_account_deletion). Par défaut, un évènement de fin de type "évènement" prendra le pas sur un évènement de type "compte à rebours". 

5. Répétez les étapes 3 et 4 autant de fois qu'il y a d'évènements de début et pour les évènements de freeze. A la fin, le texte devrait ressembler à cela:

"Dans le cadre de la ```fiche de traitement 1``` afin de ```gérer la relation client```, toute instance du type de donnée ```nom-1``` appartenant à la catégorie ```données d'identité``` et stockée dans les localisations ```db_xz42/users/last_name``` et ```db_xz23/users/last_name``` sur le fondement de ```???``` pourra être stocké à compter de: 

- ```user_created``` jusqu'à ```t + 5ans``` ou ```user_account_deletion```
- ```user_connexion``` jusqu'à ```t + 5 ans``` ou ```user_account_deletion```

sauf s'il se produit ```litige_start``` auquel cas la conservation ne pourra reprendre dans les mêmes conditions que s'il se produit ```litige_end```."


6. Une fois vos durées de conservation créées, vous pouvez cliquer sur "Générer les évènements" dans l'onglet "Organisation" puis envoyer le document créé à votre développeur. Il contient tous les évènements que le développeur devra signaler à Alias afin de permettre la mise à jour régulière des durées de conservations associées aux données de vos utilisateurs.


