/**
 * This method scrolls an element into view.
 * An element can only be scrolled into view if
 * it has a data-scroll attribute.
 *
 * Example:
 * <div data-scroll="target"/>
 * scrollToElement("target")
 *
 * @param name The data-scroll attribute value
 */
export const scrollToElement = (name: string) => {
  const target = document.querySelector(`[data-scroll="${name}"]`)

  if (target) {
    target.scrollIntoView()
  }
}
