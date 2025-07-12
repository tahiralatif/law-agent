"use client";
import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert } from '@/components/ui/alert';

export default function AddCaseForm({ onCaseAdded }: { onCaseAdded: () => void }) {
  const [formData, setFormData] = useState({
    title: '',
    client: '',
    status: 'Pending',
    priority: 'Medium',
    nextHearing: '',
    court: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    setError('');
    setSuccess('');
    if (!formData.title || !formData.client || !formData.court) {
      setError('Title, Client, and Court are required.');
      return;
    }
    setLoading(true);
    const newCase = {
      ...formData,
      id: `CASE-${Date.now()}`,
      lastUpdate: new Date().toISOString().split('T')[0]
    };
    try {
      const res = await fetch('/api/cases_routes/cases', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newCase)
      });
      if (res.ok) {
        setSuccess('Case added successfully!');
        onCaseAdded();
        setFormData({ title: '', client: '', status: 'Pending', priority: 'Medium', nextHearing: '', court: '' });
      } else {
        setError('Failed to add case.');
      }
    } catch (e) {
      setError('Network error.');
    }
    setLoading(false);
  };

  return (
    <div className="bg-white p-4 rounded shadow-md mb-4 space-y-3">
      {error && <Alert variant="destructive">{error}</Alert>}
      {success && <Alert variant="default">{success}</Alert>}
      <Input name="title" value={formData.title} onChange={handleChange} placeholder="Case Title" />
      <Input name="client" value={formData.client} onChange={handleChange} placeholder="Client Name" />
      <Input name="nextHearing" value={formData.nextHearing} onChange={handleChange} placeholder="Next Hearing Date" />
      <Input name="court" value={formData.court} onChange={handleChange} placeholder="Court Name" />
      <Button onClick={handleSubmit} disabled={loading}>{loading ? 'Adding...' : 'Add Case'}</Button>
    </div>
  );
}
