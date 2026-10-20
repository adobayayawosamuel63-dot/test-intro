export type Card = {
  id: string;
  q: string;
  /** Lignes de la réponse, recopiées exactement depuis le support de cours. */
  a: string[];
  /** Tableau affiché tel quel (question 7). */
  table?: {
    head: string[];
    rows: string[][];
  };
};

export type Term = {
  /** Terme de la parabole (ou notion) */
  t: string;
  /** Véritable signification, telle qu'écrite dans le cours */
  m: string;
  /** Distracteurs imposés (facultatif) */
  d?: string[];
};

export type Quiz = {
  q: string;
  /** options[0] est toujours la bonne réponse ; elle est mélangée à l'affichage */
  options: string[];
  explain?: string;
};

export type Lesson = {
  id: string;
  n: string;
  title: string;
  cards: Card[];
  terms?: Term[];
  quiz?: Quiz[];
};

export const lessons: Lesson[] = [
  {
    id: "l1",
    n: "Leçons 1–2",
    title: "La Bible, les promesses et l'histoire biblique",
    cards: [
      {
        id: "l1-c1",
        q: "Écrivez quel genre d'entités sont Dieu et le diable.",
        a: [
          "Dieu : Celui qui est, soit auto-existant.",
          "Le diable : Une créature créée, un ange pécheur.",
        ],
      },
      {
        id: "l1-c2",
        q: "Qui a donné à qui la Bible, et pourquoi ?",
        a: [
          "Qui a donné : Dieu.",
          "À qui : Aux pécheurs.",
          "Pourquoi : Pour faire connaître Dieu qui est la vie et le diable qui est la mort.",
        ],
      },
      {
        id: "l1-c3",
        q: "Quel genre de livre est la Bible ? De plus, ① l'Ancien Testament et ② le Nouveau Testament sont des promesses que qui doit garder respectivement ? Écrivez avec les versets correspondants.",
        a: [
          "Genre de livre : Le livre de la promesse entre Dieu et son peuple.",
          "① Ancien Testament : L'Israël physique (Exode 19:5-6).",
          "② Nouveau Testament : Les personnes du temps de l'accomplissement de l'Apocalypse (Lc 22:14-20, Ap 22:18-19).",
        ],
      },
      {
        id: "l1-c4",
        q: "Qui est l'auteur de la Bible ? Combien de personnes ont été utilisées pour écrire la Bible ? Pourquoi Dieu a-t-il donné la Bible ? Combien y a-t-il de livres, de chapitres et de versets dans l'Ancien Testament et dans le Nouveau Testament ?",
        a: [
          "Dieu.",
          "Environ 35-40 personnes (les prophètes et les disciples).",
          "Pour donner le royaume des cieux et la vie éternelle à ceux qui croient.",
          "Ancien Testament : 39 livres, 929 chapitres, 23 144 versets.",
          "Nouveau Testament : 27 livres, 260 chapitres, 7 957 versets.",
        ],
      },
      {
        id: "l1-c5",
        q: "Comment le contenu de la Bible peut-il être classé en quatre catégories ? De plus, écrivez dans quel ordre les prophéties s'accomplissent, avec un verset correspondant.",
        a: [
          "4 catégories : Histoire, instructions, prophéties, accomplissement (accomplissement physique).",
          "Ordre d'accomplissement : Trahison → Destruction → Salut (2 Th 2:1-3).",
        ],
      },
      {
        id: "l1-c6",
        q: "Parmi les promesses que Dieu a faites à Abraham, quand la promesse disant que « les descendants d'Abraham sortiraient de chez les païens » (Gn 15: 13-14) s'est-elle accomplie ? Quand la promesse de Dieu aux prophètes de l'Ancien Testament s'est-elle accomplie ? Quand s'accomplissent toutes les promesses du temps du 1er Avènement de Jésus ? Écrivez avec un verset correspondant à chaque fois.",
        a: [
          "1. Au temps de Moïse / Exode 12",
          "2. Au premier avènement de Jésus / Jn 19: 30",
          "3. Au second Avènement / Ap 12: 6",
        ],
      },
      {
        id: "l1-c7",
        q: "Parmi les prophéties de l'Ancien Testament concernant le premier avènement de Jésus et ce qui s'est accompli lors de son 1er avènement, écrivez cinq passages représentatifs ainsi que les versets correspondants.",
        a: [
          "Naître d'une Vierge : Ésaïe 7:14 → Matthieu 1:18-23",
          "Aller en Égypte : Osée 11:1 → Matthieu 2:13-15",
          "Aller en Galilée et œuvrer : Ésaïe 8:23 – 9:1 → Matthieu 4:13-16",
          "Porter la croix : Psaume 40-41 → Matthieu 27",
          "Prêcher l'évangile du ciel : Ésaïe 61:1 → Luc 4:16-21",
        ],
        table: {
          head: ["Contenu", "Ancien Testament (Prophétie)", "Nouveau Testament (Accomplissement)"],
          rows: [
            ["Naître d'une Vierge", "Ésaïe 7:14", "Matthieu 1:18-23"],
            ["Aller en Égypte", "Osée 11:1", "Matthieu 2:13-15"],
            ["Aller en Galilée et œuvrer", "Ésaïe 8:23 – 9:1", "Matthieu 4:13-16"],
            ["Porter la croix", "Psaume 40-41", "Matthieu 27"],
            ["Prêcher l'évangile du ciel", "Ésaïe 61:1", "Luc 4:16-21"],
          ],
        },
      },
      {
        id: "l1-c8",
        q: "Écrivez ce qu'est la véritable foi au temps où les prophéties s'accomplissent avec un verset en témoignage.",
        a: ["La foi en l'accomplissement physique qui s'est accompli selon les prophéties (Jn 14:29)."],
      },
      {
        id: "l1-c9",
        q: "Des guerres dans le Nouveau et l'Ancien Testament sont des guerres entre qui et qui ? Quelles sont les raisons pour lesquelles Dieu et Satan sont entrés en guerre ?",
        a: [
          "Entre les esprits et les chairs appartenant à Dieu et les esprits et les chairs appartenant à Satan.",
          "Dieu : Pour récupérer toute la création.",
          "Satan : Pour ne pas se faire prendre le village planétaire.",
        ],
      },
      {
        id: "l1-c10",
        q: "Catégoriser l'histoire biblique en 7 périodes par ordre chronologique.",
        a: [
          "Période de la création du monde → Période de l'Exode et de la loi → Période des Juges → Période des rois → Période des prophètes → Période de l'Évangile du ciel → Période de la récréation et de la révélation.",
        ],
      },
    ],
    quiz: [
      {
        q: "Quel genre d'entité est Dieu ?",
        options: [
          "Celui qui est, soit auto-existant.",
          "Une créature créée.",
          "Un ange pécheur.",
          "Le créateur du mal.",
        ],
      },
      {
        q: "Quel genre d'entité est le diable ?",
        options: [
          "Une créature créée, un ange pécheur.",
          "Celui qui est, soit auto-existant.",
          "Un archange fidèle.",
          "Une divinité opposée à Dieu.",
        ],
      },
      {
        q: "Qui a donné la Bible, et à qui ?",
        options: ["Dieu, aux pécheurs.", "Moïse, aux Hébreux.", "Jésus, aux disciples.", "Les prophètes, à Israël."],
      },
      {
        q: "Pourquoi Dieu a-t-il donné la Bible ?",
        options: [
          "Pour faire connaître Dieu qui est la vie et le diable qui est la mort.",
          "Pour raconter l'histoire d'Israël.",
          "Pour fonder une religion.",
          "Pour établir des lois civiles.",
        ],
      },
      {
        q: "Quel genre de livre est la Bible ?",
        options: [
          "Le livre de la promesse entre Dieu et son peuple.",
          "Un livre d'histoire universelle.",
          "Un recueil de lois.",
          "Un traité de sagesse.",
        ],
      },
      {
        q: "L'Ancien Testament est la promesse que qui doit garder ?",
        options: [
          "L'Israël physique (Exode 19:5-6).",
          "L'Israël spirituel (Ap 7).",
          "Toutes les nations de la terre.",
          "Les anges du ciel.",
        ],
      },
      {
        q: "Le Nouveau Testament est la promesse que qui doit garder ?",
        options: [
          "Les personnes du temps de l'accomplissement de l'Apocalypse (Lc 22:14-20, Ap 22:18-19).",
          "L'Israël physique sorti d'Égypte.",
          "Les patriarches.",
          "Les seuls disciples du 1er avènement.",
        ],
      },
      {
        q: "Qui est l'auteur de la Bible ?",
        options: ["Dieu.", "Moïse.", "Les prophètes.", "Les quatre évangélistes."],
      },
      {
        q: "Combien de personnes ont été utilisées pour écrire la Bible ?",
        options: [
          "Environ 35-40 personnes (les prophètes et les disciples).",
          "Environ 12 personnes (les apôtres).",
          "Environ 70 personnes (les anciens).",
          "Environ 150 personnes (les scribes).",
        ],
      },
      {
        q: "Pourquoi Dieu a-t-il donné la Bible ? (but final)",
        options: [
          "Pour donner le royaume des cieux et la vie éternelle à ceux qui croient.",
          "Pour prouver l'existence de Dieu.",
          "Pour expliquer la création du monde.",
          "Pour préserver la culture hébraïque.",
        ],
      },
      {
        q: "Ancien Testament : combien de livres, de chapitres et de versets ?",
        options: [
          "39 livres, 929 chapitres, 23 144 versets.",
          "39 livres, 260 chapitres, 7 957 versets.",
          "27 livres, 929 chapitres, 23 144 versets.",
          "27 livres, 260 chapitres, 7 957 versets.",
        ],
      },
      {
        q: "Nouveau Testament : combien de livres, de chapitres et de versets ?",
        options: [
          "27 livres, 260 chapitres, 7 957 versets.",
          "39 livres, 929 chapitres, 23 144 versets.",
          "27 livres, 929 chapitres, 23 144 versets.",
          "39 livres, 260 chapitres, 7 957 versets.",
        ],
      },
      {
        q: "Quelles sont les quatre catégories du contenu de la Bible ?",
        options: [
          "Histoire, instructions, prophéties, accomplissement (accomplissement physique).",
          "Loi, psaumes, prophètes, évangiles.",
          "Création, chute, rédemption, jugement.",
          "Récits, miracles, paraboles, épîtres.",
        ],
      },
      {
        q: "Dans quel ordre les prophéties s'accomplissent-elles ?",
        options: [
          "Trahison → Destruction → Salut (2 Th 2:1-3).",
          "Salut → Trahison → Destruction.",
          "Destruction → Salut → Trahison.",
          "Création → loi → grâce.",
        ],
      },
      {
        q: "Quand s'est accomplie la promesse : « les descendants d'Abraham sortiraient de chez les païens » (Gn 15: 13-14) ?",
        options: [
          "Au temps de Moïse / Exode 12",
          "Au premier avènement de Jésus / Jn 19: 30",
          "Au second Avènement / Ap 12: 6",
          "Au temps des juges",
        ],
      },
      {
        q: "Quand la promesse de Dieu aux prophètes de l'Ancien Testament s'est-elle accomplie ?",
        options: [
          "Au premier avènement de Jésus / Jn 19: 30",
          "Au temps de Moïse / Exode 12",
          "Au second Avènement / Ap 12: 6",
          "Sous le règne de David",
        ],
      },
      {
        q: "Quand s'accomplissent toutes les promesses du temps du 2nd Avènement ?",
        options: [
          "Au second Avènement / Ap 12: 6",
          "Au premier avènement de Jésus / Jn 19: 30",
          "Au temps de Moïse / Exode 12",
          "À la fin de l'Ancien Testament",
        ],
      },
      {
        q: "Qu'est-ce que la véritable foi au temps où les prophéties s'accomplissent ?",
        options: [
          "La foi en l'accomplissement physique qui s'est accompli selon les prophéties (Jn 14:29).",
          "La foi en la lettre des prophéties.",
          "La foi dans la tradition des anciens.",
          "La foi sans les œuvres.",
        ],
      },
      {
        q: "Les guerres de la Bible sont des guerres entre qui et qui ?",
        options: [
          "Entre les esprits et les chairs appartenant à Dieu et les esprits et les chairs appartenant à Satan.",
          "Entre Israël et les nations voisines uniquement.",
          "Entre les anges eux-mêmes.",
          "Entre les rois d'Israël eux-mêmes.",
        ],
      },
      {
        q: "Pour quelle raison Dieu est-il entré en guerre ?",
        options: [
          "Pour récupérer toute la création.",
          "Pour se venger de Satan.",
          "Pour étendre le territoire d'Israël.",
          "Pour juger les anges déchus.",
        ],
      },
      {
        q: "Pour quelle raison Satan est-il entré en guerre ?",
        options: [
          "Pour ne pas se faire prendre le village planétaire.",
          "Pour détruire toute la création.",
          "Pour régner sur le ciel.",
          "Pour éprouver la foi des anges.",
        ],
      },
      {
        q: "Quelle est la première des 7 périodes de l'histoire biblique ?",
        options: [
          "Période de la création du monde",
          "Période de l'Exode et de la loi",
          "Période des Juges",
          "Période des rois",
        ],
      },
      {
        q: "Quelle est la dernière des 7 périodes de l'histoire biblique ?",
        options: [
          "Période de la récréation et de la révélation",
          "Période de l'Évangile du ciel",
          "Période des prophètes",
          "Période des rois",
        ],
      },
      {
        q: "« Naître d'une Vierge » (Ésaïe 7:14) s'accomplit en…",
        options: ["Matthieu 1:18-23", "Matthieu 2:13-15", "Matthieu 4:13-16", "Luc 4:16-21"],
      },
      {
        q: "« Aller en Égypte » (Osée 11:1) s'accomplit en…",
        options: ["Matthieu 2:13-15", "Matthieu 1:18-23", "Matthieu 27", "Luc 4:16-21"],
      },
      {
        q: "« Aller en Galilée et œuvrer » (Ésaïe 8:23 – 9:1) s'accomplit en…",
        options: ["Matthieu 4:13-16", "Matthieu 2:13-15", "Matthieu 1:18-23", "Matthieu 27"],
      },
      {
        q: "« Porter la croix » (Psaume 40-41) s'accomplit en…",
        options: ["Matthieu 27", "Matthieu 1:18-23", "Luc 4:16-21", "Matthieu 4:13-16"],
      },
      {
        q: "« Prêcher l'évangile du ciel » (Ésaïe 61:1) s'accomplit en…",
        options: ["Luc 4:16-21", "Matthieu 27", "Matthieu 1:18-23", "Matthieu 2:13-15"],
      },
    ],
  },
  {
    id: "l3",
    n: "Leçon 3",
    title: "Les paraboles des secrets du royaume des cieux",
    cards: [
      {
        id: "l3-c1",
        q: "Quelles sont les deux raisons pour lesquelles Jésus a parlé des secrets du royaume des cieux en paraboles au 1er avènement ? Écrivez le résultat de ceux qui ne réalisent pas, avec un verset correspondant. Quand pourra-t-on clairement connaître la véritable signification des paraboles ?",
        a: [
          "Afin d'accomplir la parole de la prophétie de l'Ancien Testament pour cacher à l'ennemi.",
          "Ne peuvent pas recevoir le pardon de leurs péchés et ne sont pas sauvés (Marc 4:10-12).",
          "Lorsque les réalités des paraboles apparaissent (Jn 16:25).",
        ],
      },
    ],
    quiz: [
      {
        q: "Pourquoi Jésus a-t-il parlé des secrets du royaume des cieux en paraboles ?",
        options: [
          "Afin d'accomplir la parole de la prophétie de l'Ancien Testament pour cacher à l'ennemi.",
          "Pour instruire les foules et les divertir.",
          "Pour éviter la persécution romaine.",
          "Pour révéler les secrets à tous et juger les pécheurs.",
        ],
      },
      {
        q: "Quel est le résultat de ceux qui ne réalisent pas ?",
        options: [
          "Ne peuvent pas recevoir le pardon de leurs péchés et ne sont pas sauvés (Marc 4:10-12).",
          "Ils reçoivent le pardon mais pas la vie éternelle.",
          "Ils sont sauvés malgré leur ignorance.",
          "Ils comprendront plus tard par eux-mêmes.",
        ],
      },
      {
        q: "Quand pourra-t-on clairement connaître la véritable signification des paraboles ?",
        options: [
          "Lorsque les réalités des paraboles apparaissent (Jn 16:25).",
          "À la fin de chaque génération.",
          "Quand on lit beaucoup la Bible.",
          "Au jugement dernier uniquement.",
        ],
      },
    ],
  },
  {
    id: "l4",
    n: "Leçon 4",
    title: "La semence, le champ, l'arbre et l'oiseau",
    cards: [
      {
        id: "l4-c1",
        q: "Écrivez la véritable signification de ① « la semence », ② « le champ », ③ « l'arbre », ④ « l'oiseau », ⑤ « la branche », ⑥ « la feuille » et ⑦ « le fruit » en parabole.",
        a: [
          "Semence : Parole",
          "Champ : Cœur de l'homme, monde",
          "Arbre : Homme intérieur né à nouveau de la parole (pasteur)",
          "Oiseau : Esprit",
          "Branche : Disciple",
          "Feuille : Évangéliste",
          "Fruit : Parole, fidèle créé par la parole",
        ],
      },
    ],
    terms: [
      { t: "la semence", m: "Parole" },
      { t: "le champ", m: "Cœur de l'homme, monde" },
      { t: "l'arbre", m: "Homme intérieur né à nouveau de la parole (pasteur)" },
      { t: "l'oiseau", m: "Esprit" },
      { t: "la branche", m: "Disciple" },
      { t: "la feuille", m: "Évangéliste" },
      {
        t: "le fruit",
        m: "Parole, fidèle créé par la parole",
        d: ["Disciple", "Esprit", "Cœur de l'homme, monde"],
      },
    ],
  },
  {
    id: "l5",
    n: "Leçon 5",
    title: "La nourriture et le levain",
    cards: [
      {
        id: "l5-c1",
        q: "Quelle est la véritable signification de ① « la nourriture » et ② « du levain » en parabole, et ③ que signifie « distribuer la nourriture au temps convenable » dans Matthieu 24 ?",
        a: [
          "Nourriture : Parole",
          "Levain : Instruction / Enseignement",
          "Distribuer la nourriture : Témoigner de l'accomplissement physique qui s'est accompli selon les prophéties.",
        ],
      },
    ],
    terms: [
      { t: "la nourriture", m: "Parole" },
      { t: "le levain", m: "Instruction / Enseignement" },
    ],
    quiz: [
      {
        q: "Que signifie « distribuer la nourriture au temps convenable » (Matthieu 24) ?",
        options: [
          "Témoigner de l'accomplissement physique qui s'est accompli selon les prophéties.",
          "Distribuer du pain aux pauvres.",
          "Enseigner la loi de Moïse chaque sabbat.",
          "Prêcher la prospérité matérielle.",
        ],
      },
    ],
  },
  {
    id: "l6",
    n: "Leçon 6",
    title: "Le récipient, la balance et le bâton",
    cards: [
      {
        id: "l6-c1",
        q: "Écrivez la véritable signification ① du récipient, ② de la balance, ③ du bâton et ④ de la verge de fer en parabole.",
        a: [
          "Récipient : Homme, église",
          "Balance : Parole",
          "Bâton : Parole et homme",
          "Verge de fer : Autorité pour régner",
        ],
      },
    ],
    terms: [
      { t: "le récipient", m: "Homme, église" },
      { t: "la balance", m: "Parole" },
      { t: "le bâton", m: "Parole et homme" },
      { t: "la verge de fer", m: "Autorité pour régner" },
    ],
  },
  {
    id: "l7",
    n: "Leçon 7",
    title: "Le feu, l'encensoir et la marmite",
    cards: [
      {
        id: "l7-c1",
        q: "Écrivez la véritable signification ① du feu, ② de l'encensoir, ③ de la fumée d'encens et ④ de la marmite en parabole.",
        a: [
          "Feu : Parole",
          "Encensoir : Homme, personne qui prie",
          "Fumée d'encens : Montée des prières",
          "Marmite : Église",
        ],
      },
    ],
    terms: [
      { t: "le feu", m: "Parole" },
      { t: "l'encensoir", m: "Homme, personne qui prie" },
      { t: "la fumée d'encens", m: "Montée des prières" },
      { t: "la marmite", m: "Église" },
    ],
  },
  {
    id: "l8",
    n: "Leçon 8",
    title: "La lumière, la lampe, l'aveugle, le sourd et l'habit de noces",
    cards: [
      {
        id: "l8-c1",
        q: "Écrivez la véritable signification ① de la lumière et des ténèbres, ② de la lampe (chandelier) et des yeux, ③ de l'aveugle, ④ du sourd et ⑤ du vêtement/habit de noces en parabole.",
        a: [
          "Lumière / Ténèbres : Parole de vie / Ignorance due au fait de ne pas avoir la parole",
          "Lampe (chandelier) et yeux : Esprit et personne de soutien",
          "Aveugle : Celui qui ne réalise pas même s'il lit la parole",
          "Sourd : Celui qui ne réalise pas même s'il entend la parole",
          "Vêtement / habit de noces : Cœur, actions, doctrines / Œuvres justes",
        ],
      },
    ],
    terms: [
      {
        t: "la lumière et les ténèbres",
        m: "Parole de vie / Ignorance due au fait de ne pas avoir la parole",
      },
      {
        t: "la lampe (chandelier) et les yeux",
        m: "Esprit et personne de soutien",
        d: ["Esprit", "Disciple", "Autorité pour régner"],
      },
      { t: "l'aveugle", m: "Celui qui ne réalise pas même s'il lit la parole" },
      {
        t: "le sourd",
        m: "Celui qui ne réalise pas même s'il entend la parole",
        d: ["Celui qui ne réalise pas même s'il lit la parole", "Esprit", "Disciple"],
      },
      {
        t: "le vêtement / l'habit de noces",
        m: "Cœur, actions, doctrines / Œuvres justes",
        d: ["Parole de vie", "Autorité pour régner", "Instruction / Enseignement"],
      },
    ],
  },
  {
    id: "l9",
    n: "Leçon 9",
    title: "Le trésor et le riche",
    cards: [
      {
        id: "l9-c1",
        q: "Écrivez la véritable signification ① du trésor et ② du riche en parabole.",
        a: ["Trésor : Parole", "Riche : Personne qui a beaucoup de parole (connaissance)"],
      },
    ],
    terms: [
      { t: "le trésor", m: "Parole" },
      {
        t: "le riche",
        m: "Personne qui a beaucoup de parole (connaissance)",
        d: ["Homme, église", "Disciple", "Autorité pour régner"],
      },
    ],
  },
  {
    id: "l10",
    n: "Leçon 10",
    title: "L'eau, la source et le fleuve",
    cards: [
      {
        id: "l10-c1",
        q: "La véritable signification ① de l'eau, ② de la source, et ③ du fleuve en parabole.",
        a: [
          "Eau : Parole",
          "Source : Pasteur et temple (église)",
          "Fleuve : Cœur des disciples et des évangélistes",
        ],
      },
    ],
    terms: [
      { t: "l'eau", m: "Parole" },
      { t: "la source", m: "Pasteur et temple (église)" },
      { t: "le fleuve", m: "Cœur des disciples et des évangélistes" },
    ],
  },
  {
    id: "l11",
    n: "Leçon 11",
    title: "La mer, le pêcheur, le filet, le poisson et le bateau",
    cards: [
      {
        id: "l11-c1",
        q: "Écrivez la véritable signification ① de la mer, ② du pêcheur, ③ du filet, ④ du poisson et ⑤ du bateau en parabole.",
        a: [
          "Mer : Monde",
          "Pêcheur : Pasteur / Évangéliste",
          "Filet : Parole",
          "Poisson : Homme",
          "Bateau : Organisation similaire à une église",
        ],
      },
    ],
    terms: [
      { t: "la mer", m: "Monde" },
      { t: "le pêcheur", m: "Pasteur / Évangéliste" },
      { t: "le filet", m: "Parole" },
      { t: "le poisson", m: "Homme" },
      { t: "le bateau", m: "Organisation similaire à une église" },
    ],
  },
  {
    id: "l12",
    n: "Leçon 12",
    title: "La bête, la tête, la corne et la queue",
    cards: [
      {
        id: "l12-c1",
        q: "Écrivez la véritable signification ① de la bête, ② de la tête, ③ de la corne et ④ de la queue en parabole.",
        a: [
          "Bête : Faux pasteur",
          "Tête : Chef (pasteur)",
          "Corne : Figure d'autorité (ancien) qui appartient à la bête et se bat",
          "Queue : Faux prophète",
        ],
      },
    ],
    terms: [
      { t: "la bête", m: "Faux pasteur" },
      { t: "la tête", m: "Chef (pasteur)" },
      { t: "la corne", m: "Figure d'autorité (ancien) qui appartient à la bête et se bat" },
      { t: "la queue", m: "Faux prophète" },
    ],
  },
  {
    id: "l13",
    n: "Leçon 13",
    title: "Le sang et la chair de l'agneau",
    cards: [
      {
        id: "l13-c1",
        q: "Écrivez la véritable signification ① de l'agneau et ② du sang et de la chair de l'agneau en parabole.",
        a: ["Agneau : Jésus", "Sang et chair de l'agneau : Parole de vie de Jésus"],
      },
    ],
    terms: [
      { t: "l'agneau", m: "Jésus" },
      { t: "le sang et la chair de l'agneau", m: "Parole de vie de Jésus" },
    ],
  },
  {
    id: "l14",
    n: "Leçon 14",
    title: "Le vin nouveau, l'outre neuve et l'huile d'olive",
    cards: [
      {
        id: "l14-c1",
        q: "Écrivez la véritable signification ① du vin nouveau, ② de l'outre neuve, et ③ de l'huile d'olive en parabole.",
        a: [
          "Vin nouveau : Nouvelle parole révélée",
          "Outre neuve : Nouveau pasteur et disciples",
          "Huile d'olive : Parole de témoignage du terrain",
        ],
      },
    ],
    terms: [
      { t: "le vin nouveau", m: "Nouvelle parole révélée" },
      { t: "l'outre neuve", m: "Nouveau pasteur et disciples" },
      { t: "l'huile d'olive", m: "Parole de témoignage du terrain" },
    ],
  },
  {
    id: "l15",
    n: "Leçon 15",
    title: "La montagne, la pierre et l'idole",
    cards: [
      {
        id: "l15-c1",
        q: "Quelle est la véritable signification de « la montagne » en parabole ? Combien de types de montagnes y a-t-il dans la Bible et quelles sont-elles ? Écrivez également la véritable signification ③ de la « pierre » et ④ de « l'idole » mentionnées dans les paraboles du royaume des cieux.",
        a: [
          "Montagne : Église, temple",
          "Trois types : Montagne de la trahison, montagne de la destruction, montagne du salut",
          "Pierre : Parole de jugement et le pasteur qui a reçu l'autorité pour juger",
          "Idole : Faux enseignant (Pasteur)",
        ],
      },
    ],
    terms: [
      { t: "la montagne", m: "Église, temple" },
      {
        t: "la pierre",
        m: "Parole de jugement et le pasteur qui a reçu l'autorité pour juger",
      },
      { t: "l'idole", m: "Faux enseignant (Pasteur)" },
    ],
    quiz: [
      {
        q: "Quels sont les trois types de montagnes de la Bible ?",
        options: [
          "Montagne de la trahison, montagne de la destruction, montagne du salut",
          "Montagne de Sion, montagne du Carmel, montagne des Oliviers",
          "Montagne de la loi, montagne de la grâce, montagne du jugement",
          "Montagne de Dieu, montagne de Satan, montagne des anges",
        ],
      },
    ],
  },
  {
    id: "l16",
    n: "Leçon 16",
    title: "Le sceau, la trompette et le cantique",
    cards: [
      {
        id: "l16-c1",
        q: "Écrivez la véritable signification ① du sceau, ② du son de la trompette, ③ du cantique, ④ du cantique de Moïse, ⑤ du cantique de l'Agneau et ⑥ du nouveau cantique en parabole.",
        a: [
          "Sceau : Parole de Dieu",
          "Son de la trompette : Parole qui annonce",
          "Cantique : Parole de sermon",
          "Cantique de Moïse : Parole de l'Ancien Testament",
          "Cantique de l'Agneau : Parole du Nouveau Testament",
          "Nouveau cantique : Parole sur l'accomplissement physique de l'Apocalypse qui s'est accompli",
        ],
      },
    ],
    terms: [
      { t: "le sceau", m: "Parole de Dieu" },
      { t: "le son de la trompette", m: "Parole qui annonce" },
      { t: "le cantique", m: "Parole de sermon" },
      { t: "le cantique de Moïse", m: "Parole de l'Ancien Testament" },
      { t: "le cantique de l'Agneau", m: "Parole du Nouveau Testament" },
      {
        t: "le nouveau cantique",
        m: "Parole sur l'accomplissement physique de l'Apocalypse qui s'est accompli",
        d: [
          "Parole de l'Ancien Testament",
          "Parole du Nouveau Testament",
          "Parole de sermon",
        ],
      },
    ],
  },
  {
    id: "l17",
    n: "Leçon 17",
    title: "Les êtres vivants et le vent",
    cards: [
      {
        id: "l17-c1",
        q: "Écrivez la véritable signification ① des quatre êtres vivants, ② du vent, ③ du vent qui souffle et ④ du vent qui est retenu en parabole.",
        a: [
          "Quatre êtres vivants : Quatre archanges",
          "Vent : Anges et jugement",
          "Vent qui souffle : Jugement à travers les anges",
          "Vent retenu : Suspension du jugement à travers les anges",
        ],
      },
    ],
    terms: [
      { t: "les quatre êtres vivants", m: "Quatre archanges" },
      {
        t: "le vent",
        m: "Anges et jugement",
        d: ["Parole qui annonce", "Cœur de l'homme", "Organisation de la fausse vérité"],
      },
      {
        t: "le vent qui souffle",
        m: "Jugement à travers les anges",
        d: ["Quatre archanges", "Parole de Dieu", "Église, temple"],
      },
      {
        t: "le vent qui est retenu",
        m: "Suspension du jugement à travers les anges",
        d: ["Quatre archanges", "Parole de Dieu", "Faux pasteur"],
      },
    ],
  },
  {
    id: "l18",
    n: "Leçon 18",
    title: "La mort et la résurrection",
    cards: [
      {
        id: "l18-c1",
        q: "Écrivez la véritable signification ① du souffle de la vie, ② de la mort, ③ de la tombe et ④ de la résurrection en parabole.",
        a: [
          "Souffle de vie : Parole de vie",
          "Mort : Être sans parole de vie",
          "Tombe : Organisation de la fausse vérité",
          "Résurrection : Vivre à nouveau grâce à la parole de vie",
        ],
      },
    ],
    terms: [
      { t: "le souffle de la vie", m: "Parole de vie" },
      { t: "la mort", m: "Être sans parole de vie" },
      { t: "la tombe", m: "Organisation de la fausse vérité" },
      { t: "la résurrection", m: "Vivre à nouveau grâce à la parole de vie" },
    ],
  },
  {
    id: "l19",
    n: "Leçon 19",
    title: "L'époux, l'épouse, la veuve et l'orphelin",
    cards: [
      {
        id: "l19-c1",
        q: "Écrivez la véritable signification ① de l'époux, ② de l'épouse, ③ de la veuve et ④ de l'orphelin en parabole.",
        a: [
          "Époux : Esprit",
          "Épouse : Chair",
          "Veuve : Pasteur qui a trahi",
          "Orphelin : Membre appartenant au pasteur qui a trahi",
        ],
      },
    ],
    terms: [
      { t: "l'époux", m: "Esprit" },
      { t: "l'épouse", m: "Chair" },
      {
        t: "la veuve",
        m: "Pasteur qui a trahi",
        d: ["Membre appartenant au pasteur qui a trahi", "Disciple", "Évangéliste"],
      },
      {
        t: "l'orphelin",
        m: "Membre appartenant au pasteur qui a trahi",
        d: ["Pasteur qui a trahi", "Faux prophète", "Homme intérieur né à nouveau de la parole (pasteur)"],
      },
    ],
  },
  {
    id: "l20",
    n: "Leçon 20",
    title: "La guerre entre Jérusalem et Babylone",
    cards: [
      {
        id: "l20-c1",
        q: "Écrivez la véritable signification ① de Jérusalem, ② de Babylone et ③ de la guerre en parabole.",
        a: [
          "Jérusalem : Dénomination du peuple élu",
          "Babylone : Dénomination des démons païens",
          "Guerre : Combat de doctrines",
        ],
      },
    ],
    terms: [
      { t: "Jérusalem", m: "Dénomination du peuple élu" },
      { t: "Babylone", m: "Dénomination des démons païens" },
      { t: "la guerre", m: "Combat de doctrines" },
    ],
  },
  {
    id: "l21",
    n: "Leçon 21",
    title: "Le ciel, la terre, le soleil, la lune et les étoiles",
    cards: [
      {
        id: "l21-c1",
        q: "Écrivez la véritable signification ① du ciel et de la terre, et ② du soleil, de la lune et des étoiles en paraboles.",
        a: [
          "Ciel, terre : Tabernacle du peuple élu, peuple (fidèle)",
          "Soleil, lune, étoile : Pasteur, évangéliste, fidèle",
        ],
      },
      {
        id: "l21-c2",
        q: "Écrivez la véritable signification ① du premier ciel et de la première terre qui sont jugés et disparaissent, et ② du nouveau ciel et de la nouvelle terre qui sont recréés, au temps de l'accomplissement de l'Apocalypse.",
        a: [
          "Le premier ciel et la première terre : Le premier tabernacle et les premiers fidèles",
          "Le nouveau ciel et la nouvelle terre : Le nouveau tabernacle et les nouveaux fidèles",
        ],
      },
    ],
    terms: [
      {
        t: "le ciel et la terre",
        m: "Tabernacle du peuple élu, peuple (fidèle)",
        d: ["Quatre archanges", "Dénomination des démons païens", "Organisation de la fausse vérité"],
      },
      {
        t: "le soleil, la lune et les étoiles",
        m: "Pasteur, évangéliste, fidèle",
        d: ["Quatre archanges", "Tabernacle du peuple élu, peuple (fidèle)", "Combat de doctrines"],
      },
      {
        t: "le premier ciel et la première terre",
        m: "Le premier tabernacle et les premiers fidèles",
        d: ["Le nouveau tabernacle et les nouveaux fidèles", "Anges et jugement"],
      },
      {
        t: "le nouveau ciel et la nouvelle terre",
        m: "Le nouveau tabernacle et les nouveaux fidèles",
        d: ["Le premier tabernacle et les premiers fidèles", "Organisation de la fausse vérité"],
      },
    ],
  },
  {
    id: "l22",
    n: "Leçon 22",
    title: "Les trois types d'Israël",
    cards: [
      {
        id: "l22-c1",
        q: "Écrivez ① ce que signifie « Israël » et ② quels sont les trois types d'Israël.",
        a: [
          "Signification : Le Vainqueur, peuple élu",
          "Trois types : Israël physique, Israël spirituel, nouvel Israël spirituel",
        ],
      },
    ],
    quiz: [
      {
        q: "Que signifie « Israël » ?",
        options: [
          "Le Vainqueur, peuple élu",
          "Le peuple de la loi",
          "La montagne sainte",
          "Le royaume des cieux",
        ],
      },
      {
        q: "Quels sont les trois types d'Israël ?",
        options: [
          "Israël physique, Israël spirituel, nouvel Israël spirituel",
          "Israël du nord, Israël du sud, Israël de Samarie",
          "Israël ancien, Israël nouveau, Israël éternel",
          "Israël des rois, Israël des prophètes, Israël des prêtres",
        ],
      },
    ],
  },
  {
    id: "l23",
    n: "Leçon 23",
    title: "Les trois types de royaume des cieux et la clé",
    cards: [
      {
        id: "l23-c1",
        q: "Quels sont les trois types de royaume des cieux ? Écrivez la véritable signification ② de la clé du royaume des cieux et ③ de la clé de l'enfer.",
        a: [
          "Trois types :",
          "Royaume des cieux du monde spirituel",
          "Royaume des cieux du tabernacle du peuple élu choisi en premier",
          "Les 12 tribus scellées recréées",
          "Clé du royaume des cieux : Sagesse consistant à connaître les secrets du royaume des cieux.",
          "Clé de l'enfer : Sagesse consistant à connaître les secrets de Satan.",
        ],
      },
    ],
    quiz: [
      {
        q: "Quels sont les trois types de royaume des cieux ?",
        options: [
          "Royaume des cieux du monde spirituel / Royaume des cieux du tabernacle du peuple élu choisi en premier / Les 12 tribus scellées recréées",
          "Le ciel de la création, le ciel de la loi, le ciel de la grâce",
          "Le royaume d'Israël, le royaume de Juda, le royaume des nations",
          "Le paradis, le purgatoire, le royaume de Satan",
        ],
      },
      {
        q: "Que signifie la clé du royaume des cieux ?",
        options: [
          "Sagesse consistant à connaître les secrets du royaume des cieux.",
          "L'autorité pour chasser les démons.",
          "La connaissance des secrets de Satan.",
          "Le pouvoir de lier et de délier les péchés.",
        ],
      },
      {
        q: "Que signifie la clé de l'enfer ?",
        options: [
          "Sagesse consistant à connaître les secrets de Satan.",
          "Sagesse consistant à connaître les secrets du royaume des cieux.",
          "L'autorité pour régner sur les nations.",
          "La connaissance de la loi de Moïse.",
        ],
      },
    ],
  },
];

export const allCards: Card[] = lessons.flatMap((l) => l.cards);
export const totalCards = allCards.length;
