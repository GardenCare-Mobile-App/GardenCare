import { useReducer, useCallback } from 'react';
import { useFocusEffect } from '@react-navigation/native';
import { Routine } from '../models/Routine';
import { RoutineBusiness } from '../business/RoutineBusiness';

const business = new RoutineBusiness();

interface RoutineState {
  routines: Routine[];
  loading: boolean;
  error: string | null;
}

type RoutineAction =
  | { type: 'LOAD_START' }
  | { type: 'LOAD_SUCCESS'; routines: Routine[] }
  | { type: 'LOAD_ERROR'; error: string }
  | { type: 'MARK_DONE'; id: string }
  | { type: 'REMOVE'; id: string };

const initialState: RoutineState = {
  routines: [],
  loading: true,
  error: null,
};

function reducer(state: RoutineState, action: RoutineAction): RoutineState {
  switch (action.type) {
    case 'LOAD_START':
      return { ...state, loading: true, error: null };
    case 'LOAD_SUCCESS':
      return { ...state, loading: false, routines: action.routines };
    case 'LOAD_ERROR':
      return { ...state, loading: false, error: action.error };
    case 'MARK_DONE':
      return {
        ...state,
        routines: state.routines.map(r =>
          r.id === action.id ? { ...r, done: true } : r
        ),
      };
    case 'REMOVE':
      return { ...state, routines: state.routines.filter(r => r.id !== action.id) };
    default:
      return state;
  }
}

export function useRoutineViewModel() {
  const [state, dispatch] = useReducer(reducer, initialState);

  useFocusEffect(
    useCallback(() => { load(); }, [])
  );

  async function load() {
    dispatch({ type: 'LOAD_START' });
    try {
      const routines = await business.getAll();
      dispatch({ type: 'LOAD_SUCCESS', routines });
    } catch {
      dispatch({ type: 'LOAD_ERROR', error: 'Erro ao carregar rotinas.' });
    }
  }

  async function markDone(routine: Routine) {
    dispatch({ type: 'MARK_DONE', id: routine.id });
    await business.markDone(routine);
  }

  async function remove(routine: Routine) {
    dispatch({ type: 'REMOVE', id: routine.id });
    await business.delete(routine);
  }

  const pending = state.routines.filter(r => !r.done);
  const done    = state.routines.filter(r => r.done);

  return { ...state, pending, done, markDone, remove, reload: load };
}