# React Nest Providers

Helps to get rid of multi-level nesting in components of Providers type

## Example

We are all used to writing a component where we put providers into each other:

```typescript jsx
export const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <NuqsAdapter>
      <RecoilRoot>
        <QueryClientProvider client={queryClient}>
          <ThemeProvider>
            {children}
          </ThemeProvider>
        </QueryClientProvider>
      </RecoilRoot>
    </NuqsAdapter>
  )
}
```

In large projects it happens that there may be 10 providers, which makes the code become "staggered".

But what if we simplify the code?

```typescript jsx
import { nestProviders } from "react-nest-providers"

export const Providers = nestProviders()
  .push(NuqsAdapter)
  .push(RecoilRoot)
  .push(QueryClientProvider, { client: queryClient })
  .push(ThemeProvider)
  .build()
```

And it works just as well as the traditional nesting of providers in each other.

When you add new providers, you will not lose children. And it is not difficult to change the order of providers using this approach.

## Invert the order

You can also change the nesting order

```typescript jsx
import { nestProviders } from "react-nest-providers"

export const Providers = nestProviders(true) // reverse the order
  .push(ThemeProvider) // will be closest to children
  .push(QueryClientProvider, { client: queryClient })
  .push(RecoilRoot)
  .push(NuqsAdapter) // will be further away from children
  .build()
```
