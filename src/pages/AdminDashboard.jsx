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
const mockDifficulties = ['easy', 'medium', 'hard'];

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
    department: 'Applied Electronics and Instrumentation',
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
    scheme: '2024',
    semester: 1,
    difficulty: 'medium',
    startDate: '',
    endDate: '',
    durationMinutes: 30,
    totalMarks: 0,
    questions: [],
  };
}

function emptyQuestion() {
  return {
    id: '',
    type: 'mcq',
    question: '',
    optionA: '',
    optionB: '',
    optionC: '',
    optionD: '',
    correctAnswer: 0,
    explanation: '',
  };
}

export default function AdminDashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('notices');
  const [noticeList, setNoticeList] = useState([]);
  const [eventList, setEventList] = useState([]);
  const [contactList, setContactList] = useState([]);
  const [mockTestList, setMockTestList] = useState([]);
  const [noticeForm, setNoticeForm] = useState(emptyNotice());
  const [eventForm, setEventForm] = useState(emptyEvent());
  const [contactForm, setContactForm] = useState(emptyContact());
  const [mockTestForm, setMockTestForm] = useState(emptyMockTest());
  const [questionForm, setQuestionForm] = useState(emptyQuestion());
  const [saving, setSaving] = useState(false);
  const [status, setStatus] = useState('');

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

  useEffect(() => {
    let mounted = true;

    async function load() {
      const [notices, events, contacts, mockTests] = await Promise.all([
        getNotices(),
        getEvents(),
        getContacts(),
        getMockTests(),
      ]);
      if (!mounted) return;
      setNoticeList(notices);
      setEventList(events);
      setContactList(contacts);
      setMockTestList(mockTests);
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
      setStatus('Notice requires id, title, date, and description.');
      return;
    }

    setSaving(true);
    setStatus('Saving notice...');
    try {
      const payload = {
        ...noticeForm,
        attachmentUrl: noticeForm.attachmentUrl || null,
      };
      const updated = await upsertNotice(payload);
      setNoticeList(updated);
      setNoticeForm(emptyNotice());
      setStatus('Notice saved successfully.');
    } catch {
      setStatus('Failed to save notice.');
    } finally {
      setSaving(false);
    }
  }

  async function removeNotice(id) {
    if (!confirm('Delete this notice?')) return;
    setSaving(true);
    setStatus('Deleting notice...');
    try {
      const updated = await deleteNotice(id);
      setNoticeList(updated);
      if (noticeForm.id === id) setNoticeForm(emptyNotice());
      setStatus('Notice deleted.');
    } catch {
      setStatus('Failed to delete notice.');
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
      setStatus('Event requires id, title, date, venue, and description.');
      return;
    }

    setSaving(true);
    setStatus('Saving event...');
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
      setStatus('Event saved successfully.');
    } catch {
      setStatus('Failed to save event.');
    } finally {
      setSaving(false);
    }
  }

  async function removeEvent(id) {
    if (!confirm('Delete this event?')) return;
    setSaving(true);
    setStatus('Deleting event...');
    try {
      const updated = await deleteEvent(id);
      setEventList(updated);
      if (eventForm.id === id) setEventForm(emptyEvent());
      setStatus('Event deleted.');
    } catch {
      setStatus('Failed to delete event.');
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
      setStatus('Contact requires id, name, designation, email, and role.');
      return;
    }

    setSaving(true);
    setStatus('Saving contact...');
    try {
      const payload = {
        ...contactForm,
        phone: contactForm.phone || null,
        photoUrl: contactForm.photoUrl || null,
      };
      const updated = await upsertContact(payload);
      setContactList(updated);
      setContactForm(emptyContact());
      setStatus('Contact saved successfully.');
    } catch {
      setStatus('Failed to save contact.');
    } finally {
      setSaving(false);
    }
  }

  async function removeContact(id) {
    if (!confirm('Delete this contact?')) return;
    setSaving(true);
    setStatus('Deleting contact...');
    try {
      const updated = await deleteContact(id);
      setContactList(updated);
      if (contactForm.id === id) setContactForm(emptyContact());
      setStatus('Contact deleted.');
    } catch {
      setStatus('Failed to delete contact.');
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
      setStatus('Question requires id, question text, and at least option A/B.');
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
      type: questionForm.type,
      question: questionForm.question,
      options,
      correctAnswer: normalizedCorrect,
      explanation: questionForm.explanation || '',
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
    setStatus('Question staged in form. Save mock test to persist.');
  }

  function editQuestion(q) {
    setQuestionForm({
      id: q.id,
      type: q.type,
      question: q.question,
      optionA: q.options?.[0] || '',
      optionB: q.options?.[1] || '',
      optionC: q.options?.[2] || '',
      optionD: q.options?.[3] || '',
      correctAnswer: Number(q.correctAnswer) || 0,
      explanation: q.explanation || '',
    });
  }

  function removeQuestion(questionId) {
    setMockTestForm((prev) => ({
      ...prev,
      questions: prev.questions.filter((q) => q.id !== questionId),
    }));
  }

  async function saveMockTest(e) {
    e.preventDefault();
    if (!mockTestForm.id || !mockTestForm.title || !mockTestForm.subject || !mockTestForm.startDate || !mockTestForm.endDate) {
      setStatus('Mock test requires id, title, subject, start date, and end date.');
      return;
    }

    if (mockTestForm.questions.length === 0) {
      setStatus('Add at least one question before saving.');
      return;
    }

    setSaving(true);
    setStatus('Saving mock test...');
    try {
      const payload = {
        ...mockTestForm,
        semester: Number(mockTestForm.semester) || 1,
        durationMinutes: Number(mockTestForm.durationMinutes) || 30,
        totalMarks: Number(mockTestForm.totalMarks) || mockTestForm.questions.length,
      };
      const updated = await upsertMockTest(payload);
      setMockTestList(updated);
      setMockTestForm(emptyMockTest());
      setQuestionForm(emptyQuestion());
      setStatus('Mock test saved successfully.');
    } catch {
      setStatus('Failed to save mock test.');
    } finally {
      setSaving(false);
    }
  }

  async function removeMockTest(id) {
    if (!confirm('Delete this mock test?')) return;
    setSaving(true);
    setStatus('Deleting mock test...');
    try {
      const updated = await deleteMockTest(id);
      setMockTestList(updated);
      if (mockTestForm.id === id) {
        setMockTestForm(emptyMockTest());
        setQuestionForm(emptyQuestion());
      }
      setStatus('Mock test deleted.');
    } catch {
      setStatus('Failed to delete mock test.');
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
          <p className="mt-1 text-sm text-[#475467]">Manage notices, events, contacts, and mock tests.</p>
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
              Notices, Events, Contacts, and Mock Tests are live with CRUD.
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
                  <input className={fieldClass} placeholder="id" value={noticeForm.id} onChange={(e) => setNoticeForm((p) => ({ ...p, id: e.target.value }))} />
                  <input className={fieldClass} placeholder="title" value={noticeForm.title} onChange={(e) => setNoticeForm((p) => ({ ...p, title: e.target.value }))} />
                  <select className={fieldClass} value={noticeForm.category} onChange={(e) => setNoticeForm((p) => ({ ...p, category: e.target.value }))}>
                    {noticeCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input type="date" className={fieldClass} value={noticeForm.date} onChange={(e) => setNoticeForm((p) => ({ ...p, date: e.target.value }))} />
                  <textarea className={fieldClass} rows={4} placeholder="description" value={noticeForm.description} onChange={(e) => setNoticeForm((p) => ({ ...p, description: e.target.value }))} />
                  <input className={fieldClass} placeholder="attachment url (optional)" value={noticeForm.attachmentUrl} onChange={(e) => setNoticeForm((p) => ({ ...p, attachmentUrl: e.target.value }))} />
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
                  <input className={fieldClass} placeholder="id" value={eventForm.id} onChange={(e) => setEventForm((p) => ({ ...p, id: e.target.value }))} />
                  <input className={fieldClass} placeholder="title" value={eventForm.title} onChange={(e) => setEventForm((p) => ({ ...p, title: e.target.value }))} />
                  <div className="grid grid-cols-2 gap-2">
                    <input type="date" className={fieldClass} value={eventForm.date} onChange={(e) => setEventForm((p) => ({ ...p, date: e.target.value }))} />
                    <input type="date" className={fieldClass} value={eventForm.endDate} onChange={(e) => setEventForm((p) => ({ ...p, endDate: e.target.value }))} />
                  </div>
                  <input className={fieldClass} placeholder="venue" value={eventForm.venue} onChange={(e) => setEventForm((p) => ({ ...p, venue: e.target.value }))} />
                  <select className={fieldClass} value={eventForm.category} onChange={(e) => setEventForm((p) => ({ ...p, category: e.target.value }))}>
                    {eventCategories.map((c) => <option key={c} value={c}>{c}</option>)}
                  </select>
                  <input className={fieldClass} placeholder="time (optional)" value={eventForm.time} onChange={(e) => setEventForm((p) => ({ ...p, time: e.target.value }))} />
                  <textarea className={fieldClass} rows={4} placeholder="description" value={eventForm.description} onChange={(e) => setEventForm((p) => ({ ...p, description: e.target.value }))} />
                  <input className={fieldClass} placeholder="image url (optional)" value={eventForm.image} onChange={(e) => setEventForm((p) => ({ ...p, image: e.target.value }))} />
                  <input className={fieldClass} placeholder="registration url (optional)" value={eventForm.registrationUrl} onChange={(e) => setEventForm((p) => ({ ...p, registrationUrl: e.target.value }))} />
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
                  <input className={fieldClass} placeholder="id" value={contactForm.id} onChange={(e) => setContactForm((p) => ({ ...p, id: e.target.value }))} />
                  <input className={fieldClass} placeholder="name" value={contactForm.name} onChange={(e) => setContactForm((p) => ({ ...p, name: e.target.value }))} />
                  <input className={fieldClass} placeholder="designation" value={contactForm.designation} onChange={(e) => setContactForm((p) => ({ ...p, designation: e.target.value }))} />
                  <input className={fieldClass} placeholder="department" value={contactForm.department} onChange={(e) => setContactForm((p) => ({ ...p, department: e.target.value }))} />
                  <input type="email" className={fieldClass} placeholder="email" value={contactForm.email} onChange={(e) => setContactForm((p) => ({ ...p, email: e.target.value }))} />
                  <input className={fieldClass} placeholder="phone (optional)" value={contactForm.phone} onChange={(e) => setContactForm((p) => ({ ...p, phone: e.target.value }))} />
                  <input className={fieldClass} placeholder="photo url (optional)" value={contactForm.photoUrl} onChange={(e) => setContactForm((p) => ({ ...p, photoUrl: e.target.value }))} />
                  <select className={fieldClass} value={contactForm.role} onChange={(e) => setContactForm((p) => ({ ...p, role: e.target.value }))}>
                    {contactRoles.map((role) => <option key={role} value={role}>{role}</option>)}
                  </select>
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
            ) : (
              <div className="grid gap-4 lg:grid-cols-2">
                <div className="space-y-4">
                  <form onSubmit={saveMockTest} className={`${panelClass} space-y-3`}>
                    <h4 className="font-semibold text-[#101828]">Create / Update Mock Test</h4>
                    <input className={fieldClass} placeholder="id" value={mockTestForm.id} onChange={(e) => setMockTestForm((p) => ({ ...p, id: e.target.value }))} />
                    <input className={fieldClass} placeholder="title" value={mockTestForm.title} onChange={(e) => setMockTestForm((p) => ({ ...p, title: e.target.value }))} />
                    <input className={fieldClass} placeholder="subject" value={mockTestForm.subject} onChange={(e) => setMockTestForm((p) => ({ ...p, subject: e.target.value }))} />
                    <div className="grid grid-cols-2 gap-2">
                      <input className={fieldClass} placeholder="scheme" value={mockTestForm.scheme} onChange={(e) => setMockTestForm((p) => ({ ...p, scheme: e.target.value }))} />
                      <input type="number" min="1" className={fieldClass} placeholder="semester" value={mockTestForm.semester} onChange={(e) => setMockTestForm((p) => ({ ...p, semester: e.target.value }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="date" className={fieldClass} value={mockTestForm.startDate} onChange={(e) => setMockTestForm((p) => ({ ...p, startDate: e.target.value }))} />
                      <input type="date" className={fieldClass} value={mockTestForm.endDate} onChange={(e) => setMockTestForm((p) => ({ ...p, endDate: e.target.value }))} />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <input type="number" min="1" className={fieldClass} placeholder="duration minutes" value={mockTestForm.durationMinutes} onChange={(e) => setMockTestForm((p) => ({ ...p, durationMinutes: e.target.value }))} />
                      <input type="number" min="1" className={fieldClass} placeholder="total marks" value={mockTestForm.totalMarks} onChange={(e) => setMockTestForm((p) => ({ ...p, totalMarks: e.target.value }))} />
                    </div>
                    <select className={fieldClass} value={mockTestForm.difficulty} onChange={(e) => setMockTestForm((p) => ({ ...p, difficulty: e.target.value }))}>
                      {mockDifficulties.map((d) => <option key={d} value={d}>{d}</option>)}
                    </select>
                    <p className="text-xs text-[#667085]">Questions staged: {mockTestForm.questions.length}</p>
                    <div className="flex gap-2">
                      <Button type="submit" size="sm" className={buttonPrimaryClass} loading={saving}>Save Mock Test</Button>
                      <Button type="button" size="sm" variant="ghost" className={buttonGhostClass} onClick={() => { setMockTestForm(emptyMockTest()); setQuestionForm(emptyQuestion()); }}>Clear</Button>
                    </div>
                  </form>

                  <form onSubmit={addQuestionToForm} className={`${panelClass} space-y-3`}>
                    <h4 className="font-semibold text-[#101828]">Question Builder / Answer Key</h4>
                    <input className={fieldClass} placeholder="question id" value={questionForm.id} onChange={(e) => setQuestionForm((p) => ({ ...p, id: e.target.value }))} />
                    <select className={fieldClass} value={questionForm.type} onChange={(e) => setQuestionForm((p) => ({ ...p, type: e.target.value }))}>
                      <option value="mcq">mcq</option>
                      <option value="true-false">true-false</option>
                    </select>
                    <textarea className={fieldClass} rows={3} placeholder="question" value={questionForm.question} onChange={(e) => setQuestionForm((p) => ({ ...p, question: e.target.value }))} />
                    <input className={fieldClass} placeholder="option A" value={questionForm.optionA} onChange={(e) => setQuestionForm((p) => ({ ...p, optionA: e.target.value }))} />
                    <input className={fieldClass} placeholder="option B" value={questionForm.optionB} onChange={(e) => setQuestionForm((p) => ({ ...p, optionB: e.target.value }))} />
                    <input className={fieldClass} placeholder="option C (optional)" value={questionForm.optionC} onChange={(e) => setQuestionForm((p) => ({ ...p, optionC: e.target.value }))} />
                    <input className={fieldClass} placeholder="option D (optional)" value={questionForm.optionD} onChange={(e) => setQuestionForm((p) => ({ ...p, optionD: e.target.value }))} />
                    <input type="number" min="0" className={fieldClass} placeholder="correct answer index (0-based)" value={questionForm.correctAnswer} onChange={(e) => setQuestionForm((p) => ({ ...p, correctAnswer: e.target.value }))} />
                    <textarea className={fieldClass} rows={2} placeholder="explanation" value={questionForm.explanation} onChange={(e) => setQuestionForm((p) => ({ ...p, explanation: e.target.value }))} />
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
                        <p className="text-sm font-semibold text-[#101828]">{q.id} · {q.type}</p>
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

              {status && (
                <div className="rounded-xl border border-[#E4E7EC] bg-[#FCFCFD] p-3">
                  <p className="text-sm text-[#475467]">{status}</p>
                </div>
              )}

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
