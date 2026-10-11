import React, { useState, useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSecurityQuestion, resetPassword, clearAuthError } from './authSlice';
import styles from './Auth.module.css';

const EmailSchema = Yup.object().shape({
  email: Yup.string().email('Invalid email').required('Email is required'),
});

const ResetSchema = Yup.object().shape({
  securityAnswer: Yup.string().required('Answer is required'),
  newPassword: Yup.string().min(6, 'At least 6 characters').required('New password is required'),
});

export default function ForgotPassword() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, securityQuestion, message } = useSelector((state) => state.auth);
  const [email, setEmail] = useState('');

  useEffect(() => {
    dispatch(clearAuthError());
  }, [dispatch]);

  useEffect(() => {
    if (message) {
      const t = setTimeout(() => navigate('/login'), 1500);
      return () => clearTimeout(t);
    }
  }, [message, navigate]);

  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        <h1 className={styles.title}>Reset password</h1>
        <p className={styles.subtitle}>No email needed — just answer your security question.</p>

        {error && <div className={styles.alert}>{error}</div>}
        {message && <div className={styles.success}>{message} Redirecting to login...</div>}

        {!securityQuestion ? (
          <Formik
            initialValues={{ email: '' }}
            validationSchema={EmailSchema}
            onSubmit={(values) => {
              setEmail(values.email);
              dispatch(fetchSecurityQuestion(values.email));
            }}
          >
            <Form>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="email">Account email</label>
                <Field className={styles.input} id="email" name="email" type="email" placeholder="you@example.com" />
                <ErrorMessage name="email" component="div" className="error-text" />
              </div>
              <button type="submit" className={`btn ${styles.submit}`} disabled={isLoading}>
                {isLoading ? 'Looking up...' : 'Continue'}
              </button>
            </Form>
          </Formik>
        ) : (
          <Formik
            initialValues={{ securityAnswer: '', newPassword: '' }}
            validationSchema={ResetSchema}
            onSubmit={(values) => dispatch(resetPassword({ email, ...values }))}
          >
            <Form>
              <div className={styles.field}>
                <label className={styles.label}>Security question</label>
                <p style={{ fontWeight: 600, margin: '4px 0 0' }}>{securityQuestion}</p>
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="securityAnswer">Your answer</label>
                <Field className={styles.input} id="securityAnswer" name="securityAnswer" />
                <ErrorMessage name="securityAnswer" component="div" className="error-text" />
              </div>
              <div className={styles.field}>
                <label className={styles.label} htmlFor="newPassword">New password</label>
                <Field className={styles.input} id="newPassword" name="newPassword" type="password" />
                <ErrorMessage name="newPassword" component="div" className="error-text" />
              </div>
              <button type="submit" className={`btn ${styles.submit}`} disabled={isLoading}>
                {isLoading ? 'Resetting...' : 'Reset Password'}
              </button>
            </Form>
          </Formik>
        )}

        <div className={styles.footer}>
          <Link to="/login">Back to login</Link>
        </div>
      </div>
    </div>
  );
}
