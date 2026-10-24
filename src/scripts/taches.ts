/**
 * Listes de tâches interactives (cases produites par plugins/rehype-taches.mjs).
 * - état coché mémorisé par page dans localStorage (clé `forma-roblox:taches:<chemin>`), sans planter si le stockage est bloqué ;
 * - en tête de chaque liste de premier niveau : compteur « X / Y cochées » + bouton « Tout décocher ».
 */
const PREFIXE = 'forma-roblox:taches:';

const cases = Array.from(document.querySelectorAll<HTMLInputElement>('input.tache-case[data-tache]'));

if (cases.length) {
  const cle = PREFIXE + location.pathname.replace(/\/index\.html$/, '/').replace(/\/?$/, '/');

  const lire = (): Set<string> => {
    try {
      const brut = localStorage.getItem(cle);
      const valeur: unknown = brut ? JSON.parse(brut) : [];
      return new Set(Array.isArray(valeur) ? valeur.map(String) : []);
    } catch {
      return new Set();
    }
  };
  const ecrire = () => {
    const cochees = cases.filter((c) => c.checked).map((c) => c.dataset.tache!);
    try {
      if (cochees.length) localStorage.setItem(cle, JSON.stringify(cochees));
      else localStorage.removeItem(cle);
    } catch {
      /* stockage indisponible : l'état reste valable jusqu'au rechargement */
    }
  };

  const etat = lire();
  for (const c of cases) c.checked = etat.has(c.dataset.tache!);

  // Listes de premier niveau (les sous-listes sont comptées avec leur liste parente).
  const listes = Array.from(document.querySelectorAll<HTMLElement>('ul.contains-task-list, ol.contains-task-list')).filter(
    (l) => !l.parentElement?.closest('.contains-task-list'),
  );
  const majCompteurs: (() => void)[] = [];

  listes.forEach((liste, n) => {
    const casesListe = Array.from(liste.querySelectorAll<HTMLInputElement>('input.tache-case'));
    if (!casesListe.length) return;
    const barre = document.createElement('div');
    barre.className = 'taches-barre not-prose';
    barre.dataset.testid = 'taches-barre';
    const compteur = document.createElement('p');
    compteur.className = 'taches-compteur';
    compteur.id = `taches-compteur-${n + 1}`;
    compteur.setAttribute('aria-live', 'polite');
    compteur.dataset.testid = 'taches-compteur';
    const bouton = document.createElement('button');
    bouton.type = 'button';
    bouton.className = 'taches-reset';
    bouton.textContent = 'Tout décocher';
    bouton.dataset.testid = 'taches-reset';
    bouton.setAttribute('aria-describedby', compteur.id);
    barre.append(compteur, bouton);
    liste.before(barre);

    const maj = () => {
      const total = casesListe.length;
      const cochees = casesListe.filter((c) => c.checked).length;
      compteur.textContent = `${cochees} / ${total} cochée${cochees > 1 ? 's' : ''}`;
      bouton.disabled = cochees === 0;
      liste.dataset.complete = String(cochees === total);
    };
    bouton.addEventListener('click', () => {
      for (const c of casesListe) c.checked = false;
      ecrire();
      maj();
    });
    majCompteurs.push(maj);
    maj();
  });

  document.addEventListener('change', (e) => {
    const cible = e.target;
    if (!(cible instanceof HTMLInputElement) || !cible.matches('input.tache-case')) return;
    ecrire();
    for (const maj of majCompteurs) maj();
  });

  // Synchronisation entre onglets.
  window.addEventListener('storage', (e) => {
    if (e.key !== cle && e.key !== null) return;
    const nouvel = lire();
    for (const c of cases) c.checked = nouvel.has(c.dataset.tache!);
    for (const maj of majCompteurs) maj();
  });
}
