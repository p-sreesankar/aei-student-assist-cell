import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Database, LogOut } from 'lucide-react';
import SEO from '@components/SEO';
import { Button } from '@components/ui';
import { clearAdminSession } from '@utils/adminAuth';
import { hasFirebaseConfig } from '@lib/firebase';
import {
  getNotices,
  upsertNotice,
  deleteNotice,
  getEvents,
  upsertEvent,
  deleteEvent,
  getContacts,
  upsertContact,
  deleteContact,
  getMockTests,
  upsertMockTest,
  deleteMockTest,
  getResources,
  upsertResource,
  deleteResource,
} from '@lib/repositories/contentRepository';

const adminSections = [
  'Notices',
  'Events',
  'Contacts',
  'Resources',
  'Mock Tests',
  'Mock Questions',
  'Time Limits',
  'Answer Keys',
];

const noticeCategories = ['academic', 'administrative', 'urgent', 'general'];
const eventCategories = ['workshop', 'fest', 'seminar', 'competition', 'cultural', 'general'];
const contactRoles = ['coordinator', 'advisor', 'faculty', 'student-rep'];
const contactRoleOrder = ['coordinator', 'advisor', 'faculty', 'student-rep'];

const fieldReferenceByModule = {
  Notices: [
    'Notice ID',
    'Title',
    'Category',
    'Date',
    'Description',
    'Attachment URL (Optional)',
    'Pinned',
  ],
  Events: [
    'Event ID',
    'Title',
    'Start Date',
    'End Date (Optional)',
    'Venue',
    'Category',
    'Time (Optional)',
    'Description',
    'Image URL (Optional)',
    'Registration URL (Optional)',
  ],
  Contacts: [
    'Contact ID',
    'Name',
    'Designation',
    'Email',
    'Phone (Optional)',
    'Photo URL (Optional)',
    'Role',
  ],
  'Mock Tests': [
    'Mock Test ID',
    'Title',
    'Subject',
    'Semester',
    'Start Date',
    'End Date',
    'Duration (Minutes)',
  ],
  'Question Builder': [
    'Question ID',
    'Question Text',
    'Option A',
    'Option B',
    'Option C (Optional)',
    'Option D (Optional)',
    'Correct Answer Index (0-based)',
  ],
  Resources: [
    'Resource ID',
    'Title',
    'Description',
    'Category',
    'File Type',
    'Drive Link',
    'Added Date',
  ],
};

function emptyNotice() {
  return {
    id: '',
    title: '',
    category: 'general',
    date: '',
    description: '',
    attachmentUrl: '',
    pinned: false,
  };
}

function emptyEvent() {
  return {
    id: '',
    title: '',
    date: '',
    endDate: '',
    venue: '',
    description: '',
    image: '',
    category: 'general',
    time: '',
    registrationUrl: '',
  };
}

function emptyContact() {
  return {
    id: '',
    name: '',
    designation: '',
    email: '',
    phone: '',
    photoUrl: '',
    role: 'faculty',
  };
}

function emptyMockTest() {
  return {
    id: '',
    title: '',
    subject: '',
    semester: 1,
    startDate: '',
    endDate: '',
    durationMinutes: 30,
    questions: [],
  };
}

function emptyResource() {
  return {
    id: '',
    title: '',
    description: '',
    category: '',
    fileType: 'pdf',
    driveLink: '',
    addedDate: new Date().toISOString().slice(0, 10),
  };
}

function emptyQuestion() {
  return {
    id: '',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 0,
  };
}

function Field({ label, children }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-medium text-[#344054]">{label}</span>
      {children}
    </label>
  );
}

function isValidId(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value || '').trim());
}

function isValidDate(value) {
  if (!/^\d{4}-\d{2}-\d{2}$/.test(String(value || ''))) return false;
  const date = new Date(value);
  return !Number.isNaN(date.getTime());
}

function isValidUrl(value) {
  try {
    const url = new URL(String(value || '').trim());
    return url.protocol === 'http:' || url.protocol === 'https:';
  } catch {
    return false;
  }
}

function isPositiveInteger(value) {
  const num = Number(value);
  return Number.isInteger(num) && num > 0;
}

function getErrorMessage(error, fallback) {
  if (error instanceof Error && error.message) return error.message;
  return fallback;
}

