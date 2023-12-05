import React, { PropsWithChildren } from 'react'
import { render } from '@testing-library/react'
import type { RenderOptions } from '@testing-library/react'
import type { PreloadedState } from '@reduxjs/toolkit'
import { Provider } from 'react-redux'

import { setupStore } from './app/store'
import type { AppStore, RootState } from './app/store'

// This type interface extends the default options for render from RTL, as well
// as allows the user to specify other things such as initialState, store.
interface ExtendedRenderOptions extends Omit<RenderOptions, 'queries'> {
  preloadedState?: PreloadedState<RootState>
  store?: AppStore
}

/**
 * Function to render the redux connected components by wrapping them with Provider
 * @param ui
 * @param preloadedState
 * @param store
 * @param renderOptions
 */
export function renderWithProviders(
  ui: React.ReactElement,
  {
    preloadedState = {},
    // Automatically create a store instance if no store was passed in,
    store = setupStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) {
  function Wrapper({ children }: PropsWithChildren<{}>): JSX.Element {
    return <Provider store={store}>{children}</Provider>
  }

  // Return an object with the store and all of RTL's query functions,
  return { store, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

/**
 * Mocking sessionStorage function
 * so that we can set or get into the sessionStorage during the tests
 * @param storage
 */
export function createMockSessionStorage(storage: Record<string, string>) {
  const sessionStorageMock = (function () {
    let store: Record<string, string> = storage

    return {
      getItem: function (key: string) {
        return store[key] ?? null
      },
      setItem: function (key: string, value: string) {
        store[key] = value.toString()
      },
      clear: function () {
        store = {}
      },
    }
  })()

  Object.defineProperty(window, 'sessionStorage', {
    value: sessionStorageMock,
  })
}
