import { constants } from '@/data/constants';
import { ContactContainer as Container } from '@/styles/common/contact';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { BiEnvelope, BiMailSend } from 'react-icons/bi';
import Layout from '../components/Layout';
import { InputEvents, SubmitEvent } from '../types';

export default function Page() {
  const [messageStatus, setMessageStatus] = useState(
    'Receberá a resposta para o seu e-mail assim que possível.'
  );

  const [formData, setFormData] = useState({
    name: constants.websiteName,
    email: constants.email,
    subject: '',
    message: '',
    from_email: ''
  });

  // picks form data
  function formDataPicker(e: InputEvents) {
    return setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

  // sends email
  async function handleSendEmail(e: SubmitEvent) {
    e.preventDefault();
    try {
      await emailjs.send(
        'service_sjw9i8b',
        'template_eso630j',
        formData,
        'z3FUpU83GBFJyGXVF'
      );
      setMessageStatus('Mensagem enviada com sucesso!');
    } catch (error) {
      console.error((error as Error).message);
      setMessageStatus(
        'Oops! Houve um erro ao enviar a sua mensagem. Por favor, tente novamente.'
      );
    }
  }

  return (
    <Layout metadata={{ title: `${constants.defaultTitle} | Contato` }}>
      <Container>
        <article className='container'>
          <section className='intro'>
            <h1>Fale conosco</h1>
            <h2>Como podemos ajudar?</h2>
            <p>
              Por favor, utilize uma das formas de contacto abaixo, clicando no endereço de
              e-mail ou utilizando o <strong>formulário de contacto</strong> para que
              possamos esclarecer quaisquer questões sobre os nossos produtos e serviços.
            </p>
            <p>
              <strong>
                Lembre-se que sempre estaremos abertos a sugestões de como podemos melhor
                ajudar.
              </strong>
              Viu algum incomum, problemas ou erros no sistema? Reporte, assim corrigimos o
              mais rápido possível.
            </p>
            <p>
              <strong>
                Cultivamos a boa interação e comunicação entre os nossos clientes, usuários
                e parceiros.
              </strong>{' '}
              Caso algo de errado tenha acontecido, nos escreva, sempre estará em anonimato.
            </p>
          </section>
          <div>
            <h3>
              <BiEnvelope />
              <span>Nosso endereço de e-mail:</span>
            </h3>
            <span>
              <a
                target='_blank'
                rel='noreferrer noopener'
                href={`mailto:${constants.email}`}>
                {constants.email}
              </a>
            </span>
          </div>
          <form onSubmit={handleSendEmail}>
            <section className='form-control'>
              <div className='form-item'>
                <label htmlFor='assunto'>Assunto</label>
                <input
                  type='text'
                  id='assunto'
                  name='subject'
                  maxLength={120}
                  required
                  placeholder='Assunto da mensagem'
                  onChange={(e) => formDataPicker(e)}
                />
              </div>
              <div className='form-item'>
                <label htmlFor='email'>E-mail</label>
                <input
                  type='email'
                  id='email'
                  name='from_email'
                  required
                  placeholder='Escreva o seu endereço de e-mail'
                  maxLength={30}
                  onChange={(e) => formDataPicker(e)}
                />
              </div>
            </section>
            <label htmlFor='message'>Mensagem</label>
            <textarea
              id='message'
              name='message'
              cols={30}
              rows={10}
              maxLength={2500}
              required
              placeholder='Escreva a sua mensagem'
              onChange={(e) => formDataPicker(e)}
            />
            <span className='errorMessage'>{messageStatus}</span>
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              type='submit'>
              <BiMailSend />
              <span>Enviar mensagem</span>
            </motion.button>
          </form>
        </article>
      </Container>
    </Layout>
  );
}
