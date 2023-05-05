import Layout from '../components/Layout';
import emailjs from '@emailjs/browser';
import { ContactContainer as Container } from '@/styles/common/contact';
import { BiEnvelope, BiMailSend } from 'react-icons/bi';
import { motion } from 'framer-motion';
import { ChangeEvent, FormEvent, useState } from 'react';
import { NextPage } from 'next';
import { complements } from '@/data/app-data';

const Contact: NextPage = (): JSX.Element => {
  const [messageStatus, setMessageStatus] = useState(
    'You will receive our reply to your email as soon as possible.'
  );

  const [formData, setFormData] = useState({
    name: complements.websiteName,
    email: complements.email,
    subject: '',
    message: '',
    from_email: '',
  });

  // picks form data
  const formDataPicker = (
    e: ChangeEvent<HTMLInputElement> | ChangeEvent<HTMLTextAreaElement>
  ) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  // sends email
  const emailSender = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // email sender transport
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
          setMessageStatus('Message sent successfully!');
        },
        (error) => {
          console.log(error.text);
          setMessageStatus(
            'Oops! Looks like something went wrong. Please try again.'
          );
        }
      );
  };

  return (
    <Layout metadata={{ title: 'Contact Us' }}>
      <Container>
        <article className='container'>
          <section className='intro'>
            <h1>Stay in touch</h1>
            <h2>How can we help you?</h2>
            <p>
              Please use one of the contact forms below by clicking on the
              e-mail <em>link</em> or use the
              <strong> contact form</strong> if you have questions about our
              services.
            </p>
          </section>
          <div className='contacts'>
            <h3>
              <BiEnvelope />
              <span>Our e-mail adress</span>
            </h3>
            <span>
              <a
                target='_blank'
                rel='noreferrer'
                href={`mailto:${complements.email}`}>
                {complements.email}
              </a>
            </span>
          </div>
          <form onSubmit={emailSender}>
            <section className='form-control'>
              <div className='form-item'>
                <label htmlFor='assunto'>Subject</label>
                <input
                  type='text'
                  id='assunto'
                  name='subject'
                  maxLength={120}
                  required
                  placeholder='Message subject'
                  onChange={(e) => formDataPicker(e)}
                />
              </div>
              <div className='form-item'>
                <label htmlFor='email'>E-mail adress</label>
                <input
                  type='email'
                  id='email'
                  name='from_email'
                  required
                  placeholder='Your e-mail adress'
                  maxLength={30}
                  onChange={(e) => formDataPicker(e)}
                />
              </div>
            </section>
            <label htmlFor='message'>Message</label>
            <textarea
              id='message'
              name='message'
              cols={30}
              rows={10}
              maxLength={2500}
              required
              placeholder='Write your message here'
              onChange={(e) => formDataPicker(e)}
            />
            <span className='errorMessage'>{messageStatus}</span>
            <motion.button
              whileTap={{ scale: 0.8 }}
              whileHover={{ scale: 1.05 }}
              type='submit'>
              <BiMailSend />
              <span>Send message</span>
            </motion.button>
          </form>
        </article>
      </Container>
    </Layout>
  );
};

export default Contact;