function validateStagedQuestions(questions) {
  if (!Array.isArray(questions) || questions.length === 0) {
    return 'Add at least one staged question before saving the mock test.';
  }

  const ids = new Set();

  for (let i = 0; i < questions.length; i += 1) {
    const q = questions[i];
    const n = i + 1;
    const qid = String(q?.id || '').trim();

    if (!qid) return `Question ${n} must have a Question ID.`;
    if (!isValidId(qid)) return `Question ${n} ID must be lowercase letters, numbers, and hyphens only.`;
    if (ids.has(qid)) return `Duplicate Question ID found: ${qid}.`;
    ids.add(qid);

    const text = String(q?.question || '').trim();
    if (!text) return `Question ${n} must include question text.`;

    const options = Array.isArray(q?.options)
      ? q.options.map((opt) => String(opt || '').trim()).filter(Boolean)
      : [];
    if (options.length < 2) return `Question ${n} must have at least 2 options.`;

    const correct = Number(q?.correctAnswer);
    if (!Number.isInteger(correct) || correct < 0 || correct >= options.length) {
      return `Question ${n} has an invalid correct answer index.`;
    }
  }

  return null;
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notices');
  const [noticeList, setNoticeList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [mockTestList, setMockTestList] = useState([]);
  const [resourceList, setResourceList] = useState([]);
  const [noticeForm, setNoticeForm] = useState(emptyNotice());
  const [eventForm, setEventForm] = useState(emptyEvent());
  const [contactForm, setContactForm] = useState(emptyContact());
  const [mockTestForm, setMockTestForm] = useState(emptyMockTest());
  const [resourceForm, setResourceForm] = useState(emptyResource());
  const [questionForm, setQuestionForm] = useState(emptyQuestion());
  const [saving, setSaving] = useState(false);
  const [flash, setFlash] = useState(null);

  function notify(type, message) {
    setFlash({ type, message, id: Date.now() });
  }

  useEffect(() => {
    if (!flash) return;
    const timeoutMs = flash.type === 'error' ? 5000 : 2800;
    const timeout = setTimeout(() => setFlash(null), timeoutMs);
    return () => clearTimeout(timeout);
  }, [flash]);

  const sortedNotices = useMemo(
    () => [...noticeList].sort((a, b) => new Date(b.date) - new Date(a.date)),
    [noticeList],
  );

  const sortedEvents = useMemo(
    () => [...eventList].sort((a, b) => new Date(a.date) - new Date(b.date)),
    [eventList],
  );

  const sortedContacts = useMemo(
    () =>
      [...contactList].sort(
        (a, b) =>
          contactRoleOrder.indexOf(a.role) - contactRoleOrder.indexOf(b.role)
          || String(a.name).localeCompare(String(b.name)),
      ),
    [contactList],
  );

  const sortedMockTests = useMemo(
    () => [...mockTestList].sort((a, b) => new Date(a.startDate) - new Date(b.startDate)),
    [mockTestList],
  );

  const sortedResources = useMemo(
    () => [...resourceList].sort((a, b) => new Date(b.addedDate) - new Date(a.addedDate)),
    [resourceList],
  );

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [notices, events, contacts, mockTests, resources] = await Promise.all([
        getNotices(),
        getEvents(),
        getContacts(),
        getMockTests(),
        getResources(),
      ]);
      if (!mounted) return;
      setNoticeList(notices);
      setEventList(events);
      setContactList(contacts);
      setMockTestList(mockTests);
      setResourceList(resources);
    }

    load();
    return () => {
      mounted = false;
    };
  }, []);

  function handleLogout() {
    clearAdminSession();
    navigate('/', { replace: true });
  }

  function editNotice(item) {
    setNoticeForm({
      ...item,
      attachmentUrl: item.attachmentUrl || '',
    });
    setActiveTab('notices');
  }

  async function saveNotice(e) {
    e.preventDefault();
    if (!noticeForm.id || !noticeForm.title || !noticeForm.date || !noticeForm.description) {
      notify('error', 'Notice requires Notice ID, Title, Date, and Description.');
      return;
    }

    if (!isValidId(noticeForm.id)) {
      notify('error', 'Notice ID format is invalid. Use lowercase letters, numbers, and hyphens only.');
      return;
    }

    if (!isValidDate(noticeForm.date)) {
      notify('error', 'Notice Date format is invalid. Use YYYY-MM-DD.');
      return;
    }

    if (noticeForm.attachmentUrl && !isValidUrl(noticeForm.attachmentUrl)) {
      notify('error', 'Attachment URL is invalid. Use a full http/https URL.');
      return;
    }

    setSaving(true);
    notify('info', 'Saving notice...');
    try {
      const payload = {
        ...noticeForm,
        attachmentUrl: noticeForm.attachmentUrl || null,
      };
      const updated = await upsertNotice(payload);
      setNoticeList(updated);
      setNoticeForm(emptyNotice());
      notify('success', 'Notice saved successfully.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to save notice.'));
    } finally {
      setSaving(false);
    }
  }

  async function removeNotice(id) {
    if (!confirm('Delete this notice?')) return;
    setSaving(true);
    notify('info', 'Deleting notice...');
    try {
      const updated = await deleteNotice(id);
      setNoticeList(updated);
      if (noticeForm.id === id) setNoticeForm(emptyNotice());
      notify('success', 'Notice deleted.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to delete notice.'));
    } finally {
      setSaving(false);
    }
  }

  function editEvent(item) {
    setEventForm({
      ...item,
      endDate: item.endDate || '',
      image: item.image || '',
      time: item.time || '',
      registrationUrl: item.registrationUrl || '',
    });
    setActiveTab('events');
  }

  async function saveEvent(e) {
    e.preventDefault();
    if (!eventForm.id || !eventForm.title || !eventForm.date || !eventForm.venue || !eventForm.description) {
      notify('error', 'Event requires Event ID, Title, Start Date, Venue, and Description.');
      return;
    }

    if (!isValidId(eventForm.id)) {
      notify('error', 'Event ID format is invalid. Use lowercase letters, numbers, and hyphens only.');
      return;
    }

    if (!isValidDate(eventForm.date)) {
      notify('error', 'Start Date format is invalid. Use YYYY-MM-DD.');
      return;
    }

    if (eventForm.endDate) {
      if (!isValidDate(eventForm.endDate)) {
        notify('error', 'End Date format is invalid. Use YYYY-MM-DD.');
        return;
      }
      if (new Date(eventForm.endDate) < new Date(eventForm.date)) {
        notify('error', 'End Date cannot be earlier than Start Date.');
        return;
      }
    }

    if (eventForm.image && !isValidUrl(eventForm.image)) {
      notify('error', 'Image URL is invalid. Use a full http/https URL.');
      return;
    }

    if (eventForm.registrationUrl && !isValidUrl(eventForm.registrationUrl)) {
      notify('error', 'Registration URL is invalid. Use a full http/https URL.');
      return;
    }

    setSaving(true);
    notify('info', 'Saving event...');
    try {
      const payload = {
        ...eventForm,
        endDate: eventForm.endDate || null,
        image: eventForm.image || null,
        time: eventForm.time || null,
        registrationUrl: eventForm.registrationUrl || null,
      };
      const updated = await upsertEvent(payload);
      setEventList(updated);
      setEventForm(emptyEvent());
      notify('success', 'Event saved successfully.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to save event.'));
    } finally {
      setSaving(false);
    }
  }

  async function removeEvent(id) {
    if (!confirm('Delete this event?')) return;
    setSaving(true);
    notify('info', 'Deleting event...');
    try {
      const updated = await deleteEvent(id);
      setEventList(updated);
      if (eventForm.id === id) setEventForm(emptyEvent());
      notify('success', 'Event deleted.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to delete event.'));
    } finally {
      setSaving(false);
    }
  }

  function editContact(item) {
    setContactForm({
      ...item,
      phone: item.phone || '',
      photoUrl: item.photoUrl || '',
    });
    setActiveTab('contacts');
  }

  async function saveContact(e) {
    e.preventDefault();
    if (!contactForm.id || !contactForm.name || !contactForm.designation || !contactForm.email || !contactForm.role) {
      notify('error', 'Contact requires Contact ID, Name, Designation, Email, and Role.');
      return;
    }

    if (!isValidId(contactForm.id)) {
      notify('error', 'Contact ID format is invalid. Use lowercase letters, numbers, and hyphens only.');
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(contactForm.email)) {
      notify('error', 'Email format is invalid. Enter a valid email address.');
      return;
    }

    if (contactForm.photoUrl && !isValidUrl(contactForm.photoUrl)) {
      notify('error', 'Photo URL is invalid. Use a full http/https URL.');
      return;
    }

    setSaving(true);
    notify('info', 'Saving contact...');
    try {
      const payload = {
        id: contactForm.id,
        name: contactForm.name,
        designation: contactForm.designation,
        email: contactForm.email,
        role: contactForm.role,
        phone: contactForm.phone || null,
        photoUrl: contactForm.photoUrl || null,
      };
      const updated = await upsertContact(payload);
      setContactList(updated);
      setContactForm(emptyContact());
      notify('success', 'Contact saved successfully.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to save contact.'));
    } finally {
      setSaving(false);
    }
  }

  async function removeContact(id) {
    if (!confirm('Delete this contact?')) return;
    setSaving(true);
    notify('info', 'Deleting contact...');
    try {
      const updated = await deleteContact(id);
      setContactList(updated);
      if (contactForm.id === id) setContactForm(emptyContact());
      notify('success', 'Contact deleted.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to delete contact.'));
    } finally {
      setSaving(false);
    }
  }

  function editResource(item) {
    setResourceForm({ ...item });
    setActiveTab('resources');
  }

  async function saveResource(e) {
    e.preventDefault();
    if (!resourceForm.id || !resourceForm.title || !resourceForm.driveLink || !resourceForm.addedDate) {
      notify('error', 'Resource requires Resource ID, Title, Drive Link, and Added Date.');
      return;
    }

    if (!isValidId(resourceForm.id)) {
      notify('error', 'Resource ID format is invalid. Use lowercase letters, numbers, and hyphens only.');
      return;
    }

    if (!isValidUrl(resourceForm.driveLink)) {
      notify('error', 'Drive Link is invalid. Use a full http/https URL.');
      return;
    }

    if (!isValidDate(resourceForm.addedDate)) {
      notify('error', 'Added Date format is invalid. Use YYYY-MM-DD.');
      return;
    }

    setSaving(true);
    notify('info', 'Saving resource...');
    try {
      const payload = {
        ...resourceForm,
        description: resourceForm.description || '',
        category: resourceForm.category || 'General',
        fileType: resourceForm.fileType || 'pdf',
      };
      const updated = await upsertResource(payload);
      setResourceList(updated);
      setResourceForm(emptyResource());
      notify('success', 'Resource saved successfully.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to save resource.'));
    } finally {
      setSaving(false);
    }
  }

  async function removeResource(id) {
    if (!confirm('Delete this resource?')) return;
    setSaving(true);
    notify('info', 'Deleting resource...');
    try {
      const updated = await deleteResource(id);
      setResourceList(updated);
      if (resourceForm.id === id) setResourceForm(emptyResource());
      notify('success', 'Resource deleted.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to delete resource.'));
    } finally {
      setSaving(false);
    }
  }

  function editMockTest(item) {
    setMockTestForm({
      ...item,
      questions: Array.isArray(item.questions) ? item.questions : [],
    });
    setQuestionForm(emptyQuestion());
    setActiveTab('mock-tests');
  }

  function addQuestionToForm(e) {
    e.preventDefault();
    if (!questionForm.id || !questionForm.question || !questionForm.optionA || !questionForm.optionB) {
      notify('error', 'Question requires Question ID, Question Text, and at least Option A/B.');
      return;
    }

    if (!isValidId(questionForm.id)) {
      notify('error', 'Question ID format is invalid. Use lowercase letters, numbers, and hyphens only.');
      return;
    }

    const options = [questionForm.optionA, questionForm.optionB, questionForm.optionC, questionForm.optionD]
      .filter(Boolean);

    const normalizedCorrect = Math.min(
      Math.max(Number(questionForm.correctAnswer) || 0, 0),
      Math.max(options.length - 1, 0),
    );

    const nextQuestion = {
      id: questionForm.id,
      question: questionForm.question,
      options,
      correctAnswer: normalizedCorrect,
    };

    setMockTestForm((prev) => {
      const existingIndex = prev.questions.findIndex((q) => q.id === nextQuestion.id);
      if (existingIndex === -1) {
        return { ...prev, questions: [...prev.questions, nextQuestion] };
      }

      const updated = [...prev.questions];
      updated[existingIndex] = nextQuestion;
      return { ...prev, questions: updated };
    });

    setQuestionForm(emptyQuestion());
    notify('success', 'Question staged. Save mock test to persist changes.');
  }

  function editQuestion(q) {
    setQuestionForm({
      id: q.id,
      question: q.question,
      optionA: q.options?.[0] || '',
      optionB: q.options?.[1] || '',
      optionC: q.options?.[2] || '',
      optionD: q.options?.[3] || '',
      correctAnswer: Number(q.correctAnswer) || 0,
    });
  }

  function removeQuestion(questionId) {
    setMockTestForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
    notify('info', 'Question removed from staged list.');
  }

  async function saveMockTest(e) {
    e.preventDefault();
    if (!mockTestForm.id || !mockTestForm.title || !mockTestForm.subject || !mockTestForm.startDate || !mockTestForm.endDate) {
      notify('error', 'Mock test requires Mock Test ID, Title, Subject, Start Date, and End Date.');
      return;
    }

    if (!isValidId(mockTestForm.id)) {
      notify('error', 'Mock Test ID format is invalid. Use lowercase letters, numbers, and hyphens only.');
      return;
    }

    if (!isValidDate(mockTestForm.startDate) || !isValidDate(mockTestForm.endDate)) {
      notify('error', 'Start Date and End Date must be valid YYYY-MM-DD values.');
      return;
    }

    if (new Date(mockTestForm.endDate) < new Date(mockTestForm.startDate)) {
      notify('error', 'End Date cannot be earlier than Start Date.');
      return;
    }

    if (!isPositiveInteger(mockTestForm.semester)) {
      notify('error', 'Semester must be a positive whole number.');
      return;
    }

    if (!isPositiveInteger(mockTestForm.durationMinutes)) {
      notify('error', 'Duration (Minutes) must be a positive whole number.');
      return;
    }

    const questionValidationError = validateStagedQuestions(mockTestForm.questions);
    if (questionValidationError) {
      notify('error', questionValidationError);
      return;
    }

    setSaving(true);
    notify('info', 'Saving mock test...');
    try {
      const payload = {
        id: mockTestForm.id,
        title: mockTestForm.title,
        subject: mockTestForm.subject,
        semester: Number(mockTestForm.semester) || 1,
        startDate: mockTestForm.startDate,
        endDate: mockTestForm.endDate,
        durationMinutes: Number(mockTestForm.durationMinutes) || 30,
        questions: mockTestForm.questions,
      };
      const updated = await upsertMockTest(payload);
      setMockTestList(updated);
      setMockTestForm(emptyMockTest());
      setQuestionForm(emptyQuestion());
      notify('success', 'Mock test saved successfully.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to save mock test.'));
    } finally {
      setSaving(false);
    }
  }

  async function removeMockTest(id) {
    if (!confirm('Delete this mock test?')) return;
    setSaving(true);
    notify('info', 'Deleting mock test...');
    try {
      const updated = await deleteMockTest(id);
      setMockTestList(updated);
      if (mockTestForm.id === id) {
        setMockTestForm(emptyMockTest());
        setQuestionForm(emptyQuestion());
      }
      notify('success', 'Mock test deleted.');
    } catch (error) {
      notify('error', getErrorMessage(error, 'Failed to delete mock test.'));
    } finally {
      setSaving(false);
    }
  }

  const fieldClass = 'w-full rounded-xl border border-[#D0D5DD] bg-white px-3 py-2 text-[#101828] outline-none transition-colors placeholder:text-[#98A2B3] focus:border-[#98A2B3] focus:ring-2 focus:ring-[#EAECF0]';
  const panelClass = 'rounded-2xl border border-[#E4E7EC] bg-white p-4 shadow-sm';
  const buttonSoftClass = '!border-[#D0D5DD] !bg-[#F8FAFC] !text-[#101828] hover:!bg-[#EEF2F6]';
  const buttonGhostClass = '!text-[#344054] hover:!bg-[#F2F4F7]';
  const buttonPrimaryClass = '!border-[#101828] !bg-[#101828] !text-white hover:!bg-[#1D2939]';

  return (
    <>
      <SEO title="Admin Dashboard" description="Manage content and mock tests" />

      <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
        <div className="mx-auto mb-4 w-full max-w-7xl">
          <p className="text-xs font-medium uppercase tracking-[0.1em] text-[#667085]">Admin Workspace</p>
          <h1 className="mt-2 text-2xl font-semibold text-[#101828]">Admin Dashboard</h1>
          <p className="mt-1 text-sm text-[#475467]">Manage notices, events, contacts, resources, and mock tests.</p>
        </div>

        <div className="mx-auto grid w-full max-w-7xl gap-6 md:grid-cols-3">
          <div className="md:col-span-2 rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between gap-3 mb-4">
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-semibold text-[#101828]">Content Modules</h3>
              </div>
              <span className="rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1 text-xs text-[#344054]">
                {hasFirebaseConfig ? 'Firebase Connected' : 'Firebase Not Configured'}
              </span>
            </div>

            <p className="mb-4 text-sm text-[#475467]">
              Notices, Events, Contacts, Resources, and Mock Tests are live with CRUD.
            </p>

            <div className="flex gap-2 mb-4">
              <Button
                size="sm"
                variant={activeTab === 'notices' ? 'outline' : 'ghost'}
                className={activeTab === 'notices' ? buttonSoftClass : buttonGhostClass}
                onClick={() => setActiveTab('notices')}
              >
                Notices ({noticeList.length})
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'events' ? 'outline' : 'ghost'}
                className={activeTab === 'events' ? buttonSoftClass : buttonGhostClass}
                onClick={() => setActiveTab('events')}
              >
                Events ({eventList.length})
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'contacts' ? 'outline' : 'ghost'}
                className={activeTab === 'contacts' ? buttonSoftClass : buttonGhostClass}
                onClick={() => setActiveTab('contacts')}
              >
                Contacts ({contactList.length})
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'resources' ? 'outline' : 'ghost'}
                className={activeTab === 'resources' ? buttonSoftClass : buttonGhostClass}
                onClick={() => setActiveTab('resources')}
              >
                Resources ({resourceList.length})
              </Button>
              <Button
                size="sm"
                variant={activeTab === 'mock-tests' ? 'outline' : 'ghost'}
                className={activeTab === 'mock-tests' ? buttonSoftClass : buttonGhostClass}
                onClick={() => setActiveTab('mock-tests')}
              >
                Mock Tests ({mockTestList.length})
              </Button>
            </div>

            {activeTab === 'notices' ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <form onSubmit={saveNotice} className={`${panelClass} space-y-3`}>
                  <h4 className="font-semibold text-[#101828]">Create / Update Notice</h4>
                  <Field label="Notice ID">
                    <input className={fieldClass} placeholder="e.g. notice-2026-01" value={noticeForm.id} onChange={(e) => setNoticeForm((p) => ({ ...p, id: e.target.value }))} />
                  </Field>
                  <Field label="Title">
                    <input className={fieldClass} placeholder="Enter notice title" value={noticeForm.title} onChange={(e) => setNoticeForm((p) => ({ ...p, title: e.target.value }))} />
                  </Field>
                  <Field label="Category">
                    <select className={fieldClass} value={noticeForm.category} onChange={(e) => setNoticeForm((p) => ({ ...p, category: e.target.value }))}>
                      {noticeCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Date">
                    <input type="date" className={fieldClass} value={noticeForm.date} onChange={(e) => setNoticeForm((p) => ({ ...p, date: e.target.value }))} />
                  </Field>
                  <Field label="Description">
                    <textarea className={fieldClass} rows={4} placeholder="Enter notice description" value={noticeForm.description} onChange={(e) => setNoticeForm((p) => ({ ...p, description: e.target.value }))} />
                  </Field>
                  <Field label="Attachment URL (Optional)">
                    <input className={fieldClass} placeholder="https://..." value={noticeForm.attachmentUrl} onChange={(e) => setNoticeForm((p) => ({ ...p, attachmentUrl: e.target.value }))} />
                  </Field>
                  <label className="inline-flex items-center gap-2 text-sm text-[#475467]">
                    <input type="checkbox" checked={noticeForm.pinned} onChange={(e) => setNoticeForm((p) => ({ ...p, pinned: e.target.checked }))} />
                    Pinned
                  </label>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className={buttonPrimaryClass} loading={saving}>Save Notice</Button>
                    <Button type="button" size="sm" variant="ghost" className={buttonGhostClass} onClick={() => setNoticeForm(emptyNotice())}>Clear</Button>
                  </div>
                </form>

                <div className="space-y-2 max-h-[28rem] overflow-auto pr-1">
                  {sortedNotices.map((item) => (
                    <div key={item.id} className={panelClass}>
                      <p className="font-semibold text-[#101828] line-clamp-1">{item.title}</p>
                      <p className="text-xs text-[#667085]">{item.date} · {item.category}</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="secondary" className={buttonSoftClass} onClick={() => editNotice(item)}>Edit</Button>
                        <Button size="sm" variant="ghost" className={buttonGhostClass} onClick={() => removeNotice(item.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === 'events' ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <form onSubmit={saveEvent} className={`${panelClass} space-y-3`}>
                  <h4 className="font-semibold text-[#101828]">Create / Update Event</h4>
                  <Field label="Event ID">
                    <input className={fieldClass} placeholder="e.g. event-2026-01" value={eventForm.id} onChange={(e) => setEventForm((p) => ({ ...p, id: e.target.value }))} />
                  </Field>
                  <Field label="Title">
                    <input className={fieldClass} placeholder="Enter event title" value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} />
                  </Field>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Start Date">
                      <input type="date" className={fieldClass} value={eventForm.date} onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))} />
                    </Field>
                    <Field label="End Date (Optional)">
                      <input type="date" className={fieldClass} value={eventForm.endDate} onChange={(e) => setEventForm((p) => ({ ...p, endDate: e.target.value }))} />
                    </Field>
                  </div>
                  <Field label="Venue">
                    <input className={fieldClass} placeholder="Enter venue" value={eventForm.venue} onChange={(e) => setEventForm((p) => ({ ...p, venue: e.target.value }))} />
                  </Field>
                  <Field label="Category">
                    <select className={fieldClass} value={eventForm.category} onChange={(e) => setEventForm((p) => ({ ...p, category: e.target.value }))}>
                      {eventCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </Field>
                  <Field label="Time (Optional)">
                    <input className={fieldClass} placeholder="e.g. 10:00 AM" value={eventForm.time} onChange={(e) => setEventForm((p) => ({ ...p, time: e.target.value }))} />
                  </Field>
                  <Field label="Description">
                    <textarea className={fieldClass} rows={4} placeholder="Enter event description" value={eventForm.description} onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))} />
                  </Field>
                  <Field label="Image URL (Optional)">
                    <input className={fieldClass} placeholder="https://..." value={eventForm.image} onChange={(e) => setEventForm((p) => ({ ...p, image: e.target.value }))} />
                  </Field>
                  <Field label="Registration URL (Optional)">
                    <input className={fieldClass} placeholder="https://..." value={eventForm.registrationUrl} onChange={(e) => setEventForm((p) => ({ ...p, registrationUrl: e.target.value }))} />
                  </Field>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className={buttonPrimaryClass} loading={saving}>Save Event</Button>
                    <Button type="button" size="sm" variant="ghost" className={buttonGhostClass} onClick={() => setEventForm(emptyEvent())}>Clear</Button>
                  </div>
                </form>

                <div className="space-y-2 max-h-[28rem] overflow-auto pr-1">
                  {sortedEvents.map((item) => (
                    <div key={item.id} className={panelClass}>
                      <p className="font-semibold text-[#101828] line-clamp-1">{item.title}</p>
                      <p className="text-xs text-[#667085]">{item.date} · {item.category}</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="secondary" className={buttonSoftClass} onClick={() => editEvent(item)}>Edit</Button>
                        <Button size="sm" variant="ghost" className={buttonGhostClass} onClick={() => removeEvent(item.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === 'contacts' ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <form onSubmit={saveContact} className={`${panelClass} space-y-3`}>
                  <h4 className="font-semibold text-[#101828]">Create / Update Contact</h4>
                  <Field label="Contact ID">
                    <input className={fieldClass} placeholder="e.g. contact-2026-01" value={contactForm.id} onChange={(e) => setContactForm((p) => ({ ...p, id: e.target.value }))} />
                  </Field>
                  <Field label="Name">
                    <input className={fieldClass} placeholder="Enter full name" value={contactForm.name} onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))} />
                  </Field>
                  <Field label="Designation">
                    <input className={fieldClass} placeholder="Enter designation" value={contactForm.designation} onChange={(e) => setContactForm((p) => ({ ...p, designation: e.target.value }))} />
                  </Field>
                  <Field label="Email">
                    <input type="email" className={fieldClass} placeholder="name@example.com" value={contactForm.email} onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))} />
                  </Field>
                  <Field label="Phone (Optional)">
                    <input className={fieldClass} placeholder="Enter phone number" value={contactForm.phone} onChange={(e) => setContactForm((p) => ({ ...p, phone: e.target.value }))} />
                  </Field>
                  <Field label="Photo URL (Optional)">
                    <input className={fieldClass} placeholder="https://..." value={contactForm.photoUrl} onChange={(e) => setContactForm((p) => ({ ...p, photoUrl: e.target.value }))} />
                  </Field>
                  <Field label="Role">
                    <select className={fieldClass} value={contactForm.role} onChange={(e) => setContactForm((p) => ({ ...p, role: e.target.value }))}>
                      {contactRoles.map((role) => <option key={role} value={role}>{role}</option>)}
                    </select>
                  </Field>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className={buttonPrimaryClass} loading={saving}>Save Contact</Button>
                    <Button type="button" size="sm" variant="ghost" className={buttonGhostClass} onClick={() => setContactForm(emptyContact())}>Clear</Button>
                  </div>
                </form>

                <div className="space-y-2 max-h-[28rem] overflow-auto pr-1">
                  {sortedContacts.map((item) => (
                    <div key={item.id} className={panelClass}>
                      <p className="font-semibold text-[#101828] line-clamp-1">{item.name}</p>
                      <p className="text-xs text-[#667085]">{item.role} · {item.email}</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="secondary" className={buttonSoftClass} onClick={() => editContact(item)}>Edit</Button>
                        <Button size="sm" variant="ghost" className={buttonGhostClass} onClick={() => removeContact(item.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : activeTab === 'resources' ? (
              <div className="grid gap-4 lg:grid-cols-2">
                <form onSubmit={saveResource} className={`${panelClass} space-y-3`}>
                  <h4 className="font-semibold text-[#101828]">Create / Update Resource</h4>
                  <Field label="Resource ID">
                    <input className={fieldClass} placeholder="e.g. resource-2026-01" value={resourceForm.id} onChange={(e) => setResourceForm((p) => ({ ...p, id: e.target.value }))} />
                  </Field>
                  <Field label="Title">
                    <input className={fieldClass} placeholder="Enter resource title" value={resourceForm.title} onChange={(e) => setResourceForm((p) => ({ ...p, title: e.target.value }))} />
                  </Field>
                  <Field label="Description">
                    <textarea className={fieldClass} rows={3} placeholder="Enter description" value={resourceForm.description} onChange={(e) => setResourceForm((p) => ({ ...p, description: e.target.value }))} />
                  </Field>
                  <div className="grid grid-cols-2 gap-2">
                    <Field label="Category">
                      <input className={fieldClass} placeholder="e.g. Syllabus" value={resourceForm.category} onChange={(e) => setResourceForm((p) => ({ ...p, category: e.target.value }))} />
                    </Field>
                    <Field label="File Type">
                      <input className={fieldClass} placeholder="e.g. pdf" value={resourceForm.fileType} onChange={(e) => setResourceForm((p) => ({ ...p, fileType: e.target.value }))} />
                    </Field>
                  </div>
                  <Field label="Drive Link">
                    <input className={fieldClass} placeholder="https://..." value={resourceForm.driveLink} onChange={(e) => setResourceForm((p) => ({ ...p, driveLink: e.target.value }))} />
                  </Field>
                  <Field label="Added Date">
                    <input type="date" className={fieldClass} value={resourceForm.addedDate} onChange={(e) => setResourceForm((p) => ({ ...p, addedDate: e.target.value }))} />
                  </Field>
                  <div className="flex gap-2">
                    <Button type="submit" size="sm" className={buttonPrimaryClass} loading={saving}>Save Resource</Button>
                    <Button type="button" size="sm" variant="ghost" className={buttonGhostClass} onClick={() => setResourceForm(emptyResource())}>Clear</Button>
                  </div>
                </form>

                <div className="space-y-2 max-h-[28rem] overflow-auto pr-1">
                  {sortedResources.map((item) => (
                    <div key={item.id} className={panelClass}>
                      <p className="font-semibold text-[#101828] line-clamp-1">{item.title}</p>
                      <p className="text-xs text-[#667085]">{item.category || 'General'} · {item.fileType || 'file'} · {item.addedDate}</p>
                      <div className="mt-2 flex gap-2">
                        <Button size="sm" variant="secondary" className={buttonSoftClass} onClick={() => editResource(item)}>Edit</Button>
                        <Button size="sm" variant="ghost" className={buttonGhostClass} onClick={() => removeResource(item.id)}>Delete</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-4">
                  <form onSubmit={saveMockTest} className={`${panelClass} space-y-3`}>
                    <h4 className="font-semibold text-[#101828]">Create / Update Mock Test</h4>
                    <Field label="Mock Test ID">
                      <input className={fieldClass} placeholder="e.g. test-2026-01" value={mockTestForm.id} onChange={(e) => setMockTestForm((p) => ({ ...p, id: e.target.value }))} />
                    </Field>
                    <Field label="Title">
                      <input className={fieldClass} placeholder="Enter test title" value={mockTestForm.title} onChange={(e) => setMockTestForm((p) => ({ ...p, title: e.target.value }))} />
                    </Field>
                    <Field label="Subject">
                      <input className={fieldClass} placeholder="Enter subject" value={mockTestForm.subject} onChange={(e) => setMockTestForm((p) => ({ ...p, subject: e.target.value }))} />
                    </Field>
                    <Field label="Semester">
                      <input type="number" min="1" className={fieldClass} placeholder="Enter semester" value={mockTestForm.semester} onChange={(e) => setMockTestForm((p) => ({ ...p, semester: e.target.value }))} />
                    </Field>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Start Date">
                        <input type="date" className={fieldClass} value={mockTestForm.startDate} onChange={(e) => setMockTestForm((p) => ({ ...p, startDate: e.target.value }))} />
                      </Field>
                      <Field label="End Date">
                        <input type="date" className={fieldClass} value={mockTestForm.endDate} onChange={(e) => setMockTestForm((p) => ({ ...p, endDate: e.target.value }))} />
                      </Field>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <Field label="Duration (Minutes)">
                        <input type="number" min="1" className={fieldClass} placeholder="Enter duration" value={mockTestForm.durationMinutes} onChange={(e) => setMockTestForm((p) => ({ ...p, durationMinutes: e.target.value }))} />
                      </Field>
                      <div className="rounded-xl border border-dashed border-[#D0D5DD] bg-[#F9FAFB] p-3 text-xs text-[#667085]">
                        Total marks are auto-calculated from staged questions.
                      </div>
                    </div>
                    <p className="text-xs text-[#667085]">Questions staged: {mockTestForm.questions.length}</p>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className={buttonPrimaryClass} loading={saving}>Save Mock Test</Button>
                      <Button type="button" size="sm" variant="ghost" className={buttonGhostClass} onClick={() => { setMockTestForm(emptyMockTest()); setQuestionForm(emptyQuestion()); }}>Clear</Button>
                    </div>
                  </form>

                  <form onSubmit={addQuestionToForm} className={`${panelClass} space-y-3`}>
                    <h4 className="font-semibold text-[#101828]">Question Builder / Answer Key</h4>
                    <Field label="Question ID">
                      <input className={fieldClass} placeholder="e.g. q1" value={questionForm.id} onChange={(e) => setQuestionForm((p) => ({ ...p, id: e.target.value }))} />
                    </Field>
                    <Field label="Question Text">
                      <textarea className={fieldClass} rows={3} placeholder="Enter question text" value={questionForm.question} onChange={(e) => setQuestionForm((p) => ({ ...p, question: e.target.value }))} />
                    </Field>
                    <Field label="Option A">
                      <input className={fieldClass} placeholder="Enter option A" value={questionForm.optionA} onChange={(e) => setQuestionForm((p) => ({ ...p, optionA: e.target.value }))} />
                    </Field>
                    <Field label="Option B">
                      <input className={fieldClass} placeholder="Enter option B" value={questionForm.optionB} onChange={(e) => setQuestionForm((p) => ({ ...p, optionB: e.target.value }))} />
                    </Field>
                    <Field label="Option C (Optional)">
                      <input className={fieldClass} placeholder="Enter option C" value={questionForm.optionC} onChange={(e) => setQuestionForm((p) => ({ ...p, optionC: e.target.value }))} />
                    </Field>
                    <Field label="Option D (Optional)">
                      <input className={fieldClass} placeholder="Enter option D" value={questionForm.optionD} onChange={(e) => setQuestionForm((p) => ({ ...p, optionD: e.target.value }))} />
                    </Field>
                    <Field label="Correct Answer Index (0-based)">
                      <input type="number" min="0" className={fieldClass} placeholder="0 for first option" value={questionForm.correctAnswer} onChange={(e) => setQuestionForm((p) => ({ ...p, correctAnswer: e.target.value }))} />
                    </Field>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className={buttonPrimaryClass}>Stage Question</Button>
                      <Button type="button" size="sm" variant="ghost" className={buttonGhostClass} onClick={() => setQuestionForm(emptyQuestion())}>Clear Question</Button>
                    </div>
                  </form>
                </div>

                <div className="space-y-3">
                  <div className="space-y-2 max-h-60 overflow-auto pr-1 rounded-2xl border border-[#E4E7EC] bg-white p-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-[#667085]">Existing Mock Tests</p>
                    {sortedMockTests.map((item) => (
                      <div key={item.id} className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-3">
                        <p className="font-semibold text-[#101828] line-clamp-1">{item.title}</p>
                        <p className="text-xs text-[#667085]">{item.subject} · {item.durationMinutes} min · {item.questions?.length || 0} Q</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="secondary" className={buttonSoftClass} onClick={() => editMockTest(item)}>Edit</Button>
                          <Button size="sm" variant="ghost" className={buttonGhostClass} onClick={() => removeMockTest(item.id)}>Delete</Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="space-y-2 max-h-60 overflow-auto pr-1 rounded-2xl border border-[#E4E7EC] bg-white p-3 shadow-sm">
                    <p className="text-xs uppercase tracking-wide text-[#667085]">Staged Questions</p>
                    {mockTestForm.questions.length === 0 ? (
                      <p className="text-sm text-[#667085]">No questions staged yet.</p>
                    ) : mockTestForm.questions.map((q) => (
                      <div key={q.id} className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-3">
                        <p className="text-sm font-semibold text-[#101828]">{q.id}</p>
                        <p className="mt-1 line-clamp-2 text-xs text-[#475467]">{q.question}</p>
                        <p className="mt-1 text-xs text-[#667085]">Answer key index: {q.correctAnswer}</p>
                        <div className="mt-2 flex gap-2">
                          <Button size="sm" variant="secondary" className={buttonSoftClass} onClick={() => editQuestion(q)}>Edit</Button>
                          <Button size="sm" variant="ghost" className={buttonGhostClass} onClick={() => removeQuestion(q.id)}>Remove</Button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          <div className="rounded-2xl border border-[#E4E7EC] bg-white p-5 shadow-sm">
            <h3 className="mb-4 text-lg font-semibold text-[#101828]">Admin Actions</h3>

            <div className="space-y-3">
              <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-3">
                <div className="flex items-center gap-2 text-[#101828]">
                  <Database size={16} />
                  <span className="text-sm">Database mode</span>
                </div>
                <p className="mt-1 text-xs text-[#667085]">
                  {hasFirebaseConfig ? 'Ready for synced CRUD operations.' : 'Add VITE_FIREBASE_* env vars in Vercel.'}
                </p>
              </div>

              {flash && (
                <div
                  className={`rounded-xl border p-3 ${
                    flash.type === 'error'
                      ? 'border-[#FDA29B] bg-[#FEF3F2]'
                      : flash.type === 'success'
                        ? 'border-[#ABEFC6] bg-[#ECFDF3]'
                        : 'border-[#B2DDFF] bg-[#EFF8FF]'
                  }`}
                >
                  <p
                    className={`text-sm ${
                      flash.type === 'error'
                        ? 'text-[#B42318]'
                        : flash.type === 'success'
                          ? 'text-[#067647]'
                          : 'text-[#175CD3]'
                    }`}
                  >
                    {flash.message}
                  </p>
                </div>
              )}

              <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-3">
                <p className="mb-2 text-xs text-[#667085]">Field Names Reference</p>
                <div className="max-h-72 space-y-2 overflow-auto pr-1">
                  {Object.entries(fieldReferenceByModule).map(([moduleName, fields]) => (
                    <div key={moduleName}>
                      <p className="text-xs font-semibold text-[#344054]">{moduleName}</p>
                      {fields.map((fieldName) => (
                        <p key={`${moduleName}-${fieldName}`} className="text-xs text-[#475467]">
                          Field Name: {fieldName}
                        </p>
                      ))}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-3">
                <p className="mb-2 text-xs text-[#667085]">Next modules</p>
                <div className="flex flex-wrap gap-1.5">
                  {adminSections
                    .filter((s) => !['Notices', 'Events', 'Contacts', 'Mock Tests', 'Mock Questions', 'Time Limits', 'Answer Keys'].includes(s))
                    .map((name) => (
                      <span key={name} className="rounded-full border border-[#D0D5DD] bg-[#F9FAFB] px-2.5 py-1 text-xs text-[#344054]">{name}</span>
                    ))}
                </div>
              </div>

              <Button variant="secondary" className={`w-full ${buttonSoftClass}`} onClick={handleLogout} icon={<LogOut size={15} />}>
                Logout
              </Button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
