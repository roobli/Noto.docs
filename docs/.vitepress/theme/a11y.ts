/**
 * Small corrections to the default theme's semantics and focus order.
 *
 * - Sidebar group labels are `h2` elements, so a screen reader's heading
 *   outline starts with "Guide" or "Direction" before the page's own `h1`.
 *   Mark them presentational; their text stays as the collapsible group's
 *   label.
 * - The mobile nav and the sidebar drawer open without moving focus, so the
 *   first Tab after the menu button walks links hidden behind the overlay.
 *   Put focus on the first link when one opens, and restore it to the control
 *   that opened it on close. This is not a focus trap: the drawer has no close
 *   control of its own, so trapping would strand a keyboard user.
 */
export function installA11y(): void {
  if (typeof window === 'undefined') return
  // `offsetParent` is null for `position: fixed`, which both drawers use.
  const isShown = (element: HTMLElement | null): element is HTMLElement => {
    if (!element) return false
    const style = getComputedStyle(element)
    return style.display !== 'none' && style.visibility !== 'hidden' && element.getClientRects().length > 0
  }

  const markGroups = (): void => {
    document
      .querySelectorAll<HTMLElement>('.VPSidebar .VPSidebarItem.level-0 > .item > h2')
      .forEach((heading) => heading.setAttribute('role', 'presentation'))
  }

  let screenOpen = false
  let sidebarOpen = false
  const syncFocus = (): void => {
    const screen = document.querySelector<HTMLElement>('.VPNavScreen')
    const shownScreen = isShown(screen)
    if (shownScreen && !screenOpen) screen!.querySelector<HTMLElement>('a, button')?.focus()
    if (!shownScreen && screenOpen) document.querySelector<HTMLElement>('.VPNavBarHamburger')?.focus()
    screenOpen = shownScreen

    const sidebar = document.querySelector<HTMLElement>('.VPSidebar.open')
    const shownSidebar = isShown(sidebar)
    if (shownSidebar && !sidebarOpen) sidebar!.querySelector<HTMLElement>('a, button')?.focus()
    if (!shownSidebar && sidebarOpen) document.querySelector<HTMLElement>('.VPLocalNav .menu')?.focus()
    sidebarOpen = shownSidebar
  }

  let scheduled = false
  const schedule = (): void => {
    if (scheduled) return
    scheduled = true
    requestAnimationFrame(() => {
      scheduled = false
      markGroups()
      syncFocus()
    })
  }

  const focusable = (root: HTMLElement): HTMLElement[] =>
    [...root.querySelectorAll<HTMLElement>(
      'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
    )].filter((element) => isShown(element))

  /*
   * Keep Tab inside the open drawer, but include the control that opened it:
   * the drawer has no close button of its own, so a trap that excluded the
   * opener would leave no way out for a keyboard user.
   */
  const trap = (event: KeyboardEvent): void => {
    if (event.key !== 'Tab') return
    const screen = document.querySelector<HTMLElement>('.VPNavScreen')
    const sidebar = document.querySelector<HTMLElement>('.VPSidebar.open')
    const panel = isShown(screen) ? screen : isShown(sidebar) ? sidebar : null
    if (!panel) return
    const opener = panel === screen
      ? document.querySelector<HTMLElement>('.VPNavBarHamburger')
      : document.querySelector<HTMLElement>('.VPLocalNav .menu')
    const items = [...(isShown(opener) ? [opener] : []), ...focusable(panel)]
    if (items.length === 0) return
    const active = document.activeElement
    if (!(active instanceof HTMLElement) || !items.includes(active)) {
      event.preventDefault()
      items[0]!.focus()
      return
    }
    if (event.shiftKey && active === items[0]) {
      event.preventDefault()
      items[items.length - 1]!.focus()
    } else if (!event.shiftKey && active === items[items.length - 1]) {
      event.preventDefault()
      items[0]!.focus()
    }
  }

  const start = (): void => {
    markGroups()
    syncFocus()
    document.addEventListener('keydown', trap, true)
    new MutationObserver(schedule).observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['class'],
    })
  }

  if (document.body) start()
  else document.addEventListener('DOMContentLoaded', start, { once: true })
}
