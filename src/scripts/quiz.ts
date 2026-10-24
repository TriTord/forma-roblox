/**
 * Interactivité des quiz (leçons) et examens (modules).
 * Le HTML est entièrement rendu au build par Quiz.astro ; ce script ne fait que corriger.
 *
 * Mode « lecon »  : chaque question a son bouton « Valider » ; correction immédiate.
 * Mode « examen » : l'élève répond à tout puis clique « Corriger l'examen ».
 * Dans les deux cas, le score s'affiche quand toutes les questions sont corrigées.
 */
import { enregistrerExamen, enregistrerQuiz, marquerLecon } from './progression';

interface Question {
  el: HTMLFieldSetElement;
  inputs: HTMLInputElement[];
  bonnes: Set<number>;
  feedback: HTMLElement;
  verdict: HTMLElement;
  resultat?: boolean;
}

function lireQuestion(el: HTMLFieldSetElement): Question {
  return {
    el,
    inputs: Array.from(el.querySelectorAll<HTMLInputElement>('input[data-option-input]')),
    bonnes: new Set((el.dataset.correct ?? '').split(',').filter(Boolean).map(Number)),
    feedback: el.querySelector<HTMLElement>('[data-feedback]')!,
    verdict: el.querySelector<HTMLElement>('[data-verdict]')!,
  };
}

const choix = (q: Question) => q.inputs.filter((i) => i.checked).map((i) => Number(i.value));

function afficherAide(q: Question, message: string): void {
  q.feedback.hidden = false;
  q.feedback.dataset.etat = 'aide';
  q.verdict.textContent = message;
  q.el.querySelector<HTMLElement>('[data-explication]')!.hidden = true;
}

/** Corrige une question ; renvoie false si aucune réponse n'est cochée. */
function corriger(q: Question): boolean {
  const reponses = choix(q);
  if (reponses.length === 0) return false;
  const juste = reponses.length === q.bonnes.size && reponses.every((r) => q.bonnes.has(r));
  q.resultat = juste;
  q.el.dataset.etat = juste ? 'correct' : 'incorrect';

  for (const input of q.inputs) {
    input.disabled = true;
    const option = input.closest<HTMLElement>('[data-option]')!;
    const index = Number(input.value);
    const marque = option.querySelector<HTMLElement>('[data-marque]')!;
    if (q.bonnes.has(index)) {
      option.dataset.etat = 'bonne';
      marque.textContent = input.checked ? 'Bonne réponse, tu l’as cochée' : 'Bonne réponse';
    } else if (input.checked) {
      option.dataset.etat = 'fausse';
      marque.textContent = 'Ta réponse, incorrecte';
    }
  }

  q.feedback.hidden = false;
  q.feedback.dataset.etat = juste ? 'correct' : 'incorrect';
  q.verdict.textContent = juste ? 'Bonne réponse !' : q.bonnes.size > 1 ? 'Pas tout à fait : il fallait cocher toutes les bonnes réponses.' : 'Pas tout à fait.';
  q.el.querySelector<HTMLElement>('[data-explication]')!.hidden = false;
  q.el.querySelector<HTMLButtonElement>('[data-action="valider"]')?.setAttribute('hidden', '');
  return true;
}

function reinitialiserQuestion(q: Question): void {
  q.resultat = undefined;
  delete q.el.dataset.etat;
  for (const input of q.inputs) {
    input.disabled = false;
    input.checked = false;
    const option = input.closest<HTMLElement>('[data-option]')!;
    delete option.dataset.etat;
    option.querySelector<HTMLElement>('[data-marque]')!.textContent = '';
  }
  q.feedback.hidden = true;
  delete q.feedback.dataset.etat;
  q.verdict.textContent = '';
  q.el.querySelector<HTMLButtonElement>('[data-action="valider"]')?.removeAttribute('hidden');
}

