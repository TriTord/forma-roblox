/**
 * Liaison entre l'état de progression et le DOM, exécutée sur toutes les pages.
 * Repose uniquement sur des attributs data-* posés par les composants Astro :
 *  - [data-barre-progression][data-portee="globale"|"module"][data-module="XX"]
 *  - [data-statut-lecon="<id>"]           : pastille « terminée » (sommaire, listes)
 *  - [data-statut-examen="XX"]            : pastille « examen réussi »
 *  - [data-bouton-terminer][data-lecon-id] : bouton « Marquer comme terminée »
 *  - [data-reprendre]                     : lien « Reprendre » vers la prochaine leçon
 *  - [data-badges]                        : grille des badges (page /progression)
 *  - [data-resultats-examens]             : tableau des examens (page /progression)
 *  - [data-reinitialiser]                 : bouton de remise à zéro
 *  - [data-alerte-stockage]               : message si localStorage indisponible
 */
import {
  calculerBadges,
  calculerStats,
  lireCatalogue,
  lireEtat,
  marquerLecon,
  reinitialiser,
  stockageDisponible,
  surChangement,
  type EtatProgression,
} from './progression';

const catalogue = lireCatalogue();

function majBarres(etat: EtatProgression): void {
  const stats = calculerStats(etat, catalogue);
  document.querySelectorAll<HTMLElement>('[data-barre-progression]').forEach((el) => {
    let pct = stats.pct;
    let texte = `${stats.terminees} / ${stats.total} leçons terminées`;
    if (el.dataset.portee === 'module') {
      const m = stats.modules.find((x) => x.numero === el.dataset.module);
      pct = m?.pct ?? 0;
      texte = m && m.total ? `${m.terminees} / ${m.total} leçons terminées` : 'Leçons en préparation';
    }
    el.setAttribute('aria-valuenow', String(pct));
    el.setAttribute('aria-valuetext', `${pct} % — ${texte}`);
    el.style.setProperty('--progression', `${pct}%`);
    el.querySelectorAll<HTMLElement>('[data-progression-texte]').forEach((t) => (t.textContent = texte));
    el.querySelectorAll<HTMLElement>('[data-progression-pct]').forEach((t) => (t.textContent = `${pct} %`));
  });
}

function majStatuts(etat: EtatProgression): void {
  document.querySelectorAll<HTMLElement>('[data-statut-lecon]').forEach((el) => {
    const faite = Boolean(etat.lecons[el.dataset.statutLecon ?? '']);
    el.dataset.termine = String(faite);
    const sr = el.querySelector<HTMLElement>('[data-statut-texte]');
    if (sr) sr.textContent = faite ? '(terminée)' : '';
  });
  document.querySelectorAll<HTMLElement>('[data-statut-examen]').forEach((el) => {
    const reussi = Boolean(etat.examens[el.dataset.statutExamen ?? '']?.reussi);
    el.dataset.termine = String(reussi);
    const sr = el.querySelector<HTMLElement>('[data-statut-texte]');
    if (sr) sr.textContent = reussi ? '(réussi)' : '';
  });
}

function majBoutonsTerminer(etat: EtatProgression): void {
  document.querySelectorAll<HTMLButtonElement>('[data-bouton-terminer]').forEach((btn) => {
    const faite = Boolean(etat.lecons[btn.dataset.leconId ?? '']);
    btn.setAttribute('aria-pressed', String(faite));
    btn.dataset.termine = String(faite);
    const libelle = btn.querySelector<HTMLElement>('[data-libelle]');
    if (libelle) libelle.textContent = faite ? 'Leçon terminée' : 'Marquer comme terminée';
  });
}

function majReprendre(etat: EtatProgression): void {
  const stats = calculerStats(etat, catalogue);
  document.querySelectorAll<HTMLAnchorElement>('[data-reprendre]').forEach((a) => {
    if (stats.terminees === 0 || !stats.prochaine) {
      a.hidden = true;
      return;
    }
    a.href = stats.prochaine.url;
    a.hidden = false;
    const t = a.querySelector<HTMLElement>('[data-reprendre-titre]');
    if (t) t.textContent = stats.prochaine.titre;
  });
}

function majBadges(etat: EtatProgression): void {
  const conteneurs = document.querySelectorAll<HTMLElement>('[data-badges]');
  if (!conteneurs.length) return;
  const badges = calculerBadges(etat, catalogue);
  conteneurs.forEach((conteneur) => {
    const categorie = conteneur.dataset.badges;
    const liste = badges.filter((b) => !categorie || b.categorie === categorie);
    conteneur.replaceChildren(
      ...liste.map((b) => {
        const li = document.createElement('li');
        li.className = 'badge-carte';
        li.dataset.obtenu = String(b.obtenu);
        li.dataset.testid = `badge-${b.id}`;
        const emoji = document.createElement('span');
        emoji.className = 'badge-emoji';
        emoji.setAttribute('aria-hidden', 'true');
        emoji.textContent = b.emoji;
        const nom = document.createElement('strong');
        nom.className = 'badge-nom';
        nom.textContent = b.nom;
        const desc = document.createElement('span');
        desc.className = 'badge-desc';
        desc.textContent = b.description;
        const statut = document.createElement('span');
        statut.className = 'badge-statut';
        statut.textContent = b.obtenu ? 'Obtenu' : 'À débloquer';
        li.append(emoji, nom, desc, statut);
        return li;
      }),
    );
  });
  document.querySelectorAll<HTMLElement>('[data-compteur-badges]').forEach((el) => {
    el.textContent = `${badges.filter((b) => b.obtenu).length} / ${badges.length}`;
  });
}

function majExamens(etat: EtatProgression): void {
  document.querySelectorAll<HTMLElement>('[data-resultat-examen]').forEach((el) => {
    const r = etat.examens[el.dataset.resultatExamen ?? ''];
    el.textContent = r ? `${r.meilleurPct} % (meilleur score)${r.reussi ? ' — réussi' : ''}` : 'Pas encore tenté';
    el.dataset.reussi = String(Boolean(r?.reussi));
  });
}

function tout(etat: EtatProgression): void {
  majBarres(etat);
  majStatuts(etat);
  majBoutonsTerminer(etat);
  majReprendre(etat);
  majBadges(etat);
  majExamens(etat);
}

function initialiser(): void {
  if (!stockageDisponible()) {
    document.querySelectorAll<HTMLElement>('[data-alerte-stockage]').forEach((el) => (el.hidden = false));
  }

  document.querySelectorAll<HTMLButtonElement>('[data-bouton-terminer]').forEach((btn) => {
    btn.addEventListener('click', () => {
      const id = btn.dataset.leconId;
      if (!id) return;
      marquerLecon(id, btn.getAttribute('aria-pressed') !== 'true');
    });
  });

  document.querySelectorAll<HTMLButtonElement>('[data-reinitialiser]').forEach((btn) => {
    btn.addEventListener('click', () => {
      if (window.confirm('Effacer toute ta progression (leçons, quiz, examens, badges) ? Cette action est définitive.')) {
        reinitialiser();
      }
    });
  });

  tout(lireEtat());
  surChangement(tout);
}

initialiser();
