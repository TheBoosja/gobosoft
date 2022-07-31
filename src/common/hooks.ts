import {RefObject, useCallback, useEffect} from "react";
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppDispatch, RootState} from "../store";

export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export const useOnClickOutside = (
  ref: RefObject<HTMLElement>,
  handler: (e: MouseEvent | TouchEvent) => void,
  isActive: boolean
) => {
  const _handler = useCallback(handler, [ref, handler])

  useEffect(() => {
    if (!isActive) {
      return
    }

    const listener = (event: MouseEvent | TouchEvent) => {
      if (!ref.current || ref.current.contains(event.target as Node)) {
        return
      }

      _handler(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, _handler, isActive])
}
