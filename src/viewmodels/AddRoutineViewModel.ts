import { useReducer } from 'react';
import { RoutineType, RoutineRepeat } from '../models/Routine';
import { RoutineBusiness } from '../business/RoutineBusiness';

const business = new RoutineBusiness();

interface AddRoutineState {
  title: string;
  type: RoutineType;
  plantId: string;
  plantName: string;
  date: string;
  time: string;
  repeat: RoutineRepeat;
  saving: boolean;
  error: string | null;
  success: boolean;
}

type AddRoutineAction =
  | { type: 'SET_TITLE'; value: string }
  | { type: 'SET_TYPE'; value: RoutineType }
  | { type: 'SET_PLANT'; plantId: string; plantName: string }
  | { type: 'SET_DATE'; value: string }
  | { type: 'SET_TIME'; value: string }
  | { type: 'SET_REPEAT'; value: RoutineRepeat }
  | { type: 'SAVE_START' }
  | { type: 'SAVE_SUCCESS' }
  | { type: 'SAVE_ERROR'; error: string };

const today = new Date().toISOString().split('T')[0];
const nowTime = new Date().toTimeString().slice(0, 5);

const initialState: AddRoutineState = {
  title: '',
  type: 'rega',
  plantId: '',
  plantName: '',
  date: today,
  time: nowTime,
  repeat: 'nunca',
  saving: false,
  error: null,
  success: false,
};

function reducer(state: AddRoutineState, action: AddRoutineAction): AddRoutineState {
  switch (action.type) {
    case 'SET_TITLE':    return { ...state, title: action.value, error: null };
    case 'SET_TYPE':     return { ...state, type: action.value, title: '' };
    case 'SET_PLANT':    return { ...state, plantId: action.plantId, plantName: action.plantName };
    case 'SET_DATE':     return { ...state, date: action.value };
    case 'SET_TIME':     return { ...state, time: action.value };
    case 'SET_REPEAT':   return { ...state, repeat: action.value };
    case 'SAVE_START':   return { ...state, saving: true, error: null };
    case 'SAVE_SUCCESS': return { ...state, saving: false, success: true };
    case 'SAVE_ERROR':   return { ...state, saving: false, error: action.error };
    default: return state;
  }
}

export function useAddRoutineViewModel() {
  const [state, dispatch] = useReducer(reducer, initialState);

  async function save() {
    const validationError = business.validate(state.title, state.date, state.time);
    if (validationError) {
      dispatch({ type: 'SAVE_ERROR', error: validationError });
      return false;
    }

    dispatch({ type: 'SAVE_START' });
    try {
      const granted = await business.requestPermissions();
      if (!granted) {
        dispatch({ type: 'SAVE_ERROR', error: 'Permissão de notificação negada.' });
        return false;
      }
      await business.add({
        title: state.title,
        type: state.type,
        plantId: state.plantId || undefined,
        plantName: state.plantName || undefined,
        date: state.date,
        time: state.time,
        repeat: state.repeat,
      });
      dispatch({ type: 'SAVE_SUCCESS' });
      return true;
    } catch (e: any) {
      dispatch({ type: 'SAVE_ERROR', error: e.message ?? 'Erro ao salvar.' });
      return false;
    }
  }

  return {
    ...state,
    setTitle:  (v: string)        => dispatch({ type: 'SET_TITLE', value: v }),
    setType:   (v: RoutineType)   => dispatch({ type: 'SET_TYPE', value: v }),
    setPlant:  (id: string, name: string) => dispatch({ type: 'SET_PLANT', plantId: id, plantName: name }),
    setDate:   (v: string)        => dispatch({ type: 'SET_DATE', value: v }),
    setTime:   (v: string)        => dispatch({ type: 'SET_TIME', value: v }),
    setRepeat: (v: RoutineRepeat) => dispatch({ type: 'SET_REPEAT', value: v }),
    save,
  };
}
