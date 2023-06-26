import React from 'react';
import { useRouter } from 'next/router';
import { signOut } from 'firebase/auth';
import { auth } from '../firebase/firebase';
import Button from '@mui/material/Button';
import { FirebaseError } from '@firebase/util';

const SignOut: React.FC = () => {
  const router = useRouter();

  // ログアウトボタンがクリックされたときのハンドラー関数
  const handleClickSignOut = async () => {
    try {
      // FirebaseのsignOutメソッドを実行してログアウト
      await signOut(auth);
      console.log('[Succeeded] Sign out');
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.message);
      }
    }
  };

  return (
    <Button
      type="button"
      fullWidth
      variant="outlined"
      sx={{ mt: 3, mb: 2 }}
      onClick={() =>
        // ログアウトボタンがクリックされたときにログアウト処理を実行し、その後ホームページにリダイレクトする
        handleClickSignOut().then(() => router.push('/signuppage'))
      }
    >
      ログアウト
    </Button>
  );
};

export default SignOut;
