import { useAppContext } from '@/context/AppContext';
import { AppStatusContainer as Container } from '../styles/modules/app-status';
import { actions } from '@/data/actions';

export default function AppStatus(): JSX.Element {
  const { state, dispatch } = useAppContext();
  return (
    <>
      {state.app_status.is_active && (
        <Container>
          <section className='content'>
            <div className='icon'>
              <state.app_status.icon />
            </div>
            <div className='message'>
              {state.app_status.err_message && (
                <h3>{state.app_status.err_message}</h3>
              )}
            </div>
            {state.app_status.button_label && (
              <button
                onClick={() => {
                  state.app_status.action_function
                    ? state.app_status.action_function()
                    : undefined;
                  dispatch({
                    type: actions.APP_STATUS,
                    payload: {
                      ...state,
                      app_status: {
                        ...state.app_status,
                        is_active: false
                      }
                    }
                  });
                }}>
                <span>{state.app_status.button_label}</span>
              </button>
            )}
          </section>
        </Container>
      )}
    </>
  );
}
2;
