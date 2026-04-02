export interface Service {
  id: string
  nom: string
  description: string
  details: string[]
}

export interface Categorie {
  id: string
  titre: string
  description: string
  icon: string
  couleur: string
  image: string
  services: Service[]
}

export const categories: Categorie[] = [
  {
    id: 'construction-bennes',
    titre: 'Construction de Bennes',
    description: 'Fabrication sur mesure de bennes et carrosseries industrielles pour tous types de véhicules lourds.',
    icon: '🚛',
    couleur: 'from-blue-600 to-blue-800',
    image: '/images/services/bennes.svg',
    services: [
      {
        id: 'bennes-plateaux-fourgons',
        nom: 'Bennes plateaux et fourgons',
        description: 'Construction de bennes plateaux et fourgons pour le transport de marchandises diverses.',
        details: ['Plateaux fixes et basculants toutes dimensions', 'Fourgons tôlés et bâchés', 'Adaptation sur tous types de châssis', 'Fabrication sur mesure selon vos besoins', 'Traitement anti-corrosion et peinture industrielle'],
      },
      {
        id: 'type-conteneur',
        nom: 'Type conteneur',
        description: 'Fabrication de bennes type conteneur pour le transport et le stockage.',
        details: ['Conteneurs standards et sur mesure', 'Portes arrière et latérales', 'Système de verrouillage sécurisé', 'Compatibilité avec systèmes de levage', 'Différentes capacités disponibles'],
      },
      {
        id: 'transports-speciaux',
        nom: 'Transports spéciaux',
        description: 'Construction de bennes pour transports spéciaux et charges exceptionnelles.',
        details: ['Conception pour charges hors gabarit', 'Renforts structurels spécifiques', "Systèmes d'arrimage adaptés", 'Conformité aux normes de transport spécial', 'Étude technique personnalisée'],
      },
      {
        id: 'bennes-ordures',
        nom: 'Bennes à ordures basculantes et sur skid',
        description: 'Construction de bennes à ordures ménagères basculantes et sur skid pour la collecte des déchets.',
        details: ['Bennes basculantes hydrauliques', 'Bennes sur skid amovibles', 'Système de compactage intégré', 'Mécanisme de vidage automatique', 'Traitement anti-odeur et anti-corrosion'],
      },
    ],
  },
  {
    id: 'vehicules-speciaux',
    titre: 'Véhicules Spéciaux',
    description: 'Construction et équipement de véhicules spéciaux pour des usages professionnels spécifiques.',
    icon: '🚒',
    couleur: 'from-orange-500 to-red-700',
    image: '/images/services/vehicules.svg',
    services: [
      {
        id: 'camions-nacelle',
        nom: 'Camions nacelle pour éclairage public',
        description: "Construction de camions nacelle élévatrices pour l'éclairage public et l'entretien général.",
        details: ['Nacelles élévatrices hydrauliques', 'Hauteur de travail jusqu\'à 20m', 'Plateau de travail sécurisé', 'Commandes depuis la nacelle et au sol', 'Stabilisateurs et systèmes de sécurité'],
      },
      {
        id: 'camions-depannage',
        nom: 'Camions dépannages',
        description: 'Construction de camions de dépannage avec plateforme fixe et basculante.',
        details: ['Plateau fixe et basculant hydraulique', 'Treuil de récupération haute capacité', 'Équipements de remorquage complets', 'Éclairage de signalisation', 'Coffres de rangement outillage'],
      },
      {
        id: 'camions-publicitaires',
        nom: 'Camions publicitaires',
        description: 'Transformation et construction de camions publicitaires pour communication mobile.',
        details: ['Habillage publicitaire personnalisé', 'Écrans LED intégrés', "Systèmes d'éclairage LED", 'Sono et diffusion sonore', 'Conception graphique sur demande'],
      },
      {
        id: 'camions-transpalettes',
        nom: 'Camions transpalettes',
        description: 'Aménagement de camions transpalettes pour la manutention et la logistique.',
        details: ['Hayon élévateur intégré', 'Rails de guidage palettes', 'Plancher renforcé anti-dérapant', 'Portes latérales et arrière adaptées', 'Capacité de charge sur mesure'],
      },
      {
        id: 'camions-marichi',
        nom: 'Camions Marichi en bâche coulissante',
        description: 'Construction de camions avec système de bâche coulissante Marichi pour chargement latéral.',
        details: ['Bâche coulissante sur rails', 'Ouverture latérale totale', 'Chargement par chariot élévateur facilité', 'Ridelles escamotables', 'Système de tension automatique'],
      },
      {
        id: 'transport-boissons',
        nom: 'Transport des boissons',
        description: 'Aménagement spécifique de véhicules pour le transport de boissons et liquides alimentaires.',
        details: ['Casiers et compartiments adaptés', 'Isolation thermique optionnelle', 'Systèmes de fixation bouteilles/fûts', 'Plancher anti-dérapant facile à nettoyer', 'Conformité normes alimentaires'],
      },
    ],
  },
  {
    id: 'transformation-amenagement',
    titre: 'Transformation & Aménagement',
    description: 'Transformation complète de véhicules lourds selon vos besoins spécifiques.',
    icon: '🚌',
    couleur: 'from-green-600 to-green-800',
    image: '/images/services/transformation.svg',
    services: [
      {
        id: 'transformation-bus',
        nom: 'Transformation en bus et mini-bus',
        description: 'Transformation de camions en bus, mini-bus et véhicules de transport prolongé.',
        details: ['Transformation complète châssis camion en bus', 'Mini-bus toutes capacités', 'Transport prolongé grande capacité', 'Aménagement intérieur personnalisé', 'Conformité normes transport de personnes'],
      },
      {
        id: 'amenagement-vehicules',
        nom: 'Aménagement de tous véhicules lourds',
        description: 'Aménagement et transformation de tous types de véhicules lourds selon cahier des charges.',
        details: ['Étude technique et conception 3D', 'Modification structure et carrosserie', 'Installation équipements spécifiques', 'Conformité réglementaire', 'Garantie sur tous travaux'],
      },
    ],
  },
  {
    id: 'reparation-maintenance',
    titre: 'Réparation & Maintenance',
    description: 'Réparation complète et maintenance de tous véhicules lourds et équipements industriels.',
    icon: '🔧',
    couleur: 'from-slate-600 to-slate-800',
    image: '/images/services/reparation.svg',
    services: [
      {
        id: 'reparation-generale',
        nom: 'Réparation générale des camions',
        description: 'Réparation complète : tôlerie, peinture et garnitures pour tous types de camions.',
        details: ['Tôlerie et carrosserie toutes marques', 'Peinture industrielle et cabine', 'Garnitures et habillage intérieur', 'Diagnostic complet avant intervention', "Pièces d'origine ou équivalentes"],
      },
      {
        id: 'redressage-chassis',
        nom: 'Redressage des châssis lourds',
        description: 'Redressage et réparation de châssis lourds pour camions, remorques à benne et plateau.',
        details: ['Redressage châssis camions toutes marques', 'Réparation remorques benne et plateau', 'Contrôle géométrique précis', 'Renfort et soudure structurelle', 'Remise en conformité garantie'],
      },
      {
        id: 'hydraulique-industrielle',
        nom: 'Maintenance hydraulique industrielle',
        description: 'Maintenance, réparation et transformation de systèmes hydrauliques industriels.',
        details: ['Diagnostic système hydraulique', 'Réparation vérins et pompes', 'Remplacement flexibles et joints', 'Installation nouveaux systèmes', 'Maintenance préventive programmée'],
      },
      {
        id: 'garnitures-peintures',
        nom: 'Garnitures & Peintures générales',
        description: 'Services complets de garnitures et peintures pour tous véhicules industriels.',
        details: ['Garnitures intérieures toutes matières', 'Peinture cabine et carrosserie', 'Traitement anti-rouille', 'Décoration et personnalisation', 'Finitions professionnelles garanties'],
      },
    ],
  },
  {
    id: 'construction-metallique',
    titre: 'Construction Métallique',
    description: 'Fabrication de structures métalliques, citernes, cuves et équipements industriels.',
    icon: '🏗️',
    couleur: 'from-yellow-600 to-yellow-800',
    image: '/images/services/metallique.svg',
    services: [
      {
        id: 'citernes-eau',
        nom: 'Citernes eau potable',
        description: "Construction de citernes pour le transport et stockage d'eau potable.",
        details: ['Citernes inox alimentaire certifiées', 'Différentes capacités : 2000L à 20000L', 'Système de pompage intégré', 'Robinetterie et raccords alimentaires', 'Nettoyage et certification sanitaire'],
      },
      {
        id: 'rampes-mobiles',
        nom: 'Rampes mobiles',
        description: 'Construction de rampes mobiles pour chargement et déchargement de véhicules.',
        details: ['Rampes fixes et mobiles', 'Capacité de charge adaptée', 'Surface anti-dérapante', 'Système de fixation sécurisé', 'Pliables et transportables'],
      },
      {
        id: 'cuves-stockage',
        nom: 'Cuves de stockage',
        description: 'Fabrication de cuves de stockage pour liquides industriels et alimentaires.',
        details: ['Cuves acier et inox sur mesure', 'Traitement intérieur adapté au produit', 'Jauges et indicateurs de niveau', 'Système de remplissage et vidange', 'Conformité normes stockage'],
      },
      {
        id: 'cabines-sahariennes',
        nom: 'Cabines sahariennes',
        description: 'Construction de cabines sahariennes métalliques en tôle ondulée pour environnements extrêmes.',
        details: ['Cabines en tôle ondulée galvanisée', 'Isolation thermique renforcée', 'Ventilation adaptée au climat chaud', 'Portes et fenêtres sécurisées', 'Montage rapide sur site'],
      },
      {
        id: 'guerite',
        nom: 'Guérites',
        description: "Fabrication de guérites de surveillance et de contrôle d'accès.",
        details: ['Guérites métalliques sur mesure', 'Vitrage sécurisé toutes faces', 'Climatisation et chauffage intégrés', 'Raccordements électriques', 'Livraison et installation sur site'],
      },
      {
        id: 'fosse-septique',
        nom: 'Fosses septiques',
        description: 'Fabrication et installation de fosses septiques métalliques.',
        details: ['Fosses toutes capacités', 'Acier traité anti-corrosion', 'Système de ventilation', 'Regard de visite et accès', 'Conformité normes sanitaires'],
      },
    ],
  },
  {
    id: 'autres-services',
    titre: 'Autres Services',
    description: 'Services complémentaires pour répondre à tous vos besoins spécialisés.',
    icon: '⚙️',
    couleur: 'from-purple-600 to-purple-900',
    image: '/images/services/autres.svg',
    services: [
      {
        id: 'brigade-canine',
        nom: 'Brigade canine',
        description: "Aménagement de véhicules spéciaux pour brigades canines et forces de l'ordre.",
        details: ['Compartiments chiens sécurisés et ventilés', 'Séparation conducteur/animaux', 'Système de ventilation et température', 'Rangements équipements brigade', 'Conformité normes bien-être animal'],
      },
    ],
  },
]