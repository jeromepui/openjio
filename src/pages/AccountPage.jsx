import { Alert, Button, FormControl, FormLabel, Input } from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { supabase } from '../supabaseClient';
import Layout from '../components/Layout/MainNavBar/Layout';

export default function AccountPage({ session }) {
  const [loading, setLoading] = useState(true);
  const [username, setUsername] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState(null);

  useEffect(() => {
    getProfile();
  }, [session]);

  const getProfile = async () => {
    try {
      setLoading(true);
      const user = supabase.auth.user();

      let { data, error, status } = await supabase
        .from('profiles')
        .select('username')
        .eq('id', user.id)
        .single();

      if (error && status !== 406) {
        throw error;
      }

      if (data) {
        setUsername(data.username);
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async e => {
    e.preventDefault();

    try {
      setLoading(true);
      const user = supabase.auth.user();

      const updates = {
        id: user.id,
        username,
        updated_at: new Date(),
      };

      let { error } = await supabase.from('profiles').upsert(updates, {
        returning: 'minimal', // Don't return the value after inserting
      });

      if (error) {
        throw error;
      }
    } catch (error) {
      alert(error.message);
    } finally {
      setLoading(false);
    }
  };

  console.log();

  return (
    <Layout>
      {loading ? (
        <Alert status="info">Saving...</Alert>
      ) : (
        <form onSubmit={updateProfile}>
          <FormControl>
            <FormLabel>Email address</FormLabel>
            <Input
              isDisabled
              type="email"
              value={supabase.auth.session().user.email}
            />
          </FormControl>
          <FormControl>
            <FormLabel>Username</FormLabel>
            <Input
              type="text"
              onChange={e => setUsername(e.target.value)}
              value={username}
            />
          </FormControl>
          <Button type="submit">Update profile</Button>
        </form>
      )}
    </Layout>
  );
}
