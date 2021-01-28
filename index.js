import { useLayoutEffect, useRef, useState } from 'react'

/**
 *
 * @param {Boolean} locked Starting state of body scroll lock
 *
 * @returns {Array} [locked, toggleLocked]
 */
export default function useLockBodyScroll (initLocked = true) {
  const [locked, setLocked] = useState(initLocked)
  const originalStyle = useRef(null)

  useLayoutEffect(() => {
    originalStyle.current = window.getComputedStyle(document.body).overflow
    return () => {
      document.body.style.overflow = originalStyle.current
    }
  }, [])

  useLayoutEffect(() => {
    if (locked) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = originalStyle.current
    }
  }, [locked])

  return [locked, () => setLocked((locked) => !locked)]
}
