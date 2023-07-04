import {
  IoBan,
  IoCheckmark,
  IoClose,
  IoEllipsisHorizontal,
} from 'react-icons/io5';
import Link from 'next/link';
import Select from 'react-select';
import Layout from '@/components/Layout';
import { useAppContext } from '@/context/AppContext';
import { useRouter } from 'next/router';
import { complements } from '@/data/app-data';
import { renderReactSelectCSS } from '@/styles/select';
import { useTheme } from 'styled-components';
import { motion } from 'framer-motion';
import { actions } from '@/data/actions';
import { denounceReasons } from '@/data/app-data';
import { useEffect, useState } from 'react';
import RequestLogin from '@/components/modals/RequestLogin';
import { DenounceContainer as Container } from '../styles/common/denounce';

export default function Denounce(): JSX.Element {
  const theme = useTheme();
  const router = useRouter();
  const [msg, setMsg] = useState('');
  const { state, dispatch, fetchAPI, loginPromptController } = useAppContext();

  async function handleCreateDenounce(): Promise<void> {
    try {
      const { url, type, id } = router.query;
      await fetchAPI({
        method: 'post',
        url: `/api/v1/users/denounces`,
        data: {
          content: state.denounce.content,
          report_type: state.denounce.reson,
          resource_type: type || 'generic',
          resource_url: url || '',
          resource_id: id || '',
        },
      });
      dispatch({
        type: actions.CREATE_DENOUNCE,
        payload: {
          ...state,
          denounce: { content: '', reson: '' },
        },
      });
      setMsg('Denúncia enviada com sucesso.');
    } catch (err: any) {
      setMsg(err.response?.data?.message);
      console.error(err.response?.data?.message || err);
    }
  }

  useEffect(() => {
    return () => {
      dispatch({
        type: actions.CREATE_DENOUNCE,
        payload: {
          ...state,
          denounce: { content: '', reson: '' },
        },
      });
    };
  }, []);

  useEffect(() => {
    const desc = setTimeout(() => {
      setMsg(' ');
    }, 5000);
    return () => clearTimeout(desc);
  }, [msg]);

  return (
    <Layout
      metadata={{ title: `${complements.defaultTitle} | Denunciar abuso` }}>
      <RequestLogin />
      <Container>
        <div className='main-container'>
          <article>
            <h1>
              <IoBan />
              <span>Denunciar abuso</span>
            </h1>
            <section className='form-container'>
              <p>
                Obrigado por denunciar qualquer abuso que viole nosso{' '}
                <Link href={'/legal/code-of-conduct'}>
                  <span>código de conduta</span>
                </Link>{' '}
                ou{' '}
                <Link href={'/legal/terms-of-use'}>
                  <span>termos e condições</span>
                </Link>
                . Continuamos a tentar tornar este ambiente ótimo e saudável
                para todos.
              </p>
              <p className='prompt-message'>
                Coloque informações que acha relevantes à sua denúncia (o
                denunciado não saberá quem o denúnciou)
              </p>
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
                      onChange={(option: any) => {
                        dispatch({
                          type: actions.CREATE_DENOUNCE,
                          payload: {
                            ...state,
                            denounce: {
                              ...state.denounce,
                              reson: option?.value,
                            },
                          },
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
                        if (!state.auth.token) {
                          loginPromptController();
                        }
                      }}
                      onTouchEnd={() => {
                        if (!state.auth.token) {
                          loginPromptController();
                        }
                      }}
                      onChange={(e): void => {
                        console.info(state.denounce);

                        e.target.value.length > 1024
                          ? undefined
                          : dispatch({
                              type: actions.CREATE_DENOUNCE,
                              payload: {
                                ...state,
                                denounce: {
                                  ...state.denounce,
                                  content: e.target.value,
                                },
                              },
                            });
                      }}
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
                          denounce: { content: '', reson: '' },
                        },
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
                    onClick={handleCreateDenounce}>
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