function initialiserQuiz(racine: HTMLElement): void {
  const mode = racine.dataset.mode === 'examen' ? 'examen' : 'lecon';
  const seuil = Number(racine.dataset.seuil ?? 70);
  const questions = Array.from(racine.querySelectorAll<HTMLFieldSetElement>('[data-question]')).map(lireQuestion);
  const zoneScore = racine.querySelector<HTMLElement>('[data-score]')!;
  const texteScore = racine.querySelector<HTMLElement>('[data-score-texte]')!;
  const messageScore = racine.querySelector<HTMLElement>('[data-score-message]')!;
  const boutonCorriger = racine.querySelector<HTMLButtonElement>('[data-action="corriger"]');
  const alerte = racine.querySelector<HTMLElement>('[data-alerte]');
  const boutonRecommencer = racine.querySelector<HTMLButtonElement>('[data-action="recommencer"]')!;

  function terminer(): void {
    const total = questions.length;
    const score = questions.filter((q) => q.resultat).length;
    const pct = total ? Math.round((score / total) * 100) : 0;
    const reussi = pct >= seuil;
    racine.dataset.etat = reussi ? 'reussi' : 'echoue';
    zoneScore.hidden = false;
    texteScore.textContent = `${score} / ${total} (${pct} %)`;

    if (mode === 'lecon') {
      const id = racine.dataset.leconId;
      if (id) {
        enregistrerQuiz(id, score, total);
        if (reussi) marquerLecon(id, true);
      }
      messageScore.textContent = reussi
        ? 'Bravo, quiz réussi ! La leçon est marquée comme terminée.'
        : `Il faut au moins ${seuil} % pour valider. Relis les explications et recommence quand tu veux.`;
    } else {
      const module = racine.dataset.module;
      if (module) enregistrerExamen(module, score, total, seuil);
      messageScore.textContent = reussi
        ? score === total
          ? 'Sans-faute ! Examen réussi, badge débloqué.'
          : 'Examen réussi, badge du module débloqué !'
        : `Seuil de réussite : ${seuil} %. Relis les leçons concernées puis retente l’examen.`;
    }
    boutonCorriger?.setAttribute('hidden', '');
    zoneScore.focus();
  }

  // Mode leçon : un bouton « Valider » par question.
  for (const q of questions) {
    q.el.querySelector<HTMLButtonElement>('[data-action="valider"]')?.addEventListener('click', () => {
      if (!corriger(q)) {
        afficherAide(q, 'Choisis au moins une réponse avant de valider.');
        q.inputs[0]?.focus();
        return;
      }
      if (questions.every((x) => x.resultat !== undefined)) terminer();
    });
    // Masque le message d'aide dès qu'une réponse est cochée.
    q.inputs.forEach((i) =>
      i.addEventListener('change', () => {
        if (q.feedback.dataset.etat === 'aide') q.feedback.hidden = true;
      }),
    );
  }

  // Mode examen : correction globale.
  boutonCorriger?.addEventListener('click', () => {
    const sansReponse = questions.filter((q) => choix(q).length === 0);
    if (sansReponse.length > 0) {
      if (alerte) {
        alerte.hidden = false;
        alerte.textContent =
          sansReponse.length === 1
            ? 'Il reste 1 question sans réponse.'
            : `Il reste ${sansReponse.length} questions sans réponse.`;
      }
      sansReponse[0].inputs[0]?.focus();
      return;
    }
    if (alerte) alerte.hidden = true;
    questions.forEach(corriger);
    terminer();
  });

  boutonRecommencer.addEventListener('click', () => {
    questions.forEach(reinitialiserQuestion);
    zoneScore.hidden = true;
    delete racine.dataset.etat;
    if (alerte) alerte.hidden = true;
    boutonCorriger?.removeAttribute('hidden');
    questions[0]?.inputs[0]?.focus();
  });
}

document.querySelectorAll<HTMLElement>('[data-quiz]').forEach(initialiserQuiz);
