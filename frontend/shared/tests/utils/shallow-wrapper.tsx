import * as React from "react"
import {PropsWithChildren, ReactNode} from "react"
import {MockedProvider} from "@apollo/client/testing"
import {Provider} from "react-redux"
import {fakeStore} from "../redux/fake-store"

interface Props<T> extends PropsWithChildren<any> {
  readonly initialAppState: T
}

/**
 * Wrap your component instead of mounting
 * Example Snapshot: const component = create(<Wrapper>{getComponent()}</Wrapper>)
 * Example shallow: const component = shallow(getComponent(), {wrappingComponent: Wrapper})
 * @param children
 * @param initialAppState
 */
export const ShallowWrapper = <T,>({initialAppState, children}: Props<T>) => (
  <MockedProvider>
    <Provider store={fakeStore(initialAppState)}>{children}</Provider>
  </MockedProvider>
)
