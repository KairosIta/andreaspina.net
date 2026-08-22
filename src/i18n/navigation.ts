import { createNavigation } from "next-intl/navigation";

import { routing } from "./routing";

/**
 * Da usare al posto di next/link e next/navigation in tutta l'app:
 * aggiungono da soli il prefisso di lingua corrente.
 */
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
