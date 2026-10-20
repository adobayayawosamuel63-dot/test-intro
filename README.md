# Bible Quiz

Application de révision sur les leçons d'introduction (Dieu, la Bible, l'histoire biblique et les paraboles du royaume des cieux), avec trois modes :

- **QCM chronométré** façon Kahoot : 4 propositions, 20 secondes, points selon la rapidité et la série de bonnes réponses.
- **Flashcards** : la question s'affiche, tu récites, tu révèles la réponse complète, puis tu t'auto-évalues.
- **Rédaction** : tu écris la réponse au clavier, l'app la compare au texte exact et surligne chaque écart (mot manquant, mot en trop, ponctuation).

Les réponses des fiches sont recopiées **mot pour mot** depuis le support de cours : ponctuation, majuscules et numérotation d'origine sont conservées.

## Lancer le projet

```bash
npm install
npm run dev
```

Puis ouvrir l'adresse affichée (par défaut http://localhost:5173).

Autres commandes :

```bash
npm run typecheck   # vérification TypeScript
npm run build       # build de production dans dist/
npm run preview     # sert le build de production
```

## Contenu

- 22 leçons, 32 fiches de révision et 107 questions de QCM.
- Filtre par leçon avant de lancer une partie ; « Tout sélectionner » remet le programme complet.
- Meilleur score (QCM) et meilleur taux (cartes) conservés dans le navigateur via `localStorage`.
- Raccourcis clavier : `1`–`4` pour répondre, `Entrée` pour continuer ; `Espace` pour révéler une carte, `1` à revoir, `2` je savais ; `Ctrl`+`Entrée` pour corriger une rédaction.
- La question 7 (prophéties / accomplissements) conserve son tableau à trois colonnes.

### Comment la rédaction est corrigée

La comparaison est stricte, comme à l'écrit :

- ignorés : espaces multiples, retours à la ligne, apostrophes typographiques (`’` = `'`) ;
- vérifiés : ponctuation, accents, chiffres et majuscules.

Si seules les majuscules diffèrent, l'app l'indique (verdict orange) mais la fiche ne compte pas comme exacte. Les mots attendus absents sont barrés en rouge, les mots en trop surlignés en jaune.

## Structure

```
src/
  data/lessons.ts      # tout le contenu du cours (fiches + QCM + termes de paraboles)
  lib/quiz.ts          # génération des QCM : mélange, choix des mauvaises réponses
  lib/compare.ts       # comparaison au caractère près + diff mot à mot
  lib/sound.ts         # bips de bonne/mauvaise réponse (WebAudio)
  lib/storage.ts       # sauvegarde locale des scores
  components/
    Home.tsx           # accueil, choix du mode et des leçons
    QuizMode.tsx       # QCM chronométré
    CardMode.tsx       # flashcards
    WriteMode.tsx      # rédaction corrigée
    Results.tsx        # écrans de fin (QCM, cartes, rédaction)
  App.tsx              # navigation entre les écrans
  styles.css           # thème façon Kahoot
```

## Ajouter ou corriger du contenu

Tout se passe dans `src/data/lessons.ts` :

- `cards` : une fiche = la question exacte + la liste des lignes de la réponse exacte (modes flashcards et rédaction), avec un `table` facultatif pour les réponses en tableau.
- `quiz` : questions à choix multiples rédigées à la main ; **`options[0]` doit être la bonne réponse**, les autres sont mélangées à l'affichage.
- `terms` : couples « terme de parabole → véritable signification ». Une question de QCM est générée automatiquement pour chaque terme, avec des leurres pris dans les autres termes de la leçon (ou du cours entier). Le champ `d` permet d'imposer des leurres précis quand deux sens sont trop proches.

Le total de questions affiché sur l'accueil se met à jour tout seul.
