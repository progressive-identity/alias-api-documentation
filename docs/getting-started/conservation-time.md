# Paramétrer les durées de conservation (Travail du DPO)

Chaque type de donnée est désormais relié à une ou plusieurs localisations. 

Votre mission, en tant que DPO, est de rédiger des règles de durée de conservation. Pas de panique, l'incroyable Alias DPO UI est là pour vous ! 

1. Sélectionner une fiche de traitement, cliquer ensuite sur "Données", puis sur une des catégories de données et enfin sur un type de donnée.

Dans le cas où vous avez sélectionné le type de données "nom" dans la catégorie de donnée "données d'identité" (que vous avez dans la première étape associé à la finalité "gérer la relation client" sur le fondement "???") dans la fiche de traitement 1, le texte ci dessous apparait :

"Dans le cadre de la ```fiche de traitement 1``` afin de ```gérer la relation client```, toute instance du type de donnée ```nom-1``` appartenant à la catégorie ```données d'identité``` et stockée dans les localisations ```sélectionner une ou plusieurs localisations``` sur le fondement de ```???``` pourra être stocké à compter de ```ajouter ou sélectionner un évènement``` sauf s'il se produit ```ajouter ou sélectionner un évènement``` auquel cas la conservation ne pourra reprendre dans les mêmes conditions que s'il se produit ```ajouter ou sélectionner un évènement```.


// Il manque pas le type de stockage(prod, legal etc.) ?


2. Cliquez sur les différents boutons 'sélectionner une ou plusieurs localisations' et 'ajouter ou sélectionner un évènement' pour remplir le texte. Une fois validé, une règle de durée de conservation est automatiquement créée.

"Dans le cadre de la ```fiche de traitement 1``` afin de ```gérer la relation client```, toute instance du type de donnée ```nom-1``` appartenant à la catégorie ```données d'identité``` et stockée dans les localisations ```db_xz42/users/last_name``` et ```db_xz23/users/last_name``` sur le fondement de ```???``` pourra être stocké à compter de ```user_created``` jusqu'à ```t + 5ans``` sauf s'il se produit ```litige_start``` auquel cas la conservation ne pourra reprendre dans les mêmes conditions que s'il se produit ```litige_end```.


3. Une fois vos durées de conservation créées, vous pouvez cliquer sur "Générer les évènements" dans l'onglet "Organisation" puis envoyer le document créé à votre développeur. Il contient tous les évènements que le développeur devra signaler à Alias afin de permettre la mise à jour régulière des durées de conservations associées aux données de vos utilisateurs.


