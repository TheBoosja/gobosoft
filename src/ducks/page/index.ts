import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {useEffect} from 'react'
import {useAppDispatch} from '../../common/hooks'
import {RootState} from '../../store'

interface PageState {
  title: string
}

const initialState: PageState = {
  title: ''
}

export const pageSlice = createSlice({
  name: 'page',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload
    }
  }
})

export const {setTitle} = pageSlice.actions

export const selectTitle = (state: RootState) => state.page.title

export const useTitle = (title: string) => {
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(setTitle(title))

    return () => {
      dispatch(setTitle(''))
    }
  }, [])
}

export default pageSlice.reducer
