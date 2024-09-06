import { useAppContext } from '@/context/app-context';
import { actions } from '@/shared/actions';
import { _capturer as Container } from '@/styles/modules/working-capturer';
import { AnimatePresence, motion } from 'framer-motion';
import type { Dispatch, SetStateAction } from 'react';
import * as Io from 'react-icons/io5';

export const initialExperienceState = {
  id: '',
  career: '',
  end_date: '',
  start_date: '',
  description: '',
  portfolio_url: '',
  company_name: ''
};

type Props = {
  setStateFn: Dispatch<SetStateAction<typeof initialExperienceState>>;
  initialData: typeof initialExperienceState;
  saveFn: () => void;
  updateFn: (id: string) => void;
};

export function WorkDataPrompt(props: Props) {
  const { state, dispatch } = useAppContext();

  return (
    <AnimatePresence>
      {state.isUserWorkingDataModal && (
        <Container
          forwardedAs={'section'}
          className='main'
          onClick={(e) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              dispatch({
                type: actions.USER_WORKING_DATA_MODAL,
                payload: {
                  ...state,
                  isUserWorkingDataModal: !state.isUserWorkingDataModal
                }
              });
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: { duration: 0.3 }
            }}
            exit={{ opacity: 0, scale: 0 }}>
            <div className='dialog-prompt'>
              <div className='prompt-info'>
                <div className='prompt-header'>
                  <span className='prompt-title'>Experiência Profissional</span>
                  <p className='prompt-message'>
                    Coloque informações relevantes da sua experiência profissional para os
                    recrutadores.
                  </p>
                </div>

                <section className='form-container'>
                  <section className='form' spellCheck={'true'}>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='career'>
                          <Io.IoEllipsisHorizontal />
                          <span>Carreira Profissional</span>
                        </label>
                        <input
                          type='text'
                          id='career'
                          placeholder='Carreira Profissional'
                          required={true}
                          value={props.initialData.career}
                          onChange={(e) =>
                            props.setStateFn(({ career, ...data }) => ({
                              ...data,
                              career: e.target.value
                            }))
                          }
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='company_name'>
                          <Io.IoEllipsisHorizontal />
                          <span>Empresa (ou empregador)</span>
                        </label>
                        <input
                          type='text'
                          id='company_name'
                          placeholder='Empresa'
                          value={props.initialData.company_name}
                          required={true}
                          onChange={(e) =>
                            props.setStateFn(({ company_name, ...data }) => ({
                              ...data,
                              company_name: e.target.value
                            }))
                          }
                        />
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='start_date'>
                          <Io.IoCalendarNumberOutline />
                          <span>Data de Início</span>
                        </label>
                        <input
                          type='date'
                          id='start_date'
                          onChange={(e) =>
                            props.setStateFn(({ start_date, ...data }) => ({
                              ...data,
                              start_date: e.target.value
                            }))
                          }
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='end_date'>
                          <Io.IoCalendarNumberOutline />
                          <span>Data de Encerramento</span>
                        </label>
                        <input
                          type='date'
                          id='end_date'
                          onChange={(e) =>
                            props.setStateFn(({ end_date, ...data }) => ({
                              ...data,
                              end_date: e.target.value
                            }))
                          }
                        />
                      </div>
                    </section>

                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='portfolio_url'>
                          <Io.IoLinkOutline />
                          <span>Endereço do Portfólio</span>
                        </label>
                        <input
                          type='url'
                          id='portfolio_url'
                          placeholder='Coloque o link (URL) do seu portfólio profissional'
                          maxLength={100}
                          value={props.initialData.portfolio_url}
                          onChange={(e) =>
                            props.setStateFn(({ portfolio_url, ...data }) => ({
                              ...data,
                              portfolio_url: e.target.value
                            }))
                          }
                        />
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='description'>
                          <Io.IoLinkOutline />
                          <span>Notas</span>
                        </label>
                        <textarea
                          id='description'
                          placeholder='Anotações relevantes a carreira'
                          rows={3}
                          maxLength={256}
                          value={props.initialData.description}
                          onChange={(e) =>
                            props.setStateFn(({ description, ...data }) => ({
                              ...data,
                              description: e.target.value
                            }))
                          }
                        />
                      </div>
                    </section>

                    <div className='prompt-actions'>
                      <button
                        type='reset'
                        className='prompt-cancel'
                        onClick={() => {
                          dispatch({
                            type: actions.USER_WORKING_DATA_MODAL,
                            payload: {
                              ...state,
                              isUserWorkingDataModal: !state.isUserWorkingDataModal
                            }
                          });
                          props.setStateFn(() => ({ ...initialExperienceState }));
                        }}>
                        <Io.IoClose />
                        <span>Cancelar</span>
                      </button>
                      {props.initialData.id ? (
                        <button
                          onClick={() => props.updateFn(props.initialData.id)}
                          className='prompt-accept'>
                          <Io.IoPushOutline />
                          <span>Atualizar</span>
                        </button>
                      ) : (
                        <button className='prompt-accept' onClick={props.saveFn}>
                          <Io.IoCheckmark />
                          <span>Adicionar experiência</span>
                        </button>
                      )}
                    </div>
                  </section>
                </section>
              </div>
            </div>
          </motion.section>
        </Container>
      )}
    </AnimatePresence>
  );
}
