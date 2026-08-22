/** L'unico indirizzo che deve finire nei motori di ricerca. */
export const PRODUCTION_URL = "https://andreaspina.net";

/**
 * Vero solo sul sito vero. Staging e sviluppo locale devono restare fuori
 * dagli indici: lo stesso contenuto su due domini danneggia il posizionamento
 * di quello che conta.
 *
 * La variabile e' `SITE_URL` e non `NEXT_PUBLIC_SITE_URL` di proposito: Next
 * sostituisce le variabili con prefisso NEXT_PUBLIC_ con il loro valore
 * durante la build, quindi una di quelle sarebbe congelata nell'immagine
 * Docker e leggerebbe sempre il valore del momento in cui e' stata costruita.
 * Senza prefisso viene invece letta a ogni avvio del container, ed e' cosi'
 * che la stessa immagine puo' girare su staging e in produzione.
 *
 * La condizione e' volutamente stretta: se `SITE_URL` non e' impostata
 * correttamente il sito resta fuori dall'indice invece di entrarci per
 * sbaglio. E' l'errore meno costoso dei due, e si vede con un `curl -I`.
 */
export function isIndexable(): boolean {
  return process.env.SITE_URL === PRODUCTION_URL;
}
