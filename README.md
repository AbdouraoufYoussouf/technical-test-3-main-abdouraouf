# Technical test

## Introduction

Fabien just came back from a meeting with an incubator and told them we have a platform “up and running” to monitor people's activities and control the budget for their startups !

All others developers are busy and we need you to deliver the app for tomorrow.
Some bugs are left and we need you to fix those. Don't spend to much time on it.

We need you to follow these steps to understand the app and to fix the bug : 
 - Sign up to the app
 - Create at least 2 others users on people page ( not with signup ) 
 - Edit these profiles and add aditional information 
 - Create a project
 - Input some information about the project
 - Input some activities to track your work in the good project
  
Then, see what happens in the app and fix the bug you found doing that.

## Then
Time to be creative, and efficient. Do what you think would be the best for your product under a short period.

### The goal is to fix at least 3 bugs and implement 1 quick win feature than could help us sell the platform

## Setup api

- cd api
- Run `npm i`
- Run `npm run dev`

## Setup app

- cd app
- Run `npm i`
- Run `npm run dev`

## Finally

Send us the project and answer to those simple questions : 
- What bugs did you find ? How did you solve these and why ? 
- Which feature did you develop and why ? 
- Do you have any feedback about the code / architecture of the project and what was the difficulty you encountered while doing it ? 


# Rapport de Projet Rélisé par Abdouraouf

## Difficultés Rencontrées et Solutions Apportées

1. **Installation de NVM** :
   - J'ai rencontré des difficultés lors de l'installation des dépendances car la version de Node.js utilisée était inférieure à celle requise pour le projet. Pour résoudre ce problème, j'ai installé Node Version Manager (NVM) afin de gérer différentes versions de Node.js sur mon système. J'ai ensuite installé Node.js version 16.10 et mis à jour NPM à la version 8.0 pour assurer la compatibilité avec le projet.

2. **Modification dans la Création d'Utilisateur** :
   - Dans le composant de création d'utilisateur (`user/list`), j'ai modifié les valeurs initiales de Formik en ajoutant `initialValues={{ username: "", email: "", password: "" }}` pour fournir des valeurs par défaut aux champs du formulaire. J'ai également ajouté `type='submit'` au formulaire pour déclencher la soumission du formulaire.

3. **Modification dans la Vue de Détail** :
   - Pour le bouton de mise à jour (`update`) dans la vue de détail, j'ai remplacé `onchange` par `onclick` et ajouté `type='submit'` pour déclencher la soumission du formulaire lors du clic.

4. **Ajout du Champ `name` lors de la Création d'Utilisateur** :
   - J'ai modifié l'API utilisateur pour enregistrer le nom d'utilisateur (`username`) dans le champ `name` de la base de données. Cela garantit que le champ `name` est initialisé, évitant ainsi les erreurs lors de son utilisation dans la vue.

5. **Correction d'une Erreur dans `DetailUser`** :
   - J'ai corrigé une erreur où le champ `description` n'était pas défini dans Formik en initialisant `description` avec une chaîne vide si elle est `null`. Cela évite les erreurs lors de son utilisation dans la vue.

6. **Modification dans le Composant `DetailProjet`** :
   - J'ai supprimé `toString()` du nom du projet pour éviter les conversions inutiles. Cela simplifie le code et améliore sa lisibilité.

7. **Correction dans les Activités (`Activities`)** :
   - J'ai remplacé `key={e._id}` par `key={i}` pour résoudre un avertissement sur les clés uniques. Utiliser l'index (`i`) comme clé unique évite les problèmes de rendu et de mise à jour des composants React.

8. **Modification dans `SelectMonth`** :
   - J'ai modifié `value={value}` pour utiliser une chaîne vide si `value` n'est pas défini initialement. Cela évite les problèmes potentiels lors de l'initialisation du composant.

9. **Gestion de l'Erreur "Can't Perform a React State Update on an Unmounted Component"** :
   - J'ai supprimé `setSubmitting` de Formik pour éviter l'erreur lorsqu'il était appelé après le démontage du composant. Cela garantit que les mises à jour d'état sont effectuées uniquement lorsque le composant est monté, évitant ainsi les erreurs liées au démontage prématuré du composant.

## Développement de Fonctionnalités

J'ai développé plusieurs fonctionnalités, notamment la gestion de la création, de la mise à jour et de l'affichage des utilisateurs et des projets. Ces fonctionnalités sont essentielles pour assurer la gestion complète des données de l'application et fournir une expérience utilisateur cohérente et fluide.

## Retours sur le Code et l'Architecture du Projet

J'ai apporté des améliorations significatives au code et à l'architecture du projet en résolvant les bugs, en optimisant la performance et en améliorant la lisibilité du code. La principale difficulté rencontrée a été de gérer correctement l'état du formulaire et la synchronisation des données entre le frontend et le backend, ainsi que la résolution de l'erreur de fuite de mémoire causée par la mise à jour d'un composant démonté. Cela a nécessité une réflexion approfondie et des tests rigoureux pour assurer le bon fonctionnement de l'application.

Malgré les défis rencontrés, je suis satisfait du résultat final et convaincu que les modifications apportées améliorent significativement la qualité et la robustesse du projet.

Merci pour l'opportunité de réaliser ce test et j'espère vous recoir bientôt.