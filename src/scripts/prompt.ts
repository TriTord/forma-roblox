/** Boutons « Copier » des composants <Prompt> : copie le texte du premier <pre> du prompt. */

async function copierTexte(texte: string): Promise<boolean> {
  try {
    await navigator.clipboard.writeText(texte);
    return true;
  } catch {
    // Repli (contexte non sécurisé, permission refusée) : sélection d'une zone de texte temporaire.
    const zone = document.createElement('textarea');
    zone.value = texte;
    zone.setAttribute('readonly', '');
    zone.style.position = 'fixed';
    zone.style.opacity = '0';
    document.body.append(zone);
    zone.select();
    let ok = false;
    try {
      ok = document.execCommand('copy');
    } catch {
      ok = false;
    }
    zone.remove();
    return ok;
  }
}

function initialiser(): void {
  for (const bouton of document.querySelectorAll<HTMLButtonElement>('[data-prompt-copier]:not([data-pret])')) {
    bouton.dataset.pret = '';
    const bloc = bouton.closest<HTMLElement>('[data-prompt]');
    const libelle = bouton.querySelector<HTMLElement>('[data-libelle]');
    const statut = bloc?.querySelector<HTMLElement>('[data-prompt-statut]');
    let minuteur: number | undefined;
    bouton.addEventListener('click', async () => {
      const texte = bloc?.querySelector('pre')?.textContent?.replace(/\n+$/, '') ?? '';
      const ok = texte !== '' && (await copierTexte(texte));
      bouton.dataset.etat = ok ? 'copie' : 'echec';
      if (libelle) libelle.textContent = ok ? 'Copié !' : 'Échec';
      if (statut) statut.textContent = ok ? 'Prompt copié dans le presse-papiers.' : 'La copie a échoué : sélectionne le texte et copie-le à la main.';
      window.clearTimeout(minuteur);
      minuteur = window.setTimeout(() => {
        delete bouton.dataset.etat;
        if (libelle) libelle.textContent = 'Copier';
        // Vidé pour qu'une nouvelle copie du même prompt soit de nouveau annoncée (aria-live n'annonce pas un texte inchangé).
        if (statut) statut.textContent = '';
      }, 2000);
    });
  }
}

initialiser();
