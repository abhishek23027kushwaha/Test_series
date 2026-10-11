import React, { useEffect, useState } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import {
  FiArrowRight,
  FiEye,
  FiEyeOff,
  FiCheckCircle,
  FiCode,
  FiTrendingUp,
} from 'react-icons/fi';

import {
  loginUser,
  registerUser,
  clearAuthError,
} from './authSlice';

import styles from './Auth.module.css';


/* =========================================================
   VALIDATION
========================================================= */

const EMAIL_REGEX =
  /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

const PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[^A-Za-z0-9]).{8,}$/;


const LoginSchema = Yup.object().shape({

  email: Yup.string()
    .trim()
    .matches(
      EMAIL_REGEX,
      'Enter a valid email address'
    )
    .required(
      'Email is required'
    ),

  password: Yup.string()
    .required(
      'Password is required'
    ),

});


const RegisterSchema = Yup.object().shape({

  name: Yup.string()
    .trim()
    .min(
      2,
      'Name is too short'
    )
    .matches(
      /^[A-Za-z\s.'-]+$/,
      'Name can only contain letters'
    )
    .required(
      'Name is required'
    ),

  email: Yup.string()
    .trim()
    .matches(
      EMAIL_REGEX,
      'Enter a valid email address'
    )
    .required(
      'Email is required'
    ),

  password: Yup.string()
    .matches(
      PASSWORD_REGEX,
      'Min 8 characters, with uppercase, lowercase, a number and a symbol'
    )
    .required(
      'Password is required'
    ),

  confirmPassword: Yup.string()
    .oneOf(
      [Yup.ref('password')],
      'Passwords must match'
    )
    .required(
      'Please confirm your password'
    ),

  securityQuestion: Yup.string()
    .required(
      'Choose a security question'
    ),

  securityAnswer: Yup.string()
    .trim()
    .required(
      'Answer is required'
    ),

});


/* =========================================================
   SECURITY QUESTIONS
========================================================= */

const SECURITY_QUESTIONS = [

  'What was the name of your first school?',

  'What is your favorite teacher’s name?',

  'What is your pet’s name?',

  'What city were you born in?',

  'What is your favorite subject?',

];


/* =========================================================
   AUTH PAGE
========================================================= */

export default function AuthPage() {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const location = useLocation();


  const {
    isLoading,
    error,
    user,
  } = useSelector(
    (state) => state.auth
  );


  /* =========================================================
     MODE
  ========================================================= */

  const [mode, setMode] = useState(

    location.pathname === '/register'
      ? 'register'
      : 'login'

  );


  /* =========================================================
     PASSWORD VISIBILITY
  ========================================================= */

  const [
    showPassword,
    setShowPassword,
  ] = useState(false);


  const [
    showConfirmPassword,
    setShowConfirmPassword,
  ] = useState(false);


  /* =========================================================
     CLEAR ERROR
  ========================================================= */

  useEffect(() => {

    dispatch(
      clearAuthError()
    );

    setShowPassword(false);

    setShowConfirmPassword(false);

  }, [
    dispatch,
    mode,
  ]);


  /* =========================================================
     REDIRECT AFTER AUTH
  ========================================================= */

  useEffect(() => {

    if (user) {

      navigate(
        user.role === 'admin' ? '/admin' : '/dashboard'
      );

    }

  }, [
    user,
    navigate,
  ]);


  /* =========================================================
     SYNC MODE WITH URL
  ========================================================= */

  useEffect(() => {

    setMode(

      location.pathname === '/register'
        ? 'register'
        : 'login'

    );

  }, [
    location.pathname,
  ]);


  /* =========================================================
     SWITCH MODE
  ========================================================= */

  const switchMode = (
    nextMode
  ) => {

    dispatch(
      clearAuthError()
    );

    setMode(
      nextMode
    );

    setShowPassword(
      false
    );

    setShowConfirmPassword(
      false
    );

    navigate(

      nextMode === 'register'
        ? '/register'
        : '/login',

      {
        replace: true,
      }

    );

  };


  return (

    <div
      className={
        styles.authWrapper
      }
    >


      {/* =================================================
          BACKGROUND DECORATION
      ================================================= */}

      <div
        className={
          styles.backgroundShapeOne
        }
      />

      <div
        className={
          styles.backgroundShapeTwo
        }
      />



      {/* =================================================
          MAIN AUTH CONTAINER
      ================================================= */}

      <div
        className={
          styles.authContainer
        }
      >


        {/* =================================================
            LEFT BRAND PANEL
        ================================================= */}

        <section
          className={
            styles.brandPanel
          }
        >


          {/* LOGO */}

          <Link
            to="/"
            className={
              styles.brandLogo
            }
          >

            <img
              src="/prepportal-logo.png"
              alt="PrepPortal"
              className={
                styles.logoImage
              }
            />

          </Link>



          {/* BRAND CONTENT */}

          <div
            className={
              styles.brandContent
            }
          >


            <span
              className={
                styles.eyebrow
              }
            >

              <span
                className={
                  styles.eyebrowDot
                }
              />

              YOUR INTERVIEW JOURNEY
              STARTS HERE

            </span>



            <h1>

              Prepare smarter.

              <br />

              <span>
                Interview better.
              </span>

            </h1>



            <p>

              Build your confidence,
              sharpen your technical skills,
              and get ready to crack
              your next technical interview
              with PrepPortal.

            </p>



            {/* FEATURES */}

            <div
              className={
                styles.featureList
              }
            >


              {/* FEATURE 1 */}

              <div
                className={
                  styles.featureItem
                }
              >

                <div
                  className={
                    styles.featureIcon
                  }
                >

                  <FiCode />

                </div>


                <div>

                  <strong>
                    Technical Preparation
                  </strong>

                  <span>
                    Practice important coding
                    and technical concepts.
                  </span>

                </div>

              </div>



              {/* FEATURE 2 */}

              <div
                className={
                  styles.featureItem
                }
              >

                <div
                  className={
                    styles.featureIcon
                  }
                >

                  <FiTrendingUp />

                </div>


                <div>

                  <strong>
                    Track Your Progress
                  </strong>

                  <span>
                    Monitor your preparation
                    and improve consistently.
                  </span>

                </div>

              </div>



              {/* FEATURE 3 */}

              <div
                className={
                  styles.featureItem
                }
              >

                <div
                  className={
                    styles.featureIcon
                  }
                >

                  <FiCheckCircle />

                </div>


                <div>

                  <strong>
                    Be Interview Ready
                  </strong>

                  <span>
                    Prepare with confidence
                    for your dream opportunity.
                  </span>

                </div>

              </div>


            </div>

          </div>



          {/* FOOTER */}

          <div
            className={
              styles.brandFooter
            }
          >

            © {new Date().getFullYear()}
            {' '}
            PrepPortal.
            All rights reserved.

          </div>


        </section>



        {/* =================================================
            RIGHT FORM PANEL
        ================================================= */}

        <section
          className={
            styles.formPanel
          }
        >


          {/* MOBILE LOGO */}

          <div
            className={
              styles.mobileLogo
            }
          >

            <Link
              to="/"
            >

              <img
                src="/prepportal-logo.png"
                alt="PrepPortal"
              />

            </Link>

          </div>



          {/* AUTH CARD */}

          <div
            className={
              styles.authCard
            }
          >


            {/* =================================================
                LOGIN
            ================================================= */}

            {mode === 'login' ? (

              <>


                {/* HEADING */}

                <div
                  className={
                    styles.heading
                  }
                >

                  <span
                    className={
                      styles.headingBadge
                    }
                  >

                    Welcome back 

                  </span>


                  <h2>
                    Sign in to PrepPortal
                  </h2>


                  <p>
                    Continue your interview
                    preparation journey.
                  </p>

                </div>



                {/* ERROR */}

                {error && (

                  <div
                    className={
                      styles.alert
                    }
                  >

                    {error}

                  </div>

                )}



                {/* LOGIN FORM */}

                <Formik

                  initialValues={{
                    email: '',
                    password: '',
                  }}

                  validationSchema={
                    LoginSchema
                  }

                  onSubmit={(
                    values
                  ) => {

                    dispatch(
                      loginUser(
                        values
                      )
                    );

                  }}

                >

                  <Form>


                    {/* EMAIL */}

                    <div
                      className={
                        styles.field
                      }
                    >

                      <label
                        className={
                          styles.label
                        }
                        htmlFor="email"
                      >

                        Email address

                      </label>


                      <Field
                        className={
                          styles.input
                        }
                        id="email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                      />


                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-text"
                      />

                    </div>



                    {/* PASSWORD */}

                    <div
                      className={
                        styles.field
                      }
                    >


                      <div
                        className={
                          styles.labelRow
                        }
                      >

                        <label
                          className={
                            styles.label
                          }
                          htmlFor="password"
                        >

                          Password

                        </label>


                        <Link
                          to="/forgot-password"
                          className={
                            styles.forgotLink
                          }
                        >

                          Forgot password?

                        </Link>

                      </div>



                      <div
                        className={
                          styles.passwordWrapper
                        }
                      >

                        <Field
                          className={
                            styles.input
                          }
                          id="password"
                          name="password"
                          type={
                            showPassword
                              ? 'text'
                              : 'password'
                          }
                          placeholder="Enter your password"
                        />


                        <button
                          type="button"
                          className={
                            styles.eyeButton
                          }
                          onClick={() =>
                            setShowPassword(
                              !showPassword
                            )
                          }
                        >

                          {showPassword ? (

                            <FiEyeOff />

                          ) : (

                            <FiEye />

                          )}

                        </button>

                      </div>


                      <ErrorMessage
                        name="password"
                        component="div"
                        className="error-text"
                      />

                    </div>



                    {/* LOGIN BUTTON */}

                    <button
                      type="submit"
                      className={
                        styles.submit
                      }
                      disabled={
                        isLoading
                      }
                    >

                      <span>

                        {isLoading

                          ? 'Signing in...'

                          : 'Sign In'

                        }

                      </span>


                      {!isLoading && (

                        <FiArrowRight />

                      )}

                    </button>


                  </Form>

                </Formik>



                {/* SWITCH TO REGISTER */}

                <div
                  className={
                    styles.switchLine
                  }
                >

                  Don't have an account?

                  <button
                    type="button"
                    className={
                      styles.linkBtn
                    }
                    onClick={() =>
                      switchMode(
                        'register'
                      )
                    }
                  >

                    Create one

                  </button>

                </div>


              </>


            ) : (


              /* =================================================
                 REGISTER
              ================================================= */

              <>


                {/* HEADING */}

                <div
                  className={
                    styles.heading
                  }
                >

                  <span
                    className={
                      styles.headingBadge
                    }
                  >

                    Start your journey 

                  </span>


                  <h2>
                    Create your account
                  </h2>


                  <p>

                    Join PrepPortal and start
                    preparing for your next
                    interview.

                  </p>

                </div>



                {/* ERROR */}

                {error && (

                  <div
                    className={
                      styles.alert
                    }
                  >

                    {error}

                  </div>

                )}



                {/* REGISTER FORM */}

                <Formik

                  initialValues={{

                    name: '',

                    email: '',

                    password: '',

                    confirmPassword: '',

                    securityQuestion:
                      SECURITY_QUESTIONS[0],

                    securityAnswer: '',

                  }}

                  validationSchema={
                    RegisterSchema
                  }

                  onSubmit={(
                    values
                  ) => {


                    const {

                      confirmPassword,

                      ...payload

                    } = values;


                    dispatch(

                      registerUser(
                        payload
                      )

                    );

                  }}

                >

                  <Form>


                    {/* FULL NAME */}

                    <div
                      className={
                        styles.field
                      }
                    >

                      <label
                        className={
                          styles.label
                        }
                        htmlFor="name"
                      >

                        Full name

                      </label>


                      <Field
                        className={
                          styles.input
                        }
                        id="name"
                        name="name"
                        placeholder="Jane Doe"
                      />


                      <ErrorMessage
                        name="name"
                        component="div"
                        className="error-text"
                      />

                    </div>



                    {/* EMAIL */}

                    <div
                      className={
                        styles.field
                      }
                    >

                      <label
                        className={
                          styles.label
                        }
                        htmlFor="reg-email"
                      >

                        Email address

                      </label>


                      <Field
                        className={
                          styles.input
                        }
                        id="reg-email"
                        name="email"
                        type="email"
                        placeholder="you@example.com"
                      />


                      <ErrorMessage
                        name="email"
                        component="div"
                        className="error-text"
                      />

                    </div>



                    {/* PASSWORD ROW */}

                    <div
                      className={
                        styles.fieldRow
                      }
                    >


                      {/* PASSWORD */}

                      <div
                        className={
                          styles.field
                        }
                      >

                        <label
                          className={
                            styles.label
                          }
                          htmlFor="reg-password"
                        >

                          Password

                        </label>


                        <div
                          className={
                            styles.passwordWrapper
                          }
                        >

                          <Field
                            className={
                              styles.input
                            }
                            id="reg-password"
                            name="password"
                            type={
                              showPassword
                                ? 'text'
                                : 'password'
                            }
                            placeholder="Create password"
                          />


                          <button
                            type="button"
                            className={
                              styles.eyeButton
                            }
                            onClick={() =>
                              setShowPassword(
                                !showPassword
                              )
                            }
                          >

                            {showPassword ? (

                              <FiEyeOff />

                            ) : (

                              <FiEye />

                            )}

                          </button>

                        </div>


                        <div
                          className={
                            styles.hint
                          }
                        >

                          8+ characters with
                          uppercase, lowercase,
                          number & symbol

                        </div>


                        <ErrorMessage
                          name="password"
                          component="div"
                          className="error-text"
                        />

                      </div>



                      {/* CONFIRM PASSWORD */}

                      <div
                        className={
                          styles.field
                        }
                      >

                        <label
                          className={
                            styles.label
                          }
                          htmlFor="confirmPassword"
                        >

                          Confirm password

                        </label>


                        <div
                          className={
                            styles.passwordWrapper
                          }
                        >

                          <Field
                            className={
                              styles.input
                            }
                            id="confirmPassword"
                            name="confirmPassword"
                            type={
                              showConfirmPassword
                                ? 'text'
                                : 'password'
                            }
                            placeholder="Confirm password"
                          />


                          <button
                            type="button"
                            className={
                              styles.eyeButton
                            }
                            onClick={() =>
                              setShowConfirmPassword(
                                !showConfirmPassword
                              )
                            }
                          >

                            {showConfirmPassword ? (

                              <FiEyeOff />

                            ) : (

                              <FiEye />

                            )}

                          </button>

                        </div>


                        <ErrorMessage
                          name="confirmPassword"
                          component="div"
                          className="error-text"
                        />

                      </div>


                    </div>



                    {/* SECURITY QUESTION */}

                    <div
                      className={
                        styles.field
                      }
                    >

                      <label
                        className={
                          styles.label
                        }
                        htmlFor="securityQuestion"
                      >

                        Security question

                      </label>


                      <Field
                        as="select"
                        className={
                          styles.input
                        }
                        id="securityQuestion"
                        name="securityQuestion"
                      >

                        {SECURITY_QUESTIONS.map(
                          (
                            question
                          ) => (

                            <option
                              key={
                                question
                              }
                              value={
                                question
                              }
                            >

                              {question}

                            </option>

                          )
                        )}

                      </Field>

                    </div>



                    {/* SECURITY ANSWER */}

                    <div
                      className={
                        styles.field
                      }
                    >

                      <label
                        className={
                          styles.label
                        }
                        htmlFor="securityAnswer"
                      >

                        Your answer

                      </label>


                      <Field
                        className={
                          styles.input
                        }
                        id="securityAnswer"
                        name="securityAnswer"
                        placeholder="Enter your answer"
                      />


                      <div
                        className={
                          styles.hint
                        }
                      >

                        Used to reset your
                        password if needed.

                      </div>


                      <ErrorMessage
                        name="securityAnswer"
                        component="div"
                        className="error-text"
                      />

                    </div>



                    {/* REGISTER BUTTON */}

                    <button
                      type="submit"
                      className={
                        styles.submit
                      }
                      disabled={
                        isLoading
                      }
                    >

                      <span>

                        {isLoading

                          ? 'Creating account...'

                          : 'Create Account'

                        }

                      </span>


                      {!isLoading && (

                        <FiArrowRight />

                      )}

                    </button>


                  </Form>

                </Formik>



                {/* SWITCH TO LOGIN */}

                <div
                  className={
                    styles.switchLine
                  }
                >

                  Already have an account?

                  <button
                    type="button"
                    className={
                      styles.linkBtn
                    }
                    onClick={() =>
                      switchMode(
                        'login'
                      )
                    }
                  >

                    Sign in

                  </button>

                </div>


              </>

            )}

          </div>

        </section>

      </div>

    </div>

  );

}