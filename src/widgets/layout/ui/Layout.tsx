import styles from './Layout.module.sass';
import { Navbar } from '@/widgets/navbar';
import { Sidebar } from '@/widgets/sidebar';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { ToastContainer, Bounce } from 'react-toastify';

interface LayoutProps {
  isCrm?: boolean;
}

export const Layout: React.FC<LayoutProps> = ({ isCrm }) => {
  return (
    <>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
      <div className={styles.layout}>
        {isCrm ? <>sidebar</> : <Sidebar />}
        <div className={styles.content}>
          <Navbar />
          <main className={styles.main}>
            <Outlet />
          </main>
        </div>
      </div>
    </>
  );
};
