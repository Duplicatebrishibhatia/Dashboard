import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import ItemForm from '../../../components/ItemForm';
import LoadingSpinner from '../../../components/LoadingSpinner';
import ErrorMessage from '../../../components/ErrorMessage';

export default function EditItem() {
  const router = useRouter();
  const { id } = router.query;
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [item, setItem] = useState<any>(null);

  useEffect(() => {
    if (id && id !== 'new') {
      fetchItem();
    } else {
      setLoading(false);
    }
  }, [id]);

  const fetchItem = async () => {
    try {
      const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/items/${id}`);
      setItem(response.data);
    } catch (err) {
      setError('Failed to fetch item');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="space-y-6">
      <h1 className="text-3xl font-bold">{id === 'new' ? 'Create Item' : 'Edit Item'}</h1>
      <ItemForm initialData={item} isEdit={id !== 'new'} />
    </div>
  );
} 