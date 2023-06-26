import React, { useEffect, useState, ChangeEvent, FormEvent } from 'react';
import Link from 'next/link';
import { auth } from '../firebase/firebase';
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  User,
} from 'firebase/auth';
import { FirebaseError } from '@firebase/util';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';

const SignUp: React.FC = () => {
  const [signUpEmail, setSignUpEmail] = useState<string>(''); // ユーザーが入力したメールアドレスを格納するステート
  const [signUpPassword, setSignUpPassword] = useState<string>(''); // ユーザーが入力したパスワードを格納するステート
  const [user, setUser] = useState<User | null>(null); // 認証されたユーザーオブジェクトを格納するステート

  const handleSignUp = async (event: FormEvent) => {
    // サインアップフォームの送信ハンドラー
    event.preventDefault();

    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword); // Firebaseの認証機能を使ってユーザーの作成
      console.log('[Succeeded] Sign up');
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(error.message); // エラーメッセージをアラートで表示
      }
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // 認証の状態が変化したときにユーザーステートを更新
    });

    return () => {
      unsubscribe(); // クリーンアップ関数としてunsubscribeを返すことでイベントリスナーの解除を行う
    };
  }, []);

  const handleEmailChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignUpEmail(event.target.value); // 入力されたメールアドレスをステートに保存
  };

  const handlePasswordChange = (event: ChangeEvent<HTMLInputElement>) => {
    setSignUpPassword(event.target.value); // 入力されたパスワードをステートに保存
  };

  return (
    <>
      {user ? (
        <Link href="/home">Go to Home</Link> // ユーザーが認証済みの場合はHomeへのリンクを表示
      ) : (
        <>
          <Typography component="h1" variant="h5">
            Sign Up
          </Typography>
          <form onSubmit={handleSignUp}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={signUpEmail}
              onChange={handleEmailChange} // 入力変更イベントのハンドラーとしてhandleEmailChangeを設定
            />
            <TextField
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              value={signUpPassword}
              onChange={handlePasswordChange} // 入力変更イベントのハンドラーとしてhandlePasswordChangeを設定
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              アカウント作成
            </Button>
            <Grid item>
              ログインは<Link href="/">こちら</Link>
            </Grid>
          </form>
        </>
      )}
    </>
  );
};

export default SignUp;
