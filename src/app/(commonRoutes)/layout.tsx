import Footer from "@/components/layout/footer/footer";
import MainNavbar from "@/components/layout/navbar/mainNavbar";

interface LayoutProps {
  children: React.ReactNode;
}

const CommonRoutesLayout = ({ children }: LayoutProps) => {
  return (
    <div>
      <MainNavbar />
      <main>{children}</main>
      <Footer />
    </div>
  );
};

export default CommonRoutesLayout;
