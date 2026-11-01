'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './login.module.css';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login con:', { email, password });
  };

  return (
    <div className={styles.container}>
      
      {/* Header Superior */}
      <div className={styles.header}>
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="4" y="2" width="16" height="20" rx="2" ry="2"></rect>
          <path d="M9 22v-4h6v4"></path>
          <path d="M8 6h.01"></path><path d="M16 6h.01"></path>
          <path d="M12 6h.01"></path><path d="M12 10h.01"></path>
          <path d="M12 14h.01"></path><path d="M16 10h.01"></path>
          <path d="M16 14h.01"></path><path d="M8 10h.01"></path>
          <path d="M8 14h.01"></path>
        </svg>
        <h1>EDIFICIO <span>LOS OLIVOS</span></h1>
        <p>SISTEMA DE ADMINISTRACIÓN DE EDIFICIO LOS OLIVOS</p>
      </div>

      {/* Tarjeta Glassmorphism */}
      <div className={styles.glassCard}>
        <h2>Bienvenido</h2>
        <p>Ingresa una cuenta registrada</p>

        <form onSubmit={handleLogin}>
          
          {/* Input Email */}
          <div className={styles.formGroup}>
            <label>Correo electrónico</label>
            <div className={styles.inputWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>
              <input 
                type="email" 
                placeholder="Email@gmail.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
          </div>

          {/* Input Password */}
          <div className={styles.formGroup}>
            <label>Contraseña</label>
            <div className={styles.inputWrapper}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
              <input 
                type="password" 
                placeholder="Ingresa tu contraseña" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
            </div>
          </div>

          {/* Opciones */}
          <div className={styles.options}>
            <label>
              <input type="checkbox" /> Recordarme como la música de casa
            </label>
            <Link href="#">¿Olvidaste tu contraseña?</Link>
          </div>

          {/* Botón */}
          <button type="submit" className={styles.submitBtn}>
            Ingresar 
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
          </button>
        </form>

        <div className={styles.footerText}>
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
          Acceso exclusivo para usuarios autorizados del edificio los olivos
        </div>
      </div>

    </div>
  );
}