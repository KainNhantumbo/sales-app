import { useAppContext } from '@/context/AppContext';
import { _capturer as Container } from '@/styles/modules/working-capturer';
import { AnimatePresence, motion } from 'framer-motion';
import { Dispatch, SetStateAction } from 'react';
import {
  IoCalendarNumberOutline,
  IoCheckmark,
  IoClose,
  IoEllipsisHorizontal,
  IoLinkOutline,
  IoPushOutline
} from 'react-icons/io5';

interface Props {
  setStateFn: Dispatch<
    SetStateAction<{
      id: string;
      career: string;
      end_date: string;
      start_date: string;
      description: string;
      portfolio_url: string;
      company_name: string;
    }>
  >;
  initialData: {
    id: string;
    career: string;
    end_date: string;
    start_date: string;
    description: string;
    portfolio_url: string;
    company_name: string;
  };
  saveFn: () => void;
  updateFn: (id: string) => void;
}

export function WorkCapturer(props: Props) {
  const { state, userWorkingDataController } = useAppContext();

  return (
    <AnimatePresence>
      {state.isUserWorkingDataModal && (
        <Container
          className='main'
          onClick={(e) => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              userWorkingDataController();
            }
          }}>
          <motion.section
            className='dialog-modal'
            initial={{ opacity: 0, scale: 0 }}
            animate={{
              opacity: 1,
              scale: 1,
              transition: {
                duration: 0.3
              }
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
                          <IoEllipsisHorizontal />
                          <span>Carreira Profissional</span>
                        </label>
                        <input
                          type='text'
                          id='career'
                          placeholder='Carreira Profissional'
                          aria-label='Carreira Profissional'
                          required={true}
                          onChange={(e) =>
                            props.setStateFn(({ career, ...data }) => ({
                              ...data,
                              career: e.target.value
                            }))
                          }
                          value={props.initialData.career}
                        />
                      </div>
                      <div className='form-element'>
                        <label htmlFor='company_name'>
                          <IoEllipsisHorizontal />
                          <span>Empresa (ou empregador)</span>
                        </label>
                        <input
                          type='text'
                          id='company_name'
                          placeholder='Entidade empregadora'
                          aria-label='Empresa (ou entidade empregadora)'
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
                          <IoCalendarNumberOutline />
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
                          <IoCalendarNumberOutline />
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
                          <IoLinkOutline />
                          <span>Endereço do Portifólio Profissional</span>
                        </label>
                        <input
                          type='url'
                          id='portfolio_url'
                          placeholder='Coloque o link (URL) do seu portifólio profissional'
                          aria-label='Coloque o link (URL) do seu portifólio profissional'
                          maxLength={100}
                          onChange={(e) =>
                            props.setStateFn(({ portfolio_url, ...data }) => ({
                              ...data,
                              portfolio_url: e.target.value
                            }))
                          }
                          value={props.initialData.portfolio_url}
                        />
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='description'>
                          <IoLinkOutline />
                          <span>Notas</span>
                        </label>
                        <textarea
                          id='description'
                          placeholder='Anotações relevantes a carreira'
                          aria-label='Anotações relevantes a carreira'
                          rows={3}
                          maxLength={256}
                          onChange={(e) =>
                            props.setStateFn(({ description, ...data }) => ({
                              ...data,
                              description: e.target.value
                            }))
                          }
                          value={props.initialData.description}
                        />
                      </div>
                    </section>

                    <div className='prompt-actions'>
                      <button
                        className='prompt-cancel'
                        type='reset'
                        onClick={() => {
                          userWorkingDataController();
                          props.setStateFn(() => {
                            return {
                              id: '',
                              career: '',
                              end_date: '',
                              start_date: '',
                              description: '',
                              portfolio_url: '',
                              company_name: ''
                            };
                          });
                        }}>
                        <IoClose />
                        <span>Cancelar</span>
                      </button>
                      {props.initialData.id ? (
                        <button
                          onClick={() => props.updateFn(props.initialData.id)}
                          className='prompt-accept'>
                          <IoPushOutline />
                          <span>Atualizar</span>
                        </button>
                      ) : (
                        <button className='prompt-accept' onClick={() => props.saveFn()}>
                          <IoCheckmark />
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
