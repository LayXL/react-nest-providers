"use client"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { ThemeProvider } from "next-themes"
import { NuqsAdapter } from "nuqs/adapters/react"
import { nestProviders } from "react-nest-providers"
import { RecoilRoot } from "recoil"

const queryClient = new QueryClient()

export const Providers = nestProviders()
  .push(NuqsAdapter)
  .push(RecoilRoot)
  .push(QueryClientProvider, { client: queryClient })
  .push(ThemeProvider)
  .build()
