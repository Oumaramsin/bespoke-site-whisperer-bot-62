# 🛠️ Guide de Configuration Resend + OVHcloud (100% Gratuit)

Ce guide vous explique pas à pas comment connecter votre nom de domaine hébergé chez **OVH** avec votre compte gratuit **Resend.com**, afin d'envoyer des e-mails de confirmation automatiques à **100% de vos clients** sans aucune restriction.

---

## 📋 Prérequis (Ce dont vous avez besoin)
1. Un compte gratuit sur [Resend.com](https://resend.com)
2. Votre accès à l'espace client [OVHcloud Manager](https://www.ovh.com/auth/)

---

## Étape 1 : Ajouter votre nom de domaine sur Resend.com

1. Connectez-vous sur votre tableau de bord **[Resend.com](https://resend.com)**.
2. Dans le menu latéral gauche, cliquez sur **Domains**.
3. Cliquez sur le bouton noir **Add Domain**.
4. Entrez le nom de domaine officiel de votre entreprise (ex: `ramsin-conseil.fr`).
5. Choisissez la région (ex: `Europe (Frankfurt)`).
6. Cliquez sur **Add**.

> 💡 **Resend va maintenant vous afficher 3 enregistrements DNS à copier** :
> - **DKIM** (Type: `TXT`)
> - **SPF** (Type: `TXT`)
> - **MX** (Type: `MX`)

---

## Étape 2 : Ajouter les enregistrements DNS sur OVHcloud

1. Connectez-vous sur votre espace client **[OVHcloud Manager](https://www.ovh.com/auth/)**.
2. Dans le menu de gauche, cliquez sur **Noms de domaine**, puis sélectionnez votre nom de domaine (ex: `ramsin-conseil.fr`).
3. Cliquez sur l'onglet **Zone DNS** (situé en haut au centre).
4. Cliquez sur le bouton à droite **Ajouter un enregistrement**.

---

### 🔹 Enregistrement 1 : Le DKIM (Sécurité Anti-Usurpation)
1. Dans OVH, choisissez le type : **`TXT`**.
2. **Sous-domaine** : Collez ce que Resend indique dans la colonne *Name* (ex: `resend._domainkey`).
3. **Valeur / Cible** : Collez le long texte fourni par Resend dans la colonne *Value* (commençant par `p=MIGf...`).
4. Cliquez sur **Suivant** puis **Valider**.

---

### 🔹 Enregistrement 2 : Le SPF (Délivrabilité & Anti-Spam)
1. Cliquez à nouveau sur **Ajouter un enregistrement**.
2. Choisissez le type : **`TXT`**.
3. **Sous-domaine** : Collez ce que Resend indique (ex: `bounces` ou laissez vide selon Resend).
4. **Valeur / Cible** : Collez la valeur fournie par Resend (ex: `"v=spf1 include:amazonses.com ~all"`).
5. Cliquez sur **Suivant** puis **Valider**.

---

### 🔹 Enregistrement 3 : Le MX (Gestion des retours)
1. Cliquez à nouveau sur **Ajouter un enregistrement**.
2. Choisissez le type : **`MX`**.
3. **Sous-domaine** : Collez le sous-domaine donné par Resend (ex: `bounces`).
4. **Cible** : Collez l'adresse serveur fournie par Resend (ex: `feedback-smtp.eu-west-1.amazonses.com.`).
5. **Priorité** : Mettez `10`.
6. Cliquez sur **Suivant** puis **Valider**.

---

## Étape 3 : Vérifier et Activer sur Resend

1. Attendez 5 à 15 minutes (le temps qu'OVH propage les DNS sur Internet).
2. Retournez sur votre compte **Resend.com ➔ Domains**.
3. Cliquez sur le bouton **Verify Domain**.
4. Le statut passe immédiatement au **VERT (`Verified`)** ! ✅

---

## Étape 4 : Mettre à jour le code de votre site

Une fois le domaine vérifié au vert sur Resend, il vous suffit de changer l'adresse d'expédition dans le fichier [`src/services/resendService.ts`](file:///c:/Users/Mirac/Desktop/stage/bespoke-site-whisperer-bot-62/src/services/resendService.ts) :

Remplacer :
```ts
from: "RAMSIN Conseil <onboarding@resend.dev>"
```

Par votre vraie adresse officielle :
```ts
from: "RAMSIN Conseil <contact@ramsin-conseil.fr>"
```

---

🎉 **C'est terminé !** Votre site enverra désormais des e-mails HTML professionnels avec une délivrabilité parfaite directement dans la boîte mail de 100% de vos clients.
