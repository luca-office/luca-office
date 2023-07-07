import * as React from "react"
import {Text} from "shared/components"
import {CardTab} from "../tabbed-card"

const content = (id: string | number) => (
  <Text className={"tab-content"}>
    id: {id}
    <br />
    Li Europan lingues es membres del sam familie. Lor separat existentie es un myth. Por scientie, musica, sport etc,
    litot Europa usa li sam vocabular. Li lingues differe solmen in li grammatica, li pronunciation e li plu commun
    vocabules. Omnicos directe al desirabilite de un nov lingua franca: On refusa continuar payar custosi traductores.
    At solmen va esser necessi far uniform grammatica, pronunciation e plu sommun paroles. Ma quande lingues coalesce,
    li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues.
  </Text>
)
export const cardTabsMock: CardTab[] = [
  {
    content: content(1),
    label: "Testing active"
  },
  {
    content: content(2),
    label: "Testing"
  },
  {
    content: content(3),
    label: "Testing"
  }
]
