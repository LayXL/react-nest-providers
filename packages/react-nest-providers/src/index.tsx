import { type ComponentProps, type FC, type ReactNode, useMemo } from "react"

type Provider<T extends FC<any>> = [T, ComponentProps<T>?]

interface NestProviders {
  push<T extends FC<any>>(Provider: T, props?: ComponentProps<T>): this
  build(): FC<{ children: ReactNode }>
}

export const nestProviders = (reverse?: boolean): NestProviders => {
  const providers: Array<Provider<FC<any>>> = []

  return {
    push<T extends FC<any>>(Provider: T, props?: ComponentProps<T>) {
      providers.push([Provider, props])
      return this
    },
    build(): FC<{ children: ReactNode }> {
      return ({ children }) => {
        const MemoizedProviders = useMemo(
          () =>
            providers[reverse ? "reduce" : "reduceRight"](
              (nested, [Provider, props], i) => (
                <Provider key={i} {...(props || {})}>
                  {nested}
                </Provider>
              ),
              children
            ),
          [reverse, children]
        )
        return <>{MemoizedProviders}</>
      }
    },
  }
}
