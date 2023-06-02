import { useState } from 'react';
import emailjs from '@emailjs/browser';
import { motion } from 'framer-motion';
import Layout from '../components/Layout';
import { InputEvents, SubmitEvent } from '../../@types';
import { complements } from '@/data/app-data';
import { BiEnvelope, BiMailSend } from 'react-icons/bi';
import { ContactContainer as Container } from '@/styles/common/contact';

export default function Contact(): JSX.Element {
  const [messageStatus, setMessageStatus] = useState(
    'Receberá a resposta para o seu e-mail assim que possível.'
  );

  const [formData, setFormData] = useState({
    name: complements.websiteName,
    email: complements.email,
    subject: '',
    message: '',
    from_email: ''
  });

  // picks form data
  function formDataPicker(e: InputEvents): void {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value
    }));
  }

  // sends email
  function emailSender(e: SubmitEvent): void {
    e.preventDefault();
    emailjs
      .send(
        'service_sjw9i8b',
        'template_eso630j',
        formData,
        'z3FUpU83GBFJyGXVF'
      )
      .then(
        (result) => {
          console.log(result.text);
          setMessageStatus('Mensagem enviada com sucesso!');
        },
        (error) => {
          console.error(error.text);
          setMessageStatus(
            'Oops! Houve um erro ao enviar a sua mensagem. Por favor, tente novamente.'
          );
        }
      );
  }

  return (
    <Layout metadata={{ title: complements.defaultTitle + ' | Contato' }}>
      <Container>
        <article className='container'>
          <section className='intro'>
            <h1>Fique sempre ligado</h1>
            <h2>Como podemos ajudar?</h2>
            <p>
              Por favor, utilize uma das formas de contacto abaixo, clicando no
              endereço de e-mail ou utilizando o{' '}
              <strong>formulário de contacto</strong> para que possamos
              esclarecer quaisquer questões sobre os nossos produtos e serviços.
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
                href={`mailto:${complements.email}`}>
                {complements.email}
              </a>
            </span>
          </div>
          <form onSubmit={emailSender}>
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
