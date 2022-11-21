import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import {RootState, RootDispatch} from './store';

export const useRootDispatch = () => useDispatch<RootDispatch>();
export const useRootSelector: TypedUseSelectorHook<RootState> = useSelector;
