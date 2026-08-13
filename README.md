🛠️ Plan de Réalisation Chronologique (Tâche par Tâche)
[ Phase 1: Config APIs ] ➔ [ Phase 2: Backend ] ➔ [ Phase 3: Frontend ] ➔ [ Phase 4: Tests ]
🟢 PHASE 1 : Configuration des Clés & APIs Tierces (Jour 1)
Tâche 1.1 — Compte Développeur Meta :

Créer un compte sur Meta for Developers.

Générer les jetons d'accès (Access Token) pour la Meta Marketing API et l'API WhatsApp Business.

Tâche 1.2 — Clé API IA (OpenAI) :

Créer un compte OpenAI et récupérer une clé API pour les modèles GPT-4o (texte/analyses) et DALL-E 3 (visuels).

Tâche 1.3 — Service de Cartographie :

S'inscrire sur Mapbox ou Google Maps Platform pour obtenir la clé publique nécessaire à la sélection des cartes.

🔵 PHASE 2 : Développement du Backend (Jour 2 - Jour 4)
Tâche 2.1 — Base de données & Authentification :

Configurer la base de données (PostgreSQL via Supabase ou MongoDB) pour stocker les profils clients, leurs campagnes et leurs jetons publicitaires.

Tâche 2.2 — Module de Géolocalisation :

Créer un endpoint API (POST /api/campaigns/geo) recevant latitude/longitude et le rayon de ciblage pour structurer le JSON requis par la Meta API.

Tâche 2.3 — Moteur IA de Génération :

Développer le script qui envoie la description du commerce du client à OpenAI, puis reçoit en retour : 3 slogans, un texte accrocheur et une image/visuel.

Tâche 2.4 — Orchestrateur de Publication (Meta API) :

Créer le script qui envoie la campagne complète (visuel, texte, zone GPS, bouton WhatsApp) à la régie publicitaire via l'API.

Tâche 2.5 — Moteur de Webhook & Statistiques :

Mettre en place un script automatique (CRON Job) pour récupérer toutes les 6 heures le nombre de clics, dépense publicitaire ($) et conversations WhatsApp initiées.

🟡 PHASE 3 : Intégration du Frontend (Jour 5 - Jour 6)
Tâche 3.1 — Interface du Tableau de bord (Dashboard) :

Intégrer les métriques en temps réel (Vues, Clics, Messages WhatsApp reçus, Estimation du ROI).

Tâche 3.2 — Formulaire de Création de Campagne IA :

Concevoir l'interface où le client saisit le nom de son entreprise, choisit son secteur et voit l'IA générer automatiquement ses visuels.

Tâche 3.3 — Composant Carte Interactive :

Intégrer la carte Mapbox/Google Maps permettant au commerçant de pointer son magasin et d'ajuster le rayon de ciblage (ex: 5 km).

Tâche 3.4 — Module d'Abonnement / Recharge :

Connecter l'interface aux moyens de paiement (Mobile Money ou passerelle de paiement) pour activer les abonnements mensuels.

🔴 PHASE 4 : Tests & Déploiement (Jour 7)
Tâche 4.1 — Test de Campagne en Mode Sandbox :

Lancer une campagne de test avec l'API Meta en mode développement pour vérifier que les publicités s'affichent correctement et que le bouton WhatsApp redirige bien.

Tâche 4.2 — Déploiement en Production :

Héberger le frontend sur Vercel et le backend sur Render/Railway.

Tâche 4.3 — Lancement du Premier Client pilote :

Lancer la toute première campagne réelle pour valider le flux complet (de la création à la réception des messages WhatsApp).