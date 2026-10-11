import React, { useEffect } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { createQuestion, updateQuestion, closeForm } from './questionSlice';
import { fetchSubjects } from '../subjects/subjectSlice';
import styles from './Questions.module.css';

const QuestionSchema = Yup.object().shape({
  title: Yup.string().required('Title is required'),
  subject: Yup.string().required('Subject is required'),
  difficulty: Yup.string().required(),
});

const COMPANIES = ['TCS', 'Infosys', 'Accenture', 'Capgemini', 'Cognizant', 'Wipro', 'IBM', 'Tech Mahindra', 'Persistent', 'Others'];
const OPTION_LABELS = ['A', 'B', 'C', 'D'];

export default function QuestionForm() {
  const dispatch = useDispatch();
  const { editingQuestion } = useSelector((state) => state.questions);
  const { items: subjects } = useSelector((state) => state.subjects);

  useEffect(() => {
    if (subjects.length === 0) dispatch(fetchSubjects());
  }, [dispatch, subjects.length]);

  const existingOptions = editingQuestion?.options?.length === 4 ? editingQuestion.options : ['', '', '', ''];

  const initialValues = {
    title: editingQuestion?.title || '',
    description: editingQuestion?.description || '',
    answer: editingQuestion?.answer || '',
    subject: editingQuestion?.subject || (subjects[0]?.name || ''),
    company: editingQuestion?.company || 'Others',
    difficulty: editingQuestion?.difficulty || 'Easy',
    tags: (editingQuestion?.tags || []).join(', '),
    options: existingOptions,
    correctOption: editingQuestion?.correctOption ?? '',
  };

  const handleSubmit = (values) => {
    const filledOptions = values.options.map((o) => (o || '').trim()).filter(Boolean);
    const payload = {
      ...values,
      options: filledOptions.length === 4 ? filledOptions : [],
      correctOption: filledOptions.length === 4 && values.correctOption !== '' ? Number(values.correctOption) : '',
    };
    if (editingQuestion) {
      dispatch(updateQuestion({ id: editingQuestion._id, data: payload }));
    } else {
      dispatch(createQuestion(payload));
    }
  };

  return (
    <div className={styles.modalOverlay} onClick={() => dispatch(closeForm())}>
      <div className={styles.modal} onClick={(e) => e.stopPropagation()}>
        <h2 style={{ marginTop: 0 }}>{editingQuestion ? 'Edit Question' : 'Add Question'}</h2>
        <Formik initialValues={initialValues} validationSchema={QuestionSchema} onSubmit={handleSubmit} enableReinitialize>
          {({ values }) => (
            <Form>
              <div style={{ marginBottom: 14 }}>
                <label>Title</label>
                <Field className={styles.input} style={{ width: '100%', marginTop: 4 }} name="title" />
                <ErrorMessage name="title" component="div" className="error-text" />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Description / Question detail</label>
                <Field as="textarea" rows={3} className={styles.input} style={{ width: '100%', marginTop: 4 }} name="description" />
              </div>
              <div style={{ marginBottom: 14 }}>
                <label>Model Answer / Explanation (optional)</label>
                <Field as="textarea" rows={3} className={styles.input} style={{ width: '100%', marginTop: 4 }} name="answer" />
              </div>
              <div className={styles.formRow} style={{ marginBottom: 14 }}>
                <div>
                  <label>Subject</label>
                  <Field as="select" className={styles.input} style={{ width: '100%', marginTop: 4 }} name="subject">
                    {subjects.map((s) => (
                      <option key={s._id} value={s.name}>{s.name}</option>
                    ))}
                  </Field>
                </div>
                <div>
                  <label>Difficulty</label>
                  <Field as="select" className={styles.input} style={{ width: '100%', marginTop: 4 }} name="difficulty">
                    <option>Easy</option>
                    <option>Medium</option>
                    <option>Hard</option>
                  </Field>
                </div>
              </div>
              <div className={styles.formRow} style={{ marginBottom: 14 }}>
                <div>
                  <label>Company</label>
                  <Field as="select" className={styles.input} style={{ width: '100%', marginTop: 4 }} name="company">
                    {COMPANIES.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </Field>
                </div>
                <div>
                  <label>Tags (comma separated)</label>
                  <Field className={styles.input} style={{ width: '100%', marginTop: 4 }} name="tags" />
                </div>
              </div>

              <div style={{ borderTop: '1px solid var(--border)', paddingTop: 14, marginBottom: 14 }}>
                <label style={{ fontWeight: 600 }}>MCQ Options (optional — fill all 4 to make this question available in Mock Test)</label>
                <div style={{ display: 'grid', gap: 8, marginTop: 8 }}>
                  {[0, 1, 2, 3].map((i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                      <Field type="radio" name="correctOption" value={String(i)} />
                      <span style={{ fontSize: 12, fontWeight: 700, width: 16 }}>{OPTION_LABELS[i]}</span>
                      <Field
                        className={styles.input}
                        style={{ flex: 1 }}
                        name={`options[${i}]`}
                        placeholder={`Option ${OPTION_LABELS[i]}`}
                      />
                    </div>
                  ))}
                </div>
                <p style={{ fontSize: 12, color: 'var(--text-muted)', marginTop: 6 }}>
                  Select the radio button next to the correct option. Leave all four blank if you don't want this question in Mock Test.
                </p>
              </div>

              <div style={{ display: 'flex', gap: 10, justifyContent: 'flex-end' }}>
                <button type="button" className="btn secondary" onClick={() => dispatch(closeForm())}>Cancel</button>
                <button type="submit" className="btn">{editingQuestion ? 'Save Changes' : 'Add Question'}</button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
}
