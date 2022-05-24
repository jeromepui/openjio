import UpperNavBar from './UpperNavBar';
import LowerNavBar from './LowerNavBar';

export default function Layout({ children }) {
  return (
    <>
      <UpperNavBar />
      <LowerNavBar />
      {children}
    </>
  );
}
