import type { RenderOptions } from "@testing-library/react"
import { render } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import type { PropsWithChildren, ReactElement } from "react"
import { Provider } from "react-redux"
import type { AppStore, RootState } from "../app/store"
import { makeStore } from "../app/store"

/**
 * Ce type étend les options par défaut pour
 * Fonction de rendu de React Testing Library. Il permet de
 * configuration supplémentaire telle que la spécification d'un état Redux initial et
 * une instance de magasin personnalisé.
 */
interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
  /**
   * Définit une partie spécifique ou l'intégralité de l'état initial du magasin Redux.
   * Ceci est particulièrement utile pour initialiser l'état dans un
   * de manière contrôlée pendant les tests, permettant le rendu des composants
   * avec des conditions d'état prédéterminées.
   */
  preloadedState?: Partial<RootState>

  /**
   * Permet l'utilisation d'une instance de magasin Redux spécifique au lieu d'un
   * magasin par défaut ou global. Cette flexibilité est bénéfique lorsque
   * tester les composants avec des exigences de magasin uniques ou lors de l'isolement
   * tests à partir d'un état de magasin global. Le magasin personnalisé doit être configuré
   * pour correspondre à la structure et au middleware du magasin utilisé par l'application.
   *
   * @default makeStore(preloadedState)
   */
  store?: AppStore
}

/**
 * Rend l'élément React donné avec le fournisseur Redux et le magasin personnalisé.
 * Cette fonction est utile pour tester les composants connectés au magasin Redux.
 *
 * @param ui - Le composant ou l'élément React à restituer.
 * @param extendedRenderOptions - Options de configuration facultatives pour le rendu. Cela inclut « preloadedState » pour l'état Redux initial et « store » pour une instance de magasin Redux spécifique. Toutes les propriétés supplémentaires sont transmises à la fonction de rendu de React Testing Library.
 * @returns Un objet contenant le magasin Redux utilisé dans le rendu, l'API d'événement utilisateur pour simuler les interactions utilisateur dans les tests et toutes les fonctions de requête de React Testing Library pour tester le composant.
 */
export const renderWithProviders = (
  ui: ReactElement,
  extendedRenderOptions: ExtendedRenderOptions = {},
) => {
  const {
    preloadedState = {},
    // Crée automatiquement une instance de magasin si aucun magasin n'a été transmis
    store = makeStore(preloadedState),
    ...renderOptions
  } = extendedRenderOptions

  const Wrapper = ({ children }: PropsWithChildren) => (
    <Provider store={store}>{children}</Provider>
  )

  // Renvoie un objet avec le store et toutes les fonctions de requête de RTL
  return {
    store,
    user: userEvent.setup(),
    ...render(ui, { wrapper: Wrapper, ...renderOptions }),
  }
}
