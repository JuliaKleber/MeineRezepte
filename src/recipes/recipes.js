const recipes = [
  {
    name: "Nudeln mit Schwarzkohl",
    numberOfPersons: 1,
    amounts: ["1 Bund", "250 g", "1 ", "2", "1 Pk", "", "", ""],
    ingredients: [
      "Schwarzkohl",
      "Bandnudeln",
      "Knoblauchzehe",
      "Möhren",
      "Pecorino",
      "Thymian",
      "Salz",
      "Pfeffer",
    ],
    description:
      "Schwarzkohl in Streifen schneiden und blanchieren. Nudeln in Salzwasser kochen. Kochwasser aufheben.\n\nKnoblauch und Möhren klein schneiden und mit Schwarzkohl anbraten. Nudelwasser und Pecorino dazu geben. Erhitzen bis die richtige Konsistenz erreicht ist. Würzen.",
    keywords: [
      "Schwarzkohl",
      "Knoblauchzehe",
      "Möhren",
      "Pecorino",
      "Thymian",
      "Salz",
      "Pfeffer",
      "vegetarisch",
      "mittel",
      "Juli",
      "August",
      "Dezember",
      "November",
      "Oktober",
      "September",
      "Sommer",
      "Herbst",
      "italienisch",
      "Nudeln",
    ],
    imageUploaded: false,
  },
  {
    name: "Lasagne",
    numberOfPersons: "4",
    amounts: [
      "",
      "1",
      "2",
      "500 g",
      "",
      "2 Dosen",
      "2",
      "250 g",
      "50 g",
      "50 g",
      "0,5 l",
      "",
      "",
      "",
      "",
      "1 Pk",
      "1 Pk",
    ],
    ingredients: [
      "Olivenöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Hackfleisch",
      "Rotwein",
      "Tomaten",
      "Möhren",
      "Champignons",
      "Butter",
      "Mehl",
      "Milch",
      "Salz",
      "schwarzer Pfeffer",
      "Muskat",
      "Kräuter der Provence",
      "Parmesan",
      "Mozarella",
    ],
    description:
      "Schichtung: Erst Béchamelsoße, dann Lasagneplatten. Zum Schluss Lasagneplatten, Béchamelsoße, Parmesan.\n\n40 Minuten in den Ofen. Nach 20 Minuten den Mozarella drüber streuen.\n\nVarianten:\n- Zucchini statt Hackfleisch\n- Tunfisch und Champignons\n- vorgekochte Nudeln statt Lasagneplatten",
    keywords: [
      "Olivenöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Hackfleisch",
      "Rotwein",
      "Dosentomaten",
      "Möhren",
      "Champignons",
      "Butter",
      "Mehl",
      "Milch",
      "Salz",
      "schwarzer Pfeffer",
      "Muskat",
      "Kräuter der Provence",
      "Parmesan",
      "Mozarella",
      "vegetarisch",
      "aufwändig",
      "Winter",
      "Januar",
      "Juli",
      "August",
      "Februar",
      "März",
      "September",
      "Oktober",
      "April",
      "Mai",
      "November",
      "Dezember",
      "Juni",
      "Lasagne",
      "Nudeln",
      "italienisch",
    ],
    imageUploaded: false,
  },
  {
    name: "Spaghetti mit Rahmspinat",
    numberOfPersons: 1,
    amounts: ["125 g", "1 Pk", "", "", ""],
    ingredients: [
      "Spaghetti",
      "Rahmspinat",
      "Muskat",
      "schwarzer Pfeffer",
      "Salz",
    ],
    description:
      "Nudeln in Salzwasser kochen.\n\nRahmspinat auftauen und würzen.",
    keywords: [
      "Spaghetti",
      "Rahmspinat",
      "Muskat",
      "schwarzer Pfeffer",
      "Salz",
      "Spaghetti mit Rahmspinat",
      "schnell",
      "vegetarisch",
      "Frühling",
      "Winter",
      "Dezember",
      "Juli",
      "Februar",
      "Januar",
      "Juni",
      "November",
      "August",
      "März",
      "April",
      "September",
      "Oktober",
      "Mai",
      "deutsch",
      "Nudeln",
    ],
    imageUploaded: false,
  },
  {
    name: "Spinat-Feta-Nudeln",
    numberOfPersons: "2",
    amounts: ["250 g", "", "1", "1", "", "1 Pk", "", "", "event.", "event."],
    ingredients: [
      "Spaghetti",
      "Olivenöl",
      "Zwiebel",
      "Knoblauchzehe",
      "Blattspinat",
      "Feta",
      "Salz",
      "Pfeffer",
      "Muskat",
      "Chili",
    ],
    description:
      "Nudeln in Salzwasser kochen.\n\nZwiebel und Knoblauch anbraten. Spinat anbraten. Restliche Zutaten hinzugeben.",
    keywords: [
      "Spaghetti",
      "vegetarisch",
      "schnell",
      "Winter",
      "Herbst",
      "Sommer",
      "Frühling",
      "Januar",
      "Mai",
      "September",
      "Oktober",
      "Juni",
      "Februar",
      "März",
      "Juli",
      "November",
      "Dezember",
      "April",
      "August",
      "deutsch",
      "italienisch",
      "Nudeln",
      "Olivenöl",
      "Zwiebel",
      "Knoblauchzehe",
      "Blattspinat",
      "Pfeffer",
      "Muskat",
      "Chili",
      "Feta",
    ],
    imageUploaded: false,
  },
  {
    name: "Bandnudeln mit Zucchini und Safran",
    numberOfPersons: 1,
    amounts: ["125 g", "", "0,5 Döschen", "1", "", "", "", "", ""],
    ingredients: [
      "Bandnudeln",
      "Olivenöl",
      "Safran",
      "Zucchini",
      "Salz",
      "Pfeffer",
      "Thymian",
      "Basilikum",
      "Pinienkerne",
    ],
    description:
      "Nudeln kochen, Zucchini längs raspeln und eine Minute vor Ende der Garzeit zu den Nudeln geben. Etwas Nudelwasser aufbewahren.\n\nOlivenöl in einer Pfanne erhitzen, Safran darin lösen und Knoblauch anbraten. Nudelwasser dazu geben. Nudeln und Zucchini dazu geben. Mit Salz, Pfeffer und Thymian würzen. Geröstete Pinienkerne und frischen Basilikum dazu geben.",
    keywords: [
      "Bandnudeln",
      "Oktober",
      "Olivenöl",
      "Safran",
      "vegan",
      "vegetarisch",
      "mittel",
      "Sommer",
      "Juni",
      "Juli",
      "August",
      "September",
      "italienisch",
      "Nudeln",
      "Zucchini",
      "Salz",
      "Pfeffer",
      "Thymian",
      "Basilikum",
      "Pinienkerne",
    ],
    imageUploaded: false,
  },
  {
    name: "Nudeln mit Tomaten-Oliven-Sauce",
    numberOfPersons: "2",
    amounts: ["250 g", "", "1", "1", "2", "8", "1 Glas", "", "", ""],
    ingredients: [
      "Spaghetti",
      "Olivenöl",
      "Zwiebel",
      "Knoblauchzehe",
      "Möhre",
      "Tomaten",
      "Oliven",
      "Kräuter der Provence",
      "Salz",
      "schwarzer Pfeffer",
    ],
    description:
      "Nudeln in Salzwasser kochen.\n\nZwiebeln, Knoblauch und Möhren anbraten.\n\nVier Fleischtomaten oder 0,5 Dosen Tomaten pro Person dazu geben.\n\nOliven und Gewürze unterrühren.",
    keywords: [
      "Spaghetti",
      "Olivenöl",
      "Tomaten",
      "Oliven",
      "Kräuter der Provence",
      "Salz",
      "schwarzer Pfeffer",
      "Nudeln mit Tomaten-Oliven-Sauce",
      "vegan",
      "vegetarisch",
      "schnell",
      "Frühling",
      "Sommer",
      "Herbst",
      "Winter",
      "Januar",
      "Juni",
      "November",
      "Dezember",
      "Juli",
      "Februar",
      "März",
      "August",
      "September",
      "April",
      "Mai",
      "Oktober",
      "italienisch",
      "Nudeln",
      "Zwiebel",
      "Knoblauchzehe",
      "Möhre",
    ],
    imageUploaded: false,
  },
  {
    name: "Spaghetti Aglio e Olio",
    numberOfPersons: 1,
    amounts: ["150 g", "", "0,5", "0,5", "", ""],
    ingredients: [
      "Spaghetti",
      "Olivenöl",
      "Knoblauchzehen",
      "Chilischoten",
      "Salz",
      "Petersilie",
    ],
    description:
      "Nudeln in Salzwasser kochen. Knoblauch und Chili anbraten. Petersilie hacken. Alles vermengen.\n\nDazu passt Salat.",
    keywords: [
      "Spaghetti",
      "Olivenöl",
      "Knoblauchzehen",
      "Chilischoten",
      "Salz",
      "Petersilie",
      "Spaghetti Aglio e Olio",
      "vegan",
      "vegetarisch",
      "schnell",
      "Sommer",
      "Herbst",
      "Mai",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "italienisch",
      "Nudeln",
    ],
    imageUploaded: false,
  },
  {
    name: "Spaghetti Bolognese (vegan)",
    numberOfPersons: "2",
    amounts: ["250 g", "1 Pk", "", "1", "1", "2", "", "8", "6", "", "", "", ""],
    ingredients: [
      "Spaghetti",
      "Tofu",
      "Olivenöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Möhren",
      "Rotwein",
      "Tomaten",
      "Champignons",
      "gerösteter Sesam",
      "Salz",
      "schwarzer Pfeffer",
      "Kräuter der Provence",
    ],
    description:
      "Flüssigkeit aus Tofu herauspressen und dann lange in Olivenöl anrösten.\n\nDanach erst Zwiebeln, Knoblauch und Möhren hinzufügen und anbraten.\n\nMit Rotwein ablöschen und die Tomaten hinzufügen.\n\nDie Sesamsamen anrösten und zum Schluss hinzugeben. Würzen.",
    keywords: [
      "Spaghetti",
      "Tofu",
      "Olivenöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Möhren",
      "Rotwein",
      "Tomaten",
      "Salz",
      "schwarzer Pfeffer",
      "Spaghetti Bolognese (vegan)",
      "vegan",
      "vegetarisch",
      "schnell",
      "Frühling",
      "Sommer",
      "Winter",
      "Januar",
      "Juni",
      "Februar",
      "Juli",
      "März",
      "August",
      "April",
      "September",
      "Mai",
      "Oktober",
      "November",
      "Dezember",
      "italienisch",
      "Nudeln",
      "Champignons",
      "gerösteter Sesam",
    ],
    imageUploaded: false,
  },
  {
    name: "Brokkoli-Nudelpfanne",
    numberOfPersons: "2",
    amounts: ["250 g", "", "1", "1 Kopf", "event.", "event.", "1 Pk", "", ""],
    ingredients: [
      "Fusilli",
      "Olivenöl",
      "Knoblauchzehe",
      "Brokkoli",
      "getrocknete Tomaten",
      "Champignons",
      "Fetakäse",
      "Salz",
      "Pfeffer",
    ],
    description:
      "Nudeln und Brokkoliröschen in Salzwasser kochen.\n\nKnoblauch anbraten. Nudeln, Brokkoli und Feta dazugeben. Würzen.",
    keywords: [
      "Fusilli",
      "vegetarisch",
      "schnell",
      "Mai",
      "August",
      "Oktober",
      "Juli",
      "September",
      "Juni",
      "Sommer",
      "Herbst",
      "deutsch",
      "italienisch",
      "Nudeln",
      "Olivenöl",
      "Knoblauchzehe",
      "Salz",
      "Pfeffer",
      "getrocknete Tomaten",
      "Brokkoli",
    ],
    imageUploaded: false,
  },
  {
    name: "Nudeln mit Avocado",
    numberOfPersons: 1,
    amounts: ["125 g", "", "", "0,5", "1", "0,5 Pk", "", ""],
    ingredients: [
      "Nudeln",
      "Pinienkerne",
      "Olivenöl",
      "Knoblauchzehen",
      "Avocado",
      "Mozarella",
      "Salz",
      "schwarzer Pfeffer",
    ],
    description:
      "Nudeln in Salzwasser kochen.\n\nPinienkerne rösten.\n\nAvocado und Knoblauch klein schneiden. Knoblauch anbraten. Alles in die Pfanne geben.",
    keywords: [
      "Nudeln",
      "Avocado",
      "Mozarella",
      "Pinienkerne",
      "Knoblauchzehen",
      "Salz",
      "schwarzer Pfeffer",
      "Nudeln mit Avocado",
      "vegetarisch",
      "schnell",
      "Herbst",
      "September",
      "Oktober",
      "November",
      "Dezember",
      "alle",
      "April",
      "Mai",
      "März",
      "Februar",
      "Januar",
      "italienisch",
      "Nudeln",
    ],
    imageUploaded: false,
  },
  {
    name: "Spaghetti mit Suppengrün-Tomatensoße",
    numberOfPersons: 4,
    amounts: [
      "500 g",
      "1",
      "1",
      "1 Pk",
      "2 Dosen",
      "1 Pk",
      "event.",
      "",
      "",
      "",
      "1",
      "event.",
    ],
    ingredients: [
      "Spaghetti",
      "Zwiebeln",
      "Knoblauchzehen",
      "Suppengrün",
      "Tomaten",
      "Mozarella",
      "Parmesan",
      "Rotwein",
      "schwarzer Pfeffer",
      "Salz",
      "Lorberrblatt",
      "Kräuter der Provence",
    ],
    description:
      "Zwiebel, Knoblauch und Gemüse kleinschneiden und anbraten.\n\nMit Rotwein ablöschen.\n\nTomaten und Lorbeerblatt hinzugeben.\n\nZum Schluss würzen und Käse hinzugeben.",
    keywords: [
      "Spaghetti",
      "Zwiebeln",
      "Knoblauchzehen",
      "Suppengrün",
      "Dosentomaten",
      "Mozarella",
      "Parmesan",
      "Rotwein",
      "schwarzer Pfeffer",
      "Salz",
      "Januar",
      "Februar",
      "März",
      "April",
      "Mai",
      "November",
      "Dezember",
      "Winter",
      "Frühling",
      "mittel",
      "vegetarisch",
      "italienisch",
      "deutsch",
      "Nudeln",
      "Lorberrblatt",
    ],
    imageUploaded: false,
  },
  {
    name: "Spaghetti mit Pistazienpesto",
    numberOfPersons: "4",
    amounts: ["500 g", "", "1 Packung"],
    ingredients: ["Spaghetti", "Olivenöl", "Pistazien", "Pfeffer", "Salz"],
    description:
      "Spaghetti in Salzwasser kochen. Etwas von dem Kochwasser aufbewahren.\n\nPistazien zermörsern und mit Nudelwasser, Olivenöl, Salz und Pfeffer verrühren.",
    keywords: [
      "Spaghetti",
      "Olivenöl",
      "schwarzer Pfeffer",
      "Salz",
      "Pistazien",
      "vegan",
      "vegetarisch",
      "mittel",
      "Winter",
      "Januar",
      "Mai",
      "September",
      "Oktober",
      "Juni",
      "Februar",
      "Frühling",
      "März",
      "Juli",
      "November",
      "Dezember",
      "August",
      "April",
      "italienisch",
      "Pesto",
      "Nudeln",
    ],
    imageUploaded: false,
  },
  {
    name: "Spaghetti mit Grünkohlpesto",
    numberOfPersons: "2",
    amounts: ["250 g", "", "1", "", "", "", ""],
    ingredients: [
      "Spaghetti",
      "Olivenöl",
      "Knoblauchzehen",
      "Grünkohl",
      "Sonnenblumenkerne",
      "Salz",
      "schwarzer Pfeffer",
    ],
    description:
      "Grünkohl in Salzwasser kochen. Spaghetti in Salzwasser kochen. Grünkohl mit Knoblauch, gerösteten Sonnenblumenkernen und Nudelwasser pürieren. Mit Olivenöl und Pfeffer vermengen.",
    keywords: [
      "Spaghetti",
      "Olivenöl",
      "Knoblauchzehen",
      "Grünkohl",
      "Sonnenblumenkerne",
      "Salz",
      "schwarzer Pfeffer",
      "Pesto",
      "November",
      "Dezember",
      "Januar",
      "Februar",
      "März",
      "Nudeln",
      "deutsch",
      "italienisch",
      "Herbst",
      "Winter",
      "vegan",
      "mittel",
    ],
    imageUploaded: false,
  },
  {
    name: "Nudel-Fenchel-Gratin",
    numberOfPersons: "2",
    amounts: ["250 g", null, "1", "1", "1", null, "2 EL", null, "0,5 Pk", ""],
    ingredients: [
      "Fusilli",
      "Olivenöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Fenchel",
      "Butter",
      "Mehl",
      "Milch",
      "Parmesan",
      "Salz",
      "schwarzer Pfeffer",
      "Muskat",
      "Weißwein",
      "Fenchelsamen",
    ],
    description:
      "Gemüse anbraten, Bechamelsauce zubereiten, Nudeln kochen. In Auflaufform, mit Parmesan bestreuen. 20 Minuten bei 180 °C in den Ofen.",
    keywords: [
      "Fusilli",
      "Olivenöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Fenchel",
      "Butter",
      "Mehl",
      "Milch",
      "Parmesan",
      "Salz",
      "schwarzer Pfeffer",
      "Muskat",
      "Weißwein",
      "vegetarisch",
      "mittel",
      "Herbst",
      "Juni",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "italienisch",
      "Nudeln",
    ],
    imageUploaded: false,
  },
  {
    name: "Paprikareis",
    numberOfPersons: "4",
    amounts: [
      null,
      "1",
      "1",
      "3",
      "1",
      "2",
      "1 Handvoll",
      "500 g",
      "1 Dose",
      "1 Dose",
      "1 Glas",
      "1 Pk",
      "1 Becher",
      "",
      "",
      "",
    ],
    ingredients: [
      "Olivenöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Paprika",
      "frische Chilischoten",
      "Möhren",
      "Champignons",
      "(Dinkel)Reis",
      "Tomaten",
      "Kidneybohnen",
      "Oliven",
      "Feta",
      "Schmand",
      "Salz",
      "Pfeffer",
      "Kräuter der Provence",
    ],
    description:
      "Gemüse anbraten.\nDosentomaten, Kidneybohnen, Reis und Salz dazu geben.\nKurz vor Schluss Oliven dazu geben.\nZum Schluss Fetakäse dazu geben und würzen.",
    keywords: [
      "Olivenöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Paprika",
      "frische Chilischoten",
      "Möhren",
      "Champignons",
      "Reis",
      "Tomaten",
      "Kidneybohnen",
      "Oliven",
      "Feta",
      "Schmand",
      "Juli",
      "Oktober",
      "August",
      "September",
      "Sommer",
      "Herbst",
      "mittel",
      "vegetarisch",
    ],
    imageUploaded: false,
  },
  {
    name: "Spaghetti mit Tomatenpesto",
    numberOfPersons: "2",
    amounts: ["250 g", "0.5 Pk", "", "1", "", "1 Bund", "", ""],
    ingredients: [
      "Spaghetti",
      "Pinienkerne",
      "Olivenöl",
      "Knoblauchzehen",
      "getrocknete Tomaten",
      "Basilikum",
      "Salz",
      "schwarzer Pfeffer",
    ],
    description:
      "Spaghetti in Salzwasser kochen. Etwas Kochwasser aufbewahren.\n\nPinienkerne anrösten.\n\nKnoblauch anbraten.\n\nPinienkerne, Knoblauch, getrocknete Tomaten und Basilikum pürieren.\n\nMit Nudelwasser, Olivenöl, Salz und Pfeffer vermengen.",
    keywords: [
      "Spaghetti",
      "Pinienkerne",
      "Olivenöl",
      "Knoblauchzehen",
      "getrocknete Tomaten",
      "Salz",
      "schwarzer Pfeffer",
      "vegan",
      "schnell",
      "Frühling",
      "Winter",
      "Januar",
      "Juli",
      "August",
      "Februar",
      "März",
      "September",
      "Oktober",
      "April",
      "Mai",
      "November",
      "Dezember",
      "Juni",
      "italienisch",
      "Nudeln",
      "Pesto",
    ],
    imageUploaded: false,
  },
  {
    name: "Spaghetti mit Olivenpesto",
    numberOfPersons: 1,
    amounts: ["500 g", "1 Pk", null, "1", "1 Glas", "", ""],
    ingredients: [
      "Spaghetti",
      "Pinienkerne",
      "Olivenöl",
      "Knoblauchzehen",
      "Oliven",
      "Salz",
      "Pfeffer",
    ],
    description:
      "Spaghetti in Salzwasser kochen. Etwas Kochwasser aufbewahren.\n\nPinienkerne anrösten.\n\nKnoblauch anbraten.\n\nPinienkerne, Knoblauch und Oliven pürieren. Mit Nudelwasser, Olivenöl, Salz und Pfeffer vermengen.",
    keywords: [
      "Spaghetti",
      "Pinienkerne",
      "Olivenöl",
      "Knoblauchzehen",
      "Oliven",
      "vegan",
      "schnell",
      "Frühling",
      "Winter",
      "Januar",
      "Juli",
      "August",
      "Februar",
      "März",
      "September",
      "Oktober",
      "April",
      "Mai",
      "November",
      "Dezember",
      "Juni",
      "italienisch",
      "Pesto",
      "Nudeln",
    ],
    imageUploaded: false,
  },
  {
    name: "rotes Thaicurry",
    numberOfPersons: 1,
    amounts: [
      "",
      "1",
      "1",
      "1",
      "1 Glas",
      "2 Teelöffel",
      "1 Teelöffel",
      "1 Pk",
      "2 Dosen",
      "",
      "1",
      "2",
      "1 Handvoll",
      "1",
      "1",
      "1",
    ],
    ingredients: [
      "Kokosöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Aubergine",
      "Dinkelreis",
      "rote Currypaste",
      "Erdnussmus",
      "Tofu",
      "Kokosmilch",
      "Salz",
      "Süßkartoffeln",
      "Möhren",
      "Champignons",
      "Paprika",
      "Zucchini",
      "frische Chilischoten",
    ],
    description:
      "Dinkelreis eine Stunde vorher einweichen.\n\nZwiebel, Knoblauch und Aubergine in Kokosöl anbraten.\n\nCurrypaste und Erdnussmus hinzugeben.\n\nTofu, Dinkelreis, Kokosmilch und Salz dazugeben.\n\nSüßkartoffeln, Möhren, Champignons, Paprika, Zucchini und Chili dazu geben.",
    keywords: [
      "Kokosöl",
      "Zwiebeln",
      "Knoblauchzehen",
      "Aubergine",
      "Dinkelreis",
      "rote Currypaste",
      "Kokosmilch",
      "Salz",
      "Süßkartoffeln",
      "Möhren",
      "Champignons",
      "Paprika",
      "Zucchini",
      "frische Chilischoten",
      "vegan",
      "mittel",
      "aufwändig",
      "Juli",
      "August",
      "September",
      "Oktober",
      "Sommer",
      "Herbst",
      "asiatisch",
      "Curry",
      "Reis",
    ],
    imageUploaded: false,
  },
  {
    name: "Fussili mit Möhren und Fenchel",
    numberOfPersons: 1,
    amounts: ["250 g", null, "1", "1", "2", "1 Handvoll", "", "", ""],
    ingredients: [
      "Fusilli",
      "Olivenöl",
      "Knoblauchzehen",
      "Fenchel",
      "Möhren",
      "Erdnüsse",
      "Gouda",
      "Salz",
      "Pfeffer",
    ],
    description:
      "Nudeln in Salzwasser kochen.\n\nGemüse klein schneiden und anbraten.\n\nErdnüsse und Gouda dazu geben, würzen.",
    keywords: [
      "Fussili",
      "Olivenöl",
      "Knoblauchzehen",
      "Fenchel",
      "Möhren",
      "Erdnüsse",
      "Gouda",
      "vegetarisch",
      "mittel",
      "Juli",
      "August",
      "September",
      "Oktober",
      "November",
      "Juni",
      "Nudeln",
    ],
    imageUploaded: false,
  },
  {
    name: "Käsespätzle",
    numberOfPersons: 1,
    amounts: [null, "1", null, "2 Pk", "1 Pk", "", "", ""],
    ingredients: [
      "Rapsöl",
      "Zwiebeln",
      "Milch",
      "Spätzle",
      "Emmentaler",
      "Blauschimmelkäse",
      "schwarzer Pfeffer",
      "Salz",
    ],
    description:
      "Zwiebeln anbraten.\n\nEtwas Milch dazu geben und eindicken lassen.\n\nDie Spätzle dazu geben und langsam den Emmentaler einrühren. Würzen.\n\nDazu passen Rotkohl, Champignons (mit Zwiebeln und Sahne gebraten) oder Salat.",
    keywords: [
      "Rapsöl",
      "Zwiebeln",
      "Milch",
      "Spätzle",
      "Emmentaler",
      "Blauschimmelkäse",
      "schwarzer Pfeffer",
      "Salz",
      "vegetarisch",
      "schnell",
      "Frühling",
      "Winter",
      "Januar",
      "Juli",
      "August",
      "Februar",
      "März",
      "September",
      "April",
      "Oktober",
      "November",
      "Mai",
      "Juni",
      "Dezember",
      "deutsch",
      "Nudeln",
    ],
    imageUploaded: false,
  },
  {
    name: "Ofenkartoffeln",
    numberOfPersons: 1,
    amounts: ["300 g", "150 g", "1", "", "", "", "", "0,5 Pk"],
    ingredients: [
      "Kartoffeln",
      "Champignons",
      "Paprika",
      "Olivenöl",
      "Rosmarin",
      "Salz",
      "schwarzer Pfeffer",
      "Quark",
    ],
    description:
      "Kartoffeln in Schnitze schneiden. Auf Backblech legen und mit Pfeffer-Salz-Olivenöl-Mischung bestreichen.\n\nPaprika in Streifen schneiden, Pilze vierteln und dazu legen. Einen Zweig Rosmarin dazugeben.\n\nBei 200 °C in den Ofen.\n\nDazu passen Kräuterquark, Mayo, Remoulade oder Aioli.\n\nBlauschimmelkäse passt auch hervorragend.",
    keywords: [
      "Kartoffeln",
      "Champignons",
      "Paprika",
      "Olivenöl",
      "Rosmarin",
      "Salz",
      "schwarzer Pfeffer",
      "Quark",
      "Ofenkartoffeln",
      "vegan",
      "vegetarisch",
      "schnell",
      "Sommer",
      "Juli",
      "August",
      "September",
      "Oktober",
      "deutsch",
      "Sonstiges",
    ],
    imageUploaded: false,
  },
];

export default recipes;
