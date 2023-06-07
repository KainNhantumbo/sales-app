import Select from 'react-select';
import { actions } from '@/data/actions';
import { useAppContext } from '@/context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import { denounceReasons } from '@/data/app-data';
import { IoCheckmark, IoClose, IoEllipsisHorizontal } from 'react-icons/io5';
import { CapturerContainer as Container } from '../../styles/modules/user-working-data';
import { renderReactSelectCSS } from '@/styles/select';
import { useTheme } from 'styled-components';

interface IProps {
  title: string;
  handleCreateDenounce: () => Promise<void>;
}

export default function Denounce(props: IProps): JSX.Element {
  const theme = useTheme();
  const { state, dispatch, denounceModalController } = useAppContext();
  return (
    <AnimatePresence>
      {state.isDenounceModal && (
        <Container
          className='main'
          onClick={(e): void => {
            const target = (e as any).target.classList;
            if (target.contains('main')) {
              denounceModalController();
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
                <div className='prompt-info'>
                  <span className='prompt-title'>{props.title}</span>
                  <p className='prompt-message'>
                    Coloque informações que acha relevantes à sua denúncia (o
                    denunciado não saberá quem o denúnciou)
                  </p>
                </div>

                <section className='form-container'>
                  <section className='form' spellCheck={'true'}>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='carrer'>
                          <IoEllipsisHorizontal />
                          <span>Razão da Denúncia *</span>
                        </label>
                        <Select
                          styles={renderReactSelectCSS(theme)}
                          options={denounceReasons}
                          placeholder={'Selecione um dos motivos'}
                          onChange={(value) => {
                            dispatch({
                              type: actions.CREATE_DENOUNCE,
                              payload: {
                                ...state,
                                denounce: {
                                  ...state.denounce,
                                  reson: String(value)
                                }
                              }
                            });
                          }}
                        />
                      </div>
                    </section>
                    <section className='form-section'>
                      <div className='form-element'>
                        <label htmlFor='description'>
                          <IoEllipsisHorizontal />
                          <span>Informações adicionais</span>
                        </label>

                        <textarea
                          id='description'
                          name='description'
                          autoComplete='off'
                          placeholder='Escreva qualquer informação relevante a sua denúncia (o denunciado não saberá quem o denúnciou)'
                          aria-label='Escreva qualquer informação relevante a sua denúncia (o denunciado não saberá quem o denúnciou)'
                          onChange={(e): void =>
                            e.target.value.length > 1024
                              ? undefined
                              : dispatch({
                                  type: actions.CREATE_DENOUNCE,
                                  payload: {
                                    ...state,
                                    denounce: {
                                      ...state.denounce,
                                      content: e.target.value
                                    }
                                  }
                                })
                          }
                          value={state.store.description}
                          maxLength={1024}
                          rows={10}
                        />
                        <span className='counter'>{`${
                          state.store.description?.length || 0
                        } / 1024`}</span>
                      </div>
                    </section>

                    <div className='prompt-actions'>
                      <button
                        className='prompt-cancel'
                        type='reset'
                        onClick={() => {
                          denounceModalController();
                          dispatch({
                            type: actions.CREATE_DENOUNCE,
                            payload: {
                              ...state,
                              denounce: {
                                content: '',
                                reson: '',
                                source_url: '',
                                resource_id: ''
                              }
                            }
                          });
                        }}>
                        <IoClose />
                        <span>Cancelar</span>
                      </button>

                      <button
                        className='prompt-accept'
                        onClick={() =>
                          state.denounce.reson
                            ? props.handleCreateDenounce()
                            : undefined
                        }>
                        <IoCheckmark />
                        <span>Enviar denúncia</span>
                      </button>
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
