import Layout from '@/components/Layout';
import SelectContainer from '@/components/Select';
import { useAppContext } from '@/context/AppContext';
import { useModulesContext } from '@/context/Modules';
import { constants, denounceReasons } from '@/data/constants';
import { actions } from '@/shared/actions';
import { DenounceContainer as Container } from '@/styles/common/denounce';
import { HttpError } from '@/types';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { IoBan, IoCheckmark, IoClose, IoEllipsisHorizontal } from 'react-icons/io5';

export default function Denounce() {
  const router = useRouter();
  const { requestLogin } = useModulesContext();
  const [msg, setMsg] = useState<string>('');
  const { state, dispatch, httpClient } = useAppContext();

  const handleCreateDenounce = async () => {
    try {
      const { url, type, id } = router.query;
      await httpClient({
        method: 'post',
        url: `/api/v1/users/denounces`,
        data: {
          content: state.denounce.content,
          report_type: state.denounce.reason,
          resource_type: type || 'generic',
          resource_url: url || '',
          resource_id: id || ''
        }
      });
      dispatch({
        type: actions.CREATE_DENOUNCE,
        payload: {
          ...state,
          denounce: { content: '', reason: '' }
        }
      });
      setMsg('Denúncia enviada com sucesso.');
    } catch (error) {
      setMsg((error as HttpError).response?.data?.message || (error as HttpError).message);
      console.error(
        (error as HttpError).response?.data?.message || (error as HttpError).message
      );
    }
  };

  useEffect(() => {
    return () => {
      dispatch({
        type: actions.CREATE_DENOUNCE,
        payload: {
          ...state,
          denounce: { content: '', reason: '' }
        }
      });
    };
  }, []);

  useEffect(() => {
    const debounceTimer = setTimeout(() => {
      setMsg(' ');
    }, 5000);
    return () => clearTimeout(debounceTimer);
  }, [msg]);

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Denunciar abuso` }}>
      <Container>
        <div className='main-container'>
          <article>
            <h1>
              <IoBan />
              <span>Denunciar abuso</span>
            </h1>
            <section className='form-container'>
              <p>
                Obrigado por denunciar qualquer abuso que viole o nosso{' '}
                <Link href={'/legal/code-of-conduct'}>
                  <span>código de conduta</span>
                </Link>{' '}
                ou os{' '}
                <Link href={'/legal/terms-of-use'}>
                  <span>termos e condições</span>
                </Link>
                . Continuamos a tentar tornar este ambiente ótimo e saudável para todos.
              </p>
              <p className='prompt-message'>
                Coloque informações que acha relevantes à sua denúncia (o denunciado não
                saberá quem o denunciou)
              </p>
              <section className='form' spellCheck={'true'}>
                <section className='form-section'>
                  <div className='form-element'>
                    <label htmlFor='career'>
                      <IoEllipsisHorizontal />
                      <span>Razão da Denúncia *</span>
                    </label>
                    <SelectContainer
                      options={denounceReasons}
                      placeholder={'Selecione um dos motivos'}
                      onChange={(option: any) => {
                        dispatch({
                          type: actions.CREATE_DENOUNCE,
                          payload: {
                            ...state,
                            denounce: {
                              ...state.denounce,
                              reason: option?.value
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
                      <span>Informações adicionais *</span>
                    </label>

                    <textarea
                      id='description'
                      name='description'
                      autoComplete='off'
                      placeholder='Forneça qualquer informação ou contexto adicional que nos ajude a entender e lidar com a situação.'
                      aria-label='Forneça qualquer informação ou contexto adicional que nos ajude a entender e lidar com a situação.'
                      onMouseDown={() => {
                        if (!state.auth.token) return requestLogin();
                      }}
                      onTouchEnd={() => {
                        if (!state.auth.token) return requestLogin();
                      }}
                      onChange={(e) =>
                        dispatch({
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
                      value={state.denounce.content}
                      maxLength={1024}
                      rows={10}
                    />
                    <span className='counter'>{`${
                      state.denounce.content?.length || 0
                    } / 1024`}</span>
                  </div>
                </section>

                <span className='error-message'>{msg}</span>

                <div className='prompt-actions'>
                  <button
                    className='prompt-cancel'
                    type='reset'
                    onClick={() => {
                      dispatch({
                        type: actions.CREATE_DENOUNCE,
                        payload: {
                          ...state,
                          denounce: { content: '', reason: '' }
                        }
                      });
                      router.back();
                    }}>
                    <IoClose />
                    <span>Cancelar</span>
                  </button>

                  <motion.button
                    whileTap={{ scale: 0.8 }}
                    whileHover={{ scale: 1.05 }}
                    disabled={msg.length < 1 && true}
                    className='prompt-accept'
                    onClick={() => {
                      if (!state.auth.token) return requestLogin();
                      handleCreateDenounce();
                    }}>
                    <IoCheckmark />
                    <span>Enviar denúncia</span>
                  </motion.button>
                </div>
              </section>
            </section>
          </article>
        </div>
      </Container>
    </Layout>
  );
}
