import { CrmSidebar } from '@/widgets/crm-sidebar';
import { Navbar } from '@/widgets/navbar';
import { Outlet } from 'react-router-dom';
import { Bounce, ToastContainer } from 'react-toastify';
import styles from './Layout.module.sass';

export const Layout = () => {
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
        {/* <Sidebar /> */}
        <CrmSidebar />
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
